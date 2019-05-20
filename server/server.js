const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");
const util = require("util");
const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, "../data/db.json"));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "../public/")
});

server.use(middlewares);
// server.use(router);

const getPaginatedItems = (items, offset) => items.slice(offset, offset + 10);

server.get("/events/:query", async (req, res) => {
  const { query } = req.params;
  const items = await JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/db.json"))
  );
  const filteredResults = items.events.filter(item =>
    item.description.includes(query)
  );
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  const nextOffset = offset + 10;
  const previousOffset = offset - 10 < 1 ? 0 : offset - 10;

  const meta = {
    limit: 10,
    next: util.format("?limit=%s&offset=%s", 10, nextOffset),
    offset: req.query.offset,
    previous: util.format("?limit=%s&offset=%s", 10, previousOffset),
    total_count: filteredResults.length
  };

  const json = {
    meta: meta,
    results: getPaginatedItems(filteredResults, offset)
  };

  return res.json(json);
});

server.listen(3000, () =>
  console.log("Connected to json-server on port 3000!")
);
