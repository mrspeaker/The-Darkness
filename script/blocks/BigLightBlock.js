function BigLightBlock(id) {
    this.id = id;
    this.on = false;
}
BigLightBlock.prototype = new Block;
BigLightBlock.constructor = BigLightBlock;
BigLightBlock.prototype.col = "#355";
BigLightBlock.prototype.blocksMotion = false;
BigLightBlock.prototype.use = function(e) {
    this.on = !this.on;
};
BigLightBlock.prototype.renderLight = function(light) {
    var ctx = light.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(
        this.x * this.level.blockWidth, 
        this.y * this.level.blockHeight,
        this.level.blockWidth * 5,
        this.level.blockHeight * 4);
};
