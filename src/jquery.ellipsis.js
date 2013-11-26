(function($) {
    $.fn.ellipsis = function(options) {

        // default option
        var defaults = {
            'row' : 1, // show rows
            'onlyFullWords': false, // set to true to avoid cutting the text in the middle of a word
            'char' : '...', // ellipsis
            'callback': function() {},
            'position': 'tail' // middle, tail
        };

        options = $.extend(defaults, options);

        this.each(function() {
            // get element text
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

            }else if(options.position === 'middle') {

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

            options.callback.call(this);
        });

        return this;
    };
}) (jQuery);
