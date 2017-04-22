export interface UserObject {
  id: string,
  name: string
  email?: string,
  image?: string,
}

export class User implements UserObject {
  public id: string;
  public name: string;
  public email?: string;
  public image?: string;

  constructor(userObject: UserObject) {
    this.id = userObject.id;
    this.name = userObject.name;
    this.email = userObject.email;
    this.image = userObject.image;
  }

  get authenticated() {
    return !!this.id
  }

  static fromObject(userObject: UserObject) {
    return new User(userObject);
  }
}

const DEFAULT_USER_IMAGE = 'http://santetotal.com/wp-content/uploads/2014/05/default-user.png';

const ANONYMOUS_USER_OBJECT: UserObject = {id: undefined, name: 'Anonymous', image: DEFAULT_USER_IMAGE};

export const ANONYMOUS_USER: User = User.fromObject(ANONYMOUS_USER_OBJECT);
