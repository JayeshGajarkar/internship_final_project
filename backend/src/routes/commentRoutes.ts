import { Router } from "express";
import { CommentController } from "../controllers/commetController";
import multer from "multer";
import path from "path";
import fs from 'fs'
import { Authentication } from "../middlewares/authentication";

const commentRouter=Router()

commentRouter.post('/add/:taskId/:userId',Authentication.authenticateJWT,CommentController.addComment);
commentRouter.delete('/delete/:id',Authentication.authenticateJWT,CommentController.deleteComment);
commentRouter.get('/get/:taskId',Authentication.authenticateJWT,CommentController.getCommentsByTaskId);

//create configuration for storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//create instal of storage
const upload = multer({ storage: storage });

const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


//request object is populated with file object
commentRouter.post('/upload/:taskid/:userId',upload.single('file'),Authentication.authenticateJWT,CommentController.addFile);


commentRouter.get('/download/:filename',Authentication.authenticateJWT,CommentController.downloadFile)


export default commentRouter;

