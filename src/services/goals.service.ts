import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Goal } from 'src/app/Models/goal';



@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  private url="http://localhost:8080/api/v1/";
  constructor(private httpClient : HttpClient) { }

  getGoalsList(): Observable<Goal[]>{
    return this.httpClient.get<Goal[]>(`${this.url+'goals'}`);
  }

  getGoalsCount(): Observable<Goal[]>{
    return this.httpClient.get<Goal[]>(`${this.url+'count_goals'}`);
  }

  createGoal(goal:Goal): Observable<Object>{
    return this.httpClient.post(`${this.url+'goals'}`,goal);
  }

  GetGoalById(id:number): Observable<Goal>{
    return this.httpClient.get<Goal>(`${this.url+'goals'}/${id}`);
  }

  updateGoal(id : number , goal: Goal): Observable<Object>{
    return this.httpClient.put(`${this.url+'goals'}/${id}`,goal);
  }

  deleteGoal(id : number): Observable<Object>{
    return this.httpClient.delete(`${this.url+'goals'}/${id}`);
  }


}
