/**
  *  slideWindow.js
  *  base class for slide-down window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: November 06, 2014
  * 
*/

var SLIDE_WINDOW_STATE_NORMAL = 0;
var SLIDE_WINDOW_STATE_IN = 1;
var SLIDE_WINDOW_STATE_OUT = 2;
var SLIDE_WINDOW_STATE_UP = 3;

function SlideWindow()
{
    //...
    this.state = 0;
    this._X = 0;
    this._Y = 0;
    this.targetY = 0;
    this.observer = null;
    this.observer_origY = null;
    this.fnAnimDone = null;

    this.LoadAudio();
}

SlideWindow.prototype = new State;

SlideWindow.prototype.LoadAudio = function () {

    this.played = false;
}

SlideWindow.prototype.Load = function ()
{
    //...
}

SlideWindow.prototype.Show = function ()
{
    //...
}

SlideWindow.prototype.PlayAudio = function ()
{
    var slidwindw = GetAudioResource("Slide");
    if (slidwindw) {
        slidwindw.play();
        this.played = true;
    }
}

SlideWindow.prototype.UpdateOffsets = function ()
{
    for (var i = 0; this.observer && i < this.observer.length; i++) {
        this.observer[i]._Y = this._Y + this.observer_origY[i];
    }

    if(  !this.played )
        this.PlayAudio();
}

SlideWindow.prototype.UpdateBase = function (elapsed)
{
    var tolerant = 1;
    var WINDOW_ANIM_SPEED = 5;
    if (this.state == SLIDE_WINDOW_STATE_IN) {
        if (this._Y <= this.targetY - tolerant) {
            var diff = this.targetY - this._Y;
            var value = (diff * WINDOW_ANIM_SPEED * elapsed);

            this._Y += value;

        } else {
            this._Y = this.targetY;
            this.state = SLIDE_WINDOW_STATE_NORMAL;
            if (this.fnAnimDone) {
                this.fnAnimDone();
                this.fnAnimDone = null;
                this.played = false;
            }
        }

        this.UpdateOffsets();

    } else if (this.state == SLIDE_WINDOW_STATE_OUT) {

        if (this._Y < this.targetY) {
            this._Y += (2300 * elapsed);

        } else {
            this._Y = this.targetY;
            //this.state = SLIDE_WINDOW_STATE_NORMAL;
            if (this.fnAnimDone) {
                this.fnAnimDone();
                this.fnAnimDone = null;
                this.played = false;
            }
        }

        //update observers too
        this.UpdateOffsets();

    } else if (this.state == SLIDE_WINDOW_STATE_UP) {
        var goal = this.targetY;
        if (this._Y > goal) {
            var value = (-300 * elapsed);
            this._Y += value;

        } else {
            this._Y = this.targetY;
            this.state = SLIDE_WINDOW_STATE_NORMAL;
            if (this.fnAnimDone) {
                this.fnAnimDone();
                this.fnAnimDone = null;
                this.played = false;
            }
        }

        //update observers too
        this.UpdateOffsets();
    }

}

SlideWindow.prototype.Update = function (elapsed)
{
    this.UpdateBase(elapsed);
}

SlideWindow.prototype.Draw = function (gfx) {
    //...
}

SlideWindow.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}
