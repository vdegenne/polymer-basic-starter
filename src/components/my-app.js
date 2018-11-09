import { LitElement, html } from "@polymer/lit-element";
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from "pwa-helpers/connect-mixin.js";
import { installRouter } from 'pwa-helpers/router.js'
import { store } from '../store';
import { navigate } from "../actions/app";
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { SharedStyles } from "./shared-styles";

/* elements */
import '@material/mwc-icon/mwc-icon.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-styles/paper-styles.js';

/* prefetched views */
import './home-view.js';
import './not-found-view.js';
import { triggerKeys, toast } from "../util";


class MyApp extends connect(store)(LitElement) {
  static get properties () { return {
    appTitle: { type: String },
    _drawerOpened: { type: Boolean },
    _page: { type: String },
    _searchMode: { type: Boolean }
  }}

  constructor() {
    super();
    this._registerEvents();
    setPassiveTouchGestures(true);
  }
  stateChanged(state) {
    this._page = state.app.page;
  }

  _registerEvents () {
    /* click */
    this.addEventListener('click', (e) => {
      if (e.path[0].id !== 'searchInput' && e.path[2].id !== 'searchbutton') {
        this._searchMode = false;
      }
    });
    /* keypress */
    window.addEventListener('keydown', (e) => {
      if (e.altKey) { return }
      if (this._searchMode) { return }
      if ((!e.ctrlKey && triggerKeys.includes(e.keyCode)) || e.ctrlKey && e.keyCode === 86) {
        this.search();
        window.scrollTo(0, 0);
      }
    });
  }

  render () {
    return html`
    ${SharedStyles}
    <style>
      :host {
        --app-header-background-color: var(--paper-blue-700);
      }

      app-header {
        position: fixed;
        top: 0;
        width: 100%;
        /* text-align: center; */
        background-color: var(--app-header-background-color);
        color: #fff;
        border-bottom: 1px solid #eee;
      }

      app-toolbar {
        position: relative;
      }

      [main-title] {
        margin-left: 12px;
      }

      #searchInput {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 24px;
        background: var(--app-header-background-color);
        color: #fff;
        border: none;
      }
      #searchInput::placeholder {
        color: rgba(255, 255, 255, .6);
      }
      #searchInput::-webkit-search-cancel-button {
        display: none;
      }
      #searchbutton {
        z-index: 4;
      }

      app-drawer {
        z-index: 4;
      }

      #drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: #fff;
        position: relative;
      }

      #drawer-list > a {
        display: block;
        text-decoration: none;
        color: #121212;
        line-height: 40px;
        padding: 0 24px;
      }

      #drawer-list > a[selected] {
        font-weight: 900;
        color: var(--paper-blue-700);
      }

      main {
        display: block;
        padding-top: 64px;
        min-height: calc(100vh - 106px);
      }

      main > * {
        display: none;
      }

      main > *[active] {
        display: block;
        padding-bottom: 30px;
        overflow: auto;
      }

      footer {
        height: 42px;
        background: var(--paper-grey-600);
        color: #fff;
      }
    </style>
    
    <app-header condenses>
      <app-toolbar class="inner">
        <input id="searchInput" type="search" placeholder="type something..." @search="${this.search}" ?hide="${!this._searchMode}">
        <mwc-icon @click="${() => this._drawerOpened = true}">menu</mwc-icon>
        <div main-title>${this.appTitle}</div>
        <mwc-icon id="searchbutton" @click="${this.search}">search</mwc-icon>
      </app-toolbar>
    </app-header>

    <!-- Drawer content -->
    <app-drawer .opened="${this._drawerOpened}" @opened-changed="${e => this._drawerOpened = e.detail.value}" @click="${e => this._drawerOpened = false}">
      <nav id="drawer-list">
        <a ?selected="${this._page === 'home'}" href="/home">home</a>
        <a ?selected="${this._page === '404'}" href="/deadend">404</a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main">
      <home-view ?active="${this._page === 'home'}"></home-view>
      <not-found-view ?active="${this._page === '404'}"></not-found-view>
    </main>

    <footer class="middle">
      <span>&copy; ${(new Date).getFullYear()} %appname%</span>
    </footer>

    <paper-toast id="toaster"></paper-toast>
    `;
  }

  updated(changedProps) {
    if (changedProps.has('_searchMode') && changedProps.get('_searchMode')) {
      this.shadowRoot.getElementById('searchInput').value = '';
    }

    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }

  firstUpdated() {
    window.toaster = this.shadowRoot.getElementById('toaster');

    window.changeLocation = (location) => {
      let path = decodeURIComponent(location.pathname || location);
      if (path[0] !== '/') { path = '/' + path }
      if (this.path && this.path === path) {
        return;
      }
      this.path = path;
      if (!location.pathname) {
        history.pushState({}, '', path);
      }
      let queryIndex = path.indexOf('?');
      store.dispatch(navigate(queryIndex >= 0 ? path.substr(0, queryIndex) : path));
      // gtag('config', window.gtagid, { 'page_path': path });
      window.dispatchEvent(new CustomEvent('locationChanged'));
    };
    installRouter(window.changeLocation);
  }

  async search () {
    const input = this.shadowRoot.getElementById('searchInput');
    if (!this._searchMode) {
      this._searchMode = true;
      await this.updateComplete;
      input.focus();
      return;
    }
    /* implement */
    if (input.value) {
      toast(input.value);
    }

    input.value = '';
    this._searchMode = false;
  }
}

window.customElements.define('my-app', MyApp);