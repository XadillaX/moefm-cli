var sprintf = require("sprintf").sprintf;
var color = require("colorful");
var Canvas = require("term-canvas");
var canvas = new Canvas(200, 100);
var ctx = canvas.getContext("2d");

/**
 * Display
 *
 * @param app
 * @constructor
 */
var Display = function(app) {
    this.app = app;
    
    this.headers = [
        "MoeFM CLI Player " + color.red(app.version)
    ];

    this.body = [];
};

Display.prototype.setInit = function() {
    this.body = [
        color.cyan("播放器初始化中...")
    ];

    this.display();
};

Display.prototype.display = function() {
    ctx.clear();
    ctx.save();
    ctx.translate(3, 5);

    var y = 0;

    // headers.
    for(var i = 0; i < this.headers.length; i++) {
        ctx.fillText(this.headers[i], 0, y++);
    }

    // body.
    y++;
    for(var i = 0; i < this.body.length; i++) {
        ctx.fillText(this.body[i], 0, y++);
    }

    ctx.restore();
};

module.exports = Display;

