import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  getCommentsByTaskId(taskId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/comment/get/${taskId}`);
  }

  addComment(comment:Comment,taskId:number,userId:number):Observable<any>{
    return this.http.post(`http://localhost:3000/comment/add/${taskId}/${userId}`,comment)
  }

  deleteComment(commentId:number):Observable<any> {
    return this.http.delete(`http://localhost:3000/comment/delete/${commentId}`)
  }

  sendFile(taskId:number,userId:number,fileData:FormData):Observable<any>{
    return this.http.post(`http://localhost:3000/file/upload/${taskId}/${userId}`,fileData)
  }

  downloadFile(fileName:string):Observable<any>{
    return this.http.get(`http://localhost:3000/file/download/${fileName}`,{ responseType: 'blob'});
  }
}
