function TVBlock(id) {
    this.id = id;
    this.on = false;
}
TVBlock.prototype = new Block;
TVBlock.constructor = TVBlock;
TVBlock.prototype.blocksMotion = false;
TVBlock.prototype.use = function(e) {
    this.setLight(!this.on);
}
TVBlock.prototype.setLight = function(blnOn) {
    this.on = blnOn;
    this.setRadius(this.on ? 2.2 : 0);
};
TVBlock.prototype.render = function(board) {
    Art.drawTile(board.ctx, Art.tiles, 4, 0, this.x * this.level.blockWidth, this.y * this.level.blockHeight);
}
TVBlock.prototype.renderLight = function(light) {
    var ctx = light.ctx;
    if(!this.on) {
        Renderer.drawLightCirc(
            ctx, 
            this.x * this.level.blockWidth + 15, 
            this.y * this.level.blockHeight + 5,
            15);
    } 
    else {
        Renderer.drawLightCirc(ctx, this.x * this.level.blockWidth + 5, this.y * this.level.blockHeight + 10, this.radius * this.level.blockWidth);
    }
}
