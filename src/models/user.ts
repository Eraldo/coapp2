export interface UserObject {
  id: string,
  name: string
  email?: string,
}

export class User implements UserObject {
  public id: string;
  public name: string;
  public email?: string;

  constructor(userObject: UserObject) {
    this.id = userObject.id;
    this.name = userObject.name;
    this.email = userObject.email;
  }

  get authenticated() {
    return !!this.id
  }

  static fromObject(userObject: UserObject) {
    return new User(userObject);
  }
}

const ANONYMOUS_USER_OBJECT: UserObject = {id: '', name: 'Anonymous'};

export const ANONYMOUS_USER = User.fromObject(ANONYMOUS_USER_OBJECT);
