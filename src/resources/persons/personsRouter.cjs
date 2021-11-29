import { parseId, validatePureUrl, validateUUID } from "../../helpers.js";
import { getOne, getAll, create, update, remove } from './service';

function personsRouter(req, res) {
    const { method, url } = req;
    const headOptions = { 'Content-Type': 'application/json' };
    const id = parseId(url);

    if(!validatePureUrl(url)) {
        res.writeHead(404, headOptions);
        res.end(JSON.stringify({ message: `Page with url: ${url} not fount page` }));
    }

    if (id && !validateUUID(id)) {
        res.writeHead(400, headOptions);
        res.end(JSON.stringify({ message: `Provided id: ${url} is not valid` }));
    }

    let data = null;
    switch (method) {
        case 'GET':
            data = id ? getOne(req, res, id) : getAll(req, res);
            res.writeHead(200, headOptions);
            res.end(JSON.stringify(data));
            break;
        case 'POST':
            data = create(req, res);
            res.writeHead(201, headOptions);
            res.end(JSON.stringify(data));
            break;
        case 'PUT':
            data = update(req, res);
            res.writeHead(200, headOptions);
            res.end(JSON.stringify(data));
            break;
        case 'DELETE':
            data = remove(req, res, id);
            res.writeHead(204, headOptions);
            res.end(JSON.stringify(data));
            break;
        default:
            break;
    }
}

export default personsRouter;