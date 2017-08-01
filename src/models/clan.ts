import {User} from "./user";

export interface ClanObject {
  id: string;
  name: string;
  members: string[];
  createdAt?: Date;
  modifiedAt?: Date;
}

export type PartialClan = Partial<ClanObject>;

export class Clan implements ClanObject {
  id: string;
  name: string;
  members: string[];
  createdAt?: Date;
  modifiedAt?: Date;

  constructor(clanObject: ClanObject) {
    Object.assign(this, clanObject);
  }

  get isOpen() {
    return this.members.length < 4
  }
}
