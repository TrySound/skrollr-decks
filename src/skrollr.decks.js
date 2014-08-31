/*!
 * Plugin for skrollr.
 * This plugin makes fullpage presentation decks.
 *
 * Bogdan Chadkin - https://github.com/TrySound/skrollr-decks
 *
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


	function generateNav(segments, navClass) {
		var menu = document.createElement('ul'),
			item = document.createElement('li'),
			i, max, newItem;
		
		menu.className = navClass;
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
			
			var segments = resizeSegments(options.segment || DEFAULT_SEGMENT),
				nav = generateNav(segments, options.nav || DEFAULT_NAV),
				_renderTimer;

			this._instance = skrollr.init({
				forceHeight: false
			});
			
			
			this._instance.refresh();
			
			this._instance.on('render', function (options) {
					var scroller = this;
					clearTimeout(_renderTimer);
					_renderTimer = setTimeout(function () {
						updateSegment(scroller, options.direction === 'up', segments, nav);
					}, 20);
			});
		}
	};

} (window, document));
