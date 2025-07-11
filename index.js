const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const SECRET = "jorgeaereo";

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Tudo ok por aqui!" });
});
app.get("/clientes", (req, res) => {
  res.json([{ id: 1, nome: "jorge" }]);
});

app.post("/login", (req, res) => {
  if (req.body.user === "jorge" && req.body.password === "123") {
    const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 });
    return res.json({ auth: true, token });
  }

  res.status(401).end();
});

app.post("/logout", function (req, res) {
  res.end();
});

const server = http.createServer(app);
server.listen(4000);
console.log("Servidor escutado na porta 4000");
