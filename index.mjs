import * as fs from 'fs';
import * as mongodb from 'mongodb';

function getTable() {
    return new mongodb.MongoClient('mongodb://localhost:27017')
        .db().collection('entries');
}

async function getEntry(entryDateBound) {
    const condition = entryDateBound === null ?
                        {} : { time: { $lt: entryDateBound } };
    return getTable().findOne(
        condition,
        {
            sort: { time: -1 },
            projection: { _id: 0 }
        }
    );
}

async function insert(entry) {
    return getTable().insert(entry);
}

async function post(password, content) {
    if (password !== '12345') {
        throw 'Wrong password'
    } else {
        const table = getTable();
        await insert({ time: new Date(), content: content });
    }
}

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
        var data = '';
        event.on('data', (chunk) => {
            data += chunk;
        }).on('end', () => {
            const data = JSON.parse(data);
            await
        });
    }
    return { statusCode, body };
};
