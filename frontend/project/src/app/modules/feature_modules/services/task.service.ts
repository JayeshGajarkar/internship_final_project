import { Injectable } from '@angular/core';
import { Task } from '../../../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  addTask(task:Task,projectId:number):Observable<any>{
    return this.http.post(`http://localhost:3000/task/add/${projectId}`,task);
  }

  getTasksByPorjectId(projectId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/task/get/${projectId}`);
  }

  updateTask(taskId:number,task:Task):Observable<any>{
    return this.http.put(`http://localhost:3000/task/update/${taskId}`,task);
  }

  deleteTask(taskid:number):Observable<any>{
    return this.http.delete(`http://localhost:3000/task/delete/${taskid}`)
  }
}
