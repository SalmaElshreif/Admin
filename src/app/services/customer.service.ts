// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {

//   private baseUrl = 'http://172.16.0.13:2565/api/SubscriptionType';

//   constructor(private http: HttpClient) { }

//   getSub(): Observable<any[]> {
//     return this.http.get<any[]>(${this.baseUrl}/all);
//   }

//   addSub(subscription: any): Observable<any> {
//     return this.http.post<any>(${this.baseUrl}/Add, subscription);
//   }

//   getSubById(subscriptionTypeId: number): Observable<any> {
//     return this.http.get<any>(${this.baseUrl}/GetById/${subscriptionTypeId});
//   }


// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://xoooo.runasp.net/api/SubscriptionType';

  constructor(private http: HttpClient) { }

  getSub(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  addSub(subscription: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Add`, subscription);
  }

  getSubById(subscriptionTypeId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetById/${subscriptionTypeId}`);
  }

  updateSub(subscription: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Update`, subscription);
  }
  
  deleteSub(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Delete?id=${id}`);
  }

}