'use strict';

var GameEvent = (function () {
    function GameEvent(type, data) {
        this._type = type;
        this._data = data;
    }

    GameEvent.prototype.getType = function () {
        return this._type;
    };

    GameEvent.prototype.getData = function () {
        return this._data;
    };

    return GameEvent;
})();