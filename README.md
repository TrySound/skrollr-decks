skrollr-decks 0.1.4
=============

[skrollr](https://github.com/Prinzhorn/skrollr) plugin for fullpage presentation decks

#Documentation

##Installation

First of all: look at the example
http://trysound.github.io/skrollr-decks/

Download the `dist/skrollr.decks.min.js` file and include it right after the `skrollr.min.js` file. Then you need to call `skrollr.decks.init()` passing optionally some options. Here's a full example.

If you wanna use skrollr with own options, please add `forceHeight: false` when you initialize it

Then add this code to initialize decks

```js
skrollr.decks.init({
    // Class of sections
    segment: 'skrollr-decks-segment',
    
    // Class of auxiliary segment navigation. Not matter for markup
    nav: 'skrollr-decks-nav'
});
```

Every segment must have id.

For all segments will set `min-height` with the height of window. It will autoresize with the window resizing.

If the height of segment more than window height then it will be scrolled.

##Navigation

skrollr-decks can generate or use existing navigation.

Just add to your page this html:

```html
<nav class="segment-navigation">
	<ul>
		<li>
			<a href="#segment-1">Deck #1</a>
		</li>
		<li>
			<a href="#segment-2">Deck #2</a>
		</li>
		<li>
			<a href="#segment-3">Deck #3</a>
		</li>
		<li>
			<a href="#segment-4">Deck #4</a>
		</li>
		<li>
			<a href="#segment-5">Deck #5</a>
		</li>
		<li>
			<a href="#segment-6">Deck #6</a>
		</li>
	</ul>
</nav>
```

*Note: count of li elements and count of sections must be equal*
