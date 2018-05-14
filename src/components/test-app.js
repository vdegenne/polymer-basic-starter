import { html, LitElement } from '@polymer/lit-element';

import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/paper-styles/paper-styles';

import { connect } from "pwa-helpers";
import { installRouter } from 'pwa-helpers';
import { update as updateCounter, navigate } from '../actions/app';
import { store } from '../store';
import "./my-counter";
import "./cute-counter";


class TestApp extends connect(store)(LitElement) {
  _render({ appTitle, _page }) {
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
    
      [main-title] {}
    
      .page {
        display: none;
      }
    
      .page[active] {
        display: block;
      }
    </style>
    
    <app-header>
      <app-toolbar>
        <mwc-icon>all_out</mwc-icon>
        <div main-title>${appTitle}</div>
      </app-toolbar>
    </app-header>
    
    <app-drawer opened?="false">
      <nav>
        <a href="/view2">View Two</a>
      </nav>
    </app-drawer>
    
    <main>
      <my-view1 class="page" active?="${_page === 'view1'}"></my-view1>
      <my-view2 class="page" active?="${_page === 'view2'}"></my-view2>
    </main>
    
    <footer>
      <p>made with &lt;3</p>
    </footer>
    `;
  }
  static get properties() {
    return {
      appTitle: String,
      _page: String
    }
  }


  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
  }

  _locationChanged(location) {
    // console.log(location);
  }

  _stateChanged(state) {
    this._page = state.app.page;
  }
}


window.customElements.define('test-app', TestApp);