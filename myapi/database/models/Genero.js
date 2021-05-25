module.exports = (sequelize, dataTypes)=>{
    const alias = "Genero"
    
    const columns = {
        idGeneros: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },      
        nombre : {
            type : dataTypes.STRING(100),
            allowNull: true,

        },
        imagen : {
            type : dataTypes.STRING(200),
            allowNull: true
        }
    }

    const config = {
        tableName: "generos",
        underscored :false, 
        timestamps : false,
    }

    const Genero = sequelize.define(alias,columns,config);

    Genero.associate = function(models){
       
        Genero.hasMany(models.Pelicula,{
             as : "peliculas",              
             foreignKey : "idGenero",
             timestamps: false
         })
   
    

    
        }
        return Genero;
}