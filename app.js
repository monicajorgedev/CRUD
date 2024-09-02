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

app.get("/usuarios", (req, res) => {
    res.json(usuarios)
})

app.get("/usuarios/:nombre", (req, res) => {
    const usuario = usuarios.find(u => u.nombre === req.params.nombre)
    if (!usuario) {
        res.status(404)
        res.json({error: "Usuario no encontrado"})
        return
    }
    res.json(usuario)
})

app.post("/usuarios", (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
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