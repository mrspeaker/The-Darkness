function LockedDoorBlock(id) {
    this.id = id;
    this.open = false;
}
LockedDoorBlock.prototype = new Block;
LockedDoorBlock.constructor = LockedDoorBlock;
LockedDoorBlock.prototype.blocksMotion = true;
LockedDoorBlock.prototype.use = function(e) {
    this.open = !this.open;
    this.blocksMotion = false;
}
LockedDoorBlock.prototype.render = function(board) {
    if(!this.open)
    Art.drawTile(board.ctx, Art.tiles, 3, 0, this.x * this.level.blockWidth, this.y * this.level.blockHeight);
};
