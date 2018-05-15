import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/paper-styles/paper-styles';
import '@material/mwc-icon';

import { html, LitElement } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { installRouter } from 'pwa-helpers';

import { navigate, updateDrawerState } from '../actions/app';
import { store } from '../store';

class TestApp extends connect
  (store)(LitElement) {
  _render({ appTitle, searchMode, _page, _drawerOpened }) {

    const menuAddon = html`<mwc-icon on-click="${_ => store.dispatch(updateDrawerState(true))}">menu</mwc-icon>`;
    const searchAddon = html`<mwc-icon on-click="${_ => this.enterSearchMode()}">search</mwc-icon>`;

    return html`
    <style>
      :host {
        --app-header-background-color: #424242;
        --app-header-text-color: #ffffff;
      }
    
      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
      }
    
      .main-content {
        padding-top: 64px;
        min-height: 100vh;
      }
    
      .page {
        display: none;
      }
    
      .page[active] {
        display: block;
      }
    
      mwc-icon {
        cursor: pointer;
      }
    
      @media (min-width: 460px) {}
    </style>
    
    <app-header reveals>
      <app-toolbar>
        <style>
          #searchInput {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            padding: 10px;
            font-size: 1em;
            border: none;
    
            /* for the stretch effect */
            transition: all .1s ease-out;
            width: 0%;
            opacity: 0;
          }
    
          #searchInput[active] {
            width: 100%;
            opacity: 1;
          }
        </style>
        <input id="searchInput" type="search" placeholder="search..." active?="${searchMode}" on-blur="${_ => this.leaveSearchMode()}"
          on-search="${e => this.search(e.target.value)}" /> ${menuAddon}
    
        <div main-title>${appTitle}</div>
    
        ${null && searchAddon}
      </app-toolbar>
    </app-header>
    
    <app-drawer opened?="${_drawerOpened}" on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
      <nav>
        <a href="/view2">View Two</a>
      </nav>
    </app-drawer>
    
    <main class="main-content">
      <my-view1 class="page" active?="${_page === 'view1'}"></my-view1>
      <my-view2 class="page" active?="${_page === 'view2'}"></my-view2>
    </main>
    `;
  }
  static get properties() {
    return {
      appTitle: String,
      searchMode: Boolean,
      _page: String,
      _drawerOpened: Boolean
    }
  }
  _stateChanged(state) {
    this._page = state.app.page;
    this._drawerOpened = state.app.drawerOpened;
  }

  constructor() {
    super();
    this.searchMode = false;
  }

  _firstRendered() {
    installRouter(
      (location) => store.dispatch(
        navigate(window.decodeURIComponent(location.pathname))));
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


window.customElements.define('test-app', TestApp);