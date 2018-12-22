"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var axios = require("axios");
class ExternalRequest {
    static syncPostRequest(url, body, callback, method, contentType) {
        return new Promise((fullFill, eject) => {
            if (method == undefined)
                method = "POST";
            if (contentType == undefined)
                contentType = "application/json";
            var headers = {
                "Content-Type": contentType
            };
            axios({
                method: method,
                url: url,
                data: body
            }).then(function (response) {
                fullFill(response.data);
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        });
    }
    static syncGetRequest(url, callback, contentType) {
        return new Promise((fullFill, eject) => {
            if (contentType == undefined)
                contentType = "application/json";
            var headers = {
                "Content-Type": contentType
            };
            var options = {
                url: url,
                method: "GET",
                headers: headers
            };
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    fullFill(true);
                }
                else {
                    console.log(error);
                    fullFill(false);
                }
                callback(error, JSON.parse(body));
            });
        });
    }
}
exports.ExternalRequest = ExternalRequest;
