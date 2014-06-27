var spidex = require("spidex");

/**
 * Api class 
 *
 * @constructor
 */
var Api = function() {
    this.cookie = ""; 
};

/**
 * initPlayList
 *
 * @param callback
 * @return
 */
Api.prototype.initPlayList = function(callback) {
    var url = "http://moe.fm/listen";
    spidex.get(url, function(html, status, respHeader) {
        
    }, { cookie: this.cookie }, "utf8").on("error", function(err) {
        callback(err);
    });
}

module.exports = Api;

