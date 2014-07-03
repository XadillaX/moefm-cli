var spidex = require("spidex");
var util = require("util");

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
        var jsonReg = /playlist=([\s\S]*);\s*player.setPlaylist\(playlist.playlist\);/;
        var jsonResult = jsonReg.exec(html);

        if(jsonResult.length !== 2) {
            callback(new Error("服务器源数据解析错误。"));
            return;
        }
        
        var json = jsonResult[1];
        try {
            json = JSON.parse(json);
        } catch(e) {
            callback(new Error("服务器 JSON 数据解析错误。"));
            return;
        }

        if(!util.isArray(json.playlist)) {
            callback(new Error("服务器 JSON 不含播放列表信息。"));
            return;
        }

        callback(null, json.playlist);
    }, { cookie: this.cookie }, "utf8").on("error", function(err) {
        callback(err);
    });
}

module.exports = Api;

