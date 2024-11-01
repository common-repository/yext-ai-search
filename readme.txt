=== Yext AI Search ===
Contributors: yext
Tags: search, site-search, yext, autocomplete, relevant-search, better-search, custom-search, search-by-category, natural-language-search, search-engine
Requires at least: 5.8
Tested up to: 6.6
Stable tag: 1.0.4
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://spdx.org/licenses/GPL-2.0-or-later.html

Add the world's best search experience to your website in minutes.

== Description ==

Your customers have questions. Can your website answer them?
Boost conversion, reduce support costs, and gain new customer intelligence by adding Yext Answers site search to your WordPress-powered website. The Yext Answers Site Search plugin allows you to seamlessly integrate your Yext Answers search bar and search results page to your existing WordPress pages. If you don’t currently work with Yext but would like to add the world’s best site search to your WordPress site, get started today at [https://www.yext.com/try/wordpress/](https://www.yext.com/try/wordpress/).

With the Yext AI Search plugin, you can now:

- Easily index WordPress data to Yext with pre-built connectors, and use that data to power your Answers experience
- Schedule automatic data syncs to keep your search results up to date
- Live edit the styling of your search bar, no coding background required!
- Drag and drop your Answers experience onto any page of your WordPress site with Gutenberg blocks
- Replace all instances of native WordPress search with the click of a button

To use this plugin you must have a Yext account. The Yext Answers Site Search plugin is search-as-a-service; upon download, you will be asked to provide your Answers API key and a few other pieces of information in order for the plugin to work. We’ll be calling the Answers Javascript SDK (and its CSS and templates) in order to render the search bar and Javascript from our Pages platform to load the search results page.
Using Yext Answers is subject to the agreement entered into between you and Yext. View Yext’s privacy policy here: [https://www.yext.com/privacy-policy](https://www.yext.com/privacy-policy).

## WHY DO I NEED ANSWERS?

### Answer Customers’ Questions.

Deliver a cutting-edge search experience on your website that understands natural language questions, provides direct answers (not blue links), and paves the path from search to conversion.

Use the Yext Answers Site Search plugin to power a variety of onsite search experiences — from job finders to store locators, or even full site search — on your WordPress site.

### Operate Efficiently.

The Yext Answers Site Search plugin is an out-of-the-box solution that minimizes the need for IT to manage and optimize an effective search experience. Once you’ve downloaded the plugin, all you need to do is use the provided shortcodes for the Answers search bar and search results page.

### Retain Traffic and Boost Conversion.

When your website answers your customers’ questions, they’re more likely to stay on your site, instead of bouncing to a search engine or a competitor.

And, customizable CTAs pave the path from search to conversion: early adopters have seen Yext Answers driving a 36% higher website conversion rate than legacy keyword-based search providers.

### Reduce Support Costs.

When your website can answer more customers’ questions, fewer of them will turn to your call center or live chat — saving you valuable resources.

### Gain New Customer Insights.

If you could see every question a customer asked on your website, would you adjust your content to better suit their needs? With insights from Yext Answers, you can learn what matters to your customers and give them more of what they’re looking for.


== Installation ==
### Installing from within Wordpress:
1. Visit Plugins > Add New.
2. Search for Yext AI Search.
3. Install and activate the Yext AI Search plugin.

### Installing Manually:
1. Download yext-ai-search.zip.
2. Unzip yext-ai-search.zip and upload its content to your wp-content/plugins directory.
3. Visit Plugins.
4. Activate the Yext AI Search plugin.

== Frequently Asked Questions ==

= What information will I need to use the plugin? =

Your administrator will help you obtain the needed information. You’ll need your API Key, Experience Key, Business ID, and the URL of the search results page.

= How does the plugin work? =

Search Bar Block and Global Search: Under the hood, this calls our Answers Javascript Library to create the search bar component using your provided configuration.
Search Results page: This is a page automatically generated for the plugin with Search Bar Block as content, which loads the iFrame with your Answers search results.

= Do I need to host the search results page on WordPress? =

No, you can use our search bar block, and link out to a different page for the search results page.

== Screenshots ==
1. Plugin Homepage
2. Backend Configuration
3. Global Search Configuration
4. Search Bar Customization
5. Search Bar Block
6. Search Results Block Settings
7. Search Results Block
8. Search Bar Frontend
9. Search Results Frontend

== Changelog ==

= 1.0.4 - 2024-09-19 =

__Fixed:__

* Heading alignment for search-results block. Props [@burhandodhy](https://github.com/burhandodhy).

__Changed:__

* Update Node dependencies. Props [@burhandodhy](https://github.com/burhandodhy).
* Bump WordPress version "tested up to" 6.6. Props [@burhandodhy](https://github.com/burhandodhy).


= 1.0.3 - 2023-10-19 =

__Fixed:__

* Creation of dynamic property warnings for PHP 8.2. Props [@burhandodhy](https://github.com/burhandodhy).

__Changed:__

* Bump WordPress version "tested up to" 6.3. Props [@burhandodhy](https://github.com/burhandodhy).

= 1.0.2 - 2023-05-25 =

__Fixed:__

* Fix placeholder settings don't reset upon reset button click. Props [@burhandodhy](https://github.com/burhandodhy).
* Fix admin notice layout on update-core page. Props [@burhandodhy](https://github.com/burhandodhy).
* Fix LineHeightControl width. Props [@burhandodhy](https://github.com/burhandodhy).

__Changed:__

* Bump WordPress version "tested up to" 6.2. Props [@burhandodhy](https://github.com/burhandodhy).

= 1.0.1 - 2022-02-24 =
* Prevent conflict with existing Yext Plugin
* Fix JS error when minified
* Fix search button background theme conflict

= 1.0.0 - 2022-02-17 =
* Initial plugin
