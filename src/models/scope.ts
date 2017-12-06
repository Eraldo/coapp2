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

export function getSubScope(scope: Scope) {
  return Scopes[Scopes.indexOf(scope) - 1];
}

export function getSuperScope(scope: Scope) {
  return Scopes[Scopes.indexOf(scope) + 1];
}

export function getNextScopedDate(scope: Scope, date: string) {
  switch (scope) {
    case Scope.DAY: {
      return moment(date).add(1, 'day').format('YYYY-MM-DD')
    }
    case  Scope.WEEK: {
      return moment(date).add(1, 'week').format('YYYY-MM-DD')
    }
    case  Scope.MONTH: {
      return moment(date).add(1, 'month').format('YYYY-MM-DD')
    }
    case  Scope.YEAR: {
      return moment(date).add(1, 'year').format('YYYY-MM-DD')
    }
  }
}

export function getPreviousScopedDate(scope: Scope, date: string) {
  switch (scope) {
    case Scope.DAY: {
      return moment(date).subtract(1, 'day').format('YYYY-MM-DD')
    }
    case  Scope.WEEK: {
      return moment(date).subtract(1, 'week').format('YYYY-MM-DD')
    }
    case  Scope.MONTH: {
      return moment(date).subtract(1, 'month').format('YYYY-MM-DD')
    }
    case  Scope.YEAR: {
      return moment(date).subtract(1, 'year').format('YYYY-MM-DD')
    }
  }
}

