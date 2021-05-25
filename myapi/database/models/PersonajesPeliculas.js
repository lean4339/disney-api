module.exports = (sequelize, dataTypes)=>{
    const alias = "Personajes_Peliculas"
    
    const columns = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },      
        idPelicula : {
            type : dataTypes.INTEGER,
            allowNull: true,

        },
        idPersonaje : {
            type : dataTypes.INTEGER,
            allowNull: true
        }
    }

    const config = {
        tableName: "personajes_peliculas",
        underscored :false, 
        timestamps : false,
    }

    const PersonajePelicula = sequelize.define(alias,columns,config);

    
   
    

    
        
        return PersonajePelicula;
}