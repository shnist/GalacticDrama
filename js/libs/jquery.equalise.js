/*!
 * jQuery Equaliser plugin 1.0.0
 *
 * Copyright 2011, George Paterson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function($){
	/*
	 *	Equaliser function. Returns the element passed to it for chainability.
	 *	Tests if columns and rows are set by user or calculated on width of parent > child elements.
	 *	Triggers initialising method. 
	 *
	 */
	$.fn.equaliser = function(options) {
		/*
		 * Merge defaults and options in to settings.
		 * If no options uses defaults.
		 *
		 */
		var columns = null;
		if (options) {
			settings = $.extend({}, $.fn.equaliser.defaults, options);
		}
		else {
			settings = $.fn.equaliser.defaults;
		}
		return this.each(function() {
			children = $('> *', this);
			if (settings.columns === 'auto') {
				var elementWidth = $(this).width(),
					childWidth = $('> *', this).outerWidth(true);
				columns = Math.floor(elementWidth / childWidth);
			}
			else {
				columns = settings.columns;
			}
			if (settings.rows === 'auto') {
				rows = Math.ceil($('> *', this).length / columns);
			}
			else {
				rows = settings.rows;
			}
			$.fn.equaliser.methods.init();
		});
	};
	/*
	 *	Default options, can be extend by options passed to the function.
	 *
	 */
	$.fn.equaliser.defaults = {
		columns: 'auto',
		rows: 'auto',
		equalise: null,
		equaliseMethod: 'margin-top',
		setHeight: true	
	};
	/*
	 *	Additional methods that can be called by the equalise function.
	 *
	 */
	$.fn.equaliser.methods = {
		/*
		 *	Initialising method.
		 *	Sets start and finish point for each row based on iteration of complete group.
		 *	Boolean trigger of position and auto height method.
		 *
		 */	
		init: function() {
			var i = 0,
				j = 0;		
			for (i = 1, j = rows + 1; i < j; i++) {
				var finish = columns * i,
					start = finish - columns;
				if (settings.equalise) {
					$.fn.equaliser.methods.position(start, finish);
				}
				if (settings.setHeight) {
					maximum = $.fn.equaliser.methods.maxHeight(start, finish);
					$.fn.equaliser.methods.diffHeight(start, finish);
				}
			}
		},
		/*
		 *	Gets the max height for each row.
		 *
		 */
		maxHeight: function(start, finish) {	
			var max = 0,
				i = 0;
			for (i = start; i < finish; i++) {
				max = Math.max(max, $(children[i]).height());
			}
			return max;
		},
		/*
		 *	For each row adds padding to the bottom of the element to equalise the heights.
		 *
		 */	
		diffHeight: function(start, finish) {	
			var difference = 0,
				i = 0;					
			for (i = start; i < finish; i++) {
				difference = maximum - $(children[i]).height();
				$(children[i]).last().css('padding-bottom', difference);
			}
		},
		/*
		 *	For each row, for each element passed to the function, find the position of the element.
		 *	Get the maximum position for the row of elements.
		 *	There is some flexibility for missing elements but a height previous sibling before a missing element may cause an overlap.
		 *
		 */
		position: function(start, finish) {	
			var position = 0,
				attitude = 0,
				i = 0;
			$.each(settings.equalise, function(index, value) {
				element = '> ' + value;
				for (i = start; i < finish ; i++ ) {
					if (($(element, children[i]).length)) {
						position = $(element, children[i]).position();
						attitude = Math.max(attitude, position.top);
					}	
				}
				$.fn.equaliser.methods.setPosition(attitude, start, finish);
			});
		},
		/*
		 *	Given the maximum position of the elements on each row, set the position of the lements to the maximum position.
		 *	If we are resetting the margin, add any existing margin to the calculation.
		 *
		 */
		setPosition: function(attitude, start, finish) {	
			var position = 0,
				margin = 0,
				difference = 0,
				i = 0;
			for (i = start; i < finish; i++ ) {
				if (($(element, children[i]).length)) {
					position = $(element, children[i]).position();
					if (settings.equaliseMethod === 'margin-top') {
						margin = parseInt(($(element, children[i]).css('marginTop')), 10);
					}
					difference = parseInt((attitude - position.top + margin), 10);
					$(element, children[i]).css(settings.equaliseMethod, difference);
				}
			}
		}
	};
})( jQuery );
