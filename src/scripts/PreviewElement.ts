//@ts-check
export class PreviewElement extends HTMLElement {
	shadowRoot;
	styles;
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'closed' });
		this.shadowRoot = shadow;
		const style = document.createElement('style');
		style.id = 'preview-element-styles';
		this.styles = style;
		shadow.appendChild(this.styles);
		this.setStyles({
			h1: 2,
			h2: 1.5,
			h3: 1.17,
			h4: 1,
			h5: 0.83,
			h6: 0.67,
			baseFontSize: 16,
		});
		const section = document.createElement('section');
		section.id = 'preview-element';
		section.innerHTML = /*html*/ `
		     <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <p>
        Yes we calculate the size based on <code>h4</code> being <code>1rem</code>. Why?<br> In my humble opinion if you
        have a semantic depth in your document that needs 6 levels of headings, something is wrong with the structure of
        your content. This might be only me, but I would argue that you should rethink the structure instead of nesting
        it so deeply.
      </p>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
		`;
		shadow.appendChild(section);
	}
	/**
	 *
	 * @param {{h1:number;h2:number;h3:number;h4:number;h5:number;h6:number;baseFontSize:number}} options
	 */
	setStyles({ h1, h2, h3, h4, h5, h6, baseFontSize }: Record<string, number>) {
		this.styles.textContent = /*css*/ `
		:host {
      all: initial;
      font-family: Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro,
    sans-serif;
    font-weight: normal;
    line-height: 1.5;
    --base-font-size: ${baseFontSize}px;
			font-size: var(--base-font-size);
		}
		section#preview {
      font-size: var(--base-font-size);

    }
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	section#preview {
		overflow: hidden;
		max-width: 90vw;
		line-height: 1.5;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p {
		margin-bottom: 1rem;
	}
		h1 { font-size: calc(var(--base-font-size) * ${h1}); }
    h2 { font-size: calc(var(--base-font-size) * ${h2}); }
    h3 { font-size: calc(var(--base-font-size) * ${h3}); }
    h4 { font-size: calc(var(--base-font-size) * ${h4}); }
    h5 { font-size: calc(var(--base-font-size) * ${h5}); }
    h6 { font-size: calc(var(--base-font-size) * ${h6}); }
		p { font-size:  calc(var(--base-font-size) * ${1}); }
		code{ font-size:calc(var(--base-font-size) * ${0.86}); }

	/* h1 {
		font-size: ${h1}rem;
	}

	h2 {
		font-size: ${h2}rem;
	}

	h3 {
		font-size: ${h3}rem;
	}

	h4 {
		font-size: ${h4}rem;
	}

	h5 {
		font-size: ${h5}rem;
	}

	h6 {
		font-size: ${h6}rem;
	} */



	@media screen and (min-width: 1000px) {
		#preview {
			overflow: hidden !important;
			max-width: 100% !important;
		}

		#preview>p {
			max-width: 55ch;
		}
	}
	`;
	}
	getComputedFontSizes() {
		const headersAndP = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
		const result: Record<string, string> = {};

		headersAndP.forEach((tag) => {
			const element = this.shadowRoot.querySelector(tag);
			if (element) {
				const fontSize = window.getComputedStyle(element).fontSize;
				result[tag] = fontSize;
			} else {
				console.warn(`${tag} element not found.`);
			}
		});

		const basePixelSize = parseFloat(
			getComputedStyle(this.shadowRoot.host).fontSize,
		);
		// Convert pixel sizes to rem
		Object.keys(result).forEach((tag) => {
			const pixelSize = parseFloat(result[tag]);
			const remSize = pixelSize / basePixelSize;

			result[tag] = remSize + 'rem';
		});
		result['baseFontSize'] = basePixelSize + 'px';

		return result;
	}
}
