var Api = require("./api");
var Display = require("./display");
require("keypress")(process.stdin);

/**
 * Moe
 *
 * @constructor
 */
var Moe = function() {
    this.version = "0.0.1";

    this.api = new Api();
    this.list = [];
    this.currentCursor = 0;

    this.display = new Display(this);
    this.status = 0;
};

Moe.prototype.onKeyPress = function(ch, key) {
    // quit
    if(ch === 'q') {
        this.display.clear();
        process.stdin.pause();
        process.exit();
    }
};

/**
 * run this application
 *
 * @return
 */
Moe.prototype.run = function() {
    var self = this;

    // keypress
    process.stdin.on("keypress", this.onKeyPress.bind(this));
    process.stdin.setRawMode(true);
    process.stdin.resume();

    this.display.setInit();
    this.display.autoRefresh();

    this.api.initPlayList(function(err, list) {
        // 不管如何先停下来
        self.display.initDone();

        // 如果出错了
        if(err) {
            self.display.showError("_(´ཀ`」 ∠)_ 错误发生了！" + err.message + "(Q 退出)");
            return;
        }
    });
};

module.exports = Moe;

