module.exports = (sequelize,dataTypes)=>{
    const alias = "Personaje"

    const columns = {
        idPersonajes: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        imagen : {
            type : dataTypes.STRING(200),
            allowNull: true,

        },
        nombre : {
            type : dataTypes.STRING(100),
            allowNull: true
        },
        peso : {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        edad : {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        historia : {
            type: dataTypes.STRING(4500),
            allowNull: true,
        }
        
    }

    const config = {
        tableName: "personajes",
        underscored :false, 
        timestamps : false,
    }

    const Personaje = sequelize.define(alias,columns,config);

    Personaje.associate = function(models){
        Personaje.belongsToMany(models.Pelicula,{
            as : "peliculas",
            through : "personajes_peliculas", //tabla pibot o intermedia
            foreignKey : "idPersonaje",
            otherKey : "idPelicula",
            timestamps: false
        })

        
    }

    return Personaje;
}