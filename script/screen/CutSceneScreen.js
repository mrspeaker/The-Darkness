function CutSceneScreen(id){
    this.frame = 0;
    this.id = id;
};
CutSceneScreen.prototype = new Screen;
CutSceneScreen.constructor = CutSceneScreen;

CutSceneScreen.prototype.tick = function(game, input) {
    if(this.frame++ < 10){
        return;
    };

    if(this.isRemoved){
        game.screen = null;
        return false;
    }

    this.frame > 50 && this.remove();
    input.keys[Input.SPACE] === "newpress" && this.remove();
}
CutSceneScreen.prototype.render = function(screen) {
    var ctx = screen.ctx;
    ctx.clearRect(0, 0, screen.w, screen.h);
    if(this.isRemoved) {
        return false;
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, screen.w, screen.h);

    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(40, 40, screen.w - 80, screen.h - 80);

    ctx.fillStyle = Art.colours.title;
    ctx.font = Art.fonts.h1;
    ctx.fillText("The zombiieiies... ", 250 + (Math.sin(this.frame)), 190 + (Math.cos(this.frame * 100)));

    Art.mummy.draw(ctx, 10, 20, null, null, (Math.sin(this.frame) * (Math.PI / 180) * 2));
}
