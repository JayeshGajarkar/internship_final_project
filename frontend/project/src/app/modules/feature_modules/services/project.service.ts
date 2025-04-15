import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) {}

  getAllProjects():Observable<any>{
    return this.http.get(`http://localhost:3000/project/all`);
  }

  getAllProjectByManager(userId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/project/manager/${userId}`);
  }

  getAllProjectByEmployee(userId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/project/employee/${userId}`);
  }

  addProject(project:Project):Observable<any>{
    return this.http.post(`http://localhost:3000/project/add`,project);
  }

  updateProject(project:Project,projectId:number):Observable<any>{
    return this.http.put(`http://localhost:3000/project/update/${projectId}`,project);
  }

  deleteProject(projectId:number):Observable<any>{
    return this.http.delete(`http://localhost:3000/project/delete/${projectId}`);
  }
}
