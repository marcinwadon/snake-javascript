'use strict';

var Board = (function () {
    function Board(boardOptions) {
        var element = document.getElementById(boardOptions.containerId);
        if (!element) {
            throw new Error('Invalid container element id');
        }

        this._width = boardOptions.width;
        this._height = boardOptions.height;
        this._sizeX = boardOptions.size.width;
        this._sizeY = boardOptions.size.height;

        this._createCanvas(element);
    }

    Board.prototype.drawElements = function (elements) {
        var i, item;
        for (i = elements.length - 1; i >= 0; i--) {
            item = elements[i];

            this._drawElement(item);
        }
    };

    Board.prototype.clearElements = function (elements) {
        var i, item;
        for (i = elements.length - 1; i >= 0; i--) {
            item = elements[i];

            this._clearElement(item);
        }
    };

    Board.prototype.destroy = function () {
        this._canvas.parentNode.removeChild(this._canvas);
    };

    Board.prototype._createCanvas = function (element) {
        var container = document.createElement('canvas');
        container.setAttribute('id', 'gameContainer');
        container.setAttribute('width', this._sizeX);
        container.setAttribute('height', this._sizeY);

        element.appendChild(container);
        this._canvas = container;
        
        this._context = container.getContext('2d');
    };

    Board.prototype._drawElement = function (element) {
        var position = this._getPosition(element);

        this._context.fillStyle = this._getElementColor(element);
        this._context.fillRect(position.xPx, position.yPx, position.xWidth, position.yWidth);
    };

    Board.prototype._clearElement = function (element) {
        var position = this._getPosition(element);

        this._context.clearRect(position.xPx, position.yPx, position.xWidth, position.yWidth);
    };

    Board.prototype._getPosition = function (element) {
        var xWidth = Math.round(this._sizeX / this._width);
        var xPx = Math.round(xWidth * element.getX());

        var yWidth = Math.round(this._sizeY / this._height);
        var yPx = Math.round(yWidth * element.getY());

        return {
            xPx: xPx,
            yPx: yPx,
            xWidth: xWidth,
            yWidth: yWidth
        };
    };

    Board.prototype._getElementColor = function (element) {
        var color = Config.element.bodyColor;
        if (element instanceof SnakeElementHead) {
            color = Config.element.headColor;
        }
        if (element instanceof SnakeElementTail) {
            color = Config.element.tailColor;
        }

        return color;
    };

    return Board;
})();
