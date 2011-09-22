function Block(id) {
    this.blocksMotion = false;
    this.sprites = [];
    this.entities = [];
    this.col = null;
    this.level;
    this.x;
    this.y;
    this.id = id;
    this.radius = 0;
}
Block.prototype = {
    init: function(level, x, y) {
        this.level = level;
        this.x = x;
        this.y = y;
        this.entities = [];
        this.sprites = [];
    },
    tick: function() {},
    blocks: function() {
        return this.blocksMotion;
    },
    use: function(e) {},
    addEntity: function(e) {
        if(this.entities.some(function(item){ return item === e; })){
            return;
        }
        this.entities.push(e);
    },
    removeEntity: function(e) {
        this.entities = this.entities.filter(function(item){
            return e !== item;
        });
    },
    render: function(canvas) {
        var w = this.level.blockWidth,
            h = this.level.blockHeight;
        
        if(this.id === -1) { return; }

        if(!this.col) {
           Art.drawTile(canvas.ctx, Art.tiles, 1, 0, this.x * w, this.y * h);
           return;
       }
        canvas.ctx.fillStyle = this.col;
        canvas.ctx.fillRect(this.x * w, this.y * h, w, h);
    },
    renderLight: function(light) {},
    setLight: function(blnOn) {
        this.on = blnOn;
    },
    setRadius: function(radius) {
        if(radius === 0) {
            this.radius = 0;
            this.level.removeLight(this);
            return;
        }
        this.radius = radius;
        this.level.addLight(this);
    },
    getLight: function() {
        var _this = this,
            width = this.level.blockWidth,
            height = this.level.blockHeight;
        return this.level.lights.reduce(function(acc, e) {
            // Hack to handle blocks and entities togehter
            var x = e.xTile ? e.x : e.x * width,
                y = e.yTile ? e.y : e.y * height,
                xd = (_this.x * width) - x,
                yd = (_this.y * width) - y,
                dist = Math.sqrt(xd * xd + yd * yd) / width,
                light = 0;
            light = e.radius > 0 && e.radius - dist > 0 ? 1 : 0
            return acc + light;
        }, 0);
    }
}