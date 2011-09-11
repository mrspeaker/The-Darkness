function Item(id){
    this.pickedUp = false;
    this.id = id;
};
Item.prototype = new Entity;
Item.constructor = Item;
Item.prototype.render = function(board) {
    if(!this.pickedUp)
        Art.pickup.draw(board.ctx, this.x + 10, this.y - 10, 0);
}
Item.prototype.collide = function(e) {
    if(!(e instanceof Player)) {
        return
    }
    this.pickedUp = true;
}
