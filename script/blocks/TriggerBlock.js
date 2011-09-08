function TriggerBlock(id) {
    this.id = id;
    this.on = false;
}
TriggerBlock.prototype = new Block;
TriggerBlock.constructor = TriggerBlock;
TriggerBlock.prototype.blocksMotion = false;
TriggerBlock.prototype.use = function(e) {
    var _this = this,
        triggees = this.level.blocks.filter(function(item){
            return (item instanceof TVBlock || item instanceof StandardLampBlock) && item.id === _this.id;
        });

    this.on = !this.on;
    triggees.forEach(function(item){
        item.on = _this.on;
    });
}
TriggerBlock.prototype.addEntity = function(e) {
    Object.getPrototypeOf(Object.getPrototypeOf(this)).addEntity.apply(this, arguments);
    if(!(e instanceof Player)) {
        return;
    };
    this.use();
};
TriggerBlock.prototype.render = function(board) {
    var ctx = board.ctx;
    ctx.fillStyle = "#977";
    ctx.fillRect(
        this.x * this.level.blockWidth + 10,
        this.y * this.level.blockHeight + 10,
        10,
        10)
};
TriggerBlock.prototype.renderLight = function(light) {
    var ctx = light.ctx;
    if(!this.on) {
        Screen.drawLightCirc(ctx, this.x * this.level.blockWidth + 20, this.y * this.level.blockHeight + 10, 10);
        return;
    }
    Screen.drawLightCirc(ctx, this.x * this.level.blockWidth + 20, this.y * this.level.blockHeight + 10, 5);
}
