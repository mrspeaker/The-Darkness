function ThingBlock() {};
ThingBlock.prototype = new Block;
ThingBlock.constructor = ThingBlock;

ThingBlock.prototype.blocksMotion = false;
ThingBlock.prototype.render = function(board) {
    var w = this.level.blockWidth,
        h = this.level.blockHeight;
    board.ctx.font = "bold 22px monospace";
    board.ctx.fillStyle = "#244";
    board.ctx.fillText(
        String.fromCharCode(parseInt("2794", 16)),
        this.x * w + 4, this.y * h + 21);
};