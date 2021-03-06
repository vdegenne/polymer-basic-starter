export const UPDATE_PAGE = 'UPDATE_PAGE';

export const navigate = (path) => (dispatch) => {

  let page = path.slice(1) || 'home',
      parts = page.split('/');

  if (getState().app.page === page) {
    return;
  }

  dispatch(loadPage(page));
};


const loadPage = (page) => (dispatch) => {
  /* uncomment imports if you want to fetch the view */
  switch (page) {
    case 'home':
      // import('../components/home.js');
      break;
    default:
      page = '404';
      // import('../components/404.js');
  }

  dispatch(updatePage(page));
}

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
}