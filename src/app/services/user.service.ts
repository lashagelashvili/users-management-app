import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { User } from './model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      id: 0,
      firstName: 'test',
      lastName: 'test2',
      income: 333,
      score: 10,
      image:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    {
      id: 1,
      firstName: 'test3',
      lastName: 'test3',
      income: 333,
      score: 10,
      image:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
  ];

  users$ = new BehaviorSubject(this.users);

  constructor() {}

  getUsers() {
    return this.users$;
  }

  addUser(user: User) {
    this.users.push(user);
    this.users$.next(this.users);
  }

  getUser(id: number) {
    return this.users.find((user) => user.id === +id);
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.users$.next(this.users);
  }
}
