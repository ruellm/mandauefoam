/**
    animatedButton.js
    class for animating button on Idle and mouse hover
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created May 10, 2015

*/

function AnimatedButton()
{
    //each object should be animated Image.
    this.idle = null;
    this.hover = null;

    this.current = null;
}

AnimatedButton.prototype = new Button;

AnimatedButton.prototype.Load = function(idle, hover)
{
    this.idle = idle;
    this.hover = hover;

    this.current = this.idle;
}

AnimatedButton.prototype.Update = function (elapsed)
{
    if (this.current == null) {
        if (this.idle != null) {
            this.current = this.idle;
        } else {
            return;
        }
    }
    this.current.Update(elapsed);
}

AnimatedButton.prototype.Select = function () {
    if (!this.enable) return;
    this.current = this.hover;
}

AnimatedButton.prototype.UnSelect = function () {
    if (!this.enable) return;

    this.current = this.idle;
}

AnimatedButton.prototype.Draw = function (gfx)
{
    if (this.current == null) return;

    this.current._X = this._X;
    this.current._Y = this._Y;
    this.current.Draw(gfx);
}