module.exports = (sequelize, dataTypes)=>{
    const alias = "User"
    
    const columns = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },      
        password : {
            type : dataTypes.STRING(200),
            allowNull: false,

        },
        email : {
            type : dataTypes.STRING(200),
            allowNull: false
        }
    }

    const config = {
        tableName: "users",
        underscored :false, 
        timestamps : false,
    }

    const User = sequelize.define(alias,columns,config);

    
   
    

    return User;


}