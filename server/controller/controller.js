var Userdb = require('../model/model');

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;  
    }
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email
    }) 
    user
     .save(user)
     .then(data =>{
        //  res.send(data)
        res.redirect('/add-user')
        })
     .catch(err =>{
         res.status(500).send({
             message:err.message || "Some error while create operation"
         });
     })   ;
}

exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message: "Not found user with id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({message:"Error retriving user with id" +id})
            })
    }else{
        Userdb.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message:err.message || "Error while retrieving info"})
    })

    }
    
    
} 

exports.update = (req,res)=>{
  if(!req.body){
      return res
      .status(400)
      .send({message:"Fill completely to update"})
  }  
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
  .then(data =>{
      if(!data){
      res.status(404).send({message:`can't update user with id ${id}.`})
      }else{
          res.send(data)
      }
  })
  .catch(err =>{
    res.status(500).send({message:"error update user info"})      
  })
}

exports.delete = (req,res)=>{
    const id = req.params.id;
    
    Userdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message:`can't delete with id ${id}.`})
            }else{
                res.send({message:"user was deleted successfully!"})
        
        }
    })
    .catch(err =>{
        res.status(500).send({message: "couldn't delete user with id " +id
    });
    });
}