function TVSource(id){
    this.id = id;
    this.particle = null;
};
TVSource.prototype = new Entity;
TVSource.constructor = TVSource;

carryable.call(TVSource.prototype, function(e){
    this.setRadius(2);
}, function(e){
    this.setRadius(0);
});

TVSource.prototype.init = function(board) {
    this.particle = new LightParticle();
    this.particle.init(5, Particle, this);
}
TVSource.prototype.tick = function() {
    //this.particle.tick();
}
TVSource.prototype.render = function(board) {
    this.carryTick(2, -12);
    Art.pickup.draw(board.ctx, this.x + 10, this.y - 10, 1);
}
TVSource.prototype.renderLight = function(light) {
    if(!this.carriedBy) return;
    var ctx = light.ctx;
    Renderer.drawLightCirc(ctx, this.x + 8, this.y - 8,  Math.floor(this.radius * this.level.blockWidth));
}
TVSource.prototype.use = function(e) {
    if(!(e instanceof Player)) {
        return;
    }
    this.carry(e);
}

