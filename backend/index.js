const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ConnnectToDB = require('./Config/db_config');
const userRouter = require('./routes/userRouter')
const jobRouter = require('./routes/jobRouter');
const uploadMiddleWare = require('./middlewares/uploadMiddleware');
const UserModel = require('./models/UserModel');
const UploadRoute = require('./utils/UploadRoute')

const app = express();
const PORT = process.env.PORT || 5500;
dotenv.config();
app.use(cors());
app.use(express.json())

app.get('/', (req,res) => {
    res.json({
        message : "Server is up and running perfectly !!!",
        success : true
    })
})

app.use('/user', userRouter);
app.use('/job', jobRouter);

app.post('/upload-test', uploadMiddleWare, (req,res) => {
    if(req.file){
        res.json({
            message : "File uploaded successfully",
            success : true,
            url : req.file.path
        })
    }
    else {
        res.json({
            success: false,
            message: 'No file uploaded',
        });
    }
})

app.use('/api',UploadRoute);

app.get('/check-user/:clerkID', async(req,res) => {
    console.log("mushi mushi")
  const User = await UserModel.findOne({
    clerkID : req.params.clerkID
  });

  if(User){
    res.json({
      success : true,
      userID : User._id
    })
  }

  else
  {
    res.json({
      success : false,
      message : "User not found"
    })
  }
})

app.listen(PORT,async () => {
    console.log("Server is starting ...");
    await ConnnectToDB(process.env.DB_URL);
    console.log("Server is up and running on PORT : "+PORT)
})