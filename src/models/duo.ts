import {User} from "./user";

export interface DuoObject {
  id: string;
  name: string;
  members: string[];
  createdAt?: Date;
  modifiedAt?: Date;
}

export type PartialDuo = Partial<DuoObject>;

export class Duo implements DuoObject {
  id: string;
  name: string;
  members: string[];
  createdAt?: Date;
  modifiedAt?: Date;

  constructor(duoObject: DuoObject) {
    Object.assign(this, duoObject);
  }

  get isOpen() {
    return this.members.length < 2
  }
}
