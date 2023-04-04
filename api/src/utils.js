const { Recipe, Diet}= require('./db');
const { Op }=require("sequelize");

String.prototype.capitalize = function() {
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); });
  };

const applySearch = async function(query){
   try {
    query = query.trim().split(' ').filter( e => e !== "").join(' ').capitalize();

    const firstRecipe = await Recipe.findAll({
        attributes:["id", "title", "image"],
        where:{
            title:query
        },
        include:{
            model:Diet,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
    if(firstRecipe.length)return firstRecipe.concat(true)

    query=query.split(' ');
    const secondRecipe = await Recipe.findAll({
        attributes:["id", "title", "image"],
        where:{
            title:{
                [Op.and]:{
                    [Op.startsWith]:query[0],
                    [Op.endsWith]:query[query.length-1]
                }
            }
        },
        include:{
            model:Diet,
            attributes:["name"],
            through:{
                attributes:[]
            }
        },
        limit:9
    });
    if(secondRecipe.length) return secondRecipe.concat(true)

    const thirdRecipe = await Recipe.findAll({
        attributes:["id", "title", "image"],
        where:{
            title:{
                [Op.startsWith]:query[0].slice(0, 3)
            }
        },
        include:{
            model:Diet,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
    return thirdRecipe.concat(false)
    }catch(err){
        console.log(err.message)
    }
}
module.exports=applySearch;