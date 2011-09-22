function Particle(id){
    this.xa = 3;
    this.ya = 3;
    this.life = 1;
    this.running = true;
    this.ctx = null;
    this.callback = null;
    this.id = id;
}

Particle.prototype = new Entity;
Particle.constructor = Particle;
Particle.prototype.init = function(ctx, callback) {
    this.ctx = ctx;
    this.callback = callback;
}
Particle.prototype.tick = function() {
    if(!this.running) return;

    this.life -= 0.03
    if(this.life < 0) {
        this.running = false;
        this.callback.call(this.ctx, this.id);
    };
    
    this.x += this.xa;
    this.y += this.ya;
    if(Math.random() < 0.01){
        this.rand();
    }
}
Particle.prototype.rand = function() {
    this.xa = Math.floor(Math.random() * 2) - 1;
    this.ya = Math.floor(Math.random() * 2) - 1;

    while(this.xa == 0 && this.ya == 0) {
        this.xa = Math.floor(Math.random() * 2) - 1;
        this.ya = Math.floor(Math.random() * 2) - 1;
    }
}
Particle.prototype.renderLight = function(light) {
    if(!this.running) return;
    var ctx = light.ctx;
    var flux = Math.floor((Math.cos(this.level.frame / 2) * 2)) + 2;

    Renderer.drawLightCirc(ctx, this.x + 20, this.y, 15 + flux, this.life);
}

