import * as fs from 'fs';
import * as mongodb from 'mongodb';

function getTable() {
    return new mongodb.MongoClient('mongodb://localhost:27017')
        .db().collection('entries');
}

async function getEntry(date) {
    return (await getTable().find(
        {
            date: { $eq: date }
        },
        {
            sort: { time: -1 },
            projection: { _id: 0 }
        }
    )).toArray();
}

async function insert(entry) {
    return getTable().insert(entry);
}

async function post(content) {
    const table = getTable();
    const date_now = Date.now();
    const date = Math.floor(date_now / (24 * 3600 * 1000));
    const time = date_now % (24 * 3600 * 1000);
    await insert({ date, time, content });
}

export const handler = async (event) => {
    var statusCode = 500, headers = {}, body;
    if (event.requestContext.http.method === 'GET') {
        if (event.requestContext.http.url === '/') {
            const data = fs.readFileSync('index.html');
            statusCode = 200;
            headers = { 'Context-Type': 'text/html' };
            body = data.toString();
        } else {
            const date = event.requestContext.http.url.slice(1);
            const entries = await getEntry(date);
            statusCode = 200;
            headers = { 'Context-Type': 'application/json' };
            body = JSON.stringify(entries);
        }
    } else if (event.requestContext.http.method === 'POST') {
        const { password, content } = JSON.parse(event.body);
        if (password !== '12345') {
           statusCode = 503;
        } else {
            await post(password, content);
            statusCode = 200;
        }
    }
    return { statusCode, headers, body };
};
