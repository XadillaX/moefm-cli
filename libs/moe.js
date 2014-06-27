var Api = require("./api");
var Display = require("./display");

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

/**
 * run this application
 *
 * @return
 */
Moe.prototype.run = function() {
    this.display.setInit();

    this.api.initPlayList(function(err, list) {
    });
};

module.exports = Moe;

