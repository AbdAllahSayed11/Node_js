
const Todo = require('../models/todos');

const get = async (req, res) => {
    
        if(req.query.skip && req.query.limit){
            const limit = parseInt(req.query.limit);
            const skip = parseInt(req.query.skip);
            try{
            const sliced_data = await Todo.find({}).skip(skip).limit(limit);
            res.status(200).send({
                status : "success",
                data : sliced_data
            })
            }
            catch(err){
                res.status(500).send({
                    status : "failed",
                    message : err.message
                })
            }
        }
        else{
            
            try{
                const data = await Todo.find({})
                res.status(200).send({
                    status : "success",
                    data : data
                })
            }
            catch(err){
                res.status(500).send({
                    status : "failed",
                    message : err.message
                })
            }
        }
    
}

const getByIdUser = async (req, res) => {
    id = req.params.id;
  let todo = await Todo.find({ user: id });
      res.status(200).send({
          status : "success",
          data : todo
      })
}


const Save = async (req, res, next) => {
    let newTodo = req.body;
  
    try {
      const todo = await Todo.create(newTodo);
  
      res.status(201).json({
        status: "success",
        message: "saved successfully",
        data: todo,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  
const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      let todo = await Todo.findOne({ _id: id });
  
      if (todo) {
        res.status(200).json({
          status: "success",
          data: todo,
        });
      } else {
        res.status(404).json({
          status: "failed",
          message: "todo not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };

const Update =  async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      if(!id){
          return res.status(400).send({
              status : "failed",
              message : "username is required"
          })}
          
      try{
          const user_data = await Todo.findByIdAndUpdate(id,data,{ runValidators: true})
          res.status(201).send({
              status : "success",
              data : user_data
          })
      }
      catch(err){
          res.status(404).send({
              status : "failed",
              message : err.message
          })
      }
  
  }
  

  const Delete =  async (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).send({
            status : "failed",
            message : "username is required"
        })}
        
        
    try{
        const user_data = await Todo.findByIdAndDelete(id)
        res.status(201).send({
            status : "success",
            data : user_data
        })
    }
    catch(err){
        res.status(404).send({
            status : "failed",
            message : err.message
        })
    }

}
module.exports = {
    get,
    Save,
    getById,
    Update,
    Delete,
    getByIdUser
}