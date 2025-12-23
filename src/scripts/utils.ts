import * as Plot from '@observablehq/plot';
export function moveLastToFirst(arr: unknown[]) {
	if (arr.length <= 1) {
		return [...arr];
	}

	return [arr[arr.length - 1], ...arr.slice(0, -1)];
}

/**
 *
 * @param {string} scaleRatioInput
 * @param {string} baseSizeInPixels
 * @returns {{baseSizeInPixelsNumber: number;fontScalesCSS: string, baseSizeCSS: string, data: {heading: "h1"|"h2"|"h3"|"h4"|"h5"|"h6", rem: number, scale: string}[]}}
 */
export function generateFontScaleCSS(
	scaleRatioInput: string,
	baseSizeInPixels = '16',
) {
	// Convert the scale ratio to a number if it's not custom
	const scaleRatio = parseFloat(scaleRatioInput);
	if (isNaN(scaleRatio)) {
		alert('Scale ratio is not a number.');
		console.error('Scale ratio is not a number.');
		return { baseSizeCSS: null, fontScalesCSS: null, data: [] };
	}

	// Define the order of the headers
	const headers = ['h6', 'h5', 'h4', 'h3', 'h2', 'h1'];

	// Calculate the font sizes based on the scale ratio
	const baseSizeCSS = `:host { font-size: ${baseSizeInPixels}px; }`;
	let fontScalesCSS = ``;
	let size = 1 / Math.pow(scaleRatio, 2); //scaleRatio; // Start with h6 being the base size multiplied by the scale ratio
	const ratios: string[] = [];
	const data: { heading: string; rem: number }[] = [];
	headers.forEach((header) => {
		const rem = Math.round(size * 1000) / 1000;
		data.push({ heading: header, rem });
		ratios.push(
			`${header} { font-size: ${Math.round(size * 1000) / 1000}rem; }`,
		);
		size *= scaleRatio; // Increase size for each header
	});

	fontScalesCSS += `${ratios.reverse().join('\n')}`;
	data.reverse();
	const baseSizeInPixelsNumber = parseFloat(baseSizeInPixels);
	return { fontScalesCSS, baseSizeCSS, data, baseSizeInPixelsNumber };
}

export function addElement(
	tag: string,
	attributes: Record<string, string>,
	text: string,
	parent: HTMLElement,
) {
	const el = document.createElement(tag);
	Object.entries(attributes).forEach(([key, value]) => {
		if (key in el) {
			(el as any)[key] = value;
		} else {
			el.setAttribute(key, value);
		}
	});
	if (text) {
		el.textContent = text;
	}
	parent.appendChild(el);
	return el;
}

export function traditionalScalePlot() {
	const data = [
		{ incr: '+1', size: '6pt', y: 6 },
		{ incr: '+1', size: '7pt', y: 7 },
		{ incr: '+1', size: '8pt', y: 8 },
		{ incr: '+1', size: '9pt', y: 9 },
		{ incr: '+1', size: '10pt', y: 10 },
		{ incr: '+1', size: '11pt', y: 11 },
		{ incr: '+2', size: '12pt', y: 12 },
		{ incr: '+2', size: '14pt', y: 14 },
		{ incr: '+2', size: '16pt', y: 16 },
		{ incr: '+2', size: '18pt', y: 18 },
		{ incr: '+3', size: '21pt', y: 21 },
		{ incr: '+3', size: '24pt', y: 24 },
		{ incr: '+12', size: '36pt', y: 36 },
		{ incr: '+12', size: '48pt', y: 48 },
		{ incr: '+12', size: '60pt', y: 60 },
		{ incr: '+12', size: '72pt', y: 72 },
	];
	const plot = Plot.plot({
		marginTop: 25,
		marginRight: 0,
		marginBottom: 30,
		marginLeft: 25,
		grid: true,
		x: {
			// type: 'point',
			domain: data.map((d) => d.size),
			label: '',
		},
		y: {
			domain: [0, 80],
			label: 'Size in points',
		},
		marks: [
			Plot.dot(data, { x: 'size', y: 'y' }),
			Plot.lineY(data, { x: 'size', y: 'y' }),
		],
	});

	const plotContainer = document.querySelector('#traditional-scale-plot');
	if (plotContainer) {
		plotContainer.appendChild(plot);
	}
}
/**
 *
 * @param {{heading: string; rem: number; scale: string}[]} plotData
 * @returns {*}
 */
export function generatePlot(
	plotData: {
		heading: string;
		rem: number;
		scale: string;
	}[],
) {
	const plot = Plot.plot({
		marginTop: 25,
		marginRight: 100,
		marginBottom: 25,
		marginLeft: 25,
		grid: true,

		// aspectRatio: true,
		// color: {
		//   // domain,
		//   // legend: true,
		// },
		// y: {
		//   domain: [0, 2],
		// },
		marks: [
			//@ts-ignore
			Plot.ruleY([1], { stroke: 'red', strokeDasharray: [5, 20] }),
			Plot.lineY(plotData, {
				x: 'heading',
				y: 'rem',
				curve: 'monotone-x',
				z: 'scale',
				stroke: 'scale',
			}),
			Plot.dot(plotData, {
				x: 'heading',
				y: 'rem',
				//@ts-ignore
				z: 'scale',
				stroke: 'scale',
			}),
			Plot.text(
				plotData,
				Plot.selectLast({
					x: 'heading',
					y: 'rem',
					z: 'scale',
					text: 'scale',
					lineAnchor: 'top',
					textAnchor: 'start',
					dy: -3,
					dx: 10,
					fill: 'scale',
				}),
			),
		],
	});
	return plot;
}

/**
 * Taken from https://www.roboleary.net/2022/01/13/copy-code-to-clipboard-blog.html
 */

export async function copyCodeButtons() {
	const copyCode = async (block: HTMLElement, button: HTMLElement) => {
		let code = block.querySelector('code');
		if (!code) return;
		let text = code.innerText;
		button.classList.add('clicked');
		await navigator.clipboard.writeText(text);

		// visual feedback that task is completed
		// button.innerText = 'Code Copied';

		setTimeout(() => {
			button.classList.remove('clicked');
			// button.innerText = copyButtonLabel;
		}, 700);
	};

	// use a class selector if available
	let blocks = document.querySelectorAll('pre');

	blocks.forEach((block) => {
		// only add button if browser supports Clipboard API
		if (navigator.clipboard) {
			let button = document.createElement('button');

			block.appendChild(button);

			button.addEventListener('click', async () => {
				await copyCode(block, button);
			});
		}
	});
}

export function selectWholePreCode() {
	const selectableCodes = document.querySelectorAll('pre');

	selectableCodes.forEach((pre) => {
		pre.addEventListener('click', (event) => {
			// Prevent selection if the click was on the copy button
			if (event.target && (event.target as HTMLElement).tagName === 'BUTTON')
				return;

			const range = document.createRange();
			range.selectNodeContents(pre);

			const selection = window.getSelection();
			if (selection) {
				selection.removeAllRanges();
				selection.addRange(range);
			}
		});
	});
}
