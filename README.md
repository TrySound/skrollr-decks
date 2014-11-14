skrollr-decks 0.1.3
=============

skrollr plugin for fullpage presentation decks

#Documentation

First of all: look at the example
http://trysound.github.io/skrollr-decks/

Download the `dist/skrollr.decks.min.js` file and include it right after the `skrollr.min.js` file. Then you need to call `skrollr.decks.init()` passing optionally some options. Here's a full example.

If you wanna use skrollr with own options, please add `forceHeight: false` when you initialize skrollr

Then add this code to initialize decks

```js
skrollr.decks.init({
    // Class of sections
    segment: 'skrollr-decks-segment',
    
    // Class of auxiliary segment navigation. Not matter for markup
    nav: 'skrollr-decks-nav',

	// Moving to the next section
    duration: 300,

    // Delay after scroll
    delay: 200
});
```

Every segment must have id.

For all segments will set `min-height` with the height of window. It will autoresize with the window resizing.

If the height of segment more than window height then it will be scrolled.
