function Screen() {
    this.isRemoved = false;
}
Screen.prototype = {
    render: function(ctx) {},
    tick: function(input) {},
    remove: function(){
        this.isRemoved = true;
    }
}