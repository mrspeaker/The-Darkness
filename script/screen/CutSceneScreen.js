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
    
    ctx.fillStyle = "rgb(0,0,100)";
    ctx.fillRect(40, 40, screen.w-80, screen.h-80);
    
    ctx.fillStyle = "#888";
    ctx.font = "bold 16pt helvetica";
    ctx.fillText("cutscene " + this.id, 200 + (Math.sin(this.frame * 30) * 120), 220 + (Math.cos(this.frame * 30) * 120));
}
