module.exports = (sequelize,dataTypes)=>{
    const alias = "Pelicula"

    const columns = {
        idPelis: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        imagen : {
            type : dataTypes.STRING(200),
            allowNull: true,

        },
        titulo : {
            type : dataTypes.STRING(100),
            allowNull: true
        },
        fechaDeCreacion : {
            type: dataTypes.DATE,
            allowNull: true
        },
        calificacion : {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        idGenero: {
            type: dataTypes.INTEGER,
            allowNull: true,
        }
    }

    const config = {
        tableName: "peliculas_series",
        underscored :false, 
        timestamps : false,
    }

    const Pelicula = sequelize.define(alias,columns,config);

    Pelicula.associate = function(models){
        Pelicula.belongsToMany(models.Personaje,{
            as : "personajes",
            through : "personajes_peliculas", //tabla pibot o intermedia
            foreignKey : "idPelicula",
            otherKey : "idPersonaje",
            timestamps: false
        })

        
    }

    return Pelicula;
}