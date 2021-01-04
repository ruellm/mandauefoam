/**
    PRe-Splash Load State (load at startup)
    All Resources must be loaded before starting the game
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: March 16, 2013, Los Angeles CA.
*/


function LoadState() {
    // State ID 
    this._stateID = LOAD_STATE;

	
	
 }

// set base class to State
LoadState.prototype = new State;

LoadState.prototype.Load = function () {
       
    new ImageResource().Load(g_imageFileList[0]);

    LoadAudio();
    
}
LoadState.prototype.Update = function (elapsed) {

    if (g_imageResourceList.length >= g_imageFileList.length) {

        //...
       /* this.audio_loaded = 0;
        for (var aud = 0; aud < g_audioResourceList.length; aud++) {
            if (g_audioResourceList[aud].loaded) {
                this.audio_loaded++;
            }
        }
        */
        if (true/*this.audio_loaded >= g_audioFileList.length*/) {
            DEBUG_LOG("ALL Loading done...");
            DEBUG_LOG("Loading flag " + g_gameData.isDataLoadDone);
            DEBUG_LOG("Error flag " + this.error);

            g_Engine.SetState(MAIN_MENU_STATE);

            ////////////////////////////////////////////////////////////
            // Load the other images at the back
            //global_resource_index = 0;
           // g_currentResource = low_prio_resource;
           // new ImageResource().Load(g_currentResource[0]);
            ////////////////////////////////////////////////////////////
        }
    }
}

LoadState.prototype.Draw = function (gfx) {

    //compute center
    gfx.FillRect(0, 0, gfx.GetRenderWidth(), gfx.GetRenderHeight(), "rgb(255,255,255)");

   	var total = g_imageFileList.length;// + g_audioFileList.length;
   	var loaded = (g_imageResourceList.length);// + this.audio_loaded;
    var pct = loaded / total;
    pct = (pct > 1) ? 1 : pct;


    var style = "22pt Calibri";
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;

    text = Math.floor(pct*100)+"%";
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
LoadState.prototype.Unload = function () {
    this.CleanupUIManager();
}

LoadState.prototype.EventHandler = function (e) {

    this.EventHandlerBase(e);
}


