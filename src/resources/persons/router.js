import { parseId, validatePureUrl, validateUUID } from '../../helpers.js';
import { getOne, getAll, create, update, remove } from './service.js';

function router(req, res) {
    const { method, url } = req;
    const headOptions = { 'Content-Type': 'application/json' };
    const id = parseId(url);

    if(!validatePureUrl(url)) {
        res.writeHead(404, headOptions);
        res.end(JSON.stringify({ message: `Page with url: ${url} not fount page` }));
        return;
    }

    if (id && !validateUUID(id)) {
        res.writeHead(400, headOptions);
        res.end(JSON.stringify({ message: `Provided id: ${url} is not valid` }));
        return;
    }

    let data = null;
    let prepared = null;
    switch (method) {
        case 'GET':
            data = id ? getOne(req, res, id) : getAll(req, res);
            res.writeHead(200, headOptions);
            prepared = JSON.stringify(data);
            console.log(`Response, status: ${res.statusCode}, data ${prepared}`);
            res.end(prepared);
            break;
        case 'POST':
            data = create(req, res);
            res.writeHead(201, headOptions);
            console.log(data, 'post--');
            prepared = JSON.stringify(data);
            console.log(`Response, status: ${res.statusCode}, data ${prepared}`);
            res.end(prepared);
            break;
        case 'PUT':
            data = update(req, res);
            res.writeHead(200, headOptions);
            prepared = JSON.stringify(data);
            console.log(`Response, status: ${res.statusCode}, data ${prepared}`);
            res.end(prepared);
            break;
        case 'DELETE':
            data = remove(req, res, id);
            res.writeHead(204, headOptions);
            prepared = JSON.stringify(data);
            console.log(`Response, status: ${res.statusCode}, data ${data}`);
            res.end(prepared);
            break;
        default:
            break;
    }
}

export default router;
