function TitleScreen(){
    this.frame = 0;
};
TitleScreen.prototype = new Screen;
TitleScreen.constructor = TitleScreen;
TitleScreen.prototype.tick = function(game, input) {
    if(this.frame++ < 20){
        return;
    }
    if(this.isRemoved){
        game.screen = null;
        return false;
    }
    if(input.keys[Input.SPACE] === "newpress") {
        this.remove();
    }
};

TitleScreen.prototype.render = function(screen) {
    var ctx = screen.ctx;
    if(this.isRemoved) {
        ctx.clearRect(0, 0, screen.w, screen.h);
        return false;
    }
    ctx.clearRect(0, 0, screen.w, screen.h);

    ctx.fillStyle = "rgba(0, 0,0, 0.6)";
    ctx.fillRect(0, 0, screen.w, screen.h);

    ctx.fillStyle = Art.colours.title;
    ctx.font = Art.fonts.h2;
    ctx.fillText("The DARKNESS", 200, 220);

    ctx.font = Art.fonts.normal;
    ctx.fillText("arrows to move", 200, 280);
    ctx.fillText("space to interact", 200, 300);
    ctx.fillText("z to light up", 200, 320);

    Art.mummy.draw(ctx, screen.w - 380, screen.h - 260, null, null, null);
};