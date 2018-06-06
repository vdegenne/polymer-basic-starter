export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const UPDATE_APP_BAR_TITLE = 'UPDATE_APP_BAR_TITLE';


export const navigate = (path) => (dispatch) => {

  let page = path.slice(1) || 'home';

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};


const loadPage = (page) => async (dispatch) => {
  switch (page) {
    case 'home':
      await import('../components/my-view1.js');
      // Put code here that you want it to run every time when
      // navigate to view1 page and my-view1.js is loaded
      break;
    case 'view2':
      await import('../components/my-view2.js');
      break;
    default:
      page = 'view404';
      await import('../components/my-view404.js');
  }

  dispatch(updatePage(page));
}

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
}

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

export const updateLayout = (wide) => (dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
}

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
}


export const updateAppBarTitle = (title) => (dispatch) => {
  dispatch({
    type: UPDATE_APP_BAR_TITLE,
    title
  });
}