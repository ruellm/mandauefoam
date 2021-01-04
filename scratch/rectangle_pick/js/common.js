//
// Global definitions for Inweirders game
// Date created: March 16, 2013 in 6680 West 86th Place, Los Angeles,CA.
// [first code written in US]


// The game engine object
var g_Engine = null;
var g_gameData = null;

// Game Target Frame per second
var FPS = 60;

// time between frames 
var SECONDS_BETWEEN_FRAMES = 1 / FPS;

// State default invalid ID     
var DEFAULT_ID = -1;

// The name of the canvas object in HTML     
var GAME_CANVAS_ID = "game_canvas";

// default Engine's dimension
var DEFAULT_WINDOW_WIDTH = 768;
var DEFAULT_WINDOW_HEIGHT = 4159;

// State ID definitions
var MAIN_MENU_STATE = 0;
var LOAD_STATE = 1;
var GAME_STATE = 2;

var UP_KEY = 38;
var DOWN_KEY = 40;
var RIGHT_KEY = 39;
var LEFT_KEY = 37;
var BACKSPACE = 8;
var ESC_KEY = 27;
var ENTER_KEY = 13;

function BrowserVersion() {
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

    //normalize browser name
    M[0] = M[0].toLowerCase();
    return M;
}