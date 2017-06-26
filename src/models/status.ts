export enum Status {
  OPEN = 'open',
  WAITING = 'waiting',
  DONE = 'done',
  CANCELED = 'canceled',
}

export const Statuses: Status[] = [Status.OPEN, Status.WAITING, Status.DONE, Status.CANCELED];
