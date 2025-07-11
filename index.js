const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { error } = require("console");
const SECRET = "jorgeaereo";

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Tudo ok por aqui!" });
});

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  const index = blacklist.findIndex((item) => (item = token));
  if (index !== -1) {
    return res.status(401).end();
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }
    req.userId = decoded.userId;
    next();
  });
}

app.get("/clientes", verifyJWT, (req, res) => {
  console.log(req.userId + " fez esta chamada!!");
  res.json([{ id: 1, nome: "jorge" }]);
});

app.post("/login", (req, res) => {
  if (req.body.user === "jorge" && req.body.password === "123") {
    const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 });
    return res.json({ auth: true, token });
  }

  res.status(401).end();
});

const blacklist = [];

app.post("/logout", function (req, res) {
  blacklist.push(req.headers["x-access-token"]);
  res.end();
});

const server = http.createServer(app);
server.listen(4000);
console.log("Servidor escutado na porta 4000");
