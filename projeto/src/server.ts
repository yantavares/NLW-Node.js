import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.send("Olá mundo");
});

app.post("/users", (request, response) => {
  return response.json({
    message: "Deu certo o json",
  });
});

app.post("/", (request, response) => {
  return response.json({
    test: "JSON carregado",
  });
});
app.listen(3333, () => console.log("DEU BOM"));
