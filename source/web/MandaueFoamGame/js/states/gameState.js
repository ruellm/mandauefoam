/**
    Game State
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: Jan 22, 2016
*/

var GAMESTATE_STATE_NONE = 0;
var GAME_STATE_POPUP = 1;
var GAME_STATE_MFPERSONEL = 2;

function GameState() {
    // State ID 
    this._stateID = GAME_STATE;

    //create temp canvas in advance
    this.image = document.createElement('canvas');

    this.state = GAMESTATE_STATE_NONE;
}

// set base class to State
GameState.prototype = new State;

GameState.prototype.Load = function () {

   // this.image = new ImageObject();
   // this.image.Load("images/map/ground.png");

    this.bubble_left = new ImageObject();
    this.bubble_left.Load("images/elements/bubble1.png");

    this.bubble_right = new ImageObject();
    this.bubble_right.Load("images/elements/bubble2.png");

    //this.truck = new ImageObject();
    //this.truck.Load("images/truck.png");

    this.truck = new AnimatedObject();
    this.truck.Load("images/truck.png");
    this.truck.Set(10, 10.0, true);
    this.truck._frameWidth = 1640 / 10;


    this.truck_x = MAX_TRUCK_X;
    this.truck_y = 504;
    this.truck_hit = false;
    this._lastBlinkTime = 0;
    this._blinkAnimator = new Animator;
    this._blinkAnimator.Set(5);
    this.truck_draw = true;

    //our own implementation of repeat image/bitblk transfer
    //put this in a class later-on
    //<--Wrap scroll start
    this.depth = 0;
    this.top = IMAGE_HEIGHT - VIEWPORT_HEIGHT;
    this.global_top = this.top;
    //-->Wrap scroll end

    this.furniture_list = new Array();
    this.furniture_flag = new Array();

    this.fur_idx = 0;
    this.fur_x = 0;
    this.fur_y = 0;

    //  this.ScaleCoordinates();
    this.BuildCanvas();
    this.GenerateHouseTarget();
    this.LoadFurnitures();
    this.LoadObjects();

    this._gameStartTime = new Date().getTime();
    this._gameElapsedTime = 0;

    // This can be placed in game Data?
    this.strike = MAX_STRIKE;

    this.done = false;

    this.animatedTextList = new Array();

    this.exclamation = new ImageObject();
    this.exclamation.Load("images/elements/exclamation-mark-red-md.png");
    //IRATE_DISPLAYED = false;

    //0: obstacles, 1: 1 minute
    this.mf_personnel_flag = [false, false];
}

//var IRATE_DISPLAYED = false;
var SCALE_FACTOR = 1;
GameState.prototype.ScaleCoordinates = function()
{
    var pct = DEFAULT_WINDOW_WIDTH/IMAGE_WIDTH;
    
    for (var i = 0; i < HOUSE_COORDINATES_LEFT.length; i++) {
        HOUSE_COORDINATES_LEFT[i].x *= pct;
        HOUSE_COORDINATES_LEFT[i].width *= pct;
    }

    for (var i = 0; i < HOUSE_COORDINATES_RIGHT.length; i++) {
        HOUSE_COORDINATES_RIGHT[i].x *= pct;
        HOUSE_COORDINATES_RIGHT[i].width *= pct;
    }

    for (var i = 0; i < OBJECT_SETTINGS.length; i++) {
        OBJECT_SETTINGS[i].lx *= pct;
        OBJECT_SETTINGS[i].width *= pct;
    }

    SCALE_FACTOR = DEFAULT_WINDOW_WIDTH / IMAGE_WIDTH;
}


GameState.prototype.BuildCanvas = function ()
{
    //
    // Build temporary canvas here!
    // Render 3 tile backgrounds

    this.image.width = IMAGE_WIDTH;
    this.image.height = IMAGE_HEIGHT;
    this.context = this.image.getContext('2d');

    var temp_gfx = new Graphics();
    temp_gfx._canvasBufferContext = this.context;

    for (var i = 0; i < 3; i++) {
        var image = new ImageObject();
        image.Load("images/map/bg" + (i + 1) + ".png");

        image.Draw(temp_gfx, 0, i * TILE_HEIGHT);
    }
}

