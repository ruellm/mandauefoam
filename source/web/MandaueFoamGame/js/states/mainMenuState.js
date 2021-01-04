/**
    Class for Main demo
	Sprite tester
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: Feb 04, 2014
*/

var g_globalAudio = new AudioBG();

function MainMenuState() {
    // State ID 
    this._stateID = MAIN_MENU_STATE;

}

// set base class to State
MainMenuState.prototype = new State;

MainMenuState.prototype.Load = function () {
}

MainMenuState.prototype.Update = function (elapsed) {
}



MainMenuState.prototype.Draw = function (gfx) {
    gfx.FillRect(0, 0, gfx.GetRenderWidth(), gfx.GetRenderHeight(), "rgb(255,255,255)");

    var total = g_imageFileList.length;// + g_audioFileList.length;
    var loaded = (g_imageResourceList.length);// + this.audio_loaded;
    var pct = loaded / total;
    pct = (pct > 1) ? 1 : pct;


    var style = "22pt Calibri";
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;

    text = "Game Demo: Please tap to continue...";
    var textWidth = ctx.measureText(text);
    var x = (DEFAULT_WINDOW_WIDTH / 2);

    gfx.DrawText(text,
              x - (textWidth.width / 2), 510,
              "rgb(0,0,0)",
             style);
 }


///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
MainMenuState.prototype.Unload = function () {
    this.CleanupUIManager();
}

MainMenuState.prototype.EventHandler = function (e) {

    if (e.type == "mousedown" || e.type == "touchstart") {
        
        g_Engine.SetState(GAME_STATE);
        return;
    }

    this.EventHandlerBase(e);
    
}


