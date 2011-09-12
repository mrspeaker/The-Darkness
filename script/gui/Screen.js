function Screen() {
    this.width;
    this.height;

}
Screen.drawLightCirc = function(ctx, x, y, rad, alf) {
    var light = ctx.createRadialGradient(x, y, 0, x, y, rad);
    light.addColorStop(0, 'rgba(255,180,0,' + (alf || "0.8") + ')');
    light.addColorStop(1, 'rgba(255,150,0,0)');

    // draw shapes
    ctx.fillStyle = light;
    ctx.fillRect(x - rad, y - rad, x + rad, y + rad);
};

Screen.drawLightLine = function(ctx, x, y, x2, y2, col) {
    var light = ctx.createRadialGradient(x, y, 0, x, y, rad);
    light.addColorStop(0, 'rgba(255,180,0,' + (alf || "0.8") + ')');
    light.addColorStop(1, 'rgba(255,150,0,0)');

    // draw shapes
    ctx.fillStyle = light;
    ctx.fillRect(x - rad, y - rad, x + rad, y + rad);
};

Screen.prototype = {
    init: function() {
        // set up ctxs
        var board = {};
        board.ctx = document.getElementById("board").getContext("2d");
        board.w = board.ctx.canvas.width;
        board.h = board.ctx.canvas.height;

        var light = {};
        light.ctx = document.getElementById("light").getContext("2d");
        light.w = light.ctx.canvas.width;
        light.h = light.ctx.canvas.height;

        var menu = {};
        menu.ctx = document.getElementById("menu").getContext("2d");
        menu.w = menu.ctx.canvas.width;
        menu.h = menu.ctx.canvas.height;

        this.board = board;
        this.light = light;
        this.menu = menu;
        this.bc = board.ctx;
        this.lc = light.ctx;
        this.mc = menu.ctx;

    },
    draw: function() {

    },
    render: function(game) {
        // Render level
        var level = game.level,
            canvas = this.board;

        this.bc.clearRect(0, 0, this.board.w, this.board.h);

        // Render the base
        for(var y = 0; y < level.height; y++) {
            var blocks = [];
            for (var x = 0; x < level.width; x++) {
                var block = level.blocks[x + (y * level.width)];
                if(block.blocksMotion) {
                    blocks.push(block);
                }
                else {
                    // Render walkable tiles underneath entities
                    block.render(canvas);
                }
                // Render block entities
                block.entities.forEach(function(e){
                    e.render && e.render(canvas);
                });
            };
            
            // Render the solid blocks (so it overlaps entities)
            blocks.forEach(function(e){
                e.render(canvas);
            });
        }

        game.gui.health.innerHTML = game.player.health;
        game.gui.score.innerHTML = game.player.score;
        
        // Render the lights
        this.lc.globalCompositeOperation = "source-over";
        this.lc.fillStyle = "#000";
        this.lc.fillRect(0, 0, this.light.w, this.light.h);

        this.lc.globalCompositeOperation = "destination-out";

        canvas = this.light;
        level.blocks.forEach(function(e) {
            e.renderLight(canvas);
        });

        level.entities.forEach(function(e) {
            e.renderLight(canvas);
        });

        if(game.menu) {
            game.menu.render(this.menu);
        }

    }
};