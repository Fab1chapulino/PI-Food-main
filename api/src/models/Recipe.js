const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore:{
      type:DataTypes.INTEGER,
      allowNull: false
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    }
  },{
    timestamps:false
  });
};
 /*  ID. \*
-  Nombre. \*
-  Imagen. \*
-  Resumen del plato. \*
-  Nivel de comida saludable (health score). \*
-  Paso a paso. \* */