var req = require('request');

exports.handler = async function(event, context, callback) 
{
    var date;

    console.log(event);
    var payload = JSON.parse(event.body);
    
    if (event.requestContext != null)
    {
        console.log('SourceIP =', event.requestContext.identity.sourceIp);
    }
    
    if (date)
    {
        console.log('Data:' + date);
    }
    else
    {
        date = new Date();
        console.log('First Data:' + date);
    }
    
    const options = 
    {
        url: payload.url,
        rejectUnauthorized: false,
        body: payload.body,
        headers: event.headers,
        method: payload.method
    };
    
    console.log('Prepare Request to: ' + options.url);
    req(options, function (err, res, body)
    {
        handleResponse(err, res, body, callback);
    });
};

function handleResponse(err, res, body, callback)
{
    console.log('HandleResponse');
    
    if(err)
    {
        console.log('ERROR', err);
        let responseBody = 
        {
            errorCode: 500,
            errorMessage: err.message
        };
        let response = 
        {
            statusCode: 500,
            body: JSON.stringify(responseBody)
        };
        callback(null, response);
    }
    else
    {
        console.log('SUCESS');
        //Zera o Header set-cookie, pois causa Lambda Malformation no response
        res.headers['set-cookie'] = '';
        let response = 
        {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
        };
        callback(null, response);
    }
}