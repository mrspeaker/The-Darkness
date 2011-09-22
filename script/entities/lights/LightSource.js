function LightSource(id){
    this.xa = 3;
    this.ya = 3;
    this.life = 1;
    this.running = true;
    this.ctx = null;
    this.callback = null;
    this.id = id;
}

LightSource.prototype = new Entity;
LightSource.constructor = LightSource;
LightSource.prototype.init = function(ctx, callback) {
    this.ctx = ctx;
    this.callback = callback;
}
LightSource.prototype.tick = function() {
    if(!this.running) return;

    this.life -= 0.03
    if(this.life < 0) {
        this.running = false;
        this.callback.call(this.ctx, this.id);
    };
    
    if(!this.move() || Math.random() < 0.01){
        this.rand();
    }
}
LightSource.prototype.rand = function() {
    this.xa = Math.floor(Math.random() * 8) - 4;
    this.ya = Math.floor(Math.random() * 8) - 4;

    while(this.xa == 0 && this.ya == 0) {
        this.xa = Math.floor(Math.random() * 6) - 3;
        this.ya = Math.floor(Math.random() * 6) - 3;
    }
}
LightSource.prototype.renderLight = function(light) {
    if(!this.running) return;
    var ctx = light.ctx;
    var flux = Math.floor((Math.cos(this.level.frame / 2) * 2)) + 2;

    Renderer.drawLightCirc(ctx, this.x + 10, this.y + 10, 35 + flux, this.life);
}

