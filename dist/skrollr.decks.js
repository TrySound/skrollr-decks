/**
 * skrollr-decks 0.2.0 (2014-12-05) - Makes fullpage presentation decks.
 * Bogdan Chadkin - https://github.com/TrySound/skrollr-decks
 * Free to use under terms of MIT license
 */

(function (module) {
	"use strict";

	if( ! window.skrollr) {
		console.error('`skrollr` not found');
	} else {
		window.skrollr.decks = module(window, document, window.skrollr);
	}


} (function (window, document, skrollr) {
	"use strict";

	var setTimeout = window.setTimeout,
		clearTimeout = window.clearTimeout;


	/**
	 * Helpers
	 * 
	 */

	function hasClass(el, name) {
		return new RegExp(' ' + name + ' ').test(' ' + el.className + ' ');
	}

	function addClass(el, name) {
		if ( el && ! hasClass(el, name)) {
			el.className += (el.className ? ' ' : '') + name;
		}
	}

	function removeClass(el, name) {
		if (el && hasClass(el, name)) {
			el.className = el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
		}
	}


	/**
	 * Main Class
	 * 
	 */

	function Main(settings) {
		var inst = skrollr.get(),
			renderTimer,
			delay = settings.deckDelay,
			update = this.updateSegment.bind(this);

		this._settings = settings;
		this.getSegments(settings.segments);

		if(this._segments.length > 0) {
			this.resizeSegments();

			this.getNav(settings.nav);
			this.listenAnchors();

			inst.refresh();
			inst.on('render', function (e) {
				clearTimeout(renderTimer);
				renderTimer = setTimeout(function () {
					update(e.direction === 'up');
				}, delay);
			});
		} else {
			this.invalid = true;
		}
	}

	Main.prototype = {
		setActive: function (deck, duration) {
			var item = this._items[deck.getAttribute('data-skrollr-decks-index')],
				scroller = skrollr.get(),
				offset;

			offset = scroller.relativeToAbsolute(deck, 'top', 'top');
			scroller.animateTo(offset + 1, {
				duration: duration
			});

			if(this._activeDeck !== 'deck') {
				removeClass(this._activeItem, 'skrollr-decks-achor-active');
				removeClass(this._activeDeck, 'skrollr-deck-active');
				addClass(item, 'skrollr-decks-achor-active');
				addClass(deck, 'skrollr-deck-active');
				this._activeItem = item;
				this._activeDeck = deck;
			}
		},

		getSegments: function (selector) {
			var segments,
				result = [],
				el, i, max;

			if(typeof selector === 'string') {
				segments = document.querySelectorAll(selector);
			} else if(selector.tagName) {
				segments = [selector];
			} else if(selector.length) {
				segments = selector;
			}

			for(i = 0, max = segments.length; i < max; i++) {
				el = segments[i];

				if(el.tagName) {
					if(! el.id) {
						el.id = 'skrollr-deck-' + i;
					}
					result.push(el);
				}
			}

			this._segments = result;
			return result;
		},

		resizeSegments: function () {
			var segments = this._segments,
				wnd = window;

			function setHeight() {
				var height = wnd.innerHeight + 2 + 'px',
					i;

				for(i = segments.length; i--; ) {
					segments[i].style.minHeight = height;
				}
			};
			
			setHeight();
			window.addEventListener('resize', setHeight, false);
		},

		updateSegment: function (direction) {
			var inst = skrollr.get(),
				items, item, segment;

			items = this._nav.getElementsByClassName('skrollable-between');
			item = items[direction ? 0 : items.length - 1];

			segment = this._segments[item.getAttribute('data-skrollr-decks-index')];
			if(items.length > 1 || window.innerHeight + 2 === segment.clientHeight) {
				this.setActive(segment, this._settings.deckDuration);
			}
		},


		getNav: function (selector) {
			var nav, menu,
				segments = this._segments;

			if(typeof selector === 'string') {
				nav = document.querySelector(selector);
			} else if(selector.tagName) {
				nav = selector;
			} else if(selector.length && selector[0].tagName) {
				nav = selector[0];
			}

			this._items = [];
			if(nav) {
				if(nav.tagName === 'UL') {
					menu = nav;
					this.appendLinks(menu);
				} else {
					menu = nav.getElementsByTagName('ul')[0];
					if(menu) {
						this.appendLinks(menu);
					} else {
						menu = this.appendLinks();
						nav.appendChild(menu);
					}
				}
			} else {
				menu = this.appendLinks();
				menu.className = 'skrollr-decks-nav';
				document.body.insertBefore(menu, document.body.firstChild);
			}

			this._nav = menu;
			return menu;
		},

		appendLinks: function (menu) {
			var segments = this._segments,
				el, items, id,
				i, max;

			if(menu) {
				items = menu.getElementsByTagName('li');
			} else {
				menu = document.createElement('ul');
				items = [];
			}

			for(i = 0, max = segments.length; i < max; i++) {
				id = '#' + segments[i].id;
				el = items[i];
				if( ! el) {
					el = document.createElement('li');
					menu.appendChild(el);
				}

				segments[i].setAttribute('data-skrollr-decks-index', i);
				el.setAttribute('data-skrollr-decks-index', i);
				el.setAttribute('data-anchor-target', id);
				el.innerHTML = '<a href="' + id + '">' + el.innerHTML + '</a>';
				if( ! el.hasAttribute('data-top-bottom')) {
					el.setAttribute('data-top-bottom', '');
				}
				if( ! el.hasAttribute('data-bottom-top')) {
					el.setAttribute('data-bottom-top', '');
				}
				this._items.push(el);
			}

			return menu;
		},

		listenAnchors: function () {
			var self = this;

			self._nav.addEventListener('click', function (event) {
				var anchor = event.target,
					item = anchor.parentNode,
					index,
					segment;

				if(anchor.tagName === 'A' && item.hasAttribute('data-skrollr-decks-index')) {
					index = item.getAttribute('data-skrollr-decks-index');
					segment = self._segments[index];
					self.setActive(segment, self._settings.gotoDuration);
				}

				event.preventDefault();
			}, false);
		}
	};


	var Decks =  {
		init: function (user) {
			var defaults = {
				segments: '.skrollr-deck',
				nav: '.skrollr-decks-nav',
				gotoDuration: 600,
				deckDuration: 300,
				deckDelay: 200,
				autoScroll: true
			};

			var key,
				settings = {};

			user = typeof user === 'object' ? user : {};
			for(key in defaults) if(defaults.hasOwnProperty(key)) {
				settings[key] = user[key] || defaults[key];
			}

			var inst = skrollr.init({
				forceHeight: false
			});

			if( ! this._decks) {
				this._decks = new Main(settings);
				if(this._decks.invalid) {
					this._decks = undefined;
				}
			}
		}
	};


	// Auto-initialize
	document.addEventListener('DOMContentLoaded', function () {
		var init = this.querySelector('.skrollr-decks-init');

		if(init) {
			Decks.init();
		}
	}, false);


	return Decks;

}));
