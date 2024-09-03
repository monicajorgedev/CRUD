const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

let nextId = usuarios.length + 1

app.get("/usuarios", (req, res) => {
    res.json(usuarios)
})

app.get("/usuarios/:nombre", (req, res) => {
    const usuario = usuarios.find(u => u.nombre === req.params.nombre)
    if (!usuario) {
        res.status(404)
        res.json({error: "Usuario no encontrado"})
        return
    } else {
    res.json(usuario)}
})

app.post("/usuarios", (req, res) => {
    const nuevoUsuario = {
        //id: usuarios.length + 1,
        id: nextId++,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }
    usuarios.push(nuevoUsuario)
    res.json(nuevoUsuario)
    
})

app.delete("/usuarios/:nombre", (req, res) => {

    usuarios = usuarios.filter(u => u.nombre !== req.params.nombre)
   
    res.json({mensaje: "Usuario borrado correctamente"})
})


app.put("/usuarios/:nombre", (req, res) => {

    const index = usuarios.findIndex(u => u.nombre === req.params.nombre)
    if (index === -1){
        res.status(404)
        res.json({error : "No existe usuario"})
        return
    }
    usuarios[index].nombre = req.body.nombre
    usuarios[index].edad = req.body.edad
    usuarios[index].lugarProcedencia = req.body.lugarProcedencia

    res.json(usuarios[index])
})



app.listen(3000, ()=> {
    console.log("Express esta escuchando en el puerto 3000")
})

/*
const express = require("express");
const app = express();

let usuarios = [
  { id: 1, nombre: "Ryu", edad: 32, lugarProcedencia: "Japón" },
  { id: 2, nombre: "Chun-Li", edad: 29, lugarProcedencia: "China" },
  { id: 3, nombre: "Guile", edad: 35, lugarProcedencia: "Estados Unidos" },
  { id: 4, nombre: "Dhalsim", edad: 45, lugarProcedencia: "India" },
  { id: 5, nombre: "Blanka", edad: 32, lugarProcedencia: "Brasil" },
];

let nextId = usuarios.length + 1;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
            <h1>Luchadores Street Fighter</h1>
            <ul>
            ${usuarios
              .map((usuario) => {
                return `<li>ID: ${usuario.id} - Nombre: ${usuario.nombre} | Lugar de procedencia: ${usuario.lugarProcedencia}</li>`;
              })
              .join("")}
            </ul>
            </body>
        </html>
        `);
});

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/usuarios/:nombre", (req, res) => {
  const usuario = usuarios.find(
    (user) => user.nombre.toLowerCase() === req.params.nombre.toLowerCase()
  );
  console.log(req.params.nombre);
  if (!usuario) {
    res.status(404).send("Usuario no encontrado");
  } else {
    res.json(usuario);
  }
});

app.post("/usuarios", (req, res) => {
  const newUser = {
    // id: usuarios.length + 1,
    id: nextId++,
    nombre: req.body.nombre,
    edad: req.body.edad,
    lugarProcedencia: req.body.lugarProcedencia,
  };

  usuarios.push(newUser);
  res.redirect("/usuarios");
});

app.patch("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const usuario = usuarios.find(
    (usuario) => usuario.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!usuario) {
    res.status(404).json("Error nombre no encontrado");
  } else {
    const { nombre, edad, lugarProcedencia } = req.body;

    if (nombre !== undefined) {
      usuario.nombre = nombre;
    }

    if (edad !== undefined) {
      usuario.edad = edad;
    }

    if (lugarProcedencia !== undefined) {
      usuario.lugarProcedencia = lugarProcedencia;
    }
    res.json(usuario);
  }
});

app.delete("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const usuarioEliminado = usuarios.find(
    (usuario) => usuario.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!usuarioEliminado) {
    res.status(404).json("Nombre no encontrado");
  } else {
    usuarios = usuarios.filter(
      (usuario) => usuario.nombre.toLowerCase() !== nombre.toLowerCase()
    );

    res.json("Usuario eliminado");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`el servidor está escuchando en http://localhost:${PORT}`);
});

*/ 