function Game() {
    this.level;
    this.menu;
    this.player;
    this.tmpsource = [];
    this.pauseTime;
}

Game.prototype = {
    init: function() {
        Art.init();
    },

    tick: function(keys) {
        if (this.pauseTime > 0) {
            this.pauseTime--;
            return;
        }
        if (this.menu != null) {
            this.menu.tick(this, keys);
            return;
        }
        this.player.ticka(keys);
        this.level.tick();
    },

    reset: function() {
        this.level = Level.loadLevel(this, "a");

        this.player = new Player();
        this.player.level = this.level;
        this.level.player = this.player;

        this.level.findSpawn("a");
        this.player.x = this.level.xSpawn * this.level.blockWidth;
        this.player.y = this.level.ySpawn * this.level.blockHeight;

        this.level.addEntity(this.player);

        // Messsin' round - some roving light
        for(var i = 0; i < 20; i++) {
            var b = new LightSource();
            b.level = this.level;
            b.x = 180;
            b.y = 140;
            b.life = 0;
            this.tmpsource.push(b);
            this.level.addEntity(b);
        }
    },

    switchLevel: function(id) {
        this.pauseTime = 10;
        this.level.removeEntityImmediately(this.player);
        this.level = Level.loadLevel(this, id);

        this.level.findSpawn(id);
        this.player.x = this.level.xSpawn * this.level.blockWidth;
        this.player.y = this.level.ySpawn * this.level.blockHeight;

        this.level.addEntity(this.player);
    },

    clearMenu: function() {
        this.menu = null;
    }
}