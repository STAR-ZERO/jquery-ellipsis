(function($) {
    $.fn.ellipsis = function(options) {

        // デフォルトオプション
        var defaults = {
            'row' : 1, // 省略行数
            'char' : '...' // 省略文字
        };

        options = $.extend(defaults, options);

        this.each(function() {
            // 現在のテキストを取得
            var $this = $(this);
            var text = $this.text();
            var origHeight = $this.height();
            // 1行分の高さを取得
            $this.text('a');
            var rowHeight = $this.height();
            var targetHeight = rowHeight * options.row;

            if (origHeight <= targetHeight)
                return;

            // Binary search for max length
            var start = 1;
            var end = text.length;

            while (start < end) {
                var length = Math.floor((start + end) / 2);

                if (start == length)
                    break;

                $this.text(text.slice(0, length) + options['char']);

                if ($this.height () <= targetHeight)
                    start = length;
                else
                    end = length - 1;
            }

            $this.text(text.slice(0, start) + options['char']);
        });

        return this;
    }
}) (jQuery)
