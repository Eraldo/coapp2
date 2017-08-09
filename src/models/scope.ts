import moment from "moment";

export enum Scope {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
export const Scopes: Scope[] = [Scope.DAY, Scope.WEEK, Scope.MONTH, Scope.YEAR];

export function getScopeStart(scope: Scope, date: string) {
  switch (scope) {
    case Scope.DAY: {
      return date
    }
    case  Scope.WEEK: {
      return moment(date).startOf( 'isoWeek').format('YYYY-MM-DD')
    }
    case  Scope.MONTH: {
      return moment(date).startOf('month').format('YYYY-MM-DD')
    }
    case  Scope.YEAR: {
      return moment(date).startOf('year').format('YYYY-MM-DD')
    }
  }
}

export function getScopeEnd(scope: Scope, date: string) {
  switch (scope) {
    case Scope.DAY: {
      return date
    }
    case  Scope.WEEK: {
      return moment(date).endOf('isoWeek').format('YYYY-MM-DD')
    }
    case  Scope.MONTH: {
      return moment(date).endOf('month').format('YYYY-MM-DD')
    }
    case  Scope.YEAR: {
      return moment(date).endOf('year').format('YYYY-MM-DD')
    }
  }
}
