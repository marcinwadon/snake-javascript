'use strict';

var DIRECTION = {
    NORTH: 'N',
    EAST: 'E',
    SOUTH: 'S',
    WEST: 'W'
};

var KEY = {
    a: 97,
    w: 119,
    s: 115,
    d: 100
};

var EVENT = {
    KEY_PRESSED: 'keyPressed',
    GAME_START: 'gameStart',
    GAME_PAUSE: 'gamePause',
    GAME_RESUME: 'gameResume',
    TICK: 'tick',
    INCREASE_SPEED: 'increaseSpeed'
};
