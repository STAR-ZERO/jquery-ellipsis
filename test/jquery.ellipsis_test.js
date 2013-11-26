(function($) {

    test('one line ellipsis', function() {
        $('#one').ellipsis();
        var text = $('#one').text();
        equal(text.lastIndexOf('...'), text.length - 3);
        equal($('#one').height(), $('#ref-height').height());
    });

    test('two line ellipsis', function() {
        $('#two').ellipsis({
            row: 2
        });
        var text = $('#two').text();
        equal(text.lastIndexOf('...'), text.length - 3);
        equal($('#two').height(), $('#ref-height').height() * 2);
    });

    test('one line ellipsis, change char', function() {
        $('#one-char').ellipsis({
            char: '**'
        });
        var text = $('#one-char').text();
        equal(text.lastIndexOf('**'), text.length - 2);
        equal($('#one-char').height(), $('#ref-height').height());
    });

    test('two line ellipsis, change char', function() {
        $('#two-char').ellipsis({
            row: 2,
            char: '**'
        });
        var text = $('#two-char').text();
        equal(text.lastIndexOf('**'), text.length - 2);
        equal($('#two-char').height(), $('#ref-height').height() * 2);
    });

    test('mulitple element', function() {
        expect(6);
        $('#multi p').ellipsis();
        $('#multi p').each(function() {
            var text = $(this).text();
            equal(text.lastIndexOf('...'), text.length - 3);
            equal($(this).height(), $('#ref-height').height());
        });
    });

    test('two line ellipsis with full word setting', function() {
        $('#two-char').ellipsis({
            row: 2,
            onlyFullWords: true
        });
        var text = $('#two-char').text();
        equal(text.lastIndexOf(' ...'), text.length - 4);
        equal($('#two-char').height(), $('#ref-height').height() * 2);
    });

    test('no ellipsis', function() {
        var expected = $('#no-ellipsis').text();
        $('#no-ellipsis').ellipsis();
        var actual = $('#no-ellipsis').text();
        equal(actual, expected);
    });

    test('call callback function', function() {
        $('#one').ellipsis({
            callback: function() {
                equal(this.id, 'one');
            }
        });
    });

    test('call callback function', function() {
        $('#no-ellipsis').ellipsis({
            callback: function() {
                equal(this.id, 'no-ellipsis');
            }
        });
    });
    
    test('one line ellipsis for middle position', function() {
        $('#one').ellipsis({
            position: 'middle'
        });
        var text = $('#one').text();
        equal(text.lastIndexOf('...'), text.length - 6);
        equal($('#one').height(), $('#ref-height').height());
    });
    
    test('two line ellipsis for middle position', function() {
        $('#two').ellipsis({
            row: 2,
            position: 'middle'
        });
        var text = $('#two').text();
        equal(text.lastIndexOf('...'), text.length - 7);
        equal($('#two').height(), $('#ref-height').height() * 2);
    });

    test('one line ellipsis, change char for middle position', function() {
        $('#one-char').ellipsis({
            char: '**',
            position: 'middle'
        });
        var text = $('#one-char').text();
        equal(text.lastIndexOf('**'), text.length - 6);
        equal($('#one-char').height(), $('#ref-height').height());
    });

    test('two line ellipsis, change char for middle position', function() {
        $('#two-char').ellipsis({
            row: 2,
            char: '**',
            position: 'middle'
        });
        var text = $('#two-char').text();
        equal(text.lastIndexOf('**'), text.length - 6);
        equal($('#two-char').height(), $('#ref-height').height() * 2);
    });

    test('mulitple element for middle position', function() {
        expect(6);
        $('#multi p').ellipsis({ position: 'middle' });
        $('#multi p').each(function() {
            var text = $(this).text();
            equal(text.lastIndexOf('...'), text.length - 7);
            equal($(this).height(), $('#ref-height').height());
        });
    });

    test('two line ellipsis with full word setting for middle position', function() {
        $('#two-char').ellipsis({
            row: 2,
            onlyFullWords: true,
            position: 'middle'
        });
        var text = $('#two-char').text();
        equal(text.lastIndexOf(' ...'), text.length - 8);
        equal($('#two-char').height(), $('#ref-height').height() * 2);
    });

}(jQuery));