GameState.prototype.GenerateHouseTarget = function ()
{
    // house that matters
    this.ht_list = new Array();
   /* var position_array = [
        HOUSE_COORDINATES_LEFT,
        HOUSE_COORDINATES_RIGHT
    ];
    */

    var tiles_definitions = [
        BG1,
        BG2,
        BG3
    ];

    var isIrate_found = false;
    var tile_height = 1732;
    do {
        
        /*
        //randomize if left and right
        var pos = Math.floor(Math.random() * 2);

        //once index has been found, randomize from 0 to depth, 
        var depth = Math.floor(Math.random() * (MAX_DEPTH+1));        

        //randomize house location
        var house_index = Math.floor(Math.random() * position_array[pos].length);

        var x = position_array[pos][house_index].x;
        var y = position_array[pos][house_index].y;

        // compute for final position in world space
        y = y + (depth * (-IMAGE_HEIGHT));
        */
       
        //--------------------------------------------------------------
        //For Demo only implementation
        // there will be 3 tiles always bg1, bg2 and bg3
        // tiles are arranged from top (bg1) to bottom (bg3) with top
        // starts at 0,0 in canvas
        // choose from which tile the house will spawn

        var tile_count = 3;
        var tile = Math.floor(Math.random() * tile_count);

        //randomize if left or right
        var pos = Math.floor(Math.random() * 2);
        var position_array = tiles_definitions[tile][pos];

        //randomize house location
        var house_index = Math.floor(Math.random() * position_array.length);

        var x = position_array[house_index].x;
        var y = position_array[house_index].y;

        // compute for final position in world space
        y = y + (tile * tile_height);
        //--------------------------------------------------------------
        var isIrate = false;
        if (!isIrate_found) {
            var irate = Math.floor(Math.random() *2);
            if (irate == 1) {
                isIrate = true;
                isIrate_found = true;
            }
        }

        //check if entry exist
        var found = false;
        for (var i = 0; i < this.ht_list.length; i++) {
            if (this.ht_list[i].global_x == x && this.ht_list[i].global_y == y) {
                found = true;
                break;
            }
        }
        
        ////////////////////////////////
        //TODO: checking on neighbors
        ////////////////////////////////

        if (!found) {
            var houset      = new HouseTarget;
            houset.global_x = x;
            houset.global_y = y;
            houset.width    = position_array[house_index].w;
            houset.height   = position_array[house_index].h;
            houset.position = pos;
            houset.furniture_type = Math.floor(Math.random() * FURNITURES_COUNT);
            houset.is_irate = isIrate;

            if (houset.is_irate) {
                houset.timer_irate = new Date().getTime();
            }

            this.ht_list.push(houset);
        }

    } while (this.ht_list.length < MAX_HOUSES_TO_DELIVER);

    //<-- re arrange furniture for truck display, it should display
    // nearest target should appear in the truck

    //sort houses target base on their global position
    this.ht_list.sort(function (a, b) {
        if (a.global_y < b.global_y)
            return -1;
        if (a.global_y > b.global_y)
            return 1;
        return 0;
    });// locations sorted: library, pub, shops

    // generate furniture list from sorted houses, from large to small
    var newht = new Array();
    for (var i = this.ht_list.length - 1; i >= 0; i--) {
        this.furniture_list.push(this.ht_list[i].furniture_type);
        this.furniture_flag.push(false);

        newht.push(this.ht_list[i]);
    }

    this.ht_list = newht;
    //--> furniture sort
    
}

GameState.prototype.LoadFurnitures = function ()
{
    var images = [
        "images/furnitures/furniture0.png",
        "images/furnitures/furniture1.png",
        "images/furnitures/furniture2.png",
        "images/furnitures/furniture3.png",
        "images/furnitures/furniture4.png",
        "images/furnitures/furniture5.png",
        "images/furnitures/furniture6.png",
        "images/furnitures/furniture7.png",
        "images/furnitures/furniture8.png",        
    ];

    this.furniture_images = new Array();
    for (var i = 0; i < images.length; i++) {
        var img = new ImageObject();
        img.Load(images[i]);
        this.furniture_images.push(img);
    }
}

