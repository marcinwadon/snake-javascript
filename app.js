(function () {
    'use strict';

    var eventDispatcher = new EventDispatcher();

    window.onkeypress = function (event) {
        switch (event.charCode) {
            case KEY.a:
                eventDispatcher.dispatch(new GameEvent(EVENT.KEY_PRESSED, DIRECTION.WEST));
                break;
            case KEY.d:
                eventDispatcher.dispatch(new GameEvent(EVENT.KEY_PRESSED, DIRECTION.EAST));
                break;
            case KEY.w:
                eventDispatcher.dispatch(new GameEvent(EVENT.KEY_PRESSED, DIRECTION.NORTH));
                break;
            case KEY.s:
                eventDispatcher.dispatch(new GameEvent(EVENT.KEY_PRESSED, DIRECTION.SOUTH));
                break;
            default:
        }
    };


    var game = new Game(eventDispatcher, Config.board);

    var buttonStart = document.getElementById('start');
    buttonStart.onclick = function () {
        game.start();
    };

    var buttonPause = document.getElementById('pause');
    buttonPause.onclick = function () {
        game.pause();
    };

})();