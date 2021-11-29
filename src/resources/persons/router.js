import { parseId, validatePureUrl, validateUUID } from '../../helpers.js';
import { getOne, getAll, create, update, remove } from './service.js';

function router(req, res) {
    const { method, url } = req;
    const headOptions = { 'Content-Type': 'application/json' };
    const id = parseId(url);

    if (id && !validateUUID(id)) {
        res.writeHead(400, headOptions);
        res.end(JSON.stringify({ message: `Provided id: ${url} is not valid` }));
        return;
    }

    if(!validatePureUrl(url)) {
        res.writeHead(404, headOptions);
        res.end(JSON.stringify({ message: `Page with url: ${url} not fount` }));
        return;
    }

    if (id && (method === 'POST' || method === 'PUT')) {
        res.writeHead(400, headOptions);
        res.end(JSON.stringify({ message: `Wrong request. No params in url` }));
        return;
    }

    let data = null;
    let prepared = null;
    switch (method) {
        case 'GET':
            data = id ? getOne(req, res, id) : getAll(req, res);
            if (data) {
                res.writeHead(200, headOptions);
                prepared = JSON.stringify(data);
                console.log(`Response, status: ${res.statusCode}, data ${prepared}`);
                res.end(prepared);
            }
            break;
        case 'POST':
            create(req, res).then(data => {
                if (data) {
                    res.writeHead(201, headOptions);
                    prepared = JSON.stringify(data);
                    console.log(`Response, status: ${res.statusCode}, data ${prepared}`);
                    res.end(prepared);
                }
            });
            break;
        case 'PUT':
            update(req, res).then(data => {
                if (data) {
                    res.writeHead(200, headOptions);
                    prepared = JSON.stringify(data);
                    console.log(`Response, status: ${res.statusCode}, data ${prepared}`);
                    res.end(prepared);
                }
            });
            break;
        case 'DELETE':
            data = remove(req, res, id);
            if (data) {
                res.writeHead(204, headOptions);
                prepared = JSON.stringify(data);
                console.log(`Response, status: ${res.statusCode}, data ${data}`);
                res.end(prepared);
            }
            break;
        default:
            break;
    }
}

export default router;
