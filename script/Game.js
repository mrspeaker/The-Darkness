function Game() {
    this.level;
    this.screen;
    this.player;
    this.pauseTime;
}

Game.prototype = {
    init: function() {
        Art.init();
        this.guiInit();
    },
    
    guiInit: function() {
        this.gui = {};
        this.gui.health = document.getElementById("health");
        this.gui.score = document.getElementById("score");
    },

    tick: function(keys) {
        if (this.pauseTime > 0) {
            this.pauseTime--;
            return;
        }
        if (this.screen != null) {
            this.screen.tick(this, keys);
            return;
        }
        this.player.ticka(keys);
        this.level.tick();
    },

    reset: function() {
        this.screen = new TitleScreen();
        Level.loaded = {};
        this.level = Level.loadLevel(this, "a");

        this.player = new Player();
        this.player.level = this.level;
        this.level.player = this.player;

        this.level.findSpawn("a");
        this.player.x = this.level.xSpawn * this.level.blockWidth;
        this.player.y = this.level.ySpawn * this.level.blockHeight;

        this.level.addEntity(this.player);
    },

    switchLevel: function(id) {
        this.pauseTime = 10;
        
        var carryOverEntities = [this.player],
            _this = this;
        this.player.carrying && carryOverEntities.push(this.player.carrying)
        carryOverEntities.forEach(function(e){
            _this.level.removeEntityImmediately(e);
        });

        this.level = Level.loadLevel(this, id);
        this.level.findSpawn(id);
        
        carryOverEntities.forEach(function(e){
            e.x = _this.level.xSpawn * _this.level.blockWidth;
            e.y = _this.level.ySpawn * _this.level.blockHeight;

            _this.level.addEntity(e);
        });
    },

    clearScreen: function() {
        this.screen = null;
    }
}