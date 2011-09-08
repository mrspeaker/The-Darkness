function Block(id) {
    this.blocksMotion = false;
    this.sprites = [];
    this.entities = [];
    this.col = null;
    this.level;
    this.x;
    this.y;
    this.id = id;
    if(this.id === -1){
        //this.col = "#799"
    }
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
    renderLight: function(light) {}
}