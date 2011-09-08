function LockedDoorBlock(id) {
    this.id = id;
}
LockedDoorBlock.prototype = new Block;
LockedDoorBlock.constructor = LockedDoorBlock;
LockedDoorBlock.prototype.blocksMotion = true;
LockedDoorBlock.prototype.use = function(e) {
    this.count = 10;
    this.blocksMotion = false;
}
LockedDoorBlock.prototype.tick = function() {
    if(this.count <= 0) {
        return;
    }

    if(--this.count === 0) {
        this.blocksMotion = true;
    }
}
LockedDoorBlock.prototype.render = function(board) {
    if(this.blocksMotion)
        Art.drawTile(board.ctx, Art.tiles, 3, 0, this.x * this.level.blockWidth, this.y * this.level.blockHeight);
};
