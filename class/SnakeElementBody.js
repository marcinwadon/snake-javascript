'use strict';

var SnakeElementBody = (function () {
    function SnakeElementBody(x, y, directionFrom, directionTo) {
        SnakeElement.call(
            this,
            x,
            y,
            directionFrom,
            directionTo
        );
    }
    SnakeElementBody.prototype = Object.create(SnakeElement.prototype);
    SnakeElementBody.prototype.constructor = SnakeElementBody;

    return SnakeElementBody;
})();