function TriggerBlock(id, horiz) {
    this.id = id;
    this.on = false;
    this.horiz = horiz;
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
    ctx.fillStyle = "#494";
    if(!this.horiz)
        ctx.fillRect(
            this.x * this.level.blockWidth,
            this.y * this.level.blockHeight + 9,
            this.level.blockWidth,
            4)
    else
        ctx.fillRect(
            this.x * this.level.blockWidth + 14,
            this.y * this.level.blockHeight,
            4,
            this.level.blockHeight)

};
TriggerBlock.prototype.renderLight = function(light) {
    var ctx = light.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    if(this.horiz)
        ctx.fillRect(this.x * this.level.blockWidth + 15, this.y * this.level.blockHeight, 2, this.level.blockHeight);
    else
        ctx.fillRect(this.x * this.level.blockWidth,this.y * this.level.blockHeight + 10, this.level.blockWidth,2);
   /*
    if(!this.on) {
           Screen.drawLightCirc(ctx, this.x * this.level.blockWidth + 30, this.y * this.level.blockHeight + 10, 10);
           return;
       }
       Screen.drawLightCirc(ctx, this.x * this.level.blockWidth + 30, this.y * this.level.blockHeight + 10, 10);*/
   
}
