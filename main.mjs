import { handler } from './index.mjs';
import * as http from 'http';

// Acts as API Gateway prototype
http.createServer(function (request, response) {
    const handler_response = handler(request).then(({ statusCode, body }) => {
        response.writeHead(statusCode, { 'Content-Type': 'text/html' });
        response.end(body);
    });
}).listen(80);
