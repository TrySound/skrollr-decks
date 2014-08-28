skrollr-decks 0.1.2
=============

skrollr plugin for fullpage presentation decks

#Documentation

First of all: look at the example
http://trysound.github.io/skrollr-decks/

Download the `dist/skrollr.decks.min.js` file and include it right after the `skrollr.min.js` file. Then you need to call `skrollr.decks.init()` passing optionally some options. Here's a full example.

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
