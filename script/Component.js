/*
    Important bits:
    
    Comp.init -> sets up game, screen and timing.
        game.reset ->
        comp.run ->
    Comp.run -> loops game.tick & renderer.render
        game.tick -> update things
            player.ticka ->
            level.tick ->
                all entities.tick ->
                all entities.updatePos ->
        renderer.render -> renders the game
            all tiles.render ->
            all entities.render ->
            if screen, screen.render ->
*/
var Component = {
    
    running: false,
    SPEED: 50,
    
    game: null,
    renderer: null,
    input: null,

    init: function(){
        this.game = new Game()
        this.game.init();
        
        this.renderer = new Renderer();
        this.renderer.init();
        
        this.input = new Input();
        this.input.init();
        
        this.game.reset(); // Should be called from screen
        this.start();
    },
    
    start: function() {
        if (this.running) return;
        this.running = true;
        this.run();
    },
    
    stop: function() {
        if (!this.running) return;
        this.running = false;
    },
    
    run: function() {
        if(!this.running) {
            return;
        }
        setTimeout(function(){
            Component.tick();
            Component.render();
            Component.run();
        }, this.SPEED);
    },
    
    tick: function(){
        this.game.tick(this.input);
    },
    
    render: function(){
        this.renderer.render(this.game);
    }
};
