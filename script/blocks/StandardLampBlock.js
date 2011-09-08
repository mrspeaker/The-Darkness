function StandardLampBlock(id) {
    this.id = id;
    this.on = false;
}
StandardLampBlock.prototype = new Block;
StandardLampBlock.constructor = StandardLampBlock;
StandardLampBlock.prototype.blocksMotion = false;
StandardLampBlock.prototype.use = function(e) {
    this.on = !this.on;
}
StandardLampBlock.prototype.renderLight = function(light) {
    var ctx = light.ctx;
    if(this.on) {
        Screen.drawLightCirc(ctx, this.x * this.level.blockWidth + 20, this.y * this.level.blockHeight + 10, 60);
    } 
}
