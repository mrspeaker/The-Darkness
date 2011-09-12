function Loot(id){
    this.pickedUp = false;
    this.id = id;
};
Loot.prototype = new Entity;
Loot.constructor = Loot;
Loot.prototype.render = function(board) {
    if(!this.pickedUp)
        Art.pickup.draw(board.ctx, this.x + 10, this.y - 10, 0);
}
Loot.prototype.collide = function(e) {
    if(!(e instanceof Player)) {
        return;
    }
    // TODO: Remove it entirely!
    this.pickedUp = true;
    e.gotLoot(this);
}
