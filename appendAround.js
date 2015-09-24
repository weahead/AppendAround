/*! appendAround markup pattern. [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL
/*! appendAround markup pattern. [c]2015, We ahead AB. MIT/GPL
how-to:
	1. Insert potential element containers throughout the DOM
	2. give each container a data-set attribute with a value that matches all other containers' values
	3. Place your appendAround content in one of the potential containers
	4. Call $.appendAround() when the DOM is ready
*/
(function( $ ){

	var $window = $(window);
	var listening = false;
	var containers = {};
	var children = {};
	var timer;

	function isHidden( elem ){
		return $(elem).css( "display" ) === "none";
	}

	function getVisibleContainer(set) {
		var i, n;
		for (i = 0, n = containers[set].length; i < n; ++i) {
			var container = containers[set][i];
			if (!isHidden(container)) {
				return container;
			}
		}
		return null;
	}

	function appendToVisibleContainer() {
		var set;
		for (set in children) {
			if (children.hasOwnProperty(set)) {
				var content = children[set];
				var container = getVisibleContainer(set);
				if (container && content.get(0).parentNode !== container.get(0)) {
					container.append(content);
					container.trigger('appendAround', [container.get(0)]);
					return true;
				}
			}
		}
	}

	$.appendAround = function(){

		if (!listening) {
			$window.on('resize', function () {
				appendToVisibleContainer();
				// window.clearTimeout(timer);
				// timer = window.setTimeout(function() {
				// 	appendToVisibleContainer();
				// }, 150);
			});
			listening = true;
		}

	  var att = "data-set";

		$('[' + att + ']').each(function (i, e) {
			var $el = $(e);
			var set = $el.attr(att);

			if (!containers[set]) {
				containers[set] = [];
			}
			containers[set].push($el);

			var $children = $el.children();
			if ($children.length > 0) {
				if (children[set]) {
					throw 'Set "' + set + '" has children in multiple containers.';
				}
				children[set] = $children;
			}
		});

    appendToVisibleContainer();
	};
}( jQuery ));
