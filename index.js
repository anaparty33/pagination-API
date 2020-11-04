const express = require("express");
const app = express();

const users = [
  { id: 1, name: "name 1" },
  { id: 2, name: "name 2" },
  { id: 3, name: "name 3" },
  { id: 4, name: "name 4" },
  { id: 5, name: "name 5" },
  { id: 6, name: "name 6" },
  { id: 7, name: "name 7" },
  { id: 8, name: "name 8" },
  { id: 9, name: "name 9" },
  { id: 10, name: "name 10" },
  { id: 11, name: "name 11" },
];

const posts = [
  { id: 1, name: "posts 1" },
  { id: 2, name: "posts 2" },
  { id: 3, name: "posts 3" },
  { id: 4, name: "posts 4" },
  { id: 5, name: "posts 5" },
  { id: 6, name: "posts 6" },
  { id: 7, name: "posts 7" },
  { id: 8, name: "posts 8" },
  { id: 9, name: "posts 9" },
  { id: 10, name: "posts 10" },
  { id: 11, name: "posts 11" },
];

const pagination = (model) => {
  return (req, res, next) => {
    console.log("getting request on users.");
    const pagenum = parseInt(req.query.page);
    const limitVal = parseInt(req.query.limit);

    const results = {};

    const startIndex = (pagenum - 1) * limitVal;
    const endIndex = pagenum * limitVal;
    if (endIndex < model.length - 1) {
      results.nextpage = pagenum + 1;
    }

    if (startIndex > 0) {
      results.previouspage = pagenum - 1;
    }

    results.splitArray = model.slice(startIndex, endIndex);

    res.paginatedResults = results;
    next();
  };
};
app.get("/users", pagination(users), (req, res) => {
  // console.log("getting request on users.");
  // const pagenum = parseInt(req.query.page);
  // const limitVal = parseInt(req.query.limit);

  // const results = {};

  // const startIndex = (pagenum - 1) * limitVal;
  // const endIndex = pagenum * limitVal;
  // if (endIndex < users.length - 1) {
  //   results.nextpage = pagenum + 1;
  // }

  // if (startIndex > 0) {
  //   results.previouspage = pagenum - 1;
  // }

  // results.splitArray = users.slice(startIndex, endIndex);

  res.json(res.paginatedResults);
});

app.listen("4000", () => {
  console.log("server is running");
});
