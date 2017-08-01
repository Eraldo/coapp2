export interface UserObject {
  id: string,
  name: string,
  username: string,
  email?: string,
  image?: string,
  purpose?: string,
  gender?: string,
  duo?: string,
  clan?: string,
  tribe?: string,
  isAdmin?: boolean,
  chapter?: number,
  createdAt?: string,
}

export class User implements UserObject {
  public id: string;
  public name: string;
  public username: string;
  public email?: string;
  public image?: string;
  public purpose?: string;
  public gender?: string;
  public duo?: string;
  public clan?: string;
  public tribe?: string;
  public isAdmin?: boolean;
  public chapter?: number;
  public createdAt?: string;

  constructor(userObject: UserObject) {
    this.id = userObject.id;
    this.name = userObject.name;
    this.username = userObject.username;
    this.email = userObject.email;
    this.image = userObject.image;
    this.purpose = userObject.purpose;
    this.gender = userObject.gender;
    this.duo = userObject.duo;
    this.clan = userObject.clan;
    this.tribe = userObject.tribe;
    this.isAdmin = userObject.isAdmin;
    this.chapter = userObject.chapter;
    this.createdAt = userObject.createdAt;
  }

  get authenticated() {
    return !!this.id
  }

  get imageOrDefault() {
    return this.image || ANONYMOUS_USER.image
  }
}

export type PartialUser = Partial<UserObject>;

const DEFAULT_USER_IMAGE = 'http://santetotal.com/wp-content/uploads/2014/05/default-user.png';

const ANONYMOUS_USER_OBJECT: UserObject = {id: '', name: 'Anonymous', username: 'anonymous', image: DEFAULT_USER_IMAGE, chapter: 0};

export const ANONYMOUS_USER: User = new User(ANONYMOUS_USER_OBJECT);
