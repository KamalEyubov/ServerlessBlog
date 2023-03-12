import * as fs from 'fs';

export const handler = async (event) => {
    // TODO implement
    var statusCode = 404, body;
    if (event.url === '/' && event.method === 'GET') {
        if (event.url === '/') {
            const data = fs.readFileSync('index.html');
            statusCode = 200;
            body = data.toString();
        } else {
            const entry_id = event.url
        }
    } else if (event.method === 'POST') {
        console.log(event);
        var data = "";
        event.on("data", (chunk) => {
            data += chunk;
        }).on("end", () => {
            console.log(JSON.parse(data));
        });
    }
    return { statusCode, body };
};
