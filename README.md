# jQuery ellipsis [![Build Status](https://travis-ci.org/STAR-ZERO/jquery-ellipsis.png?branch=master)](https://travis-ci.org/STAR-ZERO/jquery-ellipsis)

Support multiple lines ellipsis

[http://plugins.jquery.com/ellipsis/](http://plugins.jquery.com/ellipsis/)

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/STAR-ZERO/jquery-ellipsis/master/dist/jquery.ellipsis.min.js
[max]: https://raw.github.com/STAR-ZERO/jquery-ellipsis/master/dist/jquery.ellipsis.js


## Usage

Fit one line

```
$('#target').ellipsis();
```

Fit on two lines in the case of two or more lines

```
$('#target').ellipsis({
    row: 2
});
```

Change ellipsis character

```
$('#target').ellipsis({
    row: 2,
    char: '**'
});
```

Only include full words (remove word fragments at the end)

```
$('#target').ellipsis({
    row: 2,
    onlyFullWords: true
});
```

## License
jquery-ellipsis is available under the terms of the [MIT License](https://github.com/STAR-ZERO/jquery-ellipsis/blob/master/LICENSE-MIT).

