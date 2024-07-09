import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private baseUrl = 'http://xoooo.runasp.net/api/Units';
  // private baseUrl = 'http://172.16.0.13:2565/api/Units';

  constructor(private http: HttpClient) { }

  getUnits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  addUnits(units: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Add`, units);
  }

  updateUnits(units: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Update`, units);
  }
  
  deleteUnits(unitId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Delete?id=${unitId}`);
  }
}