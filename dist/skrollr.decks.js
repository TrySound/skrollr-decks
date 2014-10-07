/**
 * skrollr-decks 0.1.4 (2014-10-07) - Makes fullpage presentation decks.
 * Bogdan Chadkin - https://github.com/TrySound/skrollr-decks
 * Free to use under terms of MIT license
 */

(function (window, document) {
	'use strict';

	var skrollr = window.skrollr,
		setTimeout = window.setTimeout,
		clearTimeout = window.clearTimeout;
	
	var DEFAULT_SEGMENT = 'skrollr-decks-segment',
		DEFAULT_NAV     = 'skrollr-decks-nav';
	
	var _lastOffset;
	

	function setHeight(segments) {
		var height = window.innerHeight + 2 + 'px',
			i;

		for(i = segments.length; i--; ) {
			segments[i].style.minHeight = height;
		}
	}
	
	function resizeSegments(segmentClass) {
		var segments = document.getElementsByClassName(segmentClass);
		
		setHeight.call(window, segments);
		window.addEventListener('resize', setHeight.bind(window, segments), false);
		
		return segments;
	}

	function setAnimateToAnchors(nav) {
		var scroller = skrollr.get();

		if(scroller !== undefined) {
			nav.addEventListener('click', function (event) {
				var el = event.target,
					anchor,
					section,
					offset;

				if(el.tagName === 'A' && el.getAttribute('href').charAt(0) === '#') {
					anchor = el.getAttribute('href').substr(1);
					section = document.getElementById(anchor);
					if(section !== undefined) {
						offset = scroller.relativeToAbsolute(section, 'top', 'top');
						scroller.animateTo(offset + 1, {
							duration: 600,
							done: function () {
								var that = this;
								setTimeout(function () {
									that.stopAnimateTo();
								}, 20);
							}
						});
					}
				}

				event.preventDefault();
			}, false);
		}
	}

	function generateNav(segments, navClass) {
		var menu = document.createElement('ul'),
			item = document.createElement('li'),
			newItem, i, max;

		menu.className = navClass;
		menu.style.display = 'none';
		item.setAttribute('data-top-bottom', '');
		item.setAttribute('data-bottom-top', '');

		for(i = 0, max = segments.length; i < max; i++) {
			newItem = item.cloneNode();
			newItem.setAttribute('data-anchor-target', '#' + segments[i].id);
			menu.appendChild(newItem);
		}

		document.body.appendChild(menu);

		return menu;
	}

	function processNav(segments, el) {
		var nav, i, max, item, items;

		if(el.tagName === 'UL') {
			nav = el;
		} else{
			el = el.getElementsByTagName('ul');
			if(el.length > 0 && el[0].tagName === 'UL') {
				nav = el[0];
			} else {
				return false;
			}
		}

		items = nav.getElementsByTagName('li');

		if(segments.length !== items.length) {
			return false;
		}

		for(i = 0, max = segments.length; i < max; i++) {
			item = items[i];
			if( ! item.hasAttribute('data-top-bottom')) {
				item.setAttribute('data-top-bottom', '');
			}
			if( ! item.hasAttribute('data-bottom-top')) {
				item.setAttribute('data-bottom-top', '');
			}

			item.setAttribute('data-anchor-target', '#' + segments[i].id);
		}

		return nav;
	}

	function getNav(segments, nav_class) {
		var menu = document.getElementsByClassName(nav_class);

		if(menu.length > 0) {
			menu = processNav(segments, menu[0]);
			if(menu === false) {
				menu = generateNav(segments, nav_class);
			} else {
				setAnimateToAnchors(menu);
			}
		} else {
			menu = generateNav(segments, nav_class);
		}

		
		return menu;
	}

	
	function findByClass(parent, className, up) {
		var items = parent.getElementsByClassName(className);
		
		return items[up ? 0 : items.length - 1];
	}
	
	function getById(items, id) {
		var el, i;
		
		for(i = items.length; i--; ) {
			el = items[i];
			if(el.id === id) {
				return el;
			}
		}
	}

	function updateSegment(scroller, up, segments, nav) {
		var item,
			target,
			offset;

		item = findByClass(nav, 'skrollable-between', up);
		if(item) {
			target = getById(segments, item.getAttribute('data-anchor-target').substr(1));
			offset = scroller.relativeToAbsolute(target, 'top', 'top');
		}
		
		if( ! scroller.isAnimatingTo() && offset !== _lastOffset) {
			scroller.animateTo(offset + 1, {
				duration: 300,
				done: function () {
					var that = this;
					setTimeout(function () {
						that.stopAnimateTo();
					}, 20);
				}
			});
		}

		_lastOffset = offset;
	}

	
	skrollr.decks = {
		init: function (options) {
			options = options || {};

			var inst = skrollr.init({
				forceHeight: false
			});
			
			var segments = resizeSegments(options.segment || DEFAULT_SEGMENT),
				nav = getNav(segments, options.nav || DEFAULT_NAV),
				_renderTimer;

			

			inst.refresh();
			
			inst.on('render', function (options) {
				var scroller = this;
				clearTimeout(_renderTimer);
				_renderTimer = setTimeout(function () {
					updateSegment(scroller, options.direction === 'up', segments, nav);
				}, 20);
			});
		}
	};

} (window, document));
