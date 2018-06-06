import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/paper-styles/paper-styles';
import '@material/mwc-icon';
import '@material/mwc-button';
import '@polymer/paper-toast/paper-toast';


import { html, LitElement } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { installRouter } from 'pwa-helpers';
import {SharedStyles} from './shared-styles';
import { navigate, updateDrawerState, updateAppBarTitle } from '../actions/app';
import { store } from '../store';


export let toast;

class MyApp extends connect(store)(LitElement) {
  
  _render({ _appBarTitle, searchMode, _page, _drawerOpened }) {

    return html`
    ${SharedStyles}
    <style>
      :host {
        --app-primary-color: #424242;
        --app-second-color: #29462a;
        --app-header-background-color: var(--app-primary-color);
        --app-header-text-color: #ffffff;
    
        --app-drawer-background-color: #f5f5f5;
        --app-drawer-text-color: #757575;
        --app-drawer-selected-color: #212121;
      }
    
      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
      }
    
      app-drawer {
        z-index: 100;
      }


      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }
    
      .drawer-list>a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
    
        outline: none;
      }
    
      .drawer-list>a[selected] {
        font-weight: bold;
        color: var(--app-drawer-selected-color);
      }
    
      .main-content {
        padding-top: 64px;
      }
    
      .page {
        display: none;
        overflow: auto;
        min-height: calc(100vh - 64px);
      }
    
      .page[active] {
        display: block;
      }
    
      mwc-icon {
        cursor: pointer;
      }
    
      #menuToggler {
        margin-right: 15px;
      }
    
      #searchInput {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        padding: 10px;
        font-size: 1em;
        border: none;
    
        background: var(--app-header-background-color);
        color: var(--app-header-text-color);
        outline: none;
    
        /* for the stretch effect */
        transition: all .1s ease-out;
        width: 0%;
        opacity: 0;
      }
    
      #searchInput[active] {
        width: 100%;
        opacity: 1;
        padding: 0 23px;
      }
    
      @media (min-width: 460px) {}
    </style>
    
    <app-header reveals>
      <app-toolbar class="inner">
        <style>
        </style>
        <input id="searchInput" type="search" placeholder="search..." active?="${searchMode}" on-blur="${_ => this.leaveSearchMode()}"
          on-search="${e => this.search(e.target.value)}">

        ${true ? html`
          <mwc-icon id="menuToggler" on-click="${_ => store.dispatch(updateDrawerState(true))}">menu</mwc-icon>
        ` : ''}
    
        <div main-title>${_appBarTitle}</div>
    
        ${true ? html`
        <mwc-icon on-click="${_ => this.enterSearchMode()}">search</mwc-icon>
        ` : ''}


      </app-toolbar>
    </app-header>
    
    <app-drawer opened?="${_drawerOpened}" on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
      <nav class="drawer-list">
        <a selected?="${_page === 'home'}" href="/home">Home</a>
        <a selected?="${_page === 'view2'}" href="/view2">View Two</a>
      </nav>
    </app-drawer>
    
    
    <main class="main-content">
      <my-view1 class="page" active?="${_page === 'home'}"></my-view1>
      <my-view2 class="page" active?="${_page === 'view2'}"></my-view2>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>


    <paper-toast id="toaster"></paper-toast>
    `;
  }
  static get properties() {
    return {
      appTitle: String,
      searchMode: Boolean,
      _page: String,
      _appBarTitle: String,
      _drawerOpened: Boolean
    }
  }
  _stateChanged(state) {
    this._page = state.app.page;
    this._appBarTitle = state.app.appBarTitle;
    this._drawerOpened = state.app.drawerOpened;
  }

  constructor() {
    super();
    this.searchMode = false;
    if (this.getAttribute('appTitle')) {
      store.dispatch(updateAppBarTitle(this.getAttribute('appTitle')));
    }
  }


  async _firstRendered() {
    // $ helper
    this.$ = {};
    this.shadowRoot.querySelectorAll('[id]').forEach(e => { this.$[e.id] = e });

    await this.renderCompletes;
    toast = this.$.toaster;

    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
  }

  async enterSearchMode() {
    this.searchMode = true;
    await this.renderCompletes;
    this.shadowRoot.querySelector('#searchInput').focus();
  }

  async leaveSearchMode() {
    this.searchMode = false;
    await this.renderCompletes;
  }

  search(query) {
    if (query) {
      alert(`Search ${query}...`);
    }
    else {
      this.searchMode = false;
    }
  }
}


window.customElements.define('my-app', MyApp);