GameState.prototype.GetFurniture = function ()
{
    var idx = this.fur_idx;
    var count = 0;
    while (1) {
        if (this.furniture_flag[idx] == false)
            return idx;

        idx = (idx + 1) % this.furniture_list.length;
        count++;
        if (count >= this.furniture_list.length)
            return -1;
    }
}

GameState.prototype.LoadObjects = function ()
{
    this.game_objects = new Array();
    for (var i = 0; i < OBJECT_SETTINGS.length; i++) {

        var object = new GameObject;
        object.global_x = OBJECT_SETTINGS[i].lx;        

        object.global_y = OBJECT_SETTINGS[i].ly + (OBJECT_SETTINGS[i].tile * TILE_HEIGHT);
        object.width    = OBJECT_SETTINGS[i].width;
        object.collide  = OBJECT_SETTINGS[i].collide;

        if (!OBJECT_SETTINGS[i].animated) {
            object.img = new ImageObject();
            object.img.Load(OBJECT_SETTINGS[i].imge);
            object.width = OBJECT_SETTINGS[i].width;
            object.height = object.img._image.height;
        } else {
            object.img = new AnimatedObject();
            object.img.Load(OBJECT_SETTINGS[i].imge);
            object.img.Set(OBJECT_SETTINGS[i].frame_count,
                OBJECT_SETTINGS[i].FPS, true);
            object.animated = true;

            object.img._frameWidth = OBJECT_SETTINGS[i].width;
            object.width = OBJECT_SETTINGS[i].width;
            object.height = object.img._image.height;
        }

        if (OBJECT_SETTINGS[i].moving) {
            object.moving = OBJECT_SETTINGS[i].moving,
            object.movement_type = OBJECT_SETTINGS[i].movement_type;
            object.movement_speed = OBJECT_SETTINGS[i].movement_speed;
            object.target_coord_x = OBJECT_SETTINGS[i].target_coord_x;
        }

        this.game_objects.push(object);
    }    
}

GameState.prototype.IsMouseOnFurniture = function (x,y)
{
    var furr_idx = this.GetFurniture();
    if (furr_idx == -1) {
        return false;
    }

    var curr_fur_type = this.furniture_list[furr_idx];
    var furimg = this.furniture_images[curr_fur_type];

    return ( (x > this.fur_x && x < this.fur_x + furimg._image.width) &&
        (y > this.fur_y && y < this.fur_y + furimg._image.height));
}

GameState.prototype.EnterIrateCustomer = function ()
{
    if (this.state != 0) return;

    this.state = GAME_STATE_POPUP;
    this.popup = new IrateCustomer();
    this.popup.Load();
    this.popup.In(-40);

    var context = this;
    this.popup.fnOnExit = function ()
    {
        context.state = 0;
        context.popup = null;
    };
}

GameState.prototype.EnterMFPersonel = function (type)
{
    if (this.state != 0) return;

    this.state = GAME_STATE_POPUP;
    this.popup = new MFPersonel();
    this.popup.Load();
    this.popup.In(-40);
    this.popup.type = 0;
    var context = this;
    this.popup.fnOnExit = function () {
        context.state = 0;
        context.popup = null;
    };
}

