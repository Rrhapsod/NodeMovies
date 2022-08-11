require("express-async-errors");
const express = require("express");
const connection = require("./database/knex");
const routes = require("./routes");
const Error = require("./utils/Error");
const port = 3333;

const app = express();
app.use(express.json());
app.use(routes);

//connection.queryBuilder();

app.use((error, request, response, next) => {
  if (error instanceof Error) {
    return response.status(error.statusCode).json({
      status: "Erro",
      message: error.message,
    });
  }
  console.error(error);

  return response.status(500).json({
    status: "Erro",
    message: "Erro interno do servidor",
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}!`);
});
