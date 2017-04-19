import {Injectable} from '@angular/core';
import {AngularFireAuth, AngularFireDatabase, FirebaseAuthState} from "angularfire2";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ANONYMOUS_USER, User} from "../../models/user";
import {Observable} from "rxjs";

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private authState: FirebaseAuthState;
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);

  constructor(private auth$: AngularFireAuth, private db: AngularFireDatabase) {
    console.log('Hello UserService Provider');

    this.auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;

      if (state) {
        const user = this.getUserById(state.uid);
        this.user$.next(user);
      }
      else {
        this.user$.next(ANONYMOUS_USER);
      }
    });

  }

  test$() {
    return this.getUser$()
  }

  getUserId$(): Observable<string> {
    return this.auth$.map(authState => authState.uid)
  }

  getUser$() {
    return this.getUserId$()
      .switchMap(id => this.getUserData$(id))
      .do(console.log)
      .map(user => this.mapFirebaseUserToUser(user))
  }

  updateName(name: string) {
    this.updateUser(this.authState.uid, {'name': name});
  }

  logout(): Promise<void> {
    return this.auth$.logout();
  }

  login(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({email, password});
  }

  get authenticated(): boolean {
    return this.authState !== null;
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
      .catch(error => console.log(`res error: ${error}`))
  }


  private mapFirebaseUserToUser(user: { $key, name, email? }): User {
    return User.fromObject({id: user.$key, name: user.name, email: user.email})
  }

  private updateUser(id: string, changes: object): firebase.Promise<void> {
    return this.db.object(`/users/${id}`).update(changes);
  }

  private getUserById(id: string): User {
    const user = new User({id: id, name: 'Someone'});
    return user
  }

  private getUserData$(id: string) {
    return this.db.object(`/users/${id}`)
  }
}
