/**
    definitions.js
    Game definitions for Mandaue Foam Game
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: January 23, 2016
*/

// Local coordinates in image space
var HOUSE_COORDINATES_LEFT =[
    //0
    {
        x: 25.48, y: 0.00,
        w: 216.55, h: 178.33
    },
    //1
    {
        x: 25.48, y: 222.92,
        w: 222.92, h: 178.33
    },
    //2
    {
        x: 38.21, y: 445.83,
        w: 210.18, h: 203.81
    },
    //3
    {
        x: 25.48, y: 783.40,
        w: 216.55, h: 184.70
    },
    //4
    {
        x: 31.85, y: 1006.31,
        w: 216.55, h: 197.44
    },
    //5
    {
        x: 38.21, y: 1318.40,
        w: 203.81, h: 178.33
    },
    //6
    {
        x: 31.85, y: 1547.68,
        w: 210.18, h: 171.96
    },
    //7
    {
        x: 57.32, y: 1770.60,
        w: 191.07, h: 197.44
    },
    //8
    {
        x: 31.85, y: 2069.95,
        w: 210.18, h: 178.33
    },
    //9
    {
        x: 31.85, y: 2299.23,
        w: 210.18, h: 171.96
    },
    //10
    {
        x: 57.32, y: 2515.78,
        w: 191.07, h: 203.81
    },
    //11
    {
        x: 38.21, y: 2859.71,
        w: 203.81, h: 178.33
    },
    //12
    {
        x: 44.58, y: 3082.63,
        w: 210.18, h: 203.81
    },
    //13
    {
        x: 38.21, y: 3394.71,
        w: 203.81, h: 171.96
    },
    //14
    {
        x: 44.58, y: 3617.63,
        w: 197.44, h: 178.33
    },
    //15
    {
        x: 57.32, y: 3840.55,
        w: 184.70, h: 197.44
    },

];

var HOUSE_COORDINATES_RIGHT = [
    //16
    {
        x: 678.04, y: 63.02,
        w: 221.81, h: 178.96
    },
    //17
    {
        x: 673.00, y: 299.95,
        w: 211.73, h: 204.17
    },
    //18
    {
        x: 683.08, y: 647.80,
        w: 214.25, h: 199.13
    },
    //19
    {
        x: 665.44, y: 884.73,
        w: 231.90, h: 171.40
    },
    //20
    {
        x: 688.13, y: 1202.33,
        w: 201.65, h: 196.61
    },
    //21
    {
        x: 667.96, y: 1426.66,
        w: 229.38, h: 178.96
    },
    //22
    {
        x: 685.60, y: 1630.83,
        w: 219.29, h: 168.88
    },
    //23
    {
        x: 675.52, y: 1845.08,
        w: 216.77, h: 194.09
    },
    //24
    {
        x: 667.96, y: 2122.35,
        w: 231.90, h: 189.05
    },
    //25
    {
        x: 667.96, y: 2372.39,
        w: 221.81, h: 201.65
    },
    //26
    {
        x: 678.04, y: 2708.64,
        w: 226.85, h: 211.73
    },
    //27
    {
        x: 670.48, y: 2955.66,
        w: 226.85, h: 176.44
    },
    //28
    {
        x: 670.48, y: 3273.26,
        w: 221.81, h: 196.61
    },
    //29
    {
        x: 665.44, y: 3496.58,
        w: 229.38, h: 184.00
    },
    //30
    {
        x: 673.00, y: 3700.75,
        w: 231.90, h: 186.53
    },
    //31
    {
        x: 685.60, y: 3912.48,
        w: 209.21, h: 204.17
    },

];

var OBJECT_SETTINGS = [
    {
        imge: "images/elements/obstacle1.png",
        lx: 406,
        ly: 4,
        width: 78,
        tile: 2,
        animated: false,
        collide: true
    },
    {
        imge: "images/elements/obstacle2.png",
        lx: 277,
        ly: 0,
        width: 97,
        tile: 1,
        animated: false,
        collide: true
    },

    {
        imge: "images/elements/CHICKEN_sprite.png",
        lx: 768,
        ly: 231,
        width: 58,
        tile: 0,
        animated: true,
            FPS: 10,
            frame_count: 10,
        collide: true,
        moving: true,
            movement_type: 0,   // 0: reset , 1: continous 
            movement_speed: -100,
            target_coord_x : 0
    },
    
];

var IMAGE_WIDTH = 768;
var TILE_HEIGHT = 1732;
var IMAGE_HEIGHT = TILE_HEIGHT * 3;
var VIEWPORT_WIDTH = DEFAULT_WINDOW_WIDTH;
var VIEWPORT_HEIGHT = DEFAULT_WINDOW_HEIGHT;

var MAX_HOUSES_TO_DELIVER = 10; 
var MAX_DEPTH = 0; //

var HOUSE_POSITION_LEFT = 0;
var HOUSE_POSITION_RIGHT = 1;

var MAX_TRUCK_X = 343;
var MIN_TRUCK_X = 243;

var FURNITURES_COUNT = 9;

var MAX_STRIKE = 3;
var IRATE_CUSTOMER_WAITSECS = 30;

function GameObject()
{
    this.ui_x = 0;
    this.ui_y = 0;

    this.global_x = 0;
    this.global_y = 0;

    this.width = 0;
    this.height = 0;

    this.visible = false;    //-> Hack until correct solution is found

    this.img = null;

    this.collide = false;
    this.animated = false;

    this.moving = false,
    this.movement_type = 0;
    this.movement_speed = 0;
    this.target_coord_x = 0;
}


function HouseTarget() {
    this.furniture_type = 0;
    this.position = -1;         //0: left, 1: right

    this.done = false;

    this.is_irate = false;
    this.timer_irate = 0;
}

HouseTarget.prototype = new GameObject;