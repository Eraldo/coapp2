export enum Status {
  OPEN = <any>'open',
  WAITING = <any>'waiting',
  DONE = <any>'done',
  CANCELED = <any>'canceled',
}

export const OpenStatuses: Status[] = [Status.OPEN, Status.WAITING];
export const ClosedStatuses: Status[] = [Status.DONE, Status.CANCELED];
export const Statuses: Status[] = OpenStatuses.concat(ClosedStatuses);
