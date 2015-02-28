#skrollr-decks

[skrollr](https://github.com/Prinzhorn/skrollr) plugin for fullpage presentation decks

##Installation

```
bower i skrollr-decks
```

```html
<body class="skrollr-decks-init" data-skrollr-decks-history="true">
	<main id="skrollr-body">
		<section class="skrollr-deck"></section>
		<section class="skrollr-deck"></section>
		<section class="skrollr-deck"></section>
	</main>
</body>
```


##API

###skrollr.decks.init(options)

- `options.decks` (.skrollr-deck) - decks classname
- `offset` (10) - offset in percents to deck since which will autoscroll
- `duration` (600) - scrolling duration
- `easing` (quaratic) - scrolling easing, [more](https://github.com/Prinzhorn/skrollr#easing)
- `delay` (500) - delay before scroll
- `autoscroll` (true)
- `history` (false) - hash navigation

###skrollr.decks.refresh()

Recalc height of all decks. Need to update when content added

###skrollr.decks.animateTo(anchor, noAnimation)

- `anchor` - `#id` of deck, `up` or `down`
- `noAnimation` - prevents animation

###skrollr.decks.on(event, callback)

- `change(activeDeck)` - calls when active deck is changed
- `render(e)` - skrollr render event

##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2014 Bogdan Chadkin
