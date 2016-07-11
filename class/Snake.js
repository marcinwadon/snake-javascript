'use strict';

var Snake = (function () {
    function Snake(elements) {
        if (!elements || elements.length < 3) {
            throw new Error('Provide minimum 3 elements (head, body, tail) of the snake');
        }

        this._head = elements.shift();
        this._tail = elements.pop();
        this._body = elements;

        this._direction = DIRECTION.WEST;
    }

    Snake.prototype.move = function (direction) {
        if (!this._allowedToMove(direction)) {
            direction = this._direction;
        }

        switch (direction) {
            case DIRECTION.WEST:
                this._moveTo(DIRECTION.WEST);
                break;
            case DIRECTION.NORTH:
                this._moveTo(DIRECTION.NORTH);
                break;
            case DIRECTION.EAST:
                this._moveTo(DIRECTION.EAST);
                break;
            case DIRECTION.SOUTH:
                this._moveTo(DIRECTION.SOUTH);
                break;
            default:
        }

        this._direction = direction;
    };

    Snake.prototype.getDirection = function () {
        return this._direction;
    };

    Snake.prototype.getElements = function () {
        var elements = [];

        elements.push(this._head);

        var index, item;
        for (index in this._body) {
            item = this._body[index];
            elements.push(item);
        }

        elements.push(this._tail);

        return elements;
    };

    Snake.prototype._allowedToMove = function (direction) {
        return direction === DIRECTION.NORTH && this._direction === DIRECTION.SOUTH ?
            false : direction === DIRECTION.SOUTH && this._direction === DIRECTION.NORTH ?
            false : direction === DIRECTION.WEST && this._direction === DIRECTION.EAST ?
            false : !(direction === DIRECTION.EAST && this._direction === DIRECTION.WEST);
    };

    Snake.prototype._moveTo = function (direction) {
        this._setElementDirection(this._head, direction);
        this._head.moveTo(this._head.getDirectionTo());

        var self = this;
        {
            var index, item;
            this.lastItem = self._head;
            for (index in self._body) {
                item = self._body[index];

                this._setElementDirection(item, this.lastItem.getDirectionFrom());
                item.moveTo(item.getDirectionTo());

                this.lastItem = item;
            }

            this._setElementDirection(self._tail, this.lastItem.getDirectionFrom());
            self._tail.moveTo(self._tail.getDirectionTo());
        }
    };

    Snake.prototype._setElementDirection = function (element, direction) {
        var directionFrom = element.getDirectionFrom();
        var directionTo = element.getDirectionTo();

        if (directionTo !== direction) {
            element.setDirectionFrom(directionTo);
            element.setDirectionTo(direction);

            return;
        }

        if (directionFrom !== direction && directionTo === direction) {
            element.setDirectionFrom(direction);
        }
    };

    return Snake;
})();
