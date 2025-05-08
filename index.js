const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const  utl = require('./utilities');
const userRouter = require('./routes/users');
const todoRouter = require('./routes/todos');
const dotenv = require('dotenv');
const Todo = require('./models/todos');
const AppError = require('./Utlis/AppError');
const Multer  = require('multer');

dotenv.config();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


mongoose.connect("mongodb://127.0.0.1:27017/todoDB").then(()=>{
    console.log("Connected to MongoDB successfully")
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err)
})

app.use(cors({
    origin: '*', 
}));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/todos",  async (req, res) => {
    const todos = await Todo.find({})
    console.log(todos)
    res.render("todos", {todos});
})

app.use(express.static('./statics'));
app.use(express.json());




const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "-" + file.originalname)
  }
})


const upload = Multer({ storage: storage })

app.post('/profileImg',upload.array('avatar',2), (req, res) => {
  res.status(200).json({
    status: "success",
    message: "File uploaded successfully",
    files : req.files,
  });   
});



app.use('/api', userRouter);
app.use('/api', todoRouter);

app.use( (req, res,next) => {
  next(new AppError(`${req.originalUrl} is not found `, 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message || 'Internal Server Error',
  });
});