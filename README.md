skrollr-decks
=============

[skrollr](https://github.com/Prinzhorn/skrollr) plugin for fullpage presentation decks

#Documentation

##Installation

First of all: look at the example
http://trysound.github.io/skrollr-decks/

Download the `dist/skrollr.decks.min.js` file and include it right after the `skrollr.min.js` file. Then you need to add 'skrollr-decks-init' class to any element on your page and 'skrollr-deck' class on every sections.

Skrollr-decks will set `min-height` of each segment to the height of window. It will also autoresize with the window resizing.

If the height of segment is more than window height then the segement will scroll through before triggering the next segment.

##Navigation

skrollr-decks can either generate nagivation or use existing navigation.

Just add this HTML to your page:

```html
<nav class="skrollr-decks-nav">
	<ul>
		<li>Deck #1</li>
		<li>Deck #2</li>
		<li>Deck #3</li>
		<li>Deck #4</li>
		<li>Deck #5</li>
		<li>Deck #6</li>
	</ul>
</nav>
```

##Custom Decks

Section will be soon...
