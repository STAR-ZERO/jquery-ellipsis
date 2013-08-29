(function($) {
    $.fn.ellipsis = function(options) {

        // default option
        var defaults = {
            'row' : 1, // show rows
            'onlyFullWords': false, // set to true to avoid cutting the text in the middle of a word
            'char' : '...' // ellipsis
        };

        options = $.extend(defaults, options);

        this.each(function() {
            // get element text
            var $this = $(this);
            var text = $this.text();
            var origHeight = $this.height();

            // get height
            $this.text('a');
            var lineHeight =  parseFloat($this.css("lineHeight"), 10);
            var rowHeight = $this.height();
            var gapHeight = lineHeight > rowHeight ? (lineHeight - rowHeight) : 0;
            var targetHeight = gapHeight * (options.row - 1) + rowHeight * options.row;

            if (origHeight <= targetHeight) {
                $this.text(text);
                return;
            }

            // Binary search for max length
            var start = 1;
            var end = text.length;

            while (start < end) {
                var length = Math.ceil((start + end) / 2);

                $this.text(text.slice(0, length) + options['char']);

                if ($this.height() <= targetHeight) {
                    start = length;
                } else {
                    end = length - 1;
                }
            }

            text = text.slice(0, start);

            if (options.onlyFullWords) {
                text = text.replace(/[\u00AD\w]+$/, ''); // remove fragment of the last word together with possible soft-hyphen characters
            }

            $this.text(text + options['char']);
        });

        return this;
    };
}) (jQuery);
