import express from "express";

const app = express();

app.post("/form", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    res.send(`Received form data: ${body}`);
  });
});
app.get("/", (req, res) => {
  res.send("Hello, World2!");
});

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
