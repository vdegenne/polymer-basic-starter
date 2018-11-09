import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';

class HomeView extends PageViewElement {
  render () {
    return html`
    ${SharedStyles}
    <div class="inner">
      <p>home page</p>
    </div>
    `;
  }
}

window.customElements.define('home-view', HomeView);