/**
 * Search Bar Preview
 */
export default class SearchBarPreview {
	/**
	 * Construct new search bar preview instance
	 */
	constructor() {
		this.previewContainer = Array.from(document.querySelectorAll('.yxt-SearchBar-wrapper'));
		this.settings = document.querySelector('#yext-settings');
		this.wizard = document.querySelector('#yext-wizard');
		this.target = this.settings ?? this.wizard;
	}

	/**
	 * Initialize preview.
	 */
	init() {
		if (!this.previewContainer.length || !this.target) {
			return;
		}

		this.handleFormChange();
		this.handleIconChange();
		this.handleInputChange();
		this.initStickyBits();
	}

	/**
	 * Initialize Sticky Bits
	 *
	 */
	initStickyBits() {
		import('stickybits').then(({ default: stickybits }) => {
			stickybits('#yext-search-bar-preview', {
				noStyles: true,
			});
		});
	}

	/**
	 * Handle submit icon animation.
	 */
	handleIconChange() {
		this.previewContainer.forEach(
			/**
			 * Handle submit icon animation on each preview container.
			 *
			 * @param {HTMLElement} container Preview container.
			 */
			(container) => {
				/**
				 * @type {HTMLInputElement}
				 */
				const input = container.querySelector('.yxt-SearchBar-input');
				const searchIcon = container.querySelector('.js-yxt-AnimatedForward');
				const yextIcon = container.querySelector('.js-yxt-AnimatedReverse');

				input.addEventListener(
					'focus',
					/**
					 * Animate search icon
					 */
					() => {
						searchIcon.classList.remove('yxt-SearchBar-Icon--inactive');
						yextIcon.classList.add('yxt-SearchBar-Icon--inactive');
					},
				);

				input.addEventListener(
					'blur',
					/**
					 * Animate Yext icon
					 */
					() => {
						if (!input.value.trim()) {
							searchIcon.classList.add('yxt-SearchBar-Icon--inactive');
							yextIcon.classList.remove('yxt-SearchBar-Icon--inactive');
						}
					},
				);
			},
		);
	}

	/**
	 * Handle Input Change.
	 *
	 * Used to toggle the autocomplete component.
	 */
	handleInputChange() {
		this.previewContainer.forEach(
			/**
			 * Handle submit icon animation on each preview container.
			 *
			 * @param {HTMLElement} container Preview container.
			 */
			(container) => {
				/**
				 * @type {HTMLInputElement}
				 */
				const input = container.querySelector('.yxt-SearchBar-input');
				const autocomplete = container.querySelector('.yxt-SearchBar-autocomplete');
				const clear = container.querySelector('.yxt-SearchBar-clear');

				input.addEventListener(
					'input',
					/**
					 * Animate search icon
					 */
					() => {
						autocomplete.classList[input.value.trim() ? 'remove' : 'add'](
							'component--is-hidden',
						);
						clear.classList[input.value.trim() ? 'remove' : 'add'](
							'yxt-SearchBar--hidden',
						);
					},
				);
			},
		);
	}

	/**
	 * Form change handler.
	 *
	 * @returns {void}
	 */
	handleFormChange() {
		const form = this.target.querySelector('form');

		if (form instanceof HTMLFormElement) {
			for (let i = 0; i < form.elements.length; i++) {
				form.elements[i].addEventListener(
					'input',

					/**
					 * Input event handler
					 *
					 * @param {Event} event Input event
					 */
					(event) => {
						const { target } = event;

						if (
							target instanceof HTMLInputElement ||
							target instanceof HTMLSelectElement
						) {
							const cssVariable = target.getAttribute('data-variable');

							if (cssVariable) {
								this.updateCSSVariable(cssVariable, target.value);
							}

							if (target.name.includes('[props]')) {
								this.updateElementPreview(target.id, target.value);
							}
						}
					},
				);
			}
		}
	}

	/**
	 * Update CSS variable inline.
	 *
	 * @param {string} key The CSS variable name.
	 * @param {string} value The new value.
	 *
	 */
	updateCSSVariable(key, value) {
		this.previewContainer.forEach(
			/**
			 * Update CSS variables on each preview container.
			 *
			 * @param {HTMLElement} container Preview container.
			 */
			(container) => {
				const cssValue =
					key.includes('font-size') || key.includes('border-radius')
						? `${value}px`
						: value;

				container.style.setProperty(key, cssValue);
			},
		);
	}

	/**
	 * Form change listener.
	 *
	 * @param {string} target The target element.
	 * @param {string} value The new value.
	 */
	updateElementPreview(target, value) {
		this.previewContainer.forEach(
			/**
			 * Update placeholder text on each preview container.
			 *
			 * @param {HTMLElement} container Preview container.
			 */
			async (container) => {
				switch (target) {
					case 'placeholder_text':
						container
							.querySelector('.yxt-SearchBar-input')
							.setAttribute(
								'placeholder',
								await import('dompurify').then(({ default: DOMPurify }) =>
									DOMPurify.sanitize(value),
								),
							);
						break;
					case 'prompt_header':
						container.querySelector(
							'.yxt-AutoComplete-option--promptHeader',
						).textContent = value;
						break;
					case 'submit_icon':
						container.querySelector('.yxt-SearchBar-buttonImage').innerHTML = value
							? await import('dompurify').then(({ default: DOMPurify }) =>
									DOMPurify.sanitize(this.renderCustomIcon(value)),
								)
							: '';

						container
							.querySelector('.yxt-SearchBar-YextIcon')
							.classList[value ? 'add' : 'remove']('yxt-SearchBar--hidden');
						break;
					default:
						break;
				}
			},
		);
	}

	renderCustomIcon(icon) {
		return window.YEXT.icons[icon]
			? `
			<div class="Icon Icon--${icon}" aria-hidden="true">
				${window.YEXT.icons[icon]}
			</div>
		`
			: '';
	}
}
