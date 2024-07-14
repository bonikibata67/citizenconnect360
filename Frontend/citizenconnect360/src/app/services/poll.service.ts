import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poll, PollOption } from '../models/polls';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private polls: Poll[] = [];

  private pollsSubject: BehaviorSubject<Poll[]> = new BehaviorSubject<Poll[]>(this.polls);
  public polls$: Observable<Poll[]> = this.pollsSubject.asObservable();

  constructor() {}

  getPolls(): Poll[] {
    return this.polls;
  }

  addPoll(poll: Poll): void {
    this.polls.push(poll);
    this.pollsSubject.next(this.polls);
  }

  deletePoll(index: number): void {
    this.polls.splice(index, 1);
    this.pollsSubject.next(this.polls);
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class PollService {

//   constructor() { }
// }
