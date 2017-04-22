export enum Status {
  OPEN = <any>'open',
  WAITING = <any>'waiting',
  DONE = <any>'done',
  CANCELED = <any>'canceled',
}

export const STATUSES: Status[] = [Status.OPEN, Status.WAITING, Status.DONE, Status.CANCELED];
