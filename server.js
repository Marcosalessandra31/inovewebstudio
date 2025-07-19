const express = require("express");
const cors = require("cors");
const wppconnect = require("wppconnect");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const sessions = {};

function getUser(email, password) {
  const users = JSON.parse(fs.readFileSync("users.json"));
  return users.find(u => u.email === email && u.password === password);
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = getUser(email, password);
  if (!user) return res.status(401).send({ success: false });

  const sessionName = user.session;
  if (!sessions[sessionName]) {
    wppconnect.create({ session: sessionName }).then(client => {
      sessions[sessionName] = client;
    });
  }

  res.send({ success: true, session: sessionName });
});

app.post("/send-message", async (req, res) => {
  const { session, number, message } = req.body;
  const client = sessions[session];

  if (!client) return res.status(400).send({ success: false, error: "Sessão não ativa." });

  try {
    await client.sendText(`${number}@c.us`, message);
    res.send({ success: true });
  } catch (e) {
    res.status(500).send({ success: false, error: e.message });
  }
});

app.listen(3000, () => console.log("API InoveWebStudio rodando na porta 3000"));