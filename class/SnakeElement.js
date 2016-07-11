'use strict';

var SnakeElement = (function () {
    function SnakeElement(x, y, directionFrom, directionTo) {
        Element.call(this, x, y);

        this._directionFrom = directionFrom;
        this._directionTo = directionTo;
    }
    SnakeElement.prototype = Object.create(Element.prototype);
    SnakeElement.prototype.constructor = SnakeElement;

    SnakeElement.prototype.setDirectionFrom = function (directionFrom) {
        this._directionFrom = directionFrom;
    };

    SnakeElement.prototype.setDirectionTo = function (directionTo) {
        this._directionTo = directionTo;
    };

    SnakeElement.prototype.getDirectionFrom = function () {
        return this._directionFrom;
    };

    SnakeElement.prototype.getDirectionTo = function () {
        return this._directionTo;
    };

    return SnakeElement;
})();