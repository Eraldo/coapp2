import {User} from "./user";

export interface TribeObject {
  id: string;
  name: string;
  members: string[];
  createdAt?: Date;
  modifiedAt?: Date;
}

export type PartialTribe = Partial<TribeObject>;

export class Tribe implements TribeObject {
  id: string;
  name: string;
  members: string[];
  createdAt?: Date;
  modifiedAt?: Date;

  constructor(tribeObject: TribeObject) {
    Object.assign(this, tribeObject);
  }
}
