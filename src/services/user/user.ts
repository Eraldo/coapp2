import {Injectable} from '@angular/core';
import {AngularFireAuth, AngularFireDatabase, FirebaseAuthState} from "angularfire2";
import {ANONYMOUS_USER, User} from "../../models/user";
import {Observable} from "rxjs";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import moment from "moment";

@Injectable()
export class UserService {
  _user$: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);
  _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  get user$() {
    return this._user$.asObservable()
  }

  get users$() {
    return this._users$.asObservable()
  }

  constructor(private auth$: AngularFireAuth, private db: AngularFireDatabase) {
    console.log('Hello UserService Provider');

    this.auth$.subscribe((state: FirebaseAuthState) => {
      if (state) {
        this.getUser$(state.uid).subscribe(user => this._user$.next(user))
      } else {
        // TODO: Take 'frozen' user from cookie if present.
        this._user$.next(ANONYMOUS_USER);
      }
    });
  }

  test$() {
    // return Observable.of(true);
    return this.getUsersByIds$(['3VkZKpXlrzVi4nVHJKalUOTMKPF2', 'icrYpwoJWfPDvpQl9CyHtKdXSy72']).take(1)
  }

  getUserId$(): Observable<string> {
    return this.auth$
      .map(authState => authState ? authState.uid : undefined)
  }

  updateName(name: string): Promise<void> {
    return this.updateUser(this._user$.value.id, {'name': name});
  }

  logout(): Promise<void> {
    return this.auth$.logout();
  }

  login(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({email, password});
  }

  get authenticated$(): Observable<boolean> {
    return this._user$.map(user => user.authenticated)
  }

  testLogin() {
    const email = 'cotester@mailinator.com';
    const password = 'tester';
    this.login(email, password)
  }

  join(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.auth$.createUser({email, password})
      .then(authState => {
          // Update email address in the database.
          const name = email.split('@')[0];
          const createdAt = moment().toISOString();
          const chapter = 0;

          this.updateUser(authState.uid, {email, name, createdAt, chapter})
        }
      )
      .catch(console.error)
  }

  private getUser$(id: string): Observable<User> {
    return this.getUserData$(id).map(user => this.mapFirebaseUserToUser(user))
  }

  private mapFirebaseUserToUser(firebaseUserObject): User {
    // Mapping `$key` to `id`.
    firebaseUserObject['id'] = firebaseUserObject.$key;
    return User.fromObject(firebaseUserObject);
  }

  private updateUser(id: string, changes: object): Promise<void> {
    // TODO: Check if user is authenticated?

    return <Promise<any>> this.db.object(`/users/${id}`).update(changes);
  }

  private getUserData$(id: string) {
    return this.db.object(`/users/${id}`)
  }

  getUsers$(): Observable<User[]> {
    return this.db.list(`/users`)
      .map(users => users
        .map(user => this.mapFirebaseUserToUser(user)))
  }

  getUsersByIds$(ids: string[]): Observable<User[]> {
    return this.getUsers$()
      .map(users => users
        .filter(user => ids.indexOf(user.id) > -1)
      )
  }

}
