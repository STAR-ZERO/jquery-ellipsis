/*!
 * jquery-ellipsis
 *
 * Copyright (c) Kenji Abe.
 * https://github.com/STAR-ZERO/jquery-ellipsis
 * Under The MIT License
 */
(function($) {
    $.fn.ellipsis = function(options) {

        // デフォルトオプション
        var defaults = {
            row : 1, // 省略行数
            char : '...' // 省略文字
        };

        options = $.extend(defaults, options);

        this.each(function() {

            // 現在のテキストを取得
            var $this = $(this);
            var text = $this.text();
            // 1行分の高さを取得
            $this.text('a');
            var rowHeight = $this.height();
            // 一旦すべて空にする
            $this.text('');
            // 行数カウント
            var rowCount = 1;
            // 省略するかのフラグ
            var flag = false;

            for (var i = 0; i < text.length; i++) {

                // 1文字ずつ取得
                var s = text.substring(i, i + 1);
                // テキストを足していく
                $this.text($this.text() + s);
                // 現在の高さを取得
                var height = $this.height();

                if (height != 0 && height != rowHeight) {
                    // 高さが0意外かつ前回の高さと異なる場合
                    // 今の高さを保持
                    rowHeight = height;
                    // 行数インクリメント
                    rowCount++;

                    // 指定の行数を超えた時に終了
                    if (rowCount > options.row) {
                        flag = true;
                        break;
                    }
                }
            }

            if (flag) {

                text = $this.text();

                while (true) {

                    // 1文字ずつ減らしながら行数を見ていく
                    text = text.substring(0, text.length - 1);
                    $this.text(text + options.char);
                    height = $this.height();

                    if (height < rowHeight) {
                        break;
                    }
                }
            }

        });

        return this;
    };

})(jQuery);

