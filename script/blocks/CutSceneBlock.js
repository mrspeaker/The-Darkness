function CutSceneBlock(id) {
    this.id = id;
    this.played = false;
}
CutSceneBlock.prototype = new Block;
CutSceneBlock.constructor = CutSceneBlock;
CutSceneBlock.prototype.blocksMotion = false;
CutSceneBlock.prototype.addEntity = function(e) {
    Object.getPrototypeOf(Object.getPrototypeOf(this)).addEntity.apply(this, arguments);
    if(this.played || !(e instanceof Player)) {
        return;
    };
    this.played = true;
    
    this.level.game.screen = new CutSceneScreen(this.id);
};
