skrollr-decks
=============

[skrollr](https://github.com/Prinzhorn/skrollr) plugin for fullpage presentation decks

#Installation

First of all: look at the example
http://trysound.github.io/skrollr-decks/

Download the `dist/skrollr.decks.min.js` file and include it right after the `skrollr.min.js` file. Then you need to add 'skrollr-decks-init' class to any element on your page and 'skrollr-deck' class on every sections.

Skrollr-decks will set `min-height` of each segment to the height of window. It will also autoresize with the window resizing.

If the height of segment is more than window height then the segement will scroll through before triggering the next segment.

#Usage

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

If you wank create custom decks call this method

###skrollr.decks.init(options)

####options.segments

Type: `String`; Default: `'.skrollr-deck'`

classname of segments

####options.nav

Type: `String`; Default: `'.skrollr-decks-nav'`

classname of navigation

####options.gotoDuration

Type: `Integer`; Default: `600`

scrolling duration on nav link click

####options.deckDuration

Type: `Integer`; Default: `300`

auto scrolling duration to next or previous deck

####options.deckDelay

Type: `Integer`; Default: `200`

delay for mouse scrolling

####options.autoScroll

Type: `Boolean`; Default: `true`

enable auto scroll on next or previous deck detection

#License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2014 Bogdan Chadkin
