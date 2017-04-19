export class User {

  constructor (
    public id: string,
    public name: string
  ) {

  }

  get authenticated() {
    return !!this.id
  }
}

export const ANONYMOUS_USER = new User('', 'Tourist');
