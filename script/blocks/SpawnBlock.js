function SpawnBlock(id) {
    this.id = id;
}
SpawnBlock.prototype = new Block;
SpawnBlock.constructor = SpawnBlock;
SpawnBlock.prototype.blocksMotion = false;

