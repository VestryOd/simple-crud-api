class Router {
  constructor() {
    this.endpoints = {}
  }

  _request(method = 'GET', path, handler) {
    if(!this.endpoints[method]) {
      this.endpoints[method] = {};
    }

    const endpoint = this.endpoints[path];

    if (!endpoint[method]) {
      endpoint[method] = handler;
    }
  }

  get(path, handler) {
    this._request('GET', path, handler);
  }
  post(path, handler) {
    this._request('POST', path, handler);
  }
  put(path, handler) {
    this._request('PUT', path, handler);
  }
  delete(path, handler) {
    this._request('DELETE', path, handler);
  }
}

export default Router;
