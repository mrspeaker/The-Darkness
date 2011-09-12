function ExitBlock(id) {
    this.id = id;
}
ExitBlock.prototype = new Block;
ExitBlock.constructor = ExitBlock;
ExitBlock.prototype.col = "#282";
ExitBlock.prototype.blocksMotion = false;
ExitBlock.prototype.addEntity = function(e) {
    Block.prototype.addEntity.call(this, arguments);
    if(!(e instanceof Player)) {
        return;
    };
    this.level.switchLevel(this.id);
};
ExitBlock.prototype.renderLight = function(light) {
    var ctx = light.ctx;
    Renderer.drawLightCirc(ctx, this.x * this.level.blockWidth + 10, this.y * this.level.blockHeight + 10, 10);
}
