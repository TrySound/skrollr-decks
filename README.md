#skrollr-decks

[skrollr](https://github.com/Prinzhorn/skrollr) plugin for fullpage presentation decks

##Installation

```
bower i skrollr-decks
```

Add 'skrollr-decks-init' class to `<body>` and 'skrollr-deck' class to every section.


##API

###skrollr.decks.init(options)

- `options.decks` (.skrollr-deck) - decks classname
- `offset` (15) - offset in percents to deck since which will autoscroll
- `duration`(600) - scrolling duration
- `easing`(quaratic) - scrolling easing, [more](https://github.com/Prinzhorn/skrollr#easing)
- `delay`(500) - delay before scroll
- `autoscroll`(true)

###skrollr.decks.refresh()

Recalc height of all decks. Need to update when content added

###skrollr.decks.animateTo(anchor, noAnimation)

- `anchor` - `#id` of deck, `up` or `down`
- `noAnimation` - prevents animation

##License

[The MIT License (MIT)](LICENSE)

Copyright &copy; 2014 Bogdan Chadkin