GameState.prototype.Update = function (elapsed) {

    if (this.state == GAME_STATE_POPUP) {
        this.popup.Update(elapsed);
    }

    //<--Wrap scroll start
    var SCROLL_SPEED = 125;
    var delta = (SCROLL_SPEED * elapsed);
    this.top -= delta;
  
    if (this.top < 0) {
        this.depth++;
        this.top = IMAGE_HEIGHT + this.top;
        console.log("TOP wrap");
    }
    //-->Wrap scroll end

    this.global_top -= delta;

    //wrap up global top
    var last_top = -(MAX_DEPTH * IMAGE_HEIGHT);
    var cache_top = 0;
    var global_wrapped = false;

    if(this.global_top < last_top){
        var extra = this.global_top - last_top;
      
        this.global_top = IMAGE_HEIGHT + extra;
        console.log("GLOBAL TOP wrap");
    }

    var sh = this.global_top + VIEWPORT_HEIGHT;
    if (sh > IMAGE_HEIGHT) {
        global_wrapped = true;
        var rendered = IMAGE_HEIGHT - this.global_top;
        cache_top = last_top - rendered;
    }

    this.UpdateObjects(this.ht_list, global_wrapped, cache_top);
    this.UpdateObjects(this.game_objects, global_wrapped, cache_top);

    //update animated items
    for (var i = 0; i < this.game_objects.length; i++) {
        var gobj = this.game_objects[i];
        if (gobj.animated)
            gobj.img.Update(elapsed);
        if (gobj.moving && gobj.visible) {
            gobj.ui_x += gobj.movement_speed * elapsed;
            if (gobj.movement_speed < 0 && gobj.ui_x < 0 && gobj.movement_type==0) {
                gobj.ui_x = gobj.global_x;
            }
        }
    }


    if (mouse_down) {
        if ((this.truck_x > MIN_TRUCK_X && mdelta_x < 0) || 
            (this.truck_x < MAX_TRUCK_X && mdelta_x > 0)) {
            this.truck_x += (mdelta_x) * elapsed;
        }
    }

    this.CheckCollision();
    
    this.truck.Update(elapsed);
    if (this.truck_hit) {
        if (this._blinkAnimator.Update(elapsed)) {
            var currentTime = new Date().getTime();
            var diff = (currentTime - this._lastBlinkTime) / 1000;
            if (diff > 1.5) {
                //this.truck_hit = false;
                this.truck_draw = true;
            } else {
                this.truck_draw = !this.truck_draw;
            }
        }
    } else {
        this.truck_draw = true;
    }

    // compute timer
    var currentTime = new Date().getTime();
    this._gameElapsedTime = (currentTime - this._gameStartTime) / 1000;

    // condition to spawn superman
    var count = this.GetFurnitureDoneCnt()
    if (count >= MAX_HOUSES_TO_DELIVER - 2) {           //TEMPORARY!!!
        if (this.superman == null) {
            this.superman = new AnimatedObject();
            this.superman.Load("images/elements/SUPERMAN_sprite.png");
            this.superman.Set(5, 10.0, true);
            this.superman._frameWidth = 475 / 5;

            this.superman._X = 0;
            this.superman._Y = VIEWPORT_HEIGHT;
        }
    }

    if (this.superman) {
        var FLYSPEED = 500;
        var superman_height = 259;
        if (this.superman._Y < -superman_height) {
            this.superman._Y = -superman_height;
        } else {
            this.superman._Y -= (FLYSPEED) * elapsed;
        }

        this.superman.Update(elapsed);
    }

    // Animated TExts
    for (var m = 0; m < this.animatedTextList.length; m++) {
        this.animatedTextList[m].Update(elapsed);
    }
}

GameState.prototype.CheckCollision = function ()
{
    if (this.game_objects == null) return;

    var truck_real_x = this.truck_x + (32 * SCALE_FACTOR);
    var truck_real_y = this.truck_y;
    var truck_real_width = 114 * SCALE_FACTOR;
    var truck_real_height = 279 * SCALE_FACTOR;

    var truck_rect = new Rect(truck_real_x, truck_real_y,
        truck_real_width, truck_real_height);

    var collide = false;
    for (var i = 0; i < this.game_objects.length; i++) {
        if (!this.game_objects[i].collide) continue;

        var rect = new Rect(this.game_objects[i].ui_x, this.game_objects[i].ui_y,
            this.game_objects[i].width, this.game_objects[i].height);

        if (Collision_RectCollide(truck_rect, rect)) {
            collide = true;
            if (this.truck_hit) return;

            console.log("Collision occured!");

            this.truck_hit = true;
            this._lastBlinkTime = new Date().getTime();


            if (/*this.strike == MAX_STRIKE &&*/
                !this.mf_personnel_flag[0]) {
                //first time hit
                // give clue
                this.EnterMFPersonel(0);
                this.mf_personnel_flag[0] = true;
            }

            this.strike--;
            break;
        } 
    }

    if (!collide) {
        this.truck_hit = false;
    }
}

