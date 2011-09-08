/*
    Important bits:
    
    Comp.init -> sets up game, screen and timing.
        game.reset ->
        comp.run ->
    Comp.run -> loops game.tick & screen.render
        game.tick -> update things
            player.ticka ->
            level.tick ->
                all entities.tick ->
                all entities.updatePos ->
        screen.render -> renders the game
            all tiles.render ->
            all entities.render ->
            if menu, menu.render ->
*/
var Component = {
    
    running: false,
    SPEED: 50,
    
    game: null,
    screen: null,
    input: null,

    init: function(){
        this.game = new Game()
        this.game.init();
        
        this.screen = new Screen();
        this.screen.init();
        
        this.input = new Input();
        this.input.init();
        
        this.game.reset(); // Should be called from menu
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
        this.screen.render(this.game);
    }
};
