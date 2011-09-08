function TitleMenu(){
    this.frame = 0;
};
TitleMenu.prototype = new Menu;
TitleMenu.constructor = TitleMenu;

TitleMenu.prototype.tick = function(game, input) {
    this.frame++;
    if(this.isRemoved){
        game.menu = null;
        return false;
    }
    if(input.keys[Input.SPACE] === "newpress") {
        this.remove();
    }
}
TitleMenu.prototype.render = function(menu) {
    var ctx = menu.ctx;
    if(this.isRemoved) {
        ctx.clearRect(0, 0, menu.w, menu.h);
        return false;
    }
    var rn = function(up){ return ~~(Math.random() * up)};
    ctx.fillStyle = "rgba(100, 0,0, 0.5)";
    ctx.fillRect(rn(menu.w), rn(menu.h), 30, 30);

}
