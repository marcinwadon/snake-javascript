'use strict';

var Element = (function () {
    function Element(x, y) {
        this.x = x;
        this.y = y;
    }

    Element.prototype.getX = function () {
        return this.x;
    };

    Element.prototype.getY = function () {
        return this.y;
    };

    Element.prototype.moveTo = function (direction) {
        switch (direction) {
            case DIRECTION.WEST:
                this._moveWest();
                break;
            case DIRECTION.NORTH:
                this._moveNorth();
                break;
            case DIRECTION.EAST:
                this._moveEast();
                break;
            case DIRECTION.SOUTH:
                this._moveSouth();
                break;
            default:
        }
    };

    Element.prototype._moveWest = function () {
        this.x--;
    };

    Element.prototype._moveNorth = function () {
        this.y--;
    };

    Element.prototype._moveEast = function () {
        this.x++;
    };

    Element.prototype._moveSouth = function () {
        this.y++;
    };

    return Element;
})();