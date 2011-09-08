function SolidBlock(type) {
    this.type = type;
}
SolidBlock.prototype = new Block;
SolidBlock.constructor = SolidBlock;
SolidBlock.prototype.blocksMotion = true;
SolidBlock.prototype.render = function(canvas) {
    var w = this.level.blockWidth,
        h = this.level.blockHeight,
        frame = 0;
    if(this.type == "w") frame = 2;
    Art.drawTile(canvas.ctx, Art.tiles, frame, 0, this.x * w, this.y * h - 8);
};
