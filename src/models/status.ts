export enum Status {
  OPEN = 'open',
  WAITING = 'waiting',
  DONE = 'done',
  CANCELED = 'canceled',
}

export const OpenStatuses: Status[] = [Status.OPEN, Status.WAITING];
export const ClosedStatuses: Status[] = [Status.DONE, Status.CANCELED];
export const Statuses: Status[] = OpenStatuses.concat(ClosedStatuses);
