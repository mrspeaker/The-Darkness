function ExitBlock(dir) {
    this.dir = dir;
}
ExitBlock.prototype = new Block;
ExitBlock.constructor = ExitBlock;
ExitBlock.prototype.col = "#282";
ExitBlock.prototype.blocksMotion = false;
ExitBlock.prototype.collide = function(e) {
    alert("exiz");
}
ExitBlock.prototype.renderLight = function(light) {
    var ctx = light.ctx;
    Renderer.drawLightCirc(ctx, this.x * this.level.blockWidth + 10, this.y * this.level.blockHeight + 10, 10);
    
}
