function Input() {
    this.keys = {};
}
Input.UP = "38";
Input.DOWN = "40";
Input.LEFT = "37";
Input.RIGHT = "39";
Input.SPACE = "32";
Input.CTRL =  "17";
Input.Z = "90";
Input.prototype = {
    init: function() {
        var _this = this;
        document.addEventListener("keydown", function(e) {
             var cur = _this.keys["" + e.keyCode];
            if(cur === undefined) {
                cur = "realup";
            }
            if(cur !== "realup") {
                return
            }
            _this.keys["" + e.keyCode] = "newpress";
        }, false);
        document.addEventListener("keyup", function(e) {
            _this.keys["" + e.keyCode] = "realup";
        }, false);
        
    }
}