import moment from "moment";

export enum Scope {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
export const Scopes: Scope[] = [Scope.DAY, Scope.WEEK, Scope.MONTH, Scope.YEAR];

export function getScopeEnd(scope: Scope, start: string) {
  switch (scope) {
    case Scope.DAY: {
      return start
    }
    case  Scope.WEEK: {
      return moment(start).add(6, 'days').format('YYYY-MM-DD')
    }
    case  Scope.MONTH: {
      return moment(start).endOf('month').format('YYYY-MM-DD')
    }
    case  Scope.YEAR: {
      return moment(start).endOf('year').format('YYYY-MM-DD')
    }
  }
}
