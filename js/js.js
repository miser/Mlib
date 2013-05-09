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
				addEvent(rowsEl[i], 'mousedown', function(ev) {
					self.dragObj = this;
					self.currentTable = containEl;
					self.mouseOffset = getMouseOffset(this, ev); //鼠标在td里面的偏移坐标
				})
			}
		})();

		function mousemove(ev) {
			if (self.dragObj == null) return;

			var dragObj = self.dragObj,
				mousePosition = mouseCoords(ev),
				y = mousePosition.y - self.mouseOffset.y,
				yOffset = window.pageYOffset;
			// if (document.all) {
			// 	// Windows version
			// 	//yOffset=document.body.scrollTop;
			// 	if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
			// 		yOffset = document.documentElement.scrollTop;
			// 	} else if (typeof document.body != 'undefined') {
			// 		yOffset = document.body.scrollTop;
			// 	}

			// }
			// if (mousePos.y - yOffset < config.scrollAmount) {
			// 	window.scrollBy(0, -config.scrollAmount);
			// } else {
			// 	var windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
			// 	if (windowHeight - (mousePos.y - yOffset) < config.scrollAmount) {
			// 		window.scrollBy(0, config.scrollAmount);
			// 	}
			// }
			if (y != MTable.oldY) {
				var movingDown = y > MTable.oldY;
				MTable.oldY = y;

				dragObj.style.backgroundColor = 'red';

				var currentRow = findDropTargetRow(dragObj, y);
				if (currentRow) {
					if (movingDown && self.dragObject != currentRow) {
						self.dragObj.parentNode.insertBefore(self.dragObj, currentRow.nextSibling);
					} else if (!movingDown && self.dragObj != currentRow) {
						self.dragObj.parentNode.insertBefore(self.dragObj, currentRow);
					}
				}
			}
			return false;
		}

		function mouseup(ev) {
			if (self.currentTable && self.dragObj) {
				var droppedRow = self.dragObj;
				// var config = jQuery.tableDnD.currentTable.tableDnDConfig;
				// If we have a dragObject, then we need to release it,
				// The row will already have been moved to the right place so we just reset stuff
				// if (config.onDragClass) {
				// 	jQuery(droppedRow).removeClass(config.onDragClass);
				// } else {
				// 	jQuery(droppedRow).css(config.onDropStyle);
				// }
				self.dragObj = null;
				// if (config.onDrop) {
				// 	// Call the onDrop method if there is one
				// 	config.onDrop(jQuery.tableDnD.currentTable, droppedRow);
				// }
				self.currentTable = null; // let go of the table too
			}
		}

		addEvent(document, 'mousemove', mousemove);
		addEvent(document, 'mouseup', mouseup)

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

		function findDropTargetRow(draggedRow, y) {
			var rows = self.currentTable.rows;
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				var rowY = getPosition(row).y;
				var rowHeight = parseInt(row.offsetHeight) / 2;
				// if (row.offsetHeight == 0) {
				// 	rowY = this.getPosition(row.firstChild).y;
				// 	rowHeight = parseInt(row.firstChild.offsetHeight) / 2;
				// }
				// Because we always have to insert before, we need to offset the height a bit
				if ((y > rowY - rowHeight) && (y < (rowY + rowHeight))) {
					// that's the row we're over
					// If it's the same as the current row, ignore it
					if (row == draggedRow) {
						return null;
					}
					// var config = jQuery.tableDnD.currentTable.tableDnDConfig;
					// if (config.onAllowDrop) {
					// 	if (config.onAllowDrop(draggedRow, row)) {
					// 		return row;
					// 	} else {
					// 		return null;
					// 	}
					// } else {
					// 	// If a row has nodrop class, then don't allow dropping (inspired by John Tarr and Famic)
					// 	var nodrop = $(row).hasClass("nodrop");
					// 	if (!nodrop) {
					// 		return row;
					// 	} else {
					// 		return null;
					// 	}
					// }
					return row;
				}
			}
			return null;
		}
	}
	MTable('table');

})();