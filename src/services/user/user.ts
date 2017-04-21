import {Injectable} from '@angular/core';
import {AngularFireAuth, AngularFireDatabase, FirebaseAuthState} from "angularfire2";
import {ANONYMOUS_USER, User} from "../../models/user";
import {Observable} from "rxjs";

import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {
  _user$: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);

  get user$() {
    return this._user$.asObservable()
  }

  constructor(private auth$: AngularFireAuth, private db: AngularFireDatabase) {
    console.log('Hello UserService Provider');

    this.auth$.subscribe((state: FirebaseAuthState) => {
      if (state) {
        this.getUser$(state.uid).subscribe(user => this._user$.next(user))
      } else {
        this._user$.next(ANONYMOUS_USER);
      }
    });
  }

  test$() {
    return Observable.of(true);
    // return this.getUserId$()
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
          this.updateUser(authState.uid, {'email': email})
        }
      )
      .catch(console.error)
  }

  private getUser$(id: string): Observable<User> {
    return this.getUserData$(id).map(user => this.mapFirebaseUserToUser(user))
  }

  private mapFirebaseUserToUser(user: { $key, name, email? }): User {
    return User.fromObject({id: user.$key, name: user.name, email: user.email})
  }

  private updateUser(id: string, changes: object): Promise<void> {
    // TODO: Check if user is authenticated

    return <Promise<any>> this.db.object(`/users/${id}`).update(changes);
  }

  private getUserData$(id: string) {
    return this.db.object(`/users/${id}`)
  }
}
