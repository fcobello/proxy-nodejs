/**
 * Para Uso Local
 */
var lambda = require('./index.js');
var event = require('./event.js');
var context = require('./context.js');

var thisEvent = new event();
var thisContext = new context();

lambda.handler(thisEvent, thisContext, callback);

function callback(err, res)
{
    console.log(res);
}