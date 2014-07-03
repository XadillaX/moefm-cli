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
        "MoeFM CLI Player v" + color.red(app.version)
    ];

    this.body = [];

    this.auto = null;

    // 各种 timer
    this.initTimer = null;
};

Display.prototype.autoRefresh = function() {
    this.stopAutoRefresh();
    var self = this;
    this.auto = setInterval(this.display.bind(self), 20);
};

Display.prototype.stopAutoRefresh = function() {
    if(null !== this.auto) {
        clearInterval(this.auto);
        this.auto = null;
    }
};

Display.prototype.setInit = function() {
    var self = this;

    this.body = [
        color.cyan("播放器初始化中...-")
    ];

    var textArray = [
        "播放器初始化中...-",
        "播放器初始化中...\\",
        "播放器初始化中...|",
        "播放器初始化中.../"
    ];
    var dictIdx = 0;
    this.initTimer = setInterval(function() {
        dictIdx = (dictIdx + 1) % 4;
        self.body = [
            color.cyan(textArray[dictIdx])
        ];
    }, 100);

    this.display();
};

Display.prototype.initDone = function() {
    //this.stopAutoRefresh();
    if(this.initTimer) {
        clearInterval(this.initTimer);
        this.initTimer = null;
    }
};

Display.prototype.showError = function(text) {
    this.body = [
        color.red(text)
    ];

    this.display();
}

Display.prototype.clear = function() {
    ctx.reset();
};

Display.prototype.display = function() {
    ctx.clear();
    ctx.save();
    ctx.translate(5, 3);

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

