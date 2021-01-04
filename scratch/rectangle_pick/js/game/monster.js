//------------------------------------------
// The monster base class
// Date Created: March 18, 2013
// Author: Ruell Magpayo 
// Made in Los Angeles, CA. 90045
//--------------------------------------------

// Monster type
var MONSTER_TYPE_UKNWN = -1;
var MONSTER_TYPE_DROID = 0;
var MONSTER_TYPE_DODO = 1;
var MONSTER_TYPE_DOG = 2;
var MONSTER_TYPE_ENGR = 3;
var MONSTER_TYPE_ALIEN = 4;

// Monster fall rate
var MONSTER_FALLRATE_DEFAULT = 50;

function MonsterBase()
{
    this.type = MONSTER_TYPE_UKNWN;
    this.damage_rate = 1.0;         // damage rate, it will be multiplied
    this.life = 1.0;
    this.direction = 0;             // 0: left or 1: right
    this.fall_rate = MONSTER_FALLRATE_DEFAULT;
    this.context = null;
    this.animations = null;
    this.currIdx = 0;               // current animation index

    // use for flipping the object. base on direction
    this.canvas = null;
    this.context = null;

    this.flybase = 0;

}

MonsterBase.prototype = new BaseObject;

MonsterBase.prototype.OnGroundTouch = function ()
{
    //.. inherited by child classes
}

MonsterBase.prototype.Fall = function (elapsed)
{
    if (this._Y + this.flybase < GROUND_Y) {
        //still falling
        var incx = Math.floor(Math.random() * 1);
        var dirx = Math.floor(Math.random() * 5);
        if (dirx % 2 == 0) {
            incx = -incx;
        }

        this._X += incx * elapsed;
        this._Y += MONSTER_FALLRATE_DEFAULT * elapsed;

    }
    else {
        // change to walk
        this.OnGroundTouch();
    }

}

MonsterBase.prototype.BaseUpdate = function (elapsed)
{
    this.animations[this.currIdx].Update(elapsed);
}

MonsterBase.prototype.Update = function (elapsed)
{
    this.BaseUpdate(elapsed);
}

MonsterBase.prototype.DrawBase = function (gfx)
{
    var x = this._X;
    var y = this._Y;

    if (this.direction == 1) {
        gfx._canvasBufferContext.save();
        gfx._canvasBufferContext.scale(-1, 1);
        x = -x;
    }

    this.animations[this.currIdx]._X = x;
    this.animations[this.currIdx]._Y = y;
    this.animations[this.currIdx].Draw(gfx);

    if (this.direction == 1) {
        gfx._canvasBufferContext.restore();
    }
}

MonsterBase.prototype.Draw = function (gfx)
{
    this.DrawBase(gfx);
}

//---------------------------------------------------------------------------------------
// DROID monster
function DroidMonster()
{
    this.type = MONSTER_TYPE_DROID;
    this.flybase = 139;
}

DroidMonster.prototype = new MonsterBase();

DroidMonster.prototype.LoadAnimations = function ()
{
    this.animations = new Array();

    var fly = new AnimatedObject();
    fly.Load("images/game/monsters/droid/droid_fly.png");
    fly.Set(5, 20.0, true);
    fly._frameWidth = 238;
    fly._fnCallback = (function () {
        //...
    });

    var walk = new AnimatedObject();
    walk.Load("images/game/monsters/droid/droid_walk.png");
    walk.Set(5, 14.0, true);
    walk._frameWidth = 424;
    walk._fnCallback = (function () {
        //...
    });

    var attack = new AnimatedObject();
    attack.Load("images/game/monsters/droid/droid_attack.png");
    attack.Set(5, 18.0, true);
    attack._frameWidth = 428;
    attack._fnCallback = (function () {
        //...
    });

    this.animations.push(fly);
    this.animations.push(walk);
    this.animations.push(attack);
}

DroidMonster.prototype.Initialize = function ()
{
    this.LoadAnimations();
}

DroidMonster.prototype.OnGroundTouch = function () {
    this.currIdx = 1;
}

DroidMonster.prototype.Update = function (elapsed)
{
    if (this.currIdx == 0) {
        this.Fall(elapsed);
    }

    this.BaseUpdate(elapsed);
}

//---------------------------------------------------------------------------------------