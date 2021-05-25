const db = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    loguin: (req,res)=>{
        const {email,password} = req.body
        db.User.findOne({
            where : {
                email
            }
        })
        .then(user => {
            
        

            if (!user || !bcrypt.compareSync(password, user.password)){
                return res.status(401).json({
                            auth : false,
                            msg : "credenciales inválidas"
                        })
            }
            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.TOPSECRET,
                {
                    expiresIn: 60 * 60 * 12
                }
            )
            res.status(200).json({
                meta: {
                    status: 200,
                    auth: true,
                    token: token,
                    mensaje: "usuario conectado"
                },
                data: {
                    user
                }
            })
    })
    .catch(error=>{
        res.status(500).json(error)
    })
    },
    register: (req,res)=>{
        const {email,password}= req.body
        db.User.create({
            email:email,
            password: bcrypt.hashSync(password,12),
            
        })
        .then(user=>{
            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.TOPSECRET,
                {
                    expiresIn: 60 * 60 * 12
                }
            )

            res.status(200).json({
                meta: {
                    status: 200,
                    auth: true,
                    token: token,
                    mensaje: "usuario creado"
                },
                data: {
                    user
                }
            })
        })
        .catch(error=>{
            res.status(400).json(error)
        })
    },
    mostrarPersonajes: (req,res)=>{
        db.Personaje.findAll()
        .then(resultado=>{
          let personajes =[]
           resultado.forEach(elemento => {
                let personaje = {
                    nombre: elemento.nombre,
                    imagen: elemento.imagen,
                }
                personajes.push(personaje);
              
            }) 
            
            res.status(200).json({
                meta: {
                    status: 200,
                    mensaje: "acceso a personajes"
                },
                data: {
                    personajes
                }
            })
        })
        .catch(error=>{
            res.json({error});
        })
    },
    crearPersonaje: (req,res)=>{
        const {nombre,edad,peso,historia} = req.body
        
        
        db.Personaje.create({
            nombre,
            peso,
            edad,
            historia,
            imagen: `http://localhost:3000/images/personajes/${req.files[0].filename}`
        })
        .then(resultado=>{
            res.status(200).json({
                meta: {
                    mensaje: "personaje creado"
                },
                data: {
                    resultado
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })
    },    
    editarPersonaje: (req,res)=>{
        const {nombre,edad,peso,historia} = req.body
        
        if(req.files){
        db.Personaje.update({
            nombre,
            edad,
            peso,
            historia,
            imagen: `http://localhost:3000/images/personajes/${req.files[0].filename}`
        },{
            where: {idPersonajes: req.params.id}
        })
        .then(resultado=>{
            res.status(200).json({
                meta: {
                    mensaje: "personaje editado"
                },
                data: {
                    resultado
                }
            })
        })
        .catch(error=>{
            res.status(400).json({
                meta:{
                    mensaje:"hola soy leandro"
                },
                data: {
                    error
                }
            });
        })
    }
        db.Personaje.update({
            nombre,
            edad,
            peso,
            historia,
        },{
            where: {
                idPersonajes: req.params.id
            }
        })
        .then(resultado=>{
            res.status(200).json({
                meta: {
                    mensaje: "personaje editado"
                },
                data: {
                    resultado
                }
            })
        })
        .catch(error=>{
            res.status(400).json({
                data: {error},
                meta: {
                mensaje: "Hola soy lean",
            }});
        })
    
    },
    eliminarPersonaje: (req,res)=>{
        db.Personaje.destroy({
            where: {idPersonajes: req.params.id}
        })
        .then(respuesta=>{
            res.status(200).json({
                meta: {
                    mensaje: "Personaje eliminado"
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error,meta:{mensaje: "hola soy el error"}});
        })
    },
    detallePersonaje: (req,res)=>{
        db.Personaje.findByPk(req.params.id,{
            include: {association: "peliculas" }
        })
        .then(response=>{
            res.status(200).json({
                meta: {
                    mensaje: "personaje completo"
                },
                data: {
                    response
                }
                
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })
    },
    mostrarPeliculas: (req,res)=>{
        db.Pelicula.findAll()
        .then(resultado=>{
            let peliculas= []
            resultado.forEach(elemento => {
                let pelicula = {
                    titulo: elemento.titulo,
                    imagen: elemento.imagen,
                    fechaDeCreacion : elemento.fechaDeCreacion,
                }
                peliculas.push(pelicula);
              
            })
            res.status(200).json({
                meta:{
                    mensaje: "listado de peliculas"
                },
                data: {
                    peliculas
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })

    },
    crearPeliculas: (req,res)=>{
        const {titulo, fechaDeCreacion, calificacion, idGenero} = req.body
        db.Pelicula.create({
            titulo,
            fechaDeCreacion,
            calificacion,
            idGenero,
            imagen: `http://localhost:3000/images/peliculas/${req.files[0].filename}`
        })
        .then(resultado=>{
            res.status(200).json({
                meta: {
                    mensaje: "pelicula o serie creada con exito"
                },
                data: {
                    resultado
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })
    },
    editarPeliculas: (req,res)=>{
        const {titulo, fechaDeCreacion, calificacion, idGenero} = req.body
        if(req.files){
            db.Pelicula.update({
                titulo,
                fechaDeCreacion,
                calificacion,
                idGenero,
                imagen: `http://localhost:3000/images/peliculas/${req.files[0].filename}`
            },
            {
                where : {

                    idPelis: req.params.id
                }
            })
            .then(resultado=>{
                res.status(200).json({
                    meta: {
                        mensaje: "pelicula modificada"
                    },
                    data: {
                        resultado
                    }
                })
            })
            .catch(error=>{
                res.status(400).json({error});
            })
        }
        db.Pelicula.update({
            titulo,
            fechaDeCreacion,
            calificacion,
            idGenero,
       },{
            where: {
                idPelis: req.params.id
            }
        })
        .then(resultado=>{
            res.status(200).json({
                meta: {
                    mensaje: "pelicula modificada"
                },
                data: {

                    resultado
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        });
    
    },
    eliminarPelicula: (req,res)=>{
        db.Pelicula.destroy({
            where: {
                idPelis: req.params.id
            }
        })
        .then(resultado=>{
            res.status(200).json({
                meta: {
                    mensaje: "pelicula eliminada"
                },
                data: resultado
            })
        })
        .catch(error=>{
            res.status(400).json({error: error});
        })
    },
    detallePelicula: (req,res)=>{
        db.Pelicula.findOne({
            where: {
                idPelis: req.params.id
            },
            include: "personajes"
        })
        .then(pelicula=>{
            
            res.status(200).json({
                meta: {
                    mensaje: "pelicula encontrada"
                },
                data: {
                    pelicula,
                    
                }
                
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })
    }
}