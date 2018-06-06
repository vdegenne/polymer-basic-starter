import { UPDATE_PAGE, UPDATE_OFFLINE, UPDATE_DRAWER_STATE, UPDATE_APP_BAR_TITLE } from '../actions/app.js';


const app = (state = { drawerOpened: false }, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      };
    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened
      }
    case UPDATE_APP_BAR_TITLE:
      return {
        ...state,
        appBarTitle: action.title
      };
    default:
      return state;
  }
}

export default app;