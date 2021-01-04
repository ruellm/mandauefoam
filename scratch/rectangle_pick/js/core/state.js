/**
    Base class for Application state. This must be inherited.
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Sept 03, 2012

    Note: Each class inheriting from State should be assumed and must be
    treated as a singleton class
*/
function State() {
    // State ID 
    this._stateID = DEFAULT_ID;

    // must be created during Load() of inherited class
    // base state will cleanup UIManager.
    this._uimanager = null;
}

State.prototype.Load = function ()
{   /* Intentionaly Blank */ }

State.prototype.Update = function (/**Number*/ elapsed)
{    /* Intentionaly Blank */ }

State.prototype.Draw = function (/**Graphics*/ gfx)
{ /* Intentionaly Blank */ }

State.prototype.CleanupUIManager = function () {
    if (this._uimanager) {
        this._uimanager.Destroy();
        delete this._uimanager;
        this._uimanager = null;
    }
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
State.prototype.Unload = function () {
    this.CleanupUIManager();
}

State.prototype.EventHandler = function (/**Event*/e) {
    this.EventHandlerBase(e);
}


/////////////////////////////////////////////////////////////////////////
// !!TEMPORARY!!
// must be transfered to a separate utility file
/////////////////////////////////////////////////////////////////////////
function getPosition(e) {

        var targ = GetTarget(e);

        // jQuery normalizes the pageX and pageY
        // pageX,Y are the mouse positions relative to the document
        // offset() returns the position of the element relative to the document
		if( $(targ) && $(targ).offset() ){
			var x = e.pageX - $(targ).offset().left;
			var y = e.pageY - $(targ).offset().top;
			return { "x": x, "y": y };
		}
}

function NormalizeMouse(event) {
    //if(!event.offsetX) {
    if (typeof event.offsetX == "undefined") {
        var element = document.getElementById(GAME_CANVAS_ID);
        event.offsetX = (event.pageX - element.offsetLeft);
        event.offsetY = (event.pageY - element.offsetTop);
    }

    //////////////////////////////
    // Hack solution!!!
    var browser = BrowserVersion();
    if (browser[0] == "firefox") {
       // var element = document.getElementById(GAME_CANVAS_ID);
        //event.offsetX = event.layerX - element.offsetLeft;
       // event.offsetY = event.layerY - element.offsetTop;
			var position = getPosition(event);
			if( position ) {
				event.offsetX = position.x;
				event.offsetY = position.y;
			}
    }

    return event;
}

function GetTarget(e) {
    var targ;
    if (!e)
        e = window.event;
    if (e.target)
        targ = e.target;
    else if (e.srcElement)
        targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
        targ = targ.parentNode;

    return targ;
}


function NormalizeTouch(e) {

    var element = document.getElementById(GAME_CANVAS_ID);
    var targ = GetTarget(e);
    
	if(e.targetTouches.length == 0) return event;
		
	event.offsetX = e.targetTouches[0].pageX - $(targ).offset().left; //- element.offsetLeft;
    event.offsetY = e.targetTouches[0].pageY - $(targ).offset().top;// - element.offsetTop;
    return event;
}

function GetMouseWheelDelta(e)
{
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    return delta;
}

// Added May 18, 2014
function getNormalizedMouse(e) {
    var gfx = g_Engine._graphics;

    var factorX = DEFAULT_WINDOW_WIDTH / gfx._styleWidth;
    var factorY = DEFAULT_WINDOW_HEIGHT / gfx._styleHeight;

    if (e.type.indexOf("mouse") != -1) {
        NormalizeMouse(e);
    } else if (e.type.indexOf("touch") != -1) {		
        NormalizeTouch(e);
    }

    var xoffset = e.offsetX * factorX;
    var yoffset = e.offsetY * factorY;

    return { "x": xoffset, "y": yoffset };
}

State.prototype.EventHandlerBase = function (e, uimanager) {

    var element = document.getElementById(GAME_CANVAS_ID);
    var factorX = DEFAULT_WINDOW_WIDTH / window.innerWidth;
    // var factorY = DEFAULT_WINDOW_HEIGHT / window.innerHeight;

    var defaultPtrID = 0;

    var uihandler = this._uimanager;
    if (uimanager) {
        uihandler = uimanager;
    }

    if (e.type == "mousedown" || e.type == "touchstart") {        
        var mouse = getNormalizedMouse(e);        
        var handled = false;

        /************************************************/
        /* Debugging mouse coordinate during click*/
        if (e.ctrlKey && ENABLE_MCOORD_LOG) {
            console.log("Mouse coord x: " + mouse.x + " y: " + mouse.y);
        } else {
            if (this._uimanager) {
                return uihandler.OnMouseDown(mouse.x, mouse.y, defaultPtrID);
            }
        }
        /************************************************/

    } else if (e.type == "mousemove" || e.type == "touchmove") {
        //update all the UI
        var mouse = getNormalizedMouse(e);

        if (this._uimanager) {
            uihandler.OnMouseMove(mouse.x, mouse.y);
        }
    } else if (e.type == "mouseup" || e.type == "touchend") {

        var mouse = getNormalizedMouse(e);
        if (uihandler) {
            uihandler.OnMouseUp(mouse.x, mouse.y, defaultPtrID/*e.pointerId*/);
        }
    }

        // Keyboard events
    else if (e.type == "keydown") {
        if (uihandler) {
            uihandler.OnKeyDown(e.keyCode);
        }

       // this.PreventDefault(e);
    }
    else if (e.type == "keypress") {
        if (uihandler) {
            uihandler.OnKeyPress(e.keyCode);
        }

       // this.PreventDefault(e);
    }
    else if (e.type == "mousewheel" || e.type == "DOMMouseScroll") {
        this.PreventDefault(e);
    }
}

State.prototype.PreventDefault = function (e) {
    if (e.type == "keydown" || e.type == "keypress") {
        if (e.keyCode == BACKSPACE
               || e.keyCode == SPACE_BAR_KEY) {
            e.preventDefault();
        }
    }
    else if (e.type == "mousewheel" || e.type == "DOMMouseScroll") {
        e.preventDefault();
    }
}
