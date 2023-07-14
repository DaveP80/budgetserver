## Budget app express server
|  #  | Action  |        URL        | HTTP Verb |    CRUD    |                  Description                   |
| :-: | :-----: | :---------------: | :-------: | :--------: | :--------------------------------------------: |
|  1  |  Index  |   /transactions   |    GET    |  **R**ead  |   Get a list (or index) of all transactions    |
|  2  |  Show   | /transactions/get?id= |    GET    |  **R**ead  | Get an individual view (show one transactions) |
|  3  | Create  |   /transactions   |   POST    | **C**reate |           Create a new transactions            |
|  4  | Destroy | /transactions/:id |  DELETE   | **D**elete |             Delete a transactions              |
|  5  | Update  | /transactions/:id |    PUT    | **U**pdate |             Update a transactions              |
|  6  | Show    | /enable           |    GET    | **R**ead   |             boolean enabled                    |
|  7  | Create  | /enable           |    POST   | **C**reate |               Update boolean                   |
|  8  | Show    | /category         |    GET    | **R**ead   |        Get a list of all categories            |
|  9  | Create  | /category         |   POST    | **C**reate |             Create Categories                  |
|  10  | Destroy  | /transactions/reset |    GET    | **U**pdate |             Reset Data              |
|  11  | Destroy  | /category/reset |    GET    | **U**pdate |             Reset Data              |
|  12  | Destroy  | /enable/reset |    GET    | **U**pdate |             Reset Data              |
### Get started
```bash
npm install
echo 'PORT=9000' >> .env
node server.js
```
## Notes
* To get an individual transaction use a query parameter
* To create a new transaction, the server accepts an array of objects
```bash
http localhost:9000/transactions/get?id=1
http POST localhost:9000/transactions -j <<< '[{"id":"999","category":"example","date":"Date String","name":"example","value":55,"from":"example"}]'
```
Try to make post requests of new transactions with an Object with shape

```typescript
interface MyObject {
  id: string;
  category: string;
  date: string;
  value: number;
  from: string;
}

const myObject: MyObject = {
  id: "999",
  category: "example",
  date: "Date String",
  value: 55,
  from: "example",
};
```