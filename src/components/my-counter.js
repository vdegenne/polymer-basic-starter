import { LitElement, html } from "@polymer/lit-element";


class MyCounter extends LitElement {
  _render({ count }) {
    return html`
    <style>
      :host {
        color: white;
        font-size: 3em;
        cursor: pointer;
        user-select: none;
      }
    </style>
    ${count}
    `;
  }
  static get properties() {
    return {
      count: Number,
      startingFrom: Number
    }
  }

  constructor() {
    super();
    this.count = 0;
    if (this.getAttribute('startingFrom')) {
      this.count = this.getAttribute('startingFrom');
    }

    this.addEventListener('click', this.inc);
  }

  inc() {
    this.count++;
    this.dispatchEvent(new CustomEvent('counter-change', { bubbles: false, composed: true, detail: { count: this.count } }));
  }
}

window.customElements.define('my-counter', MyCounter);