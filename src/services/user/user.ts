import {Injectable} from '@angular/core';
import {AngularFireAuth, AngularFireDatabase, FirebaseAuthState} from "angularfire2";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ANONYMOUS_USER, User} from "../../models/user";

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

  private updateUser(id: string, changes: object): firebase.Promise<void> {
    return this.db.object(`/users/${id}`).update(changes);
  }

  private getUserById(id: string): User {
    const user = new User(id, 'Someone');
    return user
  }

  getUserData(id: string) {
    const userData = this.db.object(`/users/${id}`);
    userData.subscribe(console.log);
  }

  updateName(name: string) {
    alert('TODO: updateName');
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
}
