import * as fs from 'fs';

async post(content) {
    // TODO
    // Find if Meta empty
    // If Meta empty initialize it with "zero" entry
    // Otherwise, find last entry id
    // Update next field of the last entry in the entries
    // Write new entry with previous field set at the last entry id
    // Update last entry id in the meta table
}

async getEntry()

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
