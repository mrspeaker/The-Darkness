function TVSource(id){
    this.id = id;
};
TVSource.prototype = new Entity;
TVSource.constructor = TVSource;

carryable.call(TVSource.prototype);

TVSource.prototype.render = function(board) {
    this.carryTick(2, -12);
    Art.pickup.draw(board.ctx, this.x + 10, this.y - 10, 1);
}
TVSource.prototype.renderLight = function(light) {
    if(!this.carriedBy) return;
    var ctx = light.ctx;
    Renderer.drawLightCirc(ctx, this.x + 8, this.y - 8, 60);
}
TVSource.prototype.use = function(e) {
    if(!(e instanceof Player)) {
        return;
    }
    this.carry(e);
}
