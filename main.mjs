import { handler } from './index.mjs';
import * as http from 'http';

function fill(response) {
    return ({statusCode, headers, body}) => {
        response.writeHead(statusCode, headers);
        response.end(body);
    };
}

// Acts as API Gateway prototype
http.createServer(function (request, response) {
    if (request.method === 'POST') {
        var body = '';
        request.on('data', (data) => { body += data }).on('end', () => {
            handler({
                requestContext: {
                    http: {
                        url: request.url,
                        method: 'POST'
                    }
                },
                body
            }).then(fill(response));
        });
    } else {
        handler({
            requestContext: {
                http: {
                    url: request.url,
                    method: request.method
                }
            }
        }).then(fill(response));
    }
}).listen(80);
