import express  from "express";
import { dbconnect } from "./config/db";
import userRouter from "./routes/userRoutes";
import projectRouter from "./routes/projectRoutes";
import taskRouter from "./routes/taskRoutes";
import commentRouter from "./routes/commentRoutes";
const bodyParser = require('body-parser');
const cors = require('cors');


dbconnect();

const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use("/user",userRouter);
app.use('/project',projectRouter);
app.use('/task',taskRouter)
app.use('/comment',commentRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});




