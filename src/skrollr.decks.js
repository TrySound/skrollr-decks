(function (module) {
	"use strict";

	if( ! window.skrollr) {
		console.error('`skrollr` not found');
	} else {
		window.skrollr.decks = module(window, document, window.skrollr);
	}


} (function (window, document, skrollr) {
	"use strict";

	var defaults = {
		decks: '.skrollr-deck',
		offset: 10,
		duration: 600,
		easing: 'quadratic',
		delay: 500,
		autoscroll: true,
		history: false
	}, callbacks = {
		render: [],
		change: []
	};



	var isInitialized = false,
		settings,
		segments = {},
		segmentsList = [],
		nav = document.createElement('ul'),
		currentDeck;


	// Stop animating on scroll keys
	skrollr.addEvent(document, 'keydown', function (e) {
		var inst = skrollr.get(),
			keys = [38, 40,
					33, 34,
					36, 35];

		if(keys.indexOf(e.keyCode) > -1) {
			if(inst && inst.isAnimatingTo()) {
				inst.stopAnimateTo();
			}
		}
	})

	// Auto initialize
	skrollr.addEvent(document, 'DOMContentLoaded', function () {
		if(document.querySelector('body.skrollr-decks-init')) {
			init();
		}
	})

	// Auto resize
	skrollr.addEvent(window, 'load resize', function () {
		resizeDecks({});

		if(currentDeck) {
			animateTo('#' + currentDeck.id, true);
		} else {
			update({});
		}
	});


	return {
		init: init,
		animateTo: animateTo,
		refresh: resizeDecks,
		on: on
	};


	function on(name, cb) {
		if((name = name.toLowerCase()) in callbacks && typeof cb === 'function') {
			callbacks[name].unshift(cb);
		}
	}

	function trigger(name, data) {
		var collection = callbacks[name], i;

		for(i = collection.length - 1; i > -1; i--) {
			collection[i].apply({}, data);
		}
	}


	// Initialize
	function init (options) {
		if(isInitialized) {
			return false;
		} else {
			isInitialized = true;
		}

		var setTimeout = window.setTimeout,
			clearTimeout = window.clearTimeout,
			inst, renderTimer, local;

		local = settings = extend({}, defaults, options, getDataAttrs(document.body));

		inst = skrollr.init({
			forceHeight: false
		});

		segments = findDecks(local.decks, segmentsList);
		nav = createNav(segmentsList);

		resizeDecks();

		document.body.appendChild(nav);

		inst.refresh(nav.children);

		on('change', function (active) {
			var id = location.href.split("#")[0] +'#' + active.id;
			if(local.history) {
				if(history.pushState) {
					history.pushState(null, null, id);
				} else {
					window.location.hash = id;
				}
			}
		});

		inst.on('render', function (e) {
			var inst = this,
				coord = update.call(inst, e);

			clearTimeout(renderTimer);
			if(coord !== undefined && local.autoscroll) {
				renderTimer = setTimeout(function () {
					inst.animateTo(coord, local);
				}, local.delay);
			}

			trigger('render', [e]);
		});
	}


	// Goto
	function animateTo(anchor, noAnim) {
		var el = segments[anchor],
			inst = skrollr.get(),
			top, active, index;

		if(inst) {
			inst.stopAnimateTo();

			if( ! el) {
				active = nav.getElementsByClassName('skrollable-between');
				if(active.length === 1) {
					index = Number(active[0].getAttribute('data-skrollr-decks-index'));
					el = segmentsList[anchor === 'up' ? index - 1 : anchor === 'down' ? index + 1 : -1];
				}

				if(active.length === 2) {
					active = active[anchor === 'up' ? 0 : anchor === 'down' ? 1 : -1];
					el = active ? segments[active.getAttribute('data-anchor-target')] : null;
				}
			}

			if(el) {
				top = inst.relativeToAbsolute(el, 'top', 'top') + 1;
				if(noAnim) {
					inst.setScrollTop(top, true);
				} else {
					inst.animateTo(top, settings);
				}

				return true;
			}
		}

		return false;
	}

	// Update decks size
	function resizeDecks() {
		if( ! isInitialized) {
			return;
		}

		var wndHeight = window.innerHeight + 2,
			deck, deckHeight, i;
		for(i = segmentsList.length - 1; i > -1; i--) {
			deck = segmentsList[i];
			deck.style.height = 'auto';
			deckHeight = deck.offsetHeight;
			deck.style.height = (deckHeight < wndHeight ? wndHeight : deckHeight) + 'px';
		}

		skrollr.get().refresh(segmentsList);
	}


	// Active and Autoscroll
	function update(e) {
		if( ! isInitialized) {
			return;
		}

		var inst = skrollr.get(),
			active = nav.getElementsByClassName('skrollable-between'),
			wndTop = e.curTop,
			wndHeight = window.innerHeight,
			offset =  wndHeight * settings.offset / 100,
			el, upper, lower, top, bottom, coord;

		if(active.length === 1) {
			el = segments[active[0].getAttribute('data-anchor-target')];
			currentDeck !== el && trigger('change', [el])
			currentDeck = el;
		}

		if(active.length === 2) {
			upper = segments[active[0].getAttribute('data-anchor-target')];
			lower = segments[active[1].getAttribute('data-anchor-target')];
			bottom = inst.relativeToAbsolute(upper, 'top', 'bottom');
			top = inst.relativeToAbsolute(lower, 'top', 'top');

			if(e.direction === 'up' && bottom - offset > wndTop || top + offset > wndTop + wndHeight) {
				el = upper;
				coord = bottom - wndHeight - 1;
			} else {
				el = lower;
				coord = top + 1;
			}

			currentDeck !== el && trigger('change', [el])
			currentDeck = el;

			return coord;
		}
	}


	// Layout
	function findDecks(selector, list) {
		var items = {},
			start = +new Date(),
			el, i, id;

		if(typeof selector === 'string') {
			selector = document.querySelectorAll(selector);
			for(i = selector.length - 1; i > -1; i--) {
				el = selector[i];
				list.unshift(el);
				el.id = !! el.id ? el.id : 'skroll-deck-id-' + i;
				items['#' + el.id] = el;
			}
		}

		return items;
	}

	function createNav(list) {
		var frag = document.createElement('ul'),
			item = document.createElement('li'),
			i, max, el;

		frag.style.display = 'none';
		item.setAttribute('data-top-bottom', '');
		item.setAttribute('data-bottom-top', '');

		for(i = 0, max = list.length; i < max; i++) {
			el = item.cloneNode();
			el.setAttribute('data-skrollr-decks-index', i);
			el.setAttribute('data-anchor-target', '#' + list[i].id);
			frag.appendChild(el);
		}

		return frag;
	}

	function extend() {
		var result = arguments[0] || {};
		var i, max, options, key;

		for (i = 1, max = arguments.length; i < max; i++) {
			options = arguments[i];
			if (options != null) {
				for (key in options) if(options.hasOwnProperty(key) && options[key] !== undefined) {
					result[key] = options[key];
				}
			}
		}

		return result;
	}

	function getDataAttrs(el) {
		var attrs = el.attributes,
			prefix = 'data-skrollr-decks-',
			i, name, val,
			result = {};

		for(i = attrs.length; i--; ) {
			name = attrs[i].name;
			val = attrs[i].value;
			if(name.indexOf(prefix) === 0) {
				result[name.substring(prefix.length)] =
					val === 'true' ? true :
					val === 'false' ? false :
					isNaN(val) ? val : Number(val);
			}
		}

		return result;
	}

}));
