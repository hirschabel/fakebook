import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentLoggedInUser: string | null = null;

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: string) {
    console.log("Set user: ", user);
    this.currentLoggedInUser = user;
  }


  getCurrentLoggedInUser() {
    return this.currentLoggedInUser;
  }
  

  // login
  login(email: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/login', body, {headers: headers, withCredentials: true})
    .pipe(tap(user => {
      if (user) {
        this.currentUserSubject.next(user as User);
      }
    }));
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('address', user.address);
    body.set('nickname', user.nickname);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers});
  }

  registerFriend(email: string) {
    const body = new URLSearchParams();

    //if (this.currentUserValue) {
      body.set('email', email);
      body.set('user', this.currentLoggedInUser as string);
      console.log('Logged in user: ', this.currentLoggedInUser);

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      return this.http.post('http://localhost:5000/app/register-friend', body, { headers: headers, withCredentials: true });
    //}
  }

  logout() {
    return this.http.post('http://localhost:5000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', {withCredentials: true});
  }
}
