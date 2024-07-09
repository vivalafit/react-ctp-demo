import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid black;
      padding: 16px;
      max-width: 200px;
    }
    h2 {
      color: blue;
    }
  `;

  render() {
    return html`
      <h2>Hello from LitElement!</h2>
      <p>This is a Lit web component.</p>
    `;
  }
}

customElements.define('my-component', MyComponent);