function LightParticle() {
    this.particles = [];
    this.running = false;
    this.source = null;
}

LightParticle.prototype = {
    init: function(num, light, source) {
        this.source = source;
        for(var i = 0; i < num; i++) {
            var l = new light(i);
            l.init(this, this.deadParticle);
            l.x = source.x;
            l.y = source.y;
            l.life = Math.random();
            l.rand();
            source.level.addEntity(l);
            this.particles.push(l);
        }
    },
    deadParticle: function(idx) {
        var l = this.particles[idx];
        l.x = this.source.x;
        l.y = this.source.y;
        l.life = Math.random();
        l.running = true;
        l.rand();
    },
    tick: function() {
        if(this.running) {
            this.particles.forEach(function(p){
                console.log("ah.");
            });
        }
    },
    start: function() {
        this.running = true;
    },
    stop: function() {
        this.running = false;
    }
};
