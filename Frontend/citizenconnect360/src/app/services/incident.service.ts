import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {  

  private incidentsSubject = new BehaviorSubject<any[]>([]);
  private incidents: any[] = [];

  constructor() {}

  getIncidents(): Observable<any[]> {
    return this.incidentsSubject.asObservable();
  }

  addIncident(incident: any) {
    this.incidents.push(incident);
    this.incidentsSubject.next([...this.incidents]);
  }
}
