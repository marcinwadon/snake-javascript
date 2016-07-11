'use strict';

var EventDispatcher = (function () {
    function EventDispatcher() {
        this._fps = 1;
        this._play = false;
    }

    EventDispatcher.prototype.dispatch = function (event) {
        switch(event.getType()) {
            case EVENT.GAME_START:
                this._gameStart();
                break;
            case EVENT.GAME_PAUSE:
                this._gamePause();
                break;
            case EVENT.KEY_PRESSED:
                this._keyPressed(event.getData());
                break;
            case EVENT.INCREASE_SPEED:
                this._increaseSpeed(event.getData());
                break;
            default:
        }
    };

    EventDispatcher.prototype._gameStart = function () {
        this._play = true;
        this._setInterval();
    };

    EventDispatcher.prototype._gamePause = function () {
        this._play = false;
        this._clearInterval();
    };

    EventDispatcher.prototype._setInterval = function () {
        var self = this;

        this._interval = setInterval(function () {
            if (self._play) {
                self._tick();
            }
        }, 1000 / self._fps);
    };

    EventDispatcher.prototype._clearInterval = function () {
        clearInterval(this._interval);
    };

    EventDispatcher.prototype._tick = function () {
        if (!this._play) {
            return;
        }

        var tickEvent = new Event(EVENT.TICK);
        window.dispatchEvent(tickEvent);
    };

    EventDispatcher.prototype._keyPressed = function (direction) {
        var keyPressedEvent = new CustomEvent(EVENT.KEY_PRESSED, { detail: direction });
        window.dispatchEvent(keyPressedEvent);
    };

    EventDispatcher.prototype._increaseSpeed = function (fps) {
        this._fps = fps;
        this._gamePause();
        this._gameStart();
    };

    return EventDispatcher;
})();