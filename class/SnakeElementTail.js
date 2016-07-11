'use strict';

var SnakeElementTail = (function () {
    function SnakeElementTail(x, y, directionFrom, directionTo) {
        SnakeElement.call(
            this,
            x,
            y,
            directionFrom,
            directionTo
        );
    }
    SnakeElementTail.prototype = Object.create(SnakeElement.prototype);
    SnakeElementTail.prototype.constructor = SnakeElementTail;

    return SnakeElementTail;
})();