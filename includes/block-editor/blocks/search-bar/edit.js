/**
 * External dependencies
 */
import camelcaseKeys from 'camelcase-keys';
import DOMPurify from 'dompurify';

/**
 * Internal dependencies
 */
import Inspector from './inspector';

const {
	// @ts-ignore
	wp,
	YEXT: {
		icons,
		settings: { components },
	},
} = window;

const {
	searchBar: {
		props: {
			submitText: defaultSubmitText,
			submitIcon: defaultSubmitIcon,
			placeholderText: defaultPlaceholderText,
			labelText: defaultLabelText,
			promptHeader: defaultPromptHeader,
		},
	},
} = camelcaseKeys(components, { deep: true });

const { __ } = wp.i18n;
const { useBlockProps } = wp.blockEditor;
const { useRef, useState, useEffect } = wp.element;

const INACTIVE_ICON_CLASSNAME = 'yxt-SearchBar-Icon--inactive';
const HIDDEN_COMPONENT_CLASSNAME = 'component--is-hidden';

/**
 * Search bar component for block editor.
 *
 * @param {object} props Component props.
 * @returns {object} Block component.
 */
const Edit = (props) => {
	const {
		attributes: {
			placeholderText = defaultPlaceholderText ?? null,
			submitText = defaultSubmitText ?? null,
			submitIcon = defaultSubmitIcon ?? '',
			labelText = defaultLabelText ?? null,
			promptHeader = defaultPromptHeader ?? null,
		},
	} = props;
	const blockProps = useBlockProps();
	const [inputValue, setInputValue] = useState('');
	const searchIcon = useRef(null);
	const yextIcon = useRef(null);
	const searchBar = useRef(null);
	const autocomplete = useRef(null);
	const clear = useRef(null);

	useEffect(() => {
		autocomplete.current.classList[inputValue.trim() ? 'remove' : 'add'](
			HIDDEN_COMPONENT_CLASSNAME,
		);
		clear.current.classList[inputValue.trim() ? 'remove' : 'add']('yxt-SearchBar--hidden');
	}, [inputValue]);

	return (
		<>
			<Inspector searchBar={searchBar} {...props} />
			<div {...blockProps}>
				<div ref={searchBar} className="yxt-Answers-component yxt-SearchBar-wrapper">
					<div className="yxt-SearchBar">
						<div className="yxt-SearchBar-container">
							<div className="yxt-SearchBar-form">
								<input
									className="js-yext-query yxt-SearchBar-input"
									id="yxt-SearchBar-input--search-bar"
									type="text"
									name="query"
									value={inputValue}
									placeholder={placeholderText}
									autoComplete="off"
									aria-label={labelText}
									onChange={(event) => {
										setInputValue(event.target.value);
									}}
									onFocus={() => {
										searchIcon.current.classList.remove(
											INACTIVE_ICON_CLASSNAME,
										);
										yextIcon.current.classList.add(INACTIVE_ICON_CLASSNAME);
									}}
									onBlur={() => {
										if (!inputValue.trim()) {
											yextIcon.current.classList.remove(
												INACTIVE_ICON_CLASSNAME,
											);
											searchIcon.current.classList.add(
												INACTIVE_ICON_CLASSNAME,
											);
										}
									}}
								/>
								<button
									ref={clear}
									type="button"
									className="js-yxt-SearchBar-clear yxt-SearchBar-clear yxt-SearchBar--hidden"
								>
									<div className="Icon Icon--close " aria-hidden="true">
										<svg viewBox="0 1 24 24" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M7 8l9.716 9.716m0-9.716L7 17.716"
												stroke="currentColor"
												strokeWidth="2"
											/>
										</svg>
									</div>
									<span className="yxt-SearchBar-clearButtonText sr-only">
										Clear
									</span>
								</button>
								<button
									type="submit"
									className="js-yext-submit yxt-SearchBar-button"
								>
									{submitIcon && icons[submitIcon] ? (
										<div className="yxt-SearchBar-buttonImage js-yxt-SearchBar-buttonImage js-yxt-SearchBar-Icon">
											<div
												className={`Icon Icon--${submitIcon}`}
												aria-hidden="true"
												// eslint-disable-next-line react/no-danger
												dangerouslySetInnerHTML={{
													__html: DOMPurify.sanitize(icons[submitIcon]),
												}}
											/>
										</div>
									) : null}
									<div className={submitIcon ? ' yxt-SearchBar--hidden' : ''}>
										<div
											ref={searchIcon}
											className="yxt-SearchBar-AnimatedIcon js-yxt-AnimatedForward js-yxt-SearchBar-Icon yxt-SearchBar-Icon--inactive"
										>
											<div
												className="Icon Icon--yext_animated_forward Icon--lg"
												aria-hidden="true"
											>
												<svg
													viewBox="0 0 72 72"
													xmlns="http://www.w3.org/2000/svg"
												>
													<defs>
														<mask id="search-bar_forward_Mask-1">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_forward_Mask-2">
															<rect
																x="-144.3"
																y="144.3"
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M-0.3 .1c0 0 1.3 1.2 1.3 1.2c0 0 .3-1.6 .3-1.6c0 0-1.6 .4-1.6 .4" />
															<path
																fill="#fff"
																d="M.3 .7c0 0-0.3 .3-0.3 .3c0 0 0 0 0 0c0 0 .3-0.3 .3-0.3c0 0 0 0 0 0"
															/>
															<path d="M.3 .7c0 0-0.1 0-0.1 0c0 0 .1 .1 .1 .1c0 0 .1-0.1 .1-0.1c0 0-0.1 0-0.1 0m222.8 469.1c0 0-70.5 69.4-70.5 69.4c0 0 34.1 33.5 34.1 33.5c0 0 67-72.9 67-72.9c0 0-30.6-30-30.6-30" />
														</mask>
														<mask id="search-bar_forward_Mask-3">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M489.8 277.4c0 0 78 18.8 78 18.8c0 0-96.1 61.5-96.1 61.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-13.9 14-13.9 14m-67.8-108.1c0 0 73.9 1.3 73.9 1.3c0 0-33.8 54.5-33.8 54.5c0 0 18.6-3.2 18.6-3.2c0 0 35.4-36.5 35.4-36.5c0 0-62-25.9-62-25.9c0 0-32.1 9.8-32.1 9.8" />
														</mask>
														<mask id="search-bar_forward_Mask-4">
															<rect
																x="-91.1"
																y="91.1"
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M-0.3 .1c0 0 1.3 1.2 1.3 1.2c0 0 .3-1.6 .3-1.6c0 0-1.6 .4-1.6 .4" />
															<path
																fill="#fff"
																d="M.3 .7c0 0-0.3 .3-0.3 .3c0 0 0 0 0 0c0 0 .3-0.3 .3-0.3c0 0 0 0 0 0"
															/>
															<path d="M.3 .7c0 0-0.1 0-0.1 0c0 0 .1 .1 .1 .1c0 0 .1-0.1 .1-0.1c0 0-0.1 0-0.1 0m222.8 469.1c0 0-70.5 69.4-70.5 69.4c0 0 34.1 33.5 34.1 33.5c0 0 67-72.9 67-72.9c0 0-30.6-30-30.6-30" />
														</mask>
														<mask id="search-bar_forward_Mask-5">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M488.4 291.4c0 0 40.5 39.3 40.5 39.3c0 0-57.2 27-57.2 27c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-15.3 28-15.3 28m-90.5-97.4c0 0 52-11.3 52-11.3c0 0-6 45.2-6 45.2c0 0 36.8-6 36.8-6c0 0 39.3-31.9 39.3-31.9c0 0-65.9-30.5-65.9-30.5c0 0-56.2 34.5-56.2 34.5" />
														</mask>
														<mask id="search-bar_forward_Mask-6">
															<rect
																x="-61.3"
																y="61.3"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_forward_Mask-7">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M481.8 298.4c0 0 27.5 39.8 27.5 39.8c0 0-37.6 19.5-37.6 19.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-21.9 35-21.9 35m-108.1-79.7c0 0 30.2-23.8 30.2-23.8c0 0 21.7 35.9 21.7 35.9c0 0 55.1-8.9 55.1-8.9c0 0 35.4-36.5 35.4-36.5c0 0-62-25.9-62-25.9c0 0-80.4 59.2-80.4 59.2" />
														</mask>
														<mask id="search-bar_forward_Mask-8">
															<rect
																x="-42.6"
																y="42.6"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_forward_Mask-9">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M475.2 305.4c0 0 14.5 40.3 14.5 40.3c0 0-18 12-18 12c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-28.5 42-28.5 42m-113.6-74.3c0 0 17.9-18.5 17.9-18.5c0 0 36.4 25.3 36.4 25.3c0 0 64.8-16 64.8-16c0 0 39.3-31.9 39.3-31.9c0 0-65.9-30.5-65.9-30.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_forward_Mask-10">
															<rect
																x="-29.6"
																y="29.6"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_forward_Mask-11">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M468.6 312.4c0 0 1.5 40.8 1.5 40.8c0 0 1.6 4.5 1.6 4.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-35.1 49-35.1 49m-107-81.3c0 0 15.1 4.9 15.1 4.9c0 0 38.2 13.3 38.2 13.3c0 0 65.8-27.4 65.8-27.4c0 0 39.3-21.9 39.3-21.9c0 0-65.9-40.5-65.9-40.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_forward_Mask-12">
															<rect
																x="-20.3"
																y="20.3"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_forward_Mask-13">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M456.6 311.9c0 0-7 35.6-7 35.6c0 0 22.1 10.2 22.1 10.2c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-47.1 48.5-47.1 48.5m-95-80.8c0 0 12.3 28.3 12.3 28.3c0 0 39.9 1.3 39.9 1.3c0 0 66.9-38.8 66.9-38.8c0 0 39.3-21.9 39.3-21.9c0 0-65.9-40.5-65.9-40.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_forward_Mask-14">
															<rect
																x="-13.4"
																y="13.4"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_forward_Mask-15">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M444.6 311.4c0 0-15.6 30.5-15.6 30.5c0 0 42.7 15.8 42.7 15.8c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-59.1 48-59.1 48m-83-80.3c0 0 9.5 51.7 9.5 51.7c0 0 41.7-10.8 41.7-10.8c0 0 67.9-50.1 67.9-50.1c0 0 50.6-31.9 50.6-31.9c0 0-77.2-30.5-77.2-30.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_forward_Mask-16">
															<rect
																x="-7.3"
																y="7.3"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_forward_Mask-17">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M432.6 310.9c0 0-24.2 25.3-24.2 25.3c0 0 63.3 21.5 63.3 21.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-71.1 47.5-71.1 47.5m-71-79.8c0 0 20.3 90.4 20.3 90.4c0 0 29-29.5 29-29.5c0 0 69.8-70.1 69.8-70.1c0 0 35.4-36.5 35.4-36.5c0 0-62-25.9-62-25.9c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_forward_Mask-18">
															<rect
																x="-4"
																y="4"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_forward_Mask-19">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M432.6 310.9c0 0-24.2 25.3-24.2 25.3c0 0 63.3 21.5 63.3 21.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-71.1 47.5-71.1 47.5m-71-79.8c0 0 20.3 90.4 20.3 90.4c0 0 29-29.5 29-29.5c0 0 69.8-70.1 69.8-70.1c0 0 39.3-31.9 39.3-31.9c0 0-65.9-30.5-65.9-30.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_forward_Mask-20">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<clipPath id="search-bar_forward_ClipPath-1">
															<rect width="720" height="720" />
														</clipPath>
													</defs>
													<g transform="translate(0,0) scale(.1,.1)">
														<g mask="url(#search-bar_forward_Mask-1)">
															<path d="M377.5 395.3c0 0 64.8 0 64.8 0c0 0 0 129.6 0 129.6c0 0 28.8 0 28.8 0c0 0 0-129.6 0-129.6c0 0 64.8 0 64.8 0c0 0 0-28.8 0-28.8c0 0-158.4 0-158.4 0c0 0 0 28.8 0 28.8Z" />
															<path d="M338.9 363.6c0 0-62.5 62.4-62.5 62.4c0 0-62.4-62.4-62.4-62.4c0 0-20.4 20.4-20.4 20.4c0 0 62.5 62.4 62.5 62.4c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 62.5 62.4 62.5 62.4c0 0 20.3-20.4 20.3-20.4c0 0-62.4-62.4-62.4-62.4c0 0 62.4-62.4 62.4-62.4c0 0-20.3-20.4-20.3-20.4Z" />
															<path d="M454.7 345.8c44.8 0 81-36.3 81-81c0 0-28.8 0-28.8 0c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3c0 0 69.8-69.9 69.8-69.9c0 0 21.1-21 21.1-21c-14.4-22.3-39.5-37-68-37c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81Zm0-133.2c10.2 0 19.6 2.9 27.6 7.9c0 0-71.9 71.8-71.9 71.8c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2Z" />
															<path d="M276.4 255.9c0 0-60.7-72.8-60.7-72.8c0 0-22.1 18.6-22.1 18.6c0 0 68.4 82 68.4 82c0 0 0 62.4 0 62.4c0 0 28.8 0 28.8 0c0 0 0-62.6 0-62.6c0 0 68.4-81.8 68.4-81.8c0 0-22-18.6-22-18.6c0 0-60.8 72.8-60.8 72.8Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-353.7c195.2 0 353.7 158.5 353.7 353.7c0 195.2-158.5 353.7-353.7 353.7c-195.2 0-353.7-158.5-353.7-353.7c0-195.2 158.5-353.7 353.7-353.7Z"
															fill="none"
															transform="translate(359.8,360.4) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-2)"
															transform="translate(144.3,-144.3)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-3)"
														>
															<path d="M390.6 395.2c0 0 51.7 .1 51.7 .1c0 0 .1 103.6 .1 103.6c0 0 28.7 0 28.7 0c0 0 0-103.6 0-103.6c0 0 52-0.1 52-0.1c0 0 0-28.4 0-28.4c0 0-132.5 0-132.5 0c0 0 0 28.4 0 28.4Z" />
															<path d="M329 373.4c0 .1-52.6 52.6-52.6 52.6c0 0-62.4-62.4-62.4-62.4c0 0-20.4 20.4-20.4 20.4c0 0 62.5 62.4 62.5 62.4c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 62.5 62.4 62.5 62.4c0 0 20.3-20.4 20.3-20.4c0 0-62.4-62.4-62.4-62.4c0 0 52.6-52.6 52.6-52.6c0 0-20.4-20.3-20.4-20.3Z" />
															<path d="M454.7 345.8c44.8 0 81-36.3 81-81c0 0-28.8 0-28.8 0c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3c0 0 69.8-69.9 69.8-69.9c0 0 21.1-21 21.1-21c-14.4-22.3-39.5-37-68-37c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81Zm0-133.2c10.2 0 19.6 2.9 27.6 7.9c0 0-71.9 71.8-71.9 71.8c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2Z" />
															<path d="M276.4 255.9c0 0-48.7-58.3-48.7-58.3c0 0-21.1 19-21.1 19c0 0 55.5 67.2 55.5 67.2c0 0 .3 50 .3 50c0 0 28.4 0 28.4 0c0 0 0-50.3 0-50.3c0 0 55.4-66.9 55.4-66.9c0 0-21-18.6-21-18.6c0 0-48.8 57.9-48.8 57.9Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-336.2c185.6 0 336.2 150.6 336.2 336.2c0 185.6-150.6 336.2-336.2 336.2c-185.6 0-336.2-150.6-336.2-336.2c0-185.6 150.6-336.2 336.2-336.2Z"
															fill="none"
															display="block"
															transform="translate(370.8,347.5) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															mask="url(#search-bar_forward_Mask-4)"
															transform="translate(91.1,-91.1)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g mask="url(#search-bar_forward_Mask-5)">
															<path d="M409.7 395.1c0 0 32.6 .2 32.6 .2c0 0 .3 65.5 .3 65.5c0 0 28.5 0 28.5 0c0 0 0-65.5 0-65.5c0 0 33.1-0.2 33.1-0.2c0 0 0-27.8 0-27.8c0 0-94.5 0-94.5 0c0 0 0 27.8 0 27.8Z" />
															<path d="M319.7 382.8c0 0-43.3 43.2-43.3 43.2c0 0-62.4-62.4-62.4-62.4c0 0-20.4 20.4-20.4 20.4c0 0 62.5 62.4 62.5 62.4c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 62.5 62.4 62.5 62.4c0 0 20.3-20.4 20.3-20.4c0 0-62.4-62.4-62.4-62.4c0 0 43.4-43.3 43.4-43.3c0 0-20.5-20.3-20.5-20.3Z" />
															<path
																d="M502.8 199.6c-13.4-9.9-30-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l69.8-69.9l.3-0.2l-20.3-20.4l-71.2 71.1c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 255.9c0 0-31.1-37-31.1-37c0 0-19.7 19.5-19.7 19.5c0 0 36.7 45.6 36.7 45.6c0 0 .7 31.8 .7 31.8c0 0 27.7 0 27.7 0c0 0 0-32.4 0-32.4c0 0 36.5-44.9 36.5-44.9c0 0-19.6-18.6-19.6-18.6c0 0-31.2 36-31.2 36Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-310c171.1 0 310 138.9 310 310c0 171.1-138.9 310-310 310c-171.1 0-310-138.9-310-310c0-171.1 138.9-310 310-310Z"
															fill="none"
															transform="translate(387.8,328.7) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-6)"
															transform="translate(61.3,-61.3)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g mask="url(#search-bar_forward_Mask-7)">
															<path d="M420.4 395c0 0 21.9 .3 21.9 .3c0 0 .4 44.1 .4 44.1c0 0 28.4 0 28.4 0c0 0 0-44.1 0-44.1c0 0 22.6-0.3 22.6-0.3c0 0 0-27.5 0-27.5c0 0-73.3 0-73.3 0c0 0 0 27.5 0 27.5Z" />
															<path d="M313.2 389.2c0 0-36.8 36.8-36.8 36.8c0 0-62.4-62.4-62.4-62.4c0 0-20.4 20.4-20.4 20.4c0 0 62.5 62.4 62.5 62.4c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 62.5 62.4 62.5 62.4c0 0 20.3-20.4 20.3-20.4c0 0-62.4-62.4-62.4-62.4c0 0 37-36.9 37-36.9c0 0-20.6-20.3-20.6-20.3Z" />
															<path
																d="M500 200c-13.4-9.9-27.2-16.2-45.3-16.2c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l57.7-57.7l-20.3-20.4l-58.8 58.7c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 255.9c0 0-21.2-25.1-21.2-25.1c0 0-19 19.8-19 19.8c0 0 26.2 33.5 26.2 33.5c0 0 1 21.6 1 21.6c0 0 27.2 0 27.2 0c0 0 0-22.3 0-22.3c0 0 25.9-32.7 25.9-32.7c0 0-18.8-18.6-18.8-18.6c0 0-21.3 23.8-21.3 23.8Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-294.3c162.4 0 294.3 131.9 294.3 294.3c0 162.4-131.9 294.3-294.3 294.3c-162.4 0-294.3-131.9-294.3-294.3c0-162.4 131.9-294.3 294.3-294.3Z"
															fill="none"
															display="block"
															transform="translate(398.7,318.2) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															mask="url(#search-bar_forward_Mask-8)"
															transform="translate(42.6,-42.6)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-9)"
														>
															<path d="M427.2 394.9c0 0 15.1 .4 15.1 .4c0 0 .4 30.7 .4 30.7c0 0 28.4 0 28.4 0c0 0 0-30.7 0-30.7c0 0 15.9-0.4 15.9-0.4c0 0 0-27.2 0-27.2c0 0-59.8 0-59.8 0c0 0 0 27.2 0 27.2Z" />
															<path d="M307.4 395c0 0-31 31-31 31c0 0-53.9-54-53.9-54c0 0-20.4 20.4-20.4 20.4c0 0 54 54 54 54c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 54 54 54 54c0 0 20.4-20.3 20.4-20.3c0 0-54-54.1-54-54.1c0 0 31.2-31.1 31.2-31.1c0 0-20.6-20.3-20.6-20.3Z" />
															<path
																d="M502.8 199.6c-13.4-9.9-30.1-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l45.5-45.5l-20.4-20.4l-46.5 46.5c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 255.9c0 0-15-17.6-15-17.6c0 0-18.4 20-18.4 20c0 0 19.4 25.8 19.4 25.8c0 0 1.2 15.2 1.2 15.2c0 0 27 0 27 0c0 0 0-15.9 0-15.9c0 0 19.1-24.9 19.1-24.9c0 0-18.2-18.7-18.2-18.7c0 0-15.1 16.1-15.1 16.1Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-284.4c157 0 284.4 127.4 284.4 284.4c0 157-127.4 284.4-284.4 284.4c-157 0-284.4-127.4-284.4-284.4c0-157 127.4-284.4 284.4-284.4Z"
															fill="none"
															transform="translate(406.1,311.6) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-10)"
															transform="translate(29.6,-29.6)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-11)"
														>
															<path d="M436 393.5c0 0 8.7 .4 8.7 .4c0 0 .4 17.8 .4 17.8c0 0 23.6 0 23.6 0c0 0 0-17.8 0-17.8c0 0 9.4-0.4 9.4-0.4c0 0 0-22.6 0-22.6c0 0-42.1 0-42.1 0c0 0 0 22.6 0 22.6Z" />
															<path d="M297.2 405.2c0 0-20.8 20.8-20.8 20.8c0 0-35.4-35.6-35.4-35.6c0 0-20.3 20.5-20.3 20.5c0 0 35.4 35.5 35.4 35.5c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 35.6 35.5 35.6 35.5c0 0 20.2-20.2 20.2-20.2c0 0-35.4-35.7-35.4-35.7c0 0 21.1-21 21.1-21c0 0-20.7-20.2-20.7-20.2Z" />
															<path
																d="M502.8 199.6c-13.4-9.9-30.1-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l33.7-33.7l-20.4-20.3l-34.7 34.6c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 255.9c0 0-10.7-12.4-10.7-12.4c0 0-18.1 20.1-18.1 20.1c0 0 14.9 20.6 14.9 20.6c0 0 1.2 10.7 1.2 10.7c0 0 26.8 0 26.8 0c0 0 0-11.5 0-11.5c0 0 14.6-19.6 14.6-19.6c0 0-17.9-18.6-17.9-18.6c0 0-10.8 10.7-10.8 10.7Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-277.5c153.1 0 277.5 124.4 277.5 277.5c0 153.1-124.4 277.5-277.5 277.5c-153.1 0-277.5-124.4-277.5-277.5c0-153.1 124.4-277.5 277.5-277.5Z"
															fill="none"
															display="block"
															transform="translate(411.2,307.1) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-12)"
															transform="translate(20.3,-20.3)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-13)"
														>
															<path d="M446 390.8c0 0 3.5 .2 3.5 .2c0 0 .2 7.3 .2 7.3c.1 0 14.2 0 14.2 0c0 0 0-7.3 0-7.3c0 0 4-0.2 4-0.2c0 0 0-13.5 0-13.5c0 0-21.9 0-21.9 0c0 0 0 13.5 0 13.5Z" />
															<path d="M287.9 414.4c0 0-11.5 11.6-11.5 11.6c0 0-18.5-18.8-18.5-18.8c0 0-20.3 20.5-20.3 20.5c0 0 18.5 18.7 18.5 18.7c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 18.7 18.7 18.7 18.7c0 0 20.2-20 20.2-20c0 0-18.5-19.1-18.5-19.1c0 0 11.9-11.8 11.9-11.8c0 0-20.8-20.2-20.8-20.2Z" />
															<path
																d="M502.8 199.6c-13.4-10-30.1-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l22.4-22.4l-20.4-20.4l-23.4 23.4c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 259.4c0 0-4.5-5.2-4.5-5.2c0 0-10.7 12.1-10.7 12.1c0 0 6.9 10.1 6.9 10.1c0 0 .8 4.5 .8 4.5c0 0 16 0 16 0c0 0 0-5 0-5c0 0 6.7-9.4 6.7-9.4c0 0-10.6-11.2-10.6-11.2c0 0-4.6 4.1-4.6 4.1Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-272.5c150.4 0 272.5 122.1 272.5 272.5c0 150.4-122.1 272.5-272.5 272.5c-150.4 0-272.5-122.1-272.5-272.5c0-150.4 122.1-272.5 272.5-272.5Z"
															fill="none"
															display="block"
															transform="translate(414.9,303.7) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-14)"
															transform="translate(13.4,-13.4)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-15)"
														>
															<path d="M453.6 388.1c0 0 .7 0 .7 0c0 0 .1 1.7 .1 1.7c0 0 4.7 0 4.7 0c0 0 0-1.7 0-1.7c0 0 1 0 1 0c0 0 0-4.5 0-4.5c0 0-6.5 0-6.5 0c0 0 0 4.5 0 4.5Z" />
															<path d="M280.8 421.5c0 0-4.4 4.5-4.4 4.5c0 0-5.5-5.9-5.5-5.9c0 0-20.3 20.6-20.3 20.6c0 0 5.5 5.7 5.5 5.7c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 5.8 5.7 5.8 5.7c0 0 20.1-19.9 20.1-19.9c0 0-5.5-6.2-5.5-6.2c0 0 4.8-4.6 4.8-4.6c0 0-20.8-20.3-20.8-20.3Z" />
															<path
																d="M502.8 199.6c-13.4-10-30.1-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l11.9-11.9l-20.4-20.3l-12.9 12.8c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 262.9c0 0-1-1.2-1-1.2c0 0-3.6 4-3.6 4c0 0 1.9 2.8 1.9 2.8c0 0 .2 1.1 .2 1.1c0 0 5.4 0 5.4 0c0 0 0-1.2 0-1.2c0 0 1.7-2.6 1.7-2.6c0 0-3.5-3.7-3.5-3.7c0 0-1.1 .8-1.1 .8Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-268.8c148.4 0 268.8 120.4 268.8 268.8c0 148.4-120.4 268.8-268.8 268.8c-148.4 0-268.8-120.4-268.8-268.8c0-148.4 120.4-268.8 268.8-268.8Z"
															fill="none"
															display="block"
															transform="translate(417.6,301.3) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-16)"
															transform="translate(7.3,-7.3)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-17)"
														>
															<path d="M275.4 426.9c0 0-19.3 19.5-19.3 19.5c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 19.9-19.7 19.9-19.7c0 0-20.9-20.2-20.9-20.2Z" />
															<path
																d="M411.4 291.3l20.7 20.7l.1-0.1c6.8 3.2 14.5 5.1 22.5 5.1c28.9 0 52.2-23.4 52.2-52.2h28.8c0 44.7-36.2 81-81 81c-44.7 0-81-36.3-81-81c0-44.8 36.3-81 81-81c18 0 21.9 6.3 35.3 16.2l-7.9 20.3c-8-4.9-17.3-7.7-27.4-7.7c-28.8 0-52.2 23.3-52.2 52.2c0 10.1 2.9 19.5 7.9 27.5Z"
																fillRule="evenodd"
															/>
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-265.6c146.6 0 265.6 119 265.6 265.6c0 146.6-119 265.6-265.6 265.6c-146.6 0-265.6-119-265.6-265.6c0-146.6 119-265.6 265.6-265.6Z"
															fill="none"
															display="block"
															transform="translate(420,299.1) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-18)"
															transform="translate(4,-4)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-19)"
														>
															<path d="M265.4 437.1c0 0-9.3 9.3-9.3 9.3c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 9.8-9.6 9.8-9.6c0 0-20.8-20.1-20.8-20.1Z" />
															<path
																d="M403 299.3l20.9 20.9l8.3-8.3c6.8 3.2 14.5 5.1 22.5 5.1c28.9 0 52.2-23.4 52.2-52.2h28.8c0 44.7-36.2 81-81 81c-44.7 0-81-36.3-81-81c0-44.8 36.3-81 81-81c18 0 34.6 5.8 48.1 15.8l-20.7 20.7c-8-4.9-17.3-7.7-27.4-7.7c-28.8 0-52.2 23.3-52.2 52.2c0 10 2.9 19.3 7.8 27.3Z"
																fillRule="evenodd"
															/>
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-263.8c145.6 0 263.8 118.2 263.8 263.8c0 145.6-118.2 263.8-263.8 263.8c-145.6 0-263.8-118.2-263.8-263.8c0-145.6 118.2-263.8 263.8-263.8Z"
															fill="none"
															display="block"
															transform="translate(421.2,297.8) scale(.977,.977)"
														/>
													</g>
													<g
														clipPath="url(#search-bar_forward_ClipPath-1)"
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_forward_Mask-20)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-261.7c144.4 0 261.7 117.3 261.7 261.7c0 144.4-117.3 261.7-261.7 261.7c-144.4 0-261.7-117.3-261.7-261.7c0-144.4 117.3-261.7 261.7-261.7Z"
															fill="none"
															display="block"
															transform="translate(422.8,296.4) scale(.977,.977)"
														/>
													</g>
												</svg>
											</div>
										</div>
										<div
											ref={yextIcon}
											className="yxt-SearchBar-AnimatedIcon js-yxt-AnimatedReverse js-yxt-SearchBar-Icon"
										>
											<div
												className="Icon Icon--yext_animated_reverse Icon--lg"
												aria-hidden="true"
											>
												<svg
													viewBox="0 0 72 72"
													xmlns="http://www.w3.org/2000/svg"
												>
													<defs>
														<mask id="search-bar_reverse_Mask-1">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_reverse_Mask-2">
															<rect
																x="-144.3"
																y="144.3"
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M-0.3 .1c0 0 1.3 1.2 1.3 1.2c0 0 .3-1.6 .3-1.6c0 0-1.6 .4-1.6 .4" />
															<path
																fill="#fff"
																d="M.3 .7c0 0-0.3 .3-0.3 .3c0 0 0 0 0 0c0 0 .3-0.3 .3-0.3c0 0 0 0 0 0"
															/>
															<path d="M.3 .7c0 0-0.1 0-0.1 0c0 0 .1 .1 .1 .1c0 0 .1-0.1 .1-0.1c0 0-0.1 0-0.1 0m222.8 469.1c0 0-70.5 69.4-70.5 69.4c0 0 34.1 33.5 34.1 33.5c0 0 67-72.9 67-72.9c0 0-30.6-30-30.6-30" />
														</mask>
														<mask id="search-bar_reverse_Mask-3">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M489.8 277.4c0 0 78 18.8 78 18.8c0 0-96.1 61.5-96.1 61.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-13.9 14-13.9 14m-67.8-108.1c0 0 73.9 1.3 73.9 1.3c0 0-33.8 54.5-33.8 54.5c0 0 18.6-3.2 18.6-3.2c0 0 35.4-36.5 35.4-36.5c0 0-62-25.9-62-25.9c0 0-32.1 9.8-32.1 9.8" />
														</mask>
														<mask id="search-bar_reverse_Mask-4">
															<rect
																x="-91.1"
																y="91.1"
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M-0.3 .1c0 0 1.3 1.2 1.3 1.2c0 0 .3-1.6 .3-1.6c0 0-1.6 .4-1.6 .4" />
															<path
																fill="#fff"
																d="M.3 .7c0 0-0.3 .3-0.3 .3c0 0 0 0 0 0c0 0 .3-0.3 .3-0.3c0 0 0 0 0 0"
															/>
															<path d="M.3 .7c0 0-0.1 0-0.1 0c0 0 .1 .1 .1 .1c0 0 .1-0.1 .1-0.1c0 0-0.1 0-0.1 0m222.8 469.1c0 0-70.5 69.4-70.5 69.4c0 0 34.1 33.5 34.1 33.5c0 0 67-72.9 67-72.9c0 0-30.6-30-30.6-30" />
														</mask>
														<mask id="search-bar_reverse_Mask-5">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M488.4 291.4c0 0 40.5 39.3 40.5 39.3c0 0-57.2 27-57.2 27c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-15.3 28-15.3 28m-90.5-97.4c0 0 52-11.3 52-11.3c0 0-6 45.2-6 45.2c0 0 36.8-6 36.8-6c0 0 39.3-31.9 39.3-31.9c0 0-65.9-30.5-65.9-30.5c0 0-56.2 34.5-56.2 34.5" />
														</mask>
														<mask id="search-bar_reverse_Mask-6">
															<rect
																x="-61.3"
																y="61.3"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_reverse_Mask-7">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M481.8 298.4c0 0 27.5 39.8 27.5 39.8c0 0-37.6 19.5-37.6 19.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-21.9 35-21.9 35m-108.1-79.7c0 0 30.2-23.8 30.2-23.8c0 0 21.7 35.9 21.7 35.9c0 0 55.1-8.9 55.1-8.9c0 0 35.4-36.5 35.4-36.5c0 0-62-25.9-62-25.9c0 0-80.4 59.2-80.4 59.2" />
														</mask>
														<mask id="search-bar_reverse_Mask-8">
															<rect
																x="-42.6"
																y="42.6"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_reverse_Mask-9">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M475.2 305.4c0 0 14.5 40.3 14.5 40.3c0 0-18 12-18 12c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-28.5 42-28.5 42m-113.6-74.3c0 0 17.9-18.5 17.9-18.5c0 0 36.4 25.3 36.4 25.3c0 0 64.8-16 64.8-16c0 0 39.3-31.9 39.3-31.9c0 0-65.9-30.5-65.9-30.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_reverse_Mask-10">
															<rect
																x="-29.6"
																y="29.6"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_reverse_Mask-11">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M468.6 312.4c0 0 1.5 40.8 1.5 40.8c0 0 1.6 4.5 1.6 4.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-35.1 49-35.1 49m-107-81.3c0 0 15.1 4.9 15.1 4.9c0 0 38.2 13.3 38.2 13.3c0 0 65.8-27.4 65.8-27.4c0 0 39.3-21.9 39.3-21.9c0 0-65.9-40.5-65.9-40.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_reverse_Mask-12">
															<rect
																x="-20.3"
																y="20.3"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_reverse_Mask-13">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M456.6 311.9c0 0-7 35.6-7 35.6c0 0 22.1 10.2 22.1 10.2c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-47.1 48.5-47.1 48.5m-95-80.8c0 0 12.3 28.3 12.3 28.3c0 0 39.9 1.3 39.9 1.3c0 0 66.9-38.8 66.9-38.8c0 0 39.3-21.9 39.3-21.9c0 0-65.9-40.5-65.9-40.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_reverse_Mask-14">
															<rect
																x="-13.4"
																y="13.4"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_reverse_Mask-15">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M444.6 311.4c0 0-15.6 30.5-15.6 30.5c0 0 42.7 15.8 42.7 15.8c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-59.1 48-59.1 48m-83-80.3c0 0 9.5 51.7 9.5 51.7c0 0 41.7-10.8 41.7-10.8c0 0 67.9-50.1 67.9-50.1c0 0 50.6-31.9 50.6-31.9c0 0-77.2-30.5-77.2-30.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_reverse_Mask-16">
															<rect
																x="-7.3"
																y="7.3"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_reverse_Mask-17">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M432.6 310.9c0 0-24.2 25.3-24.2 25.3c0 0 63.3 21.5 63.3 21.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-71.1 47.5-71.1 47.5m-71-79.8c0 0 20.3 90.4 20.3 90.4c0 0 29-29.5 29-29.5c0 0 69.8-70.1 69.8-70.1c0 0 35.4-36.5 35.4-36.5c0 0-62-25.9-62-25.9c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_reverse_Mask-18">
															<rect
																x="-4"
																y="4"
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<mask id="search-bar_reverse_Mask-19">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
															<path d="M432.6 310.9c0 0-24.2 25.3-24.2 25.3c0 0 63.3 21.5 63.3 21.5c0 0 59.6-41.1 59.6-41.1c0 0 10.6-53.8 10.6-53.8c0 0-38.2 .6-38.2 .6c0 0-71.1 47.5-71.1 47.5m-71-79.8c0 0 20.3 90.4 20.3 90.4c0 0 29-29.5 29-29.5c0 0 69.8-70.1 69.8-70.1c0 0 39.3-31.9 39.3-31.9c0 0-65.9-30.5-65.9-30.5c0 0-92.5 71.6-92.5 71.6" />
														</mask>
														<mask id="search-bar_reverse_Mask-20">
															<rect
																fill="#fff"
																width="720"
																height="720"
															/>
														</mask>
														<clipPath id="search-bar_reverse_ClipPath-1">
															<rect width="720" height="720" />
														</clipPath>
													</defs>
													<g transform="translate(0,0) scale(.1,.1)">
														<g mask="url(#search-bar_reverse_Mask-1)">
															<path d="M377.5 395.3c0 0 64.8 0 64.8 0c0 0 0 129.6 0 129.6c0 0 28.8 0 28.8 0c0 0 0-129.6 0-129.6c0 0 64.8 0 64.8 0c0 0 0-28.8 0-28.8c0 0-158.4 0-158.4 0c0 0 0 28.8 0 28.8Z" />
															<path d="M338.9 363.6c0 0-62.5 62.4-62.5 62.4c0 0-62.4-62.4-62.4-62.4c0 0-20.4 20.4-20.4 20.4c0 0 62.5 62.4 62.5 62.4c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 62.5 62.4 62.5 62.4c0 0 20.3-20.4 20.3-20.4c0 0-62.4-62.4-62.4-62.4c0 0 62.4-62.4 62.4-62.4c0 0-20.3-20.4-20.3-20.4Z" />
															<path d="M454.7 345.8c44.8 0 81-36.3 81-81c0 0-28.8 0-28.8 0c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3c0 0 69.8-69.9 69.8-69.9c0 0 21.1-21 21.1-21c-14.4-22.3-39.5-37-68-37c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81Zm0-133.2c10.2 0 19.6 2.9 27.6 7.9c0 0-71.9 71.8-71.9 71.8c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2Z" />
															<path d="M276.4 255.9c0 0-60.7-72.8-60.7-72.8c0 0-22.1 18.6-22.1 18.6c0 0 68.4 82 68.4 82c0 0 0 62.4 0 62.4c0 0 28.8 0 28.8 0c0 0 0-62.6 0-62.6c0 0 68.4-81.8 68.4-81.8c0 0-22-18.6-22-18.6c0 0-60.8 72.8-60.8 72.8Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-353.7c195.2 0 353.7 158.5 353.7 353.7c0 195.2-158.5 353.7-353.7 353.7c-195.2 0-353.7-158.5-353.7-353.7c0-195.2 158.5-353.7 353.7-353.7Z"
															fill="none"
															transform="translate(359.8,360.4) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-2)"
															transform="translate(144.3,-144.3)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-3)"
														>
															<path d="M390.6 395.2c0 0 51.7 .1 51.7 .1c0 0 .1 103.6 .1 103.6c0 0 28.7 0 28.7 0c0 0 0-103.6 0-103.6c0 0 52-0.1 52-0.1c0 0 0-28.4 0-28.4c0 0-132.5 0-132.5 0c0 0 0 28.4 0 28.4Z" />
															<path d="M329 373.4c0 .1-52.6 52.6-52.6 52.6c0 0-62.4-62.4-62.4-62.4c0 0-20.4 20.4-20.4 20.4c0 0 62.5 62.4 62.5 62.4c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 62.5 62.4 62.5 62.4c0 0 20.3-20.4 20.3-20.4c0 0-62.4-62.4-62.4-62.4c0 0 52.6-52.6 52.6-52.6c0 0-20.4-20.3-20.4-20.3Z" />
															<path d="M454.7 345.8c44.8 0 81-36.3 81-81c0 0-28.8 0-28.8 0c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3c0 0 69.8-69.9 69.8-69.9c0 0 21.1-21 21.1-21c-14.4-22.3-39.5-37-68-37c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81Zm0-133.2c10.2 0 19.6 2.9 27.6 7.9c0 0-71.9 71.8-71.9 71.8c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2Z" />
															<path d="M276.4 255.9c0 0-48.7-58.3-48.7-58.3c0 0-21.1 19-21.1 19c0 0 55.5 67.2 55.5 67.2c0 0 .3 50 .3 50c0 0 28.4 0 28.4 0c0 0 0-50.3 0-50.3c0 0 55.4-66.9 55.4-66.9c0 0-21-18.6-21-18.6c0 0-48.8 57.9-48.8 57.9Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-336.2c185.6 0 336.2 150.6 336.2 336.2c0 185.6-150.6 336.2-336.2 336.2c-185.6 0-336.2-150.6-336.2-336.2c0-185.6 150.6-336.2 336.2-336.2Z"
															fill="none"
															display="block"
															transform="translate(370.8,347.5) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															mask="url(#search-bar_reverse_Mask-4)"
															transform="translate(91.1,-91.1)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g mask="url(#search-bar_reverse_Mask-5)">
															<path d="M409.7 395.1c0 0 32.6 .2 32.6 .2c0 0 .3 65.5 .3 65.5c0 0 28.5 0 28.5 0c0 0 0-65.5 0-65.5c0 0 33.1-0.2 33.1-0.2c0 0 0-27.8 0-27.8c0 0-94.5 0-94.5 0c0 0 0 27.8 0 27.8Z" />
															<path d="M319.7 382.8c0 0-43.3 43.2-43.3 43.2c0 0-62.4-62.4-62.4-62.4c0 0-20.4 20.4-20.4 20.4c0 0 62.5 62.4 62.5 62.4c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 62.5 62.4 62.5 62.4c0 0 20.3-20.4 20.3-20.4c0 0-62.4-62.4-62.4-62.4c0 0 43.4-43.3 43.4-43.3c0 0-20.5-20.3-20.5-20.3Z" />
															<path
																d="M502.8 199.6c-13.4-9.9-30-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l69.8-69.9l.3-0.2l-20.3-20.4l-71.2 71.1c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 255.9c0 0-31.1-37-31.1-37c0 0-19.7 19.5-19.7 19.5c0 0 36.7 45.6 36.7 45.6c0 0 .7 31.8 .7 31.8c0 0 27.7 0 27.7 0c0 0 0-32.4 0-32.4c0 0 36.5-44.9 36.5-44.9c0 0-19.6-18.6-19.6-18.6c0 0-31.2 36-31.2 36Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-310c171.1 0 310 138.9 310 310c0 171.1-138.9 310-310 310c-171.1 0-310-138.9-310-310c0-171.1 138.9-310 310-310Z"
															fill="none"
															transform="translate(387.8,328.7) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-6)"
															transform="translate(61.3,-61.3)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g mask="url(#search-bar_reverse_Mask-7)">
															<path d="M420.4 395c0 0 21.9 .3 21.9 .3c0 0 .4 44.1 .4 44.1c0 0 28.4 0 28.4 0c0 0 0-44.1 0-44.1c0 0 22.6-0.3 22.6-0.3c0 0 0-27.5 0-27.5c0 0-73.3 0-73.3 0c0 0 0 27.5 0 27.5Z" />
															<path d="M313.2 389.2c0 0-36.8 36.8-36.8 36.8c0 0-62.4-62.4-62.4-62.4c0 0-20.4 20.4-20.4 20.4c0 0 62.5 62.4 62.5 62.4c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 62.5 62.4 62.5 62.4c0 0 20.3-20.4 20.3-20.4c0 0-62.4-62.4-62.4-62.4c0 0 37-36.9 37-36.9c0 0-20.6-20.3-20.6-20.3Z" />
															<path
																d="M500 200c-13.4-9.9-27.2-16.2-45.3-16.2c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l57.7-57.7l-20.3-20.4l-58.8 58.7c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 255.9c0 0-21.2-25.1-21.2-25.1c0 0-19 19.8-19 19.8c0 0 26.2 33.5 26.2 33.5c0 0 1 21.6 1 21.6c0 0 27.2 0 27.2 0c0 0 0-22.3 0-22.3c0 0 25.9-32.7 25.9-32.7c0 0-18.8-18.6-18.8-18.6c0 0-21.3 23.8-21.3 23.8Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-294.3c162.4 0 294.3 131.9 294.3 294.3c0 162.4-131.9 294.3-294.3 294.3c-162.4 0-294.3-131.9-294.3-294.3c0-162.4 131.9-294.3 294.3-294.3Z"
															fill="none"
															display="block"
															transform="translate(398.7,318.2) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															mask="url(#search-bar_reverse_Mask-8)"
															transform="translate(42.6,-42.6)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-9)"
														>
															<path d="M427.2 394.9c0 0 15.1 .4 15.1 .4c0 0 .4 30.7 .4 30.7c0 0 28.4 0 28.4 0c0 0 0-30.7 0-30.7c0 0 15.9-0.4 15.9-0.4c0 0 0-27.2 0-27.2c0 0-59.8 0-59.8 0c0 0 0 27.2 0 27.2Z" />
															<path d="M307.4 395c0 0-31 31-31 31c0 0-53.9-54-53.9-54c0 0-20.4 20.4-20.4 20.4c0 0 54 54 54 54c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 54 54 54 54c0 0 20.4-20.3 20.4-20.3c0 0-54-54.1-54-54.1c0 0 31.2-31.1 31.2-31.1c0 0-20.6-20.3-20.6-20.3Z" />
															<path
																d="M502.8 199.6c-13.4-9.9-30.1-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l45.5-45.5l-20.4-20.4l-46.5 46.5c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 255.9c0 0-15-17.6-15-17.6c0 0-18.4 20-18.4 20c0 0 19.4 25.8 19.4 25.8c0 0 1.2 15.2 1.2 15.2c0 0 27 0 27 0c0 0 0-15.9 0-15.9c0 0 19.1-24.9 19.1-24.9c0 0-18.2-18.7-18.2-18.7c0 0-15.1 16.1-15.1 16.1Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-284.4c157 0 284.4 127.4 284.4 284.4c0 157-127.4 284.4-284.4 284.4c-157 0-284.4-127.4-284.4-284.4c0-157 127.4-284.4 284.4-284.4Z"
															fill="none"
															transform="translate(406.1,311.6) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-10)"
															transform="translate(29.6,-29.6)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-11)"
														>
															<path d="M436 393.5c0 0 8.7 .4 8.7 .4c0 0 .4 17.8 .4 17.8c0 0 23.6 0 23.6 0c0 0 0-17.8 0-17.8c0 0 9.4-0.4 9.4-0.4c0 0 0-22.6 0-22.6c0 0-42.1 0-42.1 0c0 0 0 22.6 0 22.6Z" />
															<path d="M297.2 405.2c0 0-20.8 20.8-20.8 20.8c0 0-35.4-35.6-35.4-35.6c0 0-20.3 20.5-20.3 20.5c0 0 35.4 35.5 35.4 35.5c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 35.6 35.5 35.6 35.5c0 0 20.2-20.2 20.2-20.2c0 0-35.4-35.7-35.4-35.7c0 0 21.1-21 21.1-21c0 0-20.7-20.2-20.7-20.2Z" />
															<path
																d="M502.8 199.6c-13.4-9.9-30.1-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l33.7-33.7l-20.4-20.3l-34.7 34.6c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 255.9c0 0-10.7-12.4-10.7-12.4c0 0-18.1 20.1-18.1 20.1c0 0 14.9 20.6 14.9 20.6c0 0 1.2 10.7 1.2 10.7c0 0 26.8 0 26.8 0c0 0 0-11.5 0-11.5c0 0 14.6-19.6 14.6-19.6c0 0-17.9-18.6-17.9-18.6c0 0-10.8 10.7-10.8 10.7Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-277.5c153.1 0 277.5 124.4 277.5 277.5c0 153.1-124.4 277.5-277.5 277.5c-153.1 0-277.5-124.4-277.5-277.5c0-153.1 124.4-277.5 277.5-277.5Z"
															fill="none"
															display="block"
															transform="translate(411.2,307.1) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-12)"
															transform="translate(20.3,-20.3)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-13)"
														>
															<path d="M446 390.8c0 0 3.5 .2 3.5 .2c0 0 .2 7.3 .2 7.3c.1 0 14.2 0 14.2 0c0 0 0-7.3 0-7.3c0 0 4-0.2 4-0.2c0 0 0-13.5 0-13.5c0 0-21.9 0-21.9 0c0 0 0 13.5 0 13.5Z" />
															<path d="M287.9 414.4c0 0-11.5 11.6-11.5 11.6c0 0-18.5-18.8-18.5-18.8c0 0-20.3 20.5-20.3 20.5c0 0 18.5 18.7 18.5 18.7c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 18.7 18.7 18.7 18.7c0 0 20.2-20 20.2-20c0 0-18.5-19.1-18.5-19.1c0 0 11.9-11.8 11.9-11.8c0 0-20.8-20.2-20.8-20.2Z" />
															<path
																d="M502.8 199.6c-13.4-10-30.1-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l22.4-22.4l-20.4-20.4l-23.4 23.4c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 259.4c0 0-4.5-5.2-4.5-5.2c0 0-10.7 12.1-10.7 12.1c0 0 6.9 10.1 6.9 10.1c0 0 .8 4.5 .8 4.5c0 0 16 0 16 0c0 0 0-5 0-5c0 0 6.7-9.4 6.7-9.4c0 0-10.6-11.2-10.6-11.2c0 0-4.6 4.1-4.6 4.1Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-272.5c150.4 0 272.5 122.1 272.5 272.5c0 150.4-122.1 272.5-272.5 272.5c-150.4 0-272.5-122.1-272.5-272.5c0-150.4 122.1-272.5 272.5-272.5Z"
															fill="none"
															display="block"
															transform="translate(414.9,303.7) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-14)"
															transform="translate(13.4,-13.4)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-15)"
														>
															<path d="M453.6 388.1c0 0 .7 0 .7 0c0 0 .1 1.7 .1 1.7c0 0 4.7 0 4.7 0c0 0 0-1.7 0-1.7c0 0 1 0 1 0c0 0 0-4.5 0-4.5c0 0-6.5 0-6.5 0c0 0 0 4.5 0 4.5Z" />
															<path d="M280.8 421.5c0 0-4.4 4.5-4.4 4.5c0 0-5.5-5.9-5.5-5.9c0 0-20.3 20.6-20.3 20.6c0 0 5.5 5.7 5.5 5.7c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 5.8 5.7 5.8 5.7c0 0 20.1-19.9 20.1-19.9c0 0-5.5-6.2-5.5-6.2c0 0 4.8-4.6 4.8-4.6c0 0-20.8-20.3-20.8-20.3Z" />
															<path
																d="M502.8 199.6c-13.4-10-30.1-15.8-48.1-15.8c-44.7 0-81 36.2-81 81c0 44.7 36.3 81 81 81c44.8 0 81-36.3 81-81h-28.8c0 28.8-23.3 52.2-52.2 52.2c-8.2 0-16-1.9-22.9-5.3l11.9-11.9l-20.4-20.3l-12.9 12.8c-5-8-7.9-17.4-7.9-27.5c0-28.9 23.4-52.2 52.2-52.2c10.1 0 19.4 2.8 27.4 7.7Z"
																fillRule="evenodd"
															/>
															<path d="M276.4 262.9c0 0-1-1.2-1-1.2c0 0-3.6 4-3.6 4c0 0 1.9 2.8 1.9 2.8c0 0 .2 1.1 .2 1.1c0 0 5.4 0 5.4 0c0 0 0-1.2 0-1.2c0 0 1.7-2.6 1.7-2.6c0 0-3.5-3.7-3.5-3.7c0 0-1.1 .8-1.1 .8Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-268.8c148.4 0 268.8 120.4 268.8 268.8c0 148.4-120.4 268.8-268.8 268.8c-148.4 0-268.8-120.4-268.8-268.8c0-148.4 120.4-268.8 268.8-268.8Z"
															fill="none"
															display="block"
															transform="translate(417.6,301.3) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-16)"
															transform="translate(7.3,-7.3)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-17)"
														>
															<path d="M275.4 426.9c0 0-19.3 19.5-19.3 19.5c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 19.9-19.7 19.9-19.7c0 0-20.9-20.2-20.9-20.2Z" />
															<path
																d="M411.4 291.3l20.7 20.7l.1-0.1c6.8 3.2 14.5 5.1 22.5 5.1c28.9 0 52.2-23.4 52.2-52.2h28.8c0 44.7-36.2 81-81 81c-44.7 0-81-36.3-81-81c0-44.8 36.3-81 81-81c18 0 21.9 6.3 35.3 16.2l-7.9 20.3c-8-4.9-17.3-7.7-27.4-7.7c-28.8 0-52.2 23.3-52.2 52.2c0 10.1 2.9 19.5 7.9 27.5Z"
																fillRule="evenodd"
															/>
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-265.6c146.6 0 265.6 119 265.6 265.6c0 146.6-119 265.6-265.6 265.6c-146.6 0-265.6-119-265.6-265.6c0-146.6 119-265.6 265.6-265.6Z"
															fill="none"
															display="block"
															transform="translate(420,299.1) scale(.977,.977)"
														/>
													</g>
													<g
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-18)"
															transform="translate(4,-4)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-19)"
														>
															<path d="M265.4 437.1c0 0-9.3 9.3-9.3 9.3c0 0-62.5 62.4-62.5 62.4c0 0 20.4 20.4 20.4 20.4c0 0 62.4-62.4 62.4-62.4c0 0 9.8-9.6 9.8-9.6c0 0-20.8-20.1-20.8-20.1Z" />
															<path
																d="M403 299.3l20.9 20.9l8.3-8.3c6.8 3.2 14.5 5.1 22.5 5.1c28.9 0 52.2-23.4 52.2-52.2h28.8c0 44.7-36.2 81-81 81c-44.7 0-81-36.3-81-81c0-44.8 36.3-81 81-81c18 0 34.6 5.8 48.1 15.8l-20.7 20.7c-8-4.9-17.3-7.7-27.4-7.7c-28.8 0-52.2 23.3-52.2 52.2c0 10 2.9 19.3 7.8 27.3Z"
																fillRule="evenodd"
															/>
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-263.8c145.6 0 263.8 118.2 263.8 263.8c0 145.6-118.2 263.8-263.8 263.8c-145.6 0-263.8-118.2-263.8-263.8c0-145.6 118.2-263.8 263.8-263.8Z"
															fill="none"
															display="block"
															transform="translate(421.2,297.8) scale(.977,.977)"
														/>
													</g>
													<g
														clipPath="url(#search-bar_reverse_ClipPath-1)"
														opacity="0"
														transform="translate(0,0) scale(.1,.1)"
													>
														<g
															display="block"
															mask="url(#search-bar_reverse_Mask-20)"
														>
															<path d="M224.2 478.3c0 0-210.6 210.5-210.6 210.5c0 0 20.4 20.4 20.4 20.4c0 0 210.7-210.7 210.7-210.7c-11.7-11-5.9-6-20.5-20.2Z" />
														</g>
														<path
															stroke="#000"
															strokeWidth="30"
															d="M0-261.7c144.4 0 261.7 117.3 261.7 261.7c0 144.4-117.3 261.7-261.7 261.7c-144.4 0-261.7-117.3-261.7-261.7c0-144.4 117.3-261.7 261.7-261.7Z"
															fill="none"
															display="block"
															transform="translate(422.8,296.4) scale(.977,.977)"
														/>
													</g>
												</svg>
											</div>
										</div>
									</div>
									<span className="yxt-SearchBar-buttonText sr-only">
										{submitText}
									</span>
								</button>
							</div>
							<div
								ref={autocomplete}
								className="yxt-SearchBar-autocomplete yxt-AutoComplete-wrapper js-yxt-AutoComplete-wrapper component component--is-hidden"
							>
								<div className="yxt-AutoComplete">
									<div className="yxt-AutoComplete-results">
										<div className="yxt-AutoComplete-option yxt-AutoComplete-option--promptHeader">
											{promptHeader}
										</div>
									</div>
									<div className="yxt-AutoComplete-results">
										<div className="js-yext-autocomplete-option yxt-AutoComplete-option yxt-AutoComplete-option--item">
											{__('Option Item 1', 'yext')}
										</div>
										<div className="js-yext-autocomplete-option yxt-AutoComplete-option yxt-AutoComplete-option--item">
											{__('Option Item 2', 'yext')}
										</div>
										<div className="js-yext-autocomplete-option yxt-AutoComplete-option yxt-AutoComplete-option--item">
											{__('Another Option Item', 'yext')}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
