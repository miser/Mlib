(function() {
	var util = {},
	addEvent = util.addEvent = (function() {
		if (document.addEventListener) {
			return function(el, type, callback) {
				el.addEventListener(type, callback);
			}
		} else {
			return function(el, type, callback) {
				el.attachEvent("on" + type, callback);
			}
		}
	})();

	var MTable = function(elId) {
		var self = this,
			containEl = document.getElementById(elId),
			rowsEl = containEl.getElementsByTagName('tr');

		(function drag() {
			for (var i = 0; i < rowsEl.length; i++) {
				rowsEl[i].addEvent('mousedown', function(ev) {
					self.drapObj = this;
					self.currentTable = table;
					self.mouseOffset = getMouseOffset(this, ev);
				})
			}
		})();

		document.addEvent('mousemove',function(){

		})
		document.addEvent('mouseup',function(){
			
		})

		/**
		 * 鼠标在一个元素里的相对位置
		 */
		function getMouseOffset(target, ev) {
			ev = ev || window.event;

			var docPos = getPosition(target);
			var mousePos = mouseCoords(ev);
			return {
				x: mousePos.x - docPos.x,
				y: mousePos.y - docPos.y
			};
		}

		function mouseCoords(ev) {
			if (ev.pageX || ev.pageY) {
				return {
					x: ev.pageX,
					y: ev.pageY
				};
			}
			return {
				x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
				y: ev.clientY + document.body.scrollTop - document.body.clientTop
			};
		}

		function getPosition(ev) {
			var left = 0;
			var top = 0;
			/** Safari fix -- thanks to Luis Chato for this! */
			//if (e.offsetHeight == 0) {
			/** Safari 2 doesn't correctly grab the offsetTop of a table row
            this is detailed here:
            http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari/
            the solution is likewise noted there, grab the offset of a table cell in the row - the firstChild.
            note that firefox will return a text node as a first child, so designing a more thorough
            solution may need to take that into account, for now this seems to work in firefox, safari, ie */
			//e = e.firstChild; // a table cell
			//}

			while (ev.offsetParent) {
				left += ev.offsetLeft;
				top += ev.offsetTop;
				ev = ev.offsetParent;
			}

			left += ev.offsetLeft;
			top += ev.offsetTop;

			return {
				x: left,
				y: top
			};
		}
	}
}
MTable('table');

})();