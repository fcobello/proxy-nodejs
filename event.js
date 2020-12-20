// Para uso local
module.exports = function(){
    var payload = {
        'url' : 'https://postman-echo.com/post',
        'body' : '{"teste":123}',
        'method' : 'POST'
       }
    return {
        "body": JSON.stringify(payload)
    };
}