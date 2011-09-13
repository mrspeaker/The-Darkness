function TitleScreen(){
    this.frame = 0;
};
TitleScreen.prototype = new Screen;
TitleScreen.constructor = TitleScreen;

TitleScreen.prototype.tick = function(game, input) {
    if(this.frame++ < 20){
        return;
    };
    
    if(this.isRemoved){
        game.screen = null;
        return false;
    }
    if(input.keys[Input.SPACE] === "newpress") {
        this.remove();
    }
}
TitleScreen.prototype.render = function(screen) {
    var ctx = screen.ctx;
    if(this.isRemoved) {
        ctx.clearRect(0, 0, screen.w, screen.h);
        return false;
    }
    ctx.clearRect(0, 0, screen.w, screen.h);
            
    ctx.fillStyle = "rgba(100, 0,0, 0.6)";
    ctx.fillRect(0, 0, screen.w, screen.h);
    
    ctx.fillStyle = "#888";
    ctx.font = "bold 16pt helvetica";
    ctx.fillText("The TITLE SCREEN", 200, 220);

}