GameState.prototype.AddAnimatedText = function (x, y, cx, cy)
{

    var message = ["Thanks!", "Cool!", "Got it!", "Finally!", "Its here!"];
    var indx = Math.floor(Math.random() * (message.length));

    ////////////////////////////////////////////////
    var timerText = new AnimatedText;
    timerText.size = 0;
    timerText.fontface = "Calibri";
    timerText.strike = "Bold";
    timerText.text = message[indx];
    timerText.type = ANIMATION_TYPE_ZOOM_OUT;

    timerText.centerx = cx;
    timerText.centery = cy;
    timerText.targetSize = 50;
    timerText._Y = y;
    timerText._X = x;

    timerText.alpha_step = -1;
    timerText.staySeconds = 800;
    timerText.ANIMTEXT_ZOOM_STEP = 500;

    var context = this;
    timerText.fnZoomDone = (function () {

        for (var i = 0; i < context.animatedTextList.length; i++) {
            if (context.animatedTextList[i] == this) {
                context.animatedTextList.splice(this, 1);
            }
        }
    });

    this.animatedTextList.push(timerText);
}

GameState.prototype.UpdateObjects = function (list, global_wrapped, cache_top) {
    if (list == null) return;
    //update ALL house target ui coordinates
    for (var i = 0; i < list.length; i++) {

        list[i].visible = false;        
        list[i].ui_y = list[i].global_y + (-this.global_top);

        if (!list[i].moving)
            list[i].ui_x = list[i].global_x;

        var repeat = false;
        do {
            if (list[i].ui_y > 0 && list[i].ui_y < IMAGE_HEIGHT) {
                list[i].visible = true;
                break;
            } else if (repeat) {
                break;
            }
            if (global_wrapped) {
                list[i].ui_y = list[i].global_y + (-cache_top);
                repeat = true;
            }
        } while (repeat);

        if (list[i].is_irate && !list[i].done) {
            var currtime = new Date().getTime();
            var diff = (currtime - list[i].timer_irate) / 1000;
            if (diff > IRATE_CUSTOMER_WAITSECS &&
                this.state == 0 /*&&
                !IRATE_DISPLAYED*/) {
                list[i].timer_irate = new Date().getTime();
                this.EnterIrateCustomer();
                //IRATE_DISPLAYED = true;
            }
        }
    }
}

