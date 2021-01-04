/**
    Class for Main demo
	Sprite tester
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: oct 01, 2013
*/

function MainMenuState() {
    // State ID 
    this._stateID = MAIN_MENU_STATE;

}

// set base class to State
MainMenuState.prototype = new State;

MainMenuState.prototype.Load = function () {

	this.image = new ImageObject();
	this.image.Load("./images/bg3.png");
}


MainMenuState.prototype.Update = function (elapsed) {
   
}



MainMenuState.prototype.Draw = function (gfx) {
	gfx.FillRect(0,0,DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT, "rgb(0,0,255)",1);

	this.image.Draw(gfx,0,0);
	
	if(rect_x != -1 && rect_y != -1){
		gfx.FillRect(rect_x, rect_y, width, height, 
		"rgb(0,0,255)",0.5);
	}
	
	if(!mouse_down && (rect_x != -1 && rect_y != -1)){
		//draw text
		gfx.DrawText(
			"x: " + rect_x.toFixed(2)
		    ,10, 40, "rgb(255,255,255", "20pt Calibri");	

		gfx.DrawText(
			"y: " + rect_y.toFixed(2)
		    ,10, 70, "rgb(255,255,255", "20pt Calibri");	
			
		gfx.DrawText(
			"width: " + width.toFixed(2), 
			10, 100, "rgb(255,255,255", "20pt Calibri");		

		gfx.DrawText(
			"height: " + height.toFixed(2), 
			10, 130, "rgb(255,255,255", "20pt Calibri");		
		
	}
}


///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
MainMenuState.prototype.Unload = function () {
    this.CleanupUIManager();
}
var rect_x = -1;
var rect_y = -1;
var width = 0;
var height = 0;
var mouse_down = false;
var index = 0;

MainMenuState.prototype.EventHandler = function (e) {
			
	if (e.type == "mousedown" ){
		
		var mouse = getNormalizedMouse(e);   
		rect_x = mouse.x;
        rect_y = mouse.y;
		mouse_down = true;
		
	} else if (e.type == "mousemove"){
		if(rect_x != -1 && rect_y != -1 && mouse_down){
			var mouse = getNormalizedMouse(e);   
			var newx = mouse.x
			var newy = mouse.y;
			
			width = newx - rect_x;
			height = newy - rect_y;
			
		}
		
	} else if (e.type == "mouseup") {
		mouse_down = false;	
	} else if (e.type == "keydown") {
		if( e.keyCode == ENTER_KEY) {	
			console.log("//"+index++);
			console.log("{");
			console.log("x:" + rect_x.toFixed(2) + ", y:" + rect_y.toFixed(2) +",");
			console.log("w:" + width.toFixed(2) + ", h:" + height.toFixed(2));
			console.log("},");					
		}else{
			rect_x = -1; 
			rect_y = -1;
			mouse_down = false;
		}
	}
	
	this.EventHandlerBase(e);
}


