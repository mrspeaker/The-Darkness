var Art = {
    init: function() {
        this.main = new SpriteSheet("res/main.png", 18, 24, 5, 5);
        this.tiles = new SpriteSheet("res/brix2.png", 32, 48, 5, 5);
        this.player = new Sprite(this.main, 0, 0);
        this.pickup = new Sprite(this.main, 4, 0);
        this.mummy = new ArtImage("res/mummy.png");
        
        
        this.fonts = {
            base: " fantasy, cursive, serif"
        };
        var fonts = {
            h1: "bold 24pt",
            h2: "bold 18pt",
            h3: "16pt",
            h4: "13pt",
            normal: "12pt" 
        }
        this.colours = {
            title: "#ccc"
        }
        for(var font in fonts) {
            this.fonts[font] = fonts[font] + this.fonts.base;
        }
    },
    drawTile: function(ctx, ss, xTile, yTile, x, y) {
        ctx.drawImage(ss.image,
            (xTile * ss.width) + ss.xOff,
            (yTile * ss.height) + ss.yOff,
            ss.width,
            ss.height,
            x,
            y - 8,
            ss.width,
            ss.height);
    }
}

function ArtImage(path) {
    this.image = new Image();
    this.image.src = path;
    this.draw = function(ctx, x, y, scaleX, scaleY, rot) {
        ctx.save();
        ctx.translate(x, y);
        if(scaleX) ctx.translate(scaleX, scaleY);
        if(rot) ctx.rotate(rot);
        ctx.drawImage(this.image, x, y);
        ctx.restore();
    }
}

function SpriteSheet(imageName, w, h, framesX, framesY, xOff, yOff, xSpace, ySpace) {
    this.imageName = imageName;
    this.width = w;
    this.height = h;
    this.framesX = framesX;
    this.framesY = framesY;
    this.xOff = xOff || 0;
    this.yOff = yOff || 0;
    this.xSpace = xSpace || 0;
    this.ySpace = ySpace || 0;
    
    this.image = new Image();
    this.image.src = imageName;
}

function Sprite(ss, startXFrame, startYFrame) {
    this.startXFrame = startXFrame;
    this.startYFrame = startYFrame;
    this.image = ss.image;
    this.width = ss.width;
    this.height = ss.height;
    this.xOff = ss.xOff;
    this.yOff = ss.yOff;
    this.xOffset = ss.width + ss.xSpace;
    this.yOffset = startYFrame * (ss.height + ss.ySpace);
}

Sprite.prototype = {
    draw: function(ctx, x,  y, frame) {
        ctx.save();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 7;
        ctx.shadowColor = "#ff0";
        
        ctx.drawImage(this.image,
            (this.width * (frame + this.startXFrame)),
            this.yOffset + this.yOff,
            this.width,
            this.height,
            x,
            y,
            this.width,
            this.height);
        ctx.restore();
    }
}