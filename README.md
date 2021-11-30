# Simple CRUD API

### Steps to start:

2. Clone repo _`git clone git@github.com:VestryOd/simple-crud-api.git`_ .
3. Go to the app folder _`cd simple-crud-api`_ .
4. Checkout branch  _`git checkout simple-crud-api`_ .
5. Install _`npm install`_.
6. Run with command _`npm run start:dev`_.
7. Make properly requests using Postman:

- GET, http://localhost:{PORT}/persons, -> [Persons].
- GET, http://localhost:{PORT}/persons/{personId = uuid}, -> Person
- POST, http://localhost:{PORT}/persons, request: -> Person
- PUT, http://localhost:{PORT}/persons/{personId = uuid}, -> Person
- DELETE, http://localhost:{PORT}/persons/{personId = uuid}, -> status code 204.