GameState.prototype.Draw = function (gfx) {
    
    gfx.FillRect(0, 0, gfx.GetRenderWidth(), gfx.GetRenderHeight(), "rgb(189,189,189)");

    //<--Wrap scroll start
    var display_height = Math.ceil(IMAGE_HEIGHT - Math.abs(this.top));
    var display_height2 = 0;

    if (display_height < VIEWPORT_HEIGHT) {
        //if original display height is less than image height, that means top
        // just wrapped up and we need to get extra from top of image.
        display_height2 = VIEWPORT_HEIGHT - display_height;
    } else {
        display_height = VIEWPORT_HEIGHT;
    }

    if (display_height == 0) {
        breakme = 1;
    }

    gfx.DrawImage(this.image, 0, this.top,
		this.image.width, display_height,
		0, 0,
		VIEWPORT_WIDTH, display_height);

    if (display_height2) {
        gfx.DrawImage(this.image, 0, 0,
			this.image.width, display_height2,
			0, display_height,
			VIEWPORT_WIDTH, display_height2);
    }
    //-->Wrap scroll end

    if (this.game_objects) {
        for (var i = 0; i < this.game_objects.length; i++) {
            var image = this.game_objects[i].img;

            if (this.game_objects[i].animated) {                
                image._X = this.game_objects[i].ui_x;
                image._Y = this.game_objects[i].ui_y;
                image.Draw(gfx);

            } else {
                gfx.DrawResized(image._image, this.game_objects[i].ui_x,
                    this.game_objects[i].ui_y,
                    this.game_objects[i].width,
                    this.game_objects[i].height);
            }
        }
    }

    //<-- truck and furniture
    if (this.truck_draw) {
       // this.truck.Draw(gfx, this.truck_x, this.truck_y);

        this.truck._X = this.truck_x;
        this.truck._Y = this.truck_y;
        this.truck.Draw(gfx);
    }

    var furr_idx = this.GetFurniture();
    if (furr_idx != -1) {

        var curr_fur_type = this.furniture_list[furr_idx];
        var furimg = this.furniture_images[curr_fur_type];

        var truck_width = 164;
        var ct = this.truck_x + (truck_width / 2) + 10;
        var cy = this.truck_y + 170; // from paint

        this.fur_x = ct - (furimg._image.width / 2);
        this.fur_y = cy - (furimg._image.height / 2);

        if (drag) {
            this.fur_x += ddelta_x;
            this.fur_y += ddelta_y;
        }

        furimg.Draw(gfx, this.fur_x, this.fur_y);
    }
    //--> truck and furniture
    
    //render the house targets
    if (this.ht_list) {
        for (var i = 0; i < this.ht_list.length; i++) {
            var house = this.ht_list[i];
            if (!house.visible || house.done)
                continue;

            bubblex = 0;
            bubbley = 0;
            bub_width = 0;
            exx = 0;
            exy = 0;

            if (house.position == HOUSE_POSITION_LEFT) {
                bubblex = house.ui_x + (house.width);
                bubbley = house.ui_y - 10;
                bub_width = 97;

                exx = house.ui_x;
                exy = house.ui_y;

                this.bubble_left.Draw(gfx,
                    bubblex,
                    bubbley);


            } else if (house.position == HOUSE_POSITION_RIGHT) {
                bub_width = 99;
                bubblex = house.ui_x - bub_width + 20;
                bubbley = house.ui_y - 10;

                exx = house.ui_x + (house.width) - this.exclamation._image.width;
                exy = house.ui_y;

                this.bubble_right.Draw(gfx,
                    bubblex,
                    bubbley);
            }

            var image = this.furniture_images[house.furniture_type];
            var center = bubblex + (bub_width / 2);
            var yoffset = [20, 10, 20, 15, 15, 30, 0, 20, 28, 0];

            image.Draw(gfx, center - (image._image.width / 2),
                bubbley - yoffset[house.furniture_type]);

            if (house.is_irate)
                this.exclamation.Draw(gfx, exx, exy);

            //------------------------------------------------
            // for debugging
            // gfx.FillRect(house.ui_x, house.ui_y, house.width, house.height, "rgb(255,0,0)", 0.3);
            //------------------------------------------------
        }
    }

    if (this.superman) {
        this.superman.Draw(gfx);
    }

    this.DrawUI(gfx);

    //Done Detection
    var string = new Array();
    if (this.strike == 0) {
        this.done = true;
        string.push("Game Failed!");
        string.push("Take care of your truck");
    } else if (this.GetFurnitureDoneCnt() == MAX_HOUSES_TO_DELIVER) {
        string.push("Delivery Completed!");
        this.done = true;
    }

    if (this.done) {
        var style = "Bold 40pt Calibri";
        var ctx = gfx._canvasBufferContext;
        ctx.font = style;

        var y = 500;
        for (var i = 0; i < string.length; i++) {

            var text = string[i];
            var textWidth = ctx.measureText(text);
            var x = (DEFAULT_WINDOW_WIDTH / 2);

            gfx.DrawText(text,
                      x - (textWidth.width / 2), y,
                      "rgb(255,255,255)",
                     style);

            y += 52;
        }
    }

    //Animated Texts
    for (var m = 0; m < this.animatedTextList.length; m++) {
        this.animatedTextList[m].Draw(gfx);
    }

    if (this.state == GAME_STATE_POPUP) {
        this.popup.Draw(gfx);
        return;
    }
}

GameState.prototype.DrawUI = function (gfx)
{
    // timer
    var style = "30pt Calibri";
    var ui_y = 40;

    var ctx = gfx._canvasBufferContext;
    ctx.font = style;
    text = FormatTimeStr(this._gameElapsedTime)

    var textWidth = ctx.measureText(text);
    var x = (DEFAULT_WINDOW_WIDTH / 2);

    gfx.DrawText(text,
              x - (textWidth.width / 2), ui_y,
             "rgb(255,255,255)",
             style);

    gfx.DrawText("Strike left:  " + this.strike,
             10, ui_y,
             "rgb(255,255,255)",
             "20pt Calibri");
    
    gfx.DrawText("Furnitures:   " + this.GetFurnitureDoneCnt() + "/" + MAX_HOUSES_TO_DELIVER,
         540, ui_y,
         "rgb(255,255,255)",
         "20pt Calibri");
}

GameState.prototype.GetFurnitureDoneCnt = function ()
{
    var count = 0;
    for (var i = 0; i < this.furniture_flag.length; i++) {
        if (this.furniture_flag[i])
            count++;
    }
    return count;
}

GameState.prototype.MoveNextFurniture = function ()
{
    console.log("BEFORE Furniture Index " + this.fur_idx);
    
    this.fur_idx = (this.fur_idx + 1) % this.furniture_list.length;
    this.fur_idx = this.GetFurniture();
    console.log("NEW Furniture Index " + this.fur_idx);
    console.log(this.furniture_list);
    console.log(this.furniture_flag);
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
GameState.prototype.Unload = function () {
    this.CleanupUIManager();
}

var mouse_down = false;
var cached_mouse_x = 0;
var cached_mouse_y = 0;

var mdelta_x = 0;
var time_mouse_down = 0;
var hit = false;
var drag = false;

var ddelta_x = 0;
var ddelta_y = 0;

GameState.prototype.EventHandler = function (e) {

    if (!this.done) {
        if (e.type == "mousedown" || e.type == "touchstart") {

            var mouse = getNormalizedMouse(e);
            mouse_down = true;

            cached_mouse_x = mouse.x;
            cached_mouse_y = mouse.y;

            if (this.IsMouseOnFurniture(mouse.x, mouse.y)) {
                time_mouse_down = new Date().getTime();
                hit = true;
            } else {
                hit = false;
            }

        } else if (e.type == "mousemove" || e.type == "touchmove") {
            //update all the UI
			e.preventDefault();
			
            var mouse = getNormalizedMouse(e);

            if (mouse_down) {
                if (hit) {
                    drag = true;

                    ddelta_x = mouse.x - cached_mouse_x;
                    ddelta_y = mouse.y - cached_mouse_y;

                    console.log("drag delta X=" + ddelta_x);
                    console.log("drag delta Y=" + ddelta_y);
                } else {
                    mdelta_x = mouse.x - cached_mouse_x;
                }
            }

        } else if (e.type == "mouseup" || e.type == "touchend") {
            var mouse = getNormalizedMouse(e);
            mouse_down = false;
            mdelta_x = 0;


            if (drag) {

                //drag correction
                var error = 8;
                if( Math.abs(ddelta_x) < error && Math.abs(ddelta_y) < error){
                    this.MoveNextFurniture();
                    console.log("Switch furniture");
                    console.log("Drag cancelled");
                } else {
                    for (var i = 0; i < this.ht_list.length; i++) {
                        var house = this.ht_list[i];
                        if (!house.visible)
                            continue;

                        var x = this.fur_x;
                        var y = this.fur_y;
                        if (x > house.ui_x && x < house.ui_x + house.width &&
                            y > house.ui_y && y < house.ui_y + house.height) {
                            var furr_idx = this.GetFurniture();

                            if (house.furniture_type == this.furniture_list[furr_idx]) {
                                console.log("Drop delivered!");

                                this.furniture_flag[furr_idx] = true;
                                house.done = true;

                                console.log("house index " + i);
                                console.log("flag index " + furr_idx);

                                var cx = house.ui_x + (house.width / 2);
                                var cy = house.ui_y + (house.height / 2);

                                this.AddAnimatedText(house.ui_x, cy, cx, cy);
                            }
                        }
                    }
                }
            } else {

                if (this.IsMouseOnFurniture(mouse.x, mouse.y)) {
                    this.MoveNextFurniture();
                    console.log("Switch furniture");
                }
            }

            drag = false;
        }
    }

    if (e.type == "keydown" && this.state ==0) {

        // for testing only
        //this.EnterIrateCustomer();

        //this.EnterMFPersonel();
    }

    this.EventHandlerBase(e);

}


