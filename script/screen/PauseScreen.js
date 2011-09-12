function PauseScreen(){
    this.frame = 0;
};
PauseScreen.prototype = new Screen;
PauseScreen.constructor = PauseScreen;

PauseScreen.prototype.tick = function(game, input) {
    if(this.frame++ < 10){
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
PauseScreen.prototype.render = function(screen) {
    var ctx = screen.ctx;
    ctx.clearRect(0, 0, screen.w, screen.h);
    if(this.isRemoved) {
        return false;
    }
    
    ctx.fillStyle = "rgba(100, 0,0, 0.5)";
    ctx.fillRect(0, 0, screen.w, screen.h);

}
