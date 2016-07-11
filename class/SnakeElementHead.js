'use strict';

var SnakeElementHead = (function () {
    function SnakeElementHead(x, y, directionFrom, directionTo) {
        SnakeElement.call(
            this,
            x,
            y,
            directionFrom,
            directionTo
        );
    }
    SnakeElementHead.prototype = Object.create(SnakeElement.prototype);
    SnakeElementHead.prototype.constructor = SnakeElementHead;

    return SnakeElementHead;
})();