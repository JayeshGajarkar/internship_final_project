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
}
