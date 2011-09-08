function Menu() {
    this.isRemoved = false;
}
Menu.prototype = {
    render: function(ctx) {},
    tick: function(input) {},
    remove: function(){
        this.isRemoved = true;
    }
}