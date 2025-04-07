import { Router } from "express";
import { CommentController } from "../controllers/commetController";
import multer from "multer";
import path from "path";
import fs from 'fs'

const commentRouter=Router()

commentRouter.post('/add/:taskId/:userId',CommentController.addComment);
commentRouter.delete('/delete/:id',CommentController.deleteComment);
commentRouter.get('/get/:taskId',CommentController.getCommentsByTaskId);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

commentRouter.post('/upload/:taskid/:userId',upload.single('file'),CommentController.addFile);
commentRouter.get('/download/:filename',CommentController.downloadFile)


export default commentRouter;

