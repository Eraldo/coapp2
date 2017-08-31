export enum Status {
  FUTURE = 'future',
  WAITING = 'waiting',
  CURRENT = 'current',
  DONE = 'done',
  CANCELED = 'canceled',
}

export const OpenStatuses: Status[] = [Status.CURRENT, Status.WAITING, Status.FUTURE];
export const ClosedStatuses: Status[] = [Status.DONE, Status.CANCELED];
export const Statuses: Status[] = OpenStatuses.concat(ClosedStatuses);
