/*! jQuery ellipsis - v1.1.1 - 2014-02-23
* https://github.com/STAR-ZERO/jquery-ellipsis
* Copyright (c) 2014 Kenji Abe; Licensed MIT */
(function($) {
    
    var counter = 0;
    
	var methods = {
		
		init: function(options, node) {

			// default option
			var defaults = {
				'row' : 1, // show rows
				'onlyFullWords': false, // set to true to avoid cutting the text in the middle of a word
				'char' : '...', // ellipsis
				'callback': function() {},
				'position': 'tail' // middle, tail
			};
			
			options = $.extend(defaults, options);
			
			if(node === undefined) {
				node = this;
			}
			
			return $(node).each(function() {
			
				// get element text
				var count = counter++;
				var $this = $(this);
				var text = $this.text();
				var origText = text;
				var origLength = origText.length;
				var origHeight = $this.height();
			
				// get height
				$this.text('a');
				var lineHeight =  parseFloat($this.css("lineHeight"), 10);
				var rowHeight = $this.height();
				var gapHeight = lineHeight > rowHeight ? (lineHeight - rowHeight) : 0;
				var targetHeight = gapHeight * (options.row - 1) + rowHeight * options.row;
			
				if (origHeight <= targetHeight) {
					$this.text(text);
					options.callback.call(this);
					return;
				}
			
				var start = 1, length = 0;
				var end = text.length;
			
				if(options.position === 'tail') {
					while (start < end) { // Binary search for max length
						length = Math.ceil((start + end) / 2);
			
						$this.text(text.slice(0, length) + options['char']);
			
						if ($this.height() <= targetHeight) {
							start = length;
						} else {
							end = length - 1;
						}
					}
			
					text = text.slice(0, start);
			
					if (options.onlyFullWords) {
						text = text.replace(/[\u00AD\w\uac00-\ud7af]+$/, ''); // remove fragment of the last word together with possible soft-hyphen characters
					}
					text += options['char'];
			
				} else if(options.position === 'middle') {
			
					var sliceLength = 0;
					while (start < end) { // Binary search for max length
						length = Math.ceil((start + end) / 2);
						sliceLength = Math.max(origLength - length, 0);
			
						$this.text(
							origText.slice(0, Math.floor((origLength - sliceLength) / 2)) +
							options['char'] +
							origText.slice(Math.floor((origLength + sliceLength) / 2), origLength)
						);
			
						if ($this.height() <= targetHeight) {
							start = length;
						} else {
							end = length - 1;
						}
					}
			
					sliceLength = Math.max(origLength - start, 0);
					var head = origText.slice(0, Math.floor((origLength - sliceLength) / 2));
					var tail = origText.slice(Math.floor((origLength + sliceLength) / 2), origLength);
			
					if (options.onlyFullWords) {
						// remove fragment of the last or first word together with possible soft-hyphen characters
						head = head.replace(/[\u00AD\w\uac00-\ud7af]+$/, '');
					}
			
					text = head + options['char'] + tail;
				}
			
				$this.text(text);
				
				$this.data('ellipsis', {
					counter: count,
					options: options,
					origText: origText
				});
			
				$(window).on('resize.ellipsis-' + count, function() {
					methods.update($this);
				});
			
				options.callback.call(this);
			});
			
		},
		
		update: function(node) {
			
			if(node === undefined) {
				node = this;
			}
				
			return $(node).each(function() {

				var $this = $(this);
				
				methods.destroy(this);
				
				methods.init($this.data('ellipsis').options, this);
				
			});
			
		},
		
		destroy: function(node) {
			
			if(node === undefined) {
				node = this;
			}
				
			return $(node).each(function() {
				
				var $this = $(this);

				$(this).text($this.data('ellipsis').origText);
				
				$(window).off('.ellipsis-' + $this.data('ellipsis').counter);
				
			});
			
		}
	
    };
	
	$.fn.ellipsis = function(method) {
		
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('invalid method call!');
		}
	
    };
    
}) (jQuery);