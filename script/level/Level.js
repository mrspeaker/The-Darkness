function Level() {
    this.blocks = [];
    this.mids = [];
    this.width = 0;
    this.height = 0;
    this.entities = [];
    this.game = null;
    this.player = null;
    this.blockWidth = 32;
    this.blockHeight = 32;
    this.solidBlock = new SolidBlock();
    this.frame;
    this.xSpawn;
    this.ySpawn;
}
Level.loaded = {};
Level.loadLevel = function(game, id) {
    
    var level = new Level(),
        data = leveldata.byId(id),
        levelEntities = [];

    if(Level.loaded[data.name]){
        return Level.loaded[data.name];
    }
    
    level.init(game);
    level.width = data.width;
    level.height = data.height;
    level.blocks = data.base
        .replace(/\s/g, "")
        .split("")
        .reduce(function(acc, el){ 
            if(acc[acc.length - 1].length == 0 || acc[acc.length - 1].length == 1){ 
                acc[acc.length - 1].push(el); 
            } 
            else { 
                acc.push([el]); 
            } 
            return acc; 
        }, [[]])
        .map(function(tilePair, idx){
            var b = null;
            switch (tilePair[0]) {
                case ".": b = new Block(-1); break;
                case "1": b = new SolidBlock(tilePair[1]); break;
                case ">": b = new ThingBlock(); break;
                case "D": b = new LockedDoorBlock(); break;
                case "U": b = new BigLightBlock(tilePair[1]); break;
                case "T": b = new TVBlock(tilePair[1]); break;
                case "L": b = new StandardLampBlock(tilePair[1]); break;
                case "E": b = new ExitBlock(tilePair[1]); break;
                case "S": b = new SpawnBlock(tilePair[1]); break;
                case "!": b = new TriggerBlock(tilePair[1]); break;
                case "#": b = new TriggerBlock(tilePair[1], true); break;
                default:
                    console.log("Unknown block:", tilePair[0]);
                    b = new Block();
            };
            b.init(level, idx % level.width, ~~(idx / level.width));
            return b;
        });
    
    level.mids = data.mids
           .replace(/\s/g, "")
           .split("")
           .reduce(function(acc, el){ 
               if(acc[acc.length - 1].length == 0 || acc[acc.length - 1].length == 1){ 
                   acc[acc.length - 1].push(el); 
               } 
               else { 
                   acc.push([el]); 
               } 
               return acc; 
           }, [[]])
           .map(function(tilePair, idx){
                var entity = null;
                switch(tilePair[0]) {
                    case "P":
                        entity = new Item(tilePair[1]);
                        entity.level = level;
                        entity.x = (idx % level.width) * level.blockWidth;
                        entity.y = ~~(idx / level.width) * level.blockHeight;
                        levelEntities.push(entity);
                        break;
                    case "Z":
                        entity = new Zombie();
                        entity.level = level;
                        entity.x = (idx % level.width) * level.blockWidth;
                        entity.y = ~~(idx / level.width) * level.blockHeight;
                        entity.xa = ~~(Math.random() * 8) - 4;
                        entity.ya = ~~(Math.random() * 8) - 4;
                        levelEntities.push(entity);
                        break;
                    case ".":
                        break;
                    default:
                        console.log("Unknown mid:", tilePair[0], tilePair[1]);
                }
               return entity;
            })
            .filter(function(item){
                return item !== null;
            });

    console.log(level.mids);
    
    // Add the entities to the level
    levelEntities.forEach(function(e){
        level.addEntity(e)
    })
    Level.loaded[data.name] = level;
    return level;
};

Level.prototype = {
    init: function(game) {
        this.frame = 0;
        this.game = game;
        this.player = game.player;
        this.blocks = [];
    },
    addEntity: function(e) {
        this.entities.push(e);
        e.level = this;
        if(!e.updatePos){
            console.log(e)
        }
        e.updatePos();
    },
    removeEntityImmediately: function(player) {
        this.entities = this.entities.filter(function(item){
            return item !== player;
        });
        this.getBlock(player.xTileLast, player.yTileLast).removeEntity(player);
    },
    getBlock: function(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return this.solidBlock;
        }
        return this.blocks[x + (y * this.width)];
    },
    tick: function() {
        this.frame++;
        this.entities.forEach(function(e){
            e.tick();
            e.updatePos();
        });
        this.blocks.forEach(function(block){
            block.tick();
        })
    },
    fire: function() {
        var p = this.player;
        this.game.tmpsource.forEach(function(item){
            item.life = 1;
            item.x = p.x;
            item.y = p.y;
            item.rand();
            item.xa += (p.xa * 1.2);
            item.ya += (p.ya * 1.2);
        })
    },
    switchLevel: function(id) {
        this.game.switchLevel(id);
    },
    findSpawn: function(id) {
        var spawn = this.blocks.filter(function(item){
            return item instanceof SpawnBlock && item.id === id;
        })[0];

        this.xSpawn = spawn.x;
        this.ySpawn = spawn.y;
    }
}