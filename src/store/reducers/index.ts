import {createSelector} from 'reselect';
import {ActionReducer} from '@ngrx/store';
// import * as fromRouter from '@ngrx/router-store';
import {environment} from '../../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import {compose} from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import {combineReducers} from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromLayout from './layout';
import * as fromUsers from './users';
import * as fromExperience from './experience';
import * as fromOffice from './office';
import * as fromCommunity from './community';
import * as fromStudio from './studio';
import * as fromScope from './scope';
import * as fromDate from './date';
import {Scope, Scopes} from "../../models/scope";


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  layout: fromLayout.State;
  users: fromUsers.State;
  experience: fromExperience.State
  office: fromOffice.State;
  community: fromCommunity.State;
  studio: fromStudio.State;
  scope: fromScope.State;
  date: fromDate.State;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  layout: fromLayout.reducer,
  users: fromUsers.reducer,
  experience: fromExperience.reducer,
  office: fromOffice.reducer,
  community: fromCommunity.reducer,
  studio: fromStudio.reducer,
  scope: fromScope.reducer,
  date: fromDate.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
// export const getBooksState = (state: State) => state.books;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */
// export const getBookEntities = createSelector(getBooksState, fromBooks.getEntities);
// export const getBookIds = createSelector(getBooksState, fromBooks.getIds);
// export const getSelectedBookId = createSelector(getBooksState, fromBooks.getSelectedId);
// export const getSelectedBook = createSelector(getBooksState, fromBooks.getSelected);


/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
// export const getSearchState = (state: State) => state.search;

// export const getSearchBookIds = createSelector(getSearchState, fromSearch.getIds);
// export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
// export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);


/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
// export const getSearchResults = createSelector(getBookEntities, getSearchBookIds, (books, searchIds) => {
//   return searchIds.map(id => books[id]);
// });


// export const getCollectionState = (state: State) => state.collection;

// export const getCollectionLoaded = createSelector(getCollectionState, fromCollection.getLoaded);
// export const getCollectionLoading = createSelector(getCollectionState, fromCollection.getLoading);
// export const getCollectionBookIds = createSelector(getCollectionState, fromCollection.getIds);

// export const getBookCollection = createSelector(getBookEntities, getCollectionBookIds, (entities, ids) => {
//   return ids.map(id => entities[id]);
// });

// export const isSelectedBookInCollection = createSelector(getCollectionBookIds, getSelectedBookId, (ids, selected) => {
//   return ids.indexOf(selected) > -1;
// });

/**
 * Users Reducers
 */
export const getUsersState = (state: State) => state.users;

export const getUsersLoading = createSelector(getUsersState, fromUsers.getLoading);
export const getUsersLoaded = createSelector(getUsersState, fromUsers.getLoaded);

export const getToken = createSelector(getUsersState, fromUsers.getToken);
export const getUsers = createSelector(getUsersState, fromUsers.getUsers);
export const getCurrentUserId = createSelector(getUsersState, fromUsers.getCurrentUserId);
export const getCurrentUser = createSelector(getUsersState, fromUsers.getCurrentUser);
export const getAuthenticated = createSelector(getUsersState, fromUsers.getAuthenticated);

/**
 * Experience Reducers
 */
export const getExperienceState = (state: State) => state.experience;

export const getExperience = createSelector(getExperienceState, fromExperience.getExperience);


/**
 * Scope Reducers
 */
export const getScopeState = (state: State) => state.scope;

export const getScope = createSelector(getScopeState, fromScope.getScope);


/**
 * Date Reducers
 */
export const getDateState = (state: State) => state.date;

export const getDate = createSelector(getDateState, fromDate.getDate);


/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;

export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);


/**
 * Office Reducers
 */
export const getOfficeState = (state: State) => state.office;

export const getOfficeLoading = createSelector(getOfficeState, fromOffice.getLoading);
export const getOfficeLoaded = createSelector(getOfficeState, fromOffice.getLoaded);

export const getOutcomes = createSelector(getOfficeState, fromOffice.getOutcomes);
export const getSteps = createSelector(getOfficeState, fromOffice.getSteps);
export const getFocuses = createSelector(getOfficeState, fromOffice.getFocuses);

export const getInboxOutcomes = createSelector(getOutcomes, (outcomes) => {
  return outcomes.filter(outcome => outcome.inbox);
});
export const getOpenOutcomes = createSelector(getOutcomes, (outcomes) => {
  return outcomes.filter(outcome => outcome.isOpen);
});
export const getScopedOutcomes = createSelector(getScope, getOutcomes, (scope, outcomes) => {
  return outcomes.filter(outcome => outcome.scope == scope);
});
export const getCurrentFocus = createSelector(getScope, getDate, getFocuses, (scope, date, focuses) => {
  return focuses.find(focus => focus.scope == scope && focus.start == date);
});
export function getOpenOutcomesLimit(scope: Scope) {
  switch (scope) {
    case Scope.DAY: {
      return 10;
    }
    case  Scope.WEEK: {
      return 20;
    }
    case  Scope.MONTH: {
      return 40;
    }
    case  Scope.YEAR: {
      return 80
    }
    default:
      return 0;
  }
}
export const canAddOutcomes = createSelector(getScopedOutcomes, getScope, (outcomes, scope) => {
  return outcomes.filter(outcome => outcome.isOpen && !outcome.inbox).length < getOpenOutcomesLimit(scope);
});
export const createableOutcomeScopes = createSelector(getOpenOutcomes, (outcomes) => {
  return Scopes.filter(scope => {
    const outcomesForScope = outcomes.filter(outcome => !outcome.inbox && outcome.scope == scope).length;
    const limitForScope = getOpenOutcomesLimit(scope);
    return outcomesForScope < limitForScope;
  })
});


/**
 * Community Reducers
 */
export const getCommunityState = (state: State) => state.community;

export const getCommunityLoading = createSelector(getCommunityState, fromCommunity.getLoading);
export const getCommunityLoaded = createSelector(getCommunityState, fromCommunity.getLoaded);

export const getDuos = createSelector(getCommunityState, fromCommunity.getDuos);
export const getClans = createSelector(getCommunityState, fromCommunity.getClans);
export const getTribes = createSelector(getCommunityState, fromCommunity.getTribes);

export const getCurrentDuo = createSelector(getCurrentUser, getDuos, (user, duos) => {
  return duos.filter(duo => duo.id === user.duo)[0];
});


/**
 * Studio Reducers
 */
export const getStudioState = (state: State) => state.studio;

export const getStudioLoading = createSelector(getStudioState, fromStudio.getLoading);
export const getStudioLoaded = createSelector(getStudioState, fromStudio.getLoaded);

export const getJournalEntries = createSelector(getStudioState, fromStudio.getJournalEntries);

export const getCurrentJournalEntry = createSelector(getJournalEntries, getScope, getDate, (entries, scope, date) => {
  // TODO: Checking if the date needs to be scoped to find the right entries.
  console.log('>>', entries, scope, date);
  console.log(entries.find(entry => entry.scope == scope && entry.start == date));
  return entries.find(entry => entry.scope == scope && entry.start == date);
});


/**
 * Misc Reducers
 */
export const getLoading = createSelector(
  getUsersLoading, getCommunityLoading, getOfficeLoading,
  (...loadingStates) => loadingStates.some(isLoading => isLoading));
export const getLoaded = createSelector(
  getUsersLoaded, getCommunityLoaded, getOfficeLoaded,
  (...loadedStates) => loadedStates.some(isLoaded => isLoaded));
