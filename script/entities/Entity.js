var c = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 4,
    DOWN: 8,

    UP_LEFT: 5,
    DOWN_LEFT: 9,
    UP_RIGHT: 6,
    DOWN_RIGHT: 10
};

function Entity(){
    this.sprites;
    this.x = 0;
    this.y = 0;
    this.dir = c.DOWN;

    this.xa = 0;
    this.ya = 0;
    
    this.width = 18;
    this.height = 20;

    this.level;
    this.xTile;
    this.yTile;
    this.xTileLast = 0;
    this.yTileLast = 0;
    this.removed = false;
};

Entity.prototype = {
    tick: function(){},
    updatePos: function(){
        this.xTile = Math.floor(this.x / this.level.blockWidth);
        this.yTile = Math.floor(this.y / this.level.blockHeight);
        if(this.xTile !== this.xTileLast || this.yTile !== this.yTileLast) {
            var b = this.level.getBlock(this.xTileLast, this.yTileLast);
            if(!b){
                console.log(this, b, this.xTileLast, this.yTileLast);
            }
            this.level.getBlock(this.xTileLast, this.yTileLast).removeEntity(this);
            this.xTileLast = this.xTile;
            this.yTileLast = this.yTile;    
            if(!this.removed) {
                this.level.getBlock(this.xTile, this.yTile).addEntity(this);
            }
        }
    },
    remove: function() {
        this.level.getBlock(this.xTileLast, this.yTileLast).removeEntity(this);
        this.removed = true;
    },
    move: function() {
        var ok = false;
        // Slow down horizontal movement
        if(this.xa !== 0 && this.ya !== 0) {
            var dd = ((this.xa * this.xa) / this.xSpeed) + ((this.ya * this.ya) / this.ySpeed);
            if(dd > 0) {
                dd = Math.sqrt(dd);
                this.xa /= dd;
                this.ya /= dd;
            }
        }

        // Check x movement
        if(this.xa !== 0){
            if(this.isFree(this.x + this.xa, this.y)){
                this.x += this.xa;
                ok = true;
            }
            else {
                // Work out distnace to wall...
                if (this.xa < 0) {
                    var xx = this.x / this.level.blockWidth;
                    this.xa = -(xx - (Math.floor(xx))) * this.level.blockWidth;
                } else {
                    var xx = (this.x + this.width) / this.level.blockWidth;
                    this.xa = (this.level.blockWidth - (xx - (Math.floor(xx))) * this.level.blockWidth) - 1;
                }
                this.xa = Math.floor(this.xa);
                if (this.xa !== 0 && this.isFree(this.x + this.xa, this.y)) {
                    this.x += this.xa;
                    ok = true;
                }
                //this.xa *= -0.05;
            }
        }
        
        if(this.ya === 0){
            return ok;
        }
        
        // Check y movement
        if(this.isFree(this.x, this.y + this.ya)){
            this.y += this.ya;
            ok = true;
        } 
        else {
            // Work out the distance to wall...
            if (this.ya < 0) {
                var yy = this.y / this.level.blockHeight;
                this.ya = -(yy - (Math.floor(yy))) * 10;
            } 
            else {
                var yy = (this.y + this.height) / this.level.blockHeight;
                this.ya = (this.level.blockHeight - (yy - (Math.floor(yy))) * this.level.blockHeight) - 1;
            }
            this.ya = Math.floor(this.ya);

            if(this.ya !== 0 && this.isFree(this.x, this.y + this.ya)) {
                this.y += this.ya;
                ok = true;
            }
            //this.ya *= -0.05;
        }
        return ok;
    },
    isFree: function(xx, yy) {
        var x0 = Math.floor(xx / this.level.blockWidth),
            x1 = Math.floor((xx + this.width) / this.level.blockWidth),
            y0 = Math.floor(yy / this.level.blockHeight),
            y1 = Math.floor((yy + this.height) / this.level.blockHeight);

        var block, blocks = [];
        if ((block = this.level.getBlock(x0, y0)).blocks(this)) return false;
        blocks.push(block);
        
        if (x0 !== x1) {
            if((block = this.level.getBlock(x1, y0)).blocks(this)) return false;
            blocks.push(block);
        }
        
        if(y0 !== y1) {
            if((block = this.level.getBlock(x0, y1)).blocks(this)) return false;
            blocks.push(block);
        }
        
        if(x0 !== x1 && y0 !== y1) {
            if ((block = this.level.getBlock(x1, y1)).blocks(this)) return false;
            blocks.push(block);
        }

        var _this = this;
        blocks.forEach(function(block) {
            block.entities.forEach(function(entity){
                if(entity === _this) return;

                if(!(_this.intersects(_this.x, _this.y, entity)) &&
                    _this.intersects(xx, yy, entity)) {
                        // Why not hit 4 times? (2 per ent)
                        entity.collide(_this);
                        _this.collide(entity);
                }
            });
        });
        return true;
    },
    collide: function() {},
    blocks: function() {

    },
    contains: function() {},
    isInside: function() {},
    use: function(e, item) {
        return false;
    },
    render: function(ctx) {},
    renderLight: function(ctx) {},
    intersects: function(x, y, e2) {
        return !(
            e2.x > x + this.width ||
            e2.x + e2.width < x ||
            e2.y > y + this.height ||
            e2.y + e2.height < y);
    }
}