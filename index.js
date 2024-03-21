const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/crear", (req, res) => {
  const annio = new Date().getFullYear();
  const mes = new Date().getMonth() + 1;
  const dia = new Date().getDate();
  const fecha = `${dia < 10 ? "0" + dia : dia}/${
    mes < 10 ? "0" + mes : mes
  }/${annio}`;
  const { archivo, contenido } = req.query;
  fs.writeFile(archivo, `${fecha} \n ${contenido}`, "utf8", () => {
    console.log("archivo creado");
  });
  res.send(`Archivo ${archivo} creado satisfactoriamente`);
});
app.get("/leer", (req, res) => {
  try {
    const { archivo } = req.query;
    fs.readFile(archivo, "utf8", (err, data) => {
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/renombrar", (req, res) => {
  try {
    const { nombre, nuevoNombre } = req.query;
    fs.rename(nombre, nuevoNombre, (err, data) => {
      res.send(
        `El archivo ${nombre} fue renombrado con exito por ${nuevoNombre}`
      );
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/eliminar", (req, res) => {
  const { archivo } = req.query;
  try {
    fs.unlink(archivo, (err, data) => {
      res.send(`Archivo ${archivo} borrado correctamente`);
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log(
    `El servidor se ha levantado en el puerto http://localhost:${PORT}`
  );
});
