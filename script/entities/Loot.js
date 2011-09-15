function Loot(id){
    this.id = id;
};

pickupable.call(
    Loot.prototype = new Entity
);


Loot.constructor = Loot;
Loot.prototype.render = function(board) {
    if(!this.isPickedUp())
        Art.pickup.draw(board.ctx, this.x + 10, this.y - 10, 0);
}
Loot.prototype.collide = function(e) {
    if(!(e instanceof Player)) {
        return;
    }
    // TODO: Remove it entirely!
    this.pickUp(e);
}
