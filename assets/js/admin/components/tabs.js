// Imports
import Tabs from '@10up/component-tabs';
import { addQueryArgs, getQueryArg, hasQueryArg } from '@wordpress/url';

import {
	getRequiredFields,
	ignoreInputFields,
	ignoreRequiredFields,
	watchInputFields,
	watchRequiredFields,
} from '../utils/input';

const TAB_QUERY_VAR = 'tab-selected';

/**
 * Return the index for a tab
 *
 * @param  {object} node DOM node element
 * @returns {number}      Index
 */
function getTabIndex(node) {
	return [...node.parentElement.children].indexOf(node);
}

const initTabs = () => {
	const yextForm = document.querySelector('#yext-settings form');

	// do nothing if no Yext settings form
	if (!yextForm) {
		return;
	}

	// update the referer hidden field and include the current active tab
	/**
	 * @type {HTMLInputElement}
	 */
	const refererInputField = yextForm.querySelector('input[name="_wp_http_referer"]');
	const refererUrl = refererInputField.value;

	const inputFields = Array.from(yextForm.querySelectorAll('input'));
	const requiredFields = getRequiredFields(yextForm);

	const updateInputFields = (tab) => {
		ignoreInputFields(inputFields);
		ignoreRequiredFields(requiredFields);

		const currentTabInputFields = Array.from(tab.querySelectorAll('input'));
		const currentTabRequiredFields = getRequiredFields(tab);

		watchInputFields(currentTabInputFields);
		watchRequiredFields(currentTabRequiredFields);
	};

	// @ts-ignore
	// eslint-disable-next-line new-cap, no-unused-vars, no-new
	new Tabs('#yext-settings .tabs', {
		onCreate: () => {
			if (!hasQueryArg(window.location.href, TAB_QUERY_VAR)) {
				return;
			}

			const selectedTab = parseInt(
				String(getQueryArg(window.location.href, TAB_QUERY_VAR)),
				10,
			);

			// eslint-disable-next-line jsdoc/no-undefined-types
			/**
			 * @type {NodeListOf<HTMLElement>}
			 */
			const tabLinks = yextForm.querySelectorAll('.tab-list [role="tab"]');

			if (selectedTab <= tabLinks.length) {
				tabLinks[selectedTab].click();
			}
		},
		onTabChange: () => {
			const currentTab = yextForm.querySelector('.tab-group [aria-hidden="false"]');
			refererInputField.value = addQueryArgs(refererUrl, {
				'tab-selected': getTabIndex(currentTab),
			});

			updateInputFields(currentTab);
		},
	});
};

export default initTabs;
