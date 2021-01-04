//------------------------------------------
// Source file for bullet related operations
// Date Created: March 20, 2013
// Author: Ruell Magpayo 
// Made in Los Angeles, CA. 90045
//--------------------------------------------

var BULLET_DEFAULT_SPEED = 1000;
var BULLET_DEFAULT_RADIUS = 20;

function Bullet()
{
    this._X = 0;
    this._Y = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.image = null;
}

Bullet.prototype.Load = function ()
{
    this.image = new ImageObject();
    this.image.Load("images/game/bullet.png");
}

Bullet.prototype.Update = function (elapsed)
{
    this._X += this.deltaX * BULLET_DEFAULT_SPEED * elapsed;
    this._Y += this.deltaY * BULLET_DEFAULT_SPEED * elapsed;
}

Bullet.prototype.Draw = function (gfx)
{
    ////////////////////////////////////////////////
    // TEMPORARY! Draw a circle
    ///////////////////////////////////////////////
    /*
    gfx._canvasBufferContext.save();

    gfx._canvasBufferContext.beginPath();
    gfx._canvasBufferContext.arc(this._X, this._Y, BULLET_DEFAULT_RADIUS, 0, 2 * Math.PI, false);
    gfx._canvasBufferContext.fillStyle = "rgb(255,255,255)";
    gfx._canvasBufferContext.fill();
    gfx._canvasBufferContext.restore();
    */
    this.image.Draw(gfx, this._X - this.image._image.width / 2,
        this._Y - this.image._image.height / 2);
}