import {
	generateFontScaleCSS,
	addElement,
	moveLastToFirst,
	generatePlot,
	copyCodeButtons,
	selectWholePreCode,
	traditionalScalePlot,
} from './utils.js';
import { PreviewElement } from './PreviewElement.js';

function listener() {
	customElements.define('preview-element', PreviewElement);
	//
	const previewElement = document.createElement('preview-element');

	const hostElement = document.getElementById('shadow-host');
	if (!hostElement) {
		throw new Error('Could not find #shadow-host');
	}
	hostElement.appendChild(previewElement);

	const computedFontSizes: Record<string, string> =
		previewElement.getComputedFontSizes();

	const baseSize = computedFontSizes.baseFontSize.replace('px', ''); // Base size in rem (default HTML size is 1rem)

	const baseData = Object.entries(computedFontSizes)
		.map(([key, value]) => {
			return {
				heading: key,
				rem: parseFloat(value.replace('rem', '')),
				scale: 'default scale',
			};
		})
		.filter((predicate) => predicate.heading !== 'baseFontSize');

	let plotData = baseData;
	const options = [
		['1.067', 'Minor second'],
		['1.125', 'Major second'],
		['1.200', 'Minor third'],
		['1.250', 'Major third'],
		['1.333', 'Perfect fourth'],
		['1.414', 'Augmented fourth'],
		['1.500', 'Perfect fifth'],
		['1.618', 'Golden ratio'],
		['1.732', 'Major sixth'],
		['2.000', 'Major seventh'],
		['2.500', 'Perfect octave'],
		['custom', ''],
	];
	const domain = options.map((tuple) => tuple.join(' — '));
	domain.push('default scale');
	const baseSizeInput = document.querySelector('input#basesize');
	if (!baseSizeInput || !(baseSizeInput instanceof HTMLInputElement))
		throw new Error('Could not find #basesize');
	baseSizeInput.value = baseSize;
	const costumInput = document.querySelector('input#custom');
	if (!costumInput || !(costumInput instanceof HTMLInputElement)) {
		throw new Error('Could not find input#custom');
	}

	costumInput.value = '1';
	const codeTag = document.querySelector('code#target');
	if (!codeTag || !(codeTag instanceof HTMLElement)) {
		throw new Error('Could not find code#target');
	}

	const scalesSelect = document.querySelector('select#ratios');
	if (!scalesSelect || !(scalesSelect instanceof HTMLSelectElement)) {
		throw new Error('Could not find select#ratios');
	}

	const defaultCSS = Object.entries(computedFontSizes).map(([key, value]) => {
		return key === 'baseFontSize'
			? `html { font-size: ${value}; }`
			: `${key} { font-size: ${value}; }`;
	});

	codeTag.textContent =
		'/* default css */\n' + moveLastToFirst(defaultCSS).join('\n');

	/**
	 *
	 * @param {{heading: string; rem:number; scale: string}[]} data
	 */
	const updatePlot = (
		data: {
			heading: string;
			rem: number;
			scale: string;
		}[],
	) => {
		const plot = generatePlot(data);
		const container = document.getElementById('chart-container');
		if (!container) {
			throw new Error('Could not find #chart-container');
		}
		container.innerHTML = '';
		const chartCotainer = document.getElementById('chart-container');
		if (!chartCotainer) {
			throw new Error('Could not find #chart-container');
		}
		chartCotainer.appendChild(plot);
	};

	const updateStyles = (
		scaleRatio: string,
		baseSizeInputValue: string,
		optionText: string,
	) => {
		const { baseSizeInPixelsNumber, baseSizeCSS, fontScalesCSS, data } =
			generateFontScaleCSS(scaleRatio, baseSizeInputValue);

		const setStylesOptions: Record<string, unknown> = {};
		data.forEach((d) => {
			setStylesOptions[d.heading] = d.rem;
		});
		setStylesOptions['baseFontSize'] = baseSizeInPixelsNumber;
		console.log({ setStylesOptions });
		//@ts-ignore
		previewElement.setStyles(setStylesOptions);
		codeTag.textContent =
			`/** ${optionText} */\n` +
			(baseSizeCSS?.replace(':host', 'html') ?? '') +
			'\n' +
			fontScalesCSS;
		console.log(
			optionText,
			data.map((d) => ({ ...d, scale: optionText })),
		);
		const scaleData = data.map((d) => ({ ...d, scale: optionText }));

		plotData = [...new Set([...baseData, ...scaleData])];

		updatePlot(plotData);
	};
	costumInput.addEventListener('input', function (e) {
		if (e.target && e.target instanceof HTMLInputElement) {
			const scaleRatio = e.target.value;
			updateStyles(scaleRatio, baseSizeInput.value, 'custom');
		}
	});

	baseSizeInput.addEventListener('input', function (e) {
		if (e.target && e.target instanceof HTMLInputElement) {
			let scaleRatio = scalesSelect.value;
			if (scaleRatio === 'custom') {
				scaleRatio = costumInput.value;
			}

			updateStyles(scaleRatio, e.target.value, '');
		}
	});

	scalesSelect.addEventListener('change', function (e) {
		if (e.target && e.target instanceof HTMLSelectElement) {
			const text = e.target.options[e.target.selectedIndex].textContent;
			let scaleRatio = e.target.value;
			if (scaleRatio === 'custom') {
				scaleRatio = costumInput.value;
			}

			updateStyles(scaleRatio, baseSizeInput.value, text ?? '');
		}
	});

	// Add options to the selector
	options.forEach((tuple) =>
		addElement(
			'option',
			{ value: tuple[0], textContent: tuple.join(' — ') },
			'',
			scalesSelect,
		),
	);
	scalesSelect.selectedIndex = -1;

	updatePlot(baseData);
	copyCodeButtons().catch((e) => console.error(e));
	selectWholePreCode();
	traditionalScalePlot();
}

document.addEventListener('DOMContentLoaded', listener);
