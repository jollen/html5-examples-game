var server = require("./server");
var handlerFuncs = require("./requestHandlers");

var handlers = {
   "/": handlerFuncs.start,
   "/send": handlerFuncs.send,
   "/list": handlerFuncs.list
};

server.start(handlers);
