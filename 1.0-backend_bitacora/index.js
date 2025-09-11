const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 3000;

const Database = require("better-sqlite3");

const dbIngenieria = new Database("DB_Ingenieria.sqlite");
const dbAdministracion = new Database("DB_Administracion.sqlite");
const dbMultimedia = new Database("DB_Multimedia.sqlite");

function crearEsquema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      carne TEXT NOT NULL UNIQUE,
      carrera TEXT NOT NULL,
      telefono TEXT,
      fechaInicio TEXT,
      fechaFinalizacion TEXT,
      cantidadHoras INTEGER
    );
    CREATE TABLE IF NOT EXISTS bitacora (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
        estudianteId INTEGER,
        fecha TEXT NOT NULL,
        horas INTEGER NOT NULL,
        descripcion TEXT,
        FOREIGN KEY (estudianteId) REFERENCES estudiantes(id)
    );
  `);
}

crearEsquema(dbIngenieria);
crearEsquema(dbAdministracion);
crearEsquema(dbMultimedia);

const shards = {
  ingenieria: dbIngenieria,
  administracion: dbAdministracion,
  multimedia: dbMultimedia,
};

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.get("/api/:shard/estudiantes/:id", (req, res) => {
  const { shard, id } = req.params;
  const db = shards[shard];
  console.log(db)
  if (!db) {
    return res.status(400).json({ error: "Shard inválido" });
  }

  const estudiantes = db.prepare(`SELECT * FROM estudiantes where id = ${id}`).all();
  res.json(estudiantes);
}); 

app.get("/api/:shard/actividades/:id", (req, res) => {
  const { shard, id } = req.params;
  const db = shards[shard];

  if (!db) {
    return res.status(400).json({ error: "Shard inválido" });
  }

  const estudiantes = db.prepare(`SELECT * FROM bitacora where estudianteId = ${id}`).all();
  res.json(estudiantes);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
