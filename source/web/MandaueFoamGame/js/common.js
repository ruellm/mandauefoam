//
// Global definitions for Inweirders game
// Date created: March 16, 2013 in 6680 West 86th Place, Los Angeles,CA.
// [first code written in US]
// ported to Monster Bubble May 2014
// ported to Popcake Legend Oct 2014
// ported to Mandaue Foam Game Jan 2016

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
var DEFAULT_WINDOW_HEIGHT = 1024;

// State ID definitions
var LOAD_STATE = 0;
var GAME_STATE = 1;
var SPLASH_STATE = 2;
var MAIN_MENU_STATE = 3;

// Common Key definitions
var UP_KEY = 38;
var DOWN_KEY = 40;
var RIGHT_KEY = 39;
var LEFT_KEY = 37;
var BACKSPACE = 8;
var ESC_KEY = 27;
var ENTER_KEY = 13;
var SPACE_BAR_KEY = 32;

function BrowserVersion() {
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

    //normalize browser name
    M[0] = M[0].toLowerCase();
    return M;
}

// Test mobile safari
function isMobileSafari() {
    return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
}

function isChar(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

var ENABLE_LOG = 1;
var ENABLE_MCOORD_LOG = 1;
function DEBUG_LOG(str) {
    if( !ENABLE_LOG ) return;
	if (window.console) {
        window.console.log(str);
    }
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/**
 * Truncate a string to the given length, breaking at word boundaries and adding an elipsis
 * @param string str String to be truncated
 * @param integer limit Max length of the string
 * @return string
 */
function truncate_string (str, limit) {
    var bits, i;
    //if (STR !== typeof str) {
   //     return '';
   // }
    bits = str.split('');
    if (bits.length > limit) {
        for (i = bits.length - 1; i > -1; --i) {
            if (i > limit) {
                bits.length = i;
            }
            else if (' ' === bits[i]) {
                bits.length = i;
                break;
            }
        }
        bits.push('...');
    }
    return bits.join('');
};

/**
 * Return date in the format of mm/dd/yy
 * Same format as that of PHP
 */
function GetDateFormatted()
{
	  var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = mm+'/'+dd+'/'+yyyy;
    return today;
}