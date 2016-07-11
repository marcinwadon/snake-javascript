'use strict';

var Game = (function () {
    function Game(
        eventDispatcher,
        boardOptions
    ) {
        this._eventDispatcher = eventDispatcher;
        this._board = new Board(boardOptions);
        this._createSnake();

        this._currentDirecton = DIRECTION.WEST;
        this._pendingDirection = [];

        this._tickCounter = 0;
        this._fps = 1;
    }

    Game.prototype.start = function () {
        this._addListeners();
        this._eventDispatcher.dispatch(new GameEvent(EVENT.GAME_START));
    };

    Game.prototype.pause = function () {
        this._removeListeners();
        this._eventDispatcher.dispatch(new GameEvent(EVENT.GAME_PAUSE));
    };

    Game.prototype._createSnake = function () {
        var middleX = Math.round(Config.board.width / 2) - 1;
        var middleY = Math.round(Config.board.height / 2) - 1;

        var head = new SnakeElementHead(middleX - 1, middleY, DIRECTION.EAST, DIRECTION.WEST);
        var body = new SnakeElementBody(middleX, middleY, DIRECTION.EAST, DIRECTION.WEST);
        var tail = new SnakeElementTail(middleX + 1, middleY, DIRECTION.EAST, DIRECTION.WEST);

        this._snake = new Snake([head, body, tail]);
        this._board.drawElements(this._snake.getElements());
    };

    Game.prototype._addListeners = function () {
        this._addTickListener();
        this._addKeyPressedListener();
    };

    Game.prototype._removeListeners = function () {
        this._removeTickListener();
        this._removeKeyPressedListener();
    };

    Game.prototype._addTickListener = function () {
        this._tickListenerCallback = this._tickListenerCallback.bind(this);
        window.addEventListener(EVENT.TICK, this._tickListenerCallback);
    };

    Game.prototype._removeTickListener = function () {
        window.removeEventListener(EVENT.TICK, this._tickListenerCallback);
    };

    Game.prototype._tickListenerCallback = function (event) {
        this._tick.call(this);
    };

    Game.prototype._addKeyPressedListener = function () {
        this._keyPressedListenerCallback = this._keyPressedListenerCallback.bind(this);
        window.addEventListener(EVENT.KEY_PRESSED, this._keyPressedListenerCallback);
    };

    Game.prototype._removeKeyPressedListener = function () {
        window.removeEventListener(EVENT.KEY_PRESSED, this._keyPressedListenerCallback);
    };

    Game.prototype._keyPressedListenerCallback = function (event) {
        this._setCurrentDirection.call(this, event.detail);
    };

    Game.prototype._tick = function () {
        this._tickCounter++;

        if (this._tickCounter % 5 === 0) {
            this._fps += 0.2;
            this._eventDispatcher.dispatch(new GameEvent(EVENT.INCREASE_SPEED, this._fps));
        }

        this._board.clearElements(this._snake.getElements());

        this._currentDirecton = this._pendingDirection.shift() || this._currentDirecton;
        this._snake.move(this._currentDirecton);

        this._board.drawElements(this._snake.getElements());
    };

    Game.prototype._setCurrentDirection = function (direction) {
        var lastPendingDirection = this._pendingDirection[this._pendingDirection.length - 1];
        if (direction === lastPendingDirection || this._pendingDirection.length > 1) {
            return;
        }

        this._pendingDirection.push(direction);
    };

    return Game;
})();