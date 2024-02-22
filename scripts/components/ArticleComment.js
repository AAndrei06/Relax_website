class ArticleComment extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadowRoot.innerHTML = `
      <style>
        *
      {
        margin : 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Poppins, Roboto;
        user-select: none;
        z-index: 3;
      }
      img {
            pointer-events: none;
            border-radius: inherit;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        :host {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        :host>.header {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        :host>.header>.img {
            width: 64px;
            height: 64px;
            border-radius: 100px;
            box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.10), 0px 3px 3px 0px rgba(0, 0, 0, 0.09), 0px 6px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 4px 0px rgba(0, 0, 0, 0.01), 0px 16px 5px 0px rgba(0, 0, 0, 0.00);
        }

        :host>.header>.text {
            display: flex;
            flex-direction: column;
        }

        :host>.header>.text>.name {
            color: var(--day-dark01);
            font-size: 24px;
            font-weight: 700;
            line-height: 150%;

        }

        :host>.header>.text>.date {
            color: var(--day-dark04);
            font-size: 14px;
            font-weight: 600;
        }

        :host>p {
            color: var(--day-dark02);
            font-size: 20px;
            font-weight: 500;
            line-height: 175%;
            word-break: break-all;
        }
      </style>

      
    
        <div class="header">
            <div class="img">
                <img src="${this.getAttribute('img')}" alt="Imaginea de profil a lui ${this.getAttribute('name')}">
            </div>
            <div class="text">
                <div class="name">${this.getAttribute('name')}</div>
                <div class="date">${this.getAttribute('date')}</div>
            </div>
        </div>
        <p>${this.getAttribute('text')}</p>

    `;
    }

}

window.customElements.define("article-comment", ArticleComment)