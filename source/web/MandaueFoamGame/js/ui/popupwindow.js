/**
  *  popupwindow.js
  *  base class for pop-up window
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: October 19, 2014
  * 
*/

var POPUPWINDOW_STATE_NORMAL = 0;
var POPUPWINDOW_STATE_ZOOMING = 1;

function PopUpWindow()
{
    this.state = 0;

    this.targetWidth = 0;
    this.targetHeight = 0;

    this.SIZE_ACCEL = 2000;

    this.image = null;
    this.fnClose = null;
    this.fnAnimDone = null;
}

PopUpWindow.prototype = new State;

PopUpWindow.prototype.Create = function (width, height, bcolor, fcolor)
{
    this._width = width;
    this._height = height;
    this.border_color = bcolor;
    this.fill_color = fcolor;
}

PopUpWindow.prototype.LoadImage = function (path)
{
    this.image = new ImageObject();
    this.image.Load(path);
    this._width = this.image._image.width;
    this._height = this.image._image.height;
}

PopUpWindow.prototype.UpdateBase = function (elapsed)
{
    if (this.state == POPUPWINDOW_STATE_ZOOMING) {
        var count = 0;
        if (this.SIZE_ACCEL > 0) {
            if (this._width < this.targetWidth) {
                this._width += (this.SIZE_ACCEL * elapsed);
            } else {
                this._width = this.targetWidth;
                count++;
            }

            if (this._height < this.targetHeight) {
                this._height += (this.SIZE_ACCEL * elapsed);
            } else {
                this._height = this.targetHeight;
                count++;
            }
        } else {
            if (this._width > this.targetWidth) {
                this._width += (this.SIZE_ACCEL * elapsed);
            } else {
                this._width = this.targetWidth;
                count++;
            }

            if (this._height > this.targetHeight) {
                this._height += (this.SIZE_ACCEL * elapsed);
            } else {
                this._height = this.targetHeight;
                count++;
            }
        }

        if (count >= 2) {
            this.state = POPUPWINDOW_STATE_NORMAL;
            if (this.fnAnimDone) {
                this.fnAnimDone();
            }
        }

    }
}

PopUpWindow.prototype.Update = function (elapsed)
{
    this.UpdateBase(elapsed);
}
PopUpWindow.prototype.PopShow = function()
{
    this.targetWidth = this._width;
    this.targetHeight = this._height;
    this._width = 0;
    this._height = this._height;
    this.SIZE_ACCEL = 2000;

    this.state = POPUPWINDOW_STATE_ZOOMING;
}

PopUpWindow.prototype.ZoomIn = function ()
{
    this.targetWidth = this._width;
    this.targetHeight = this._height;
    this._width = this._width * 0.1;
    this._height = this._height * 0.1;

    this.state = POPUPWINDOW_STATE_ZOOMING;

}

PopUpWindow.prototype.PopClose = function () {
    this.targetWidth = 0;
    this.targetHeight = this._height;
    this.SIZE_ACCEL *= -1;
    this.state = POPUPWINDOW_STATE_ZOOMING;
}

PopUpWindow.prototype.DrawBase = function (gfx)
{
    gfx.FillRect(0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT,
           "rgb(0,0,0)", 0.4);

    if (this.image != null) {
        gfx.DrawImage(this.image._image, 0, 0, this.image._image.width, this.image._image.height,
             (DEFAULT_WINDOW_WIDTH / 2) - (this._width / 2),
             (DEFAULT_WINDOW_HEIGHT / 2) - (this._height / 2),
             this._width, this._height, 1.0);
    } else {
        gfx.DrawRoundRect_2(
            (DEFAULT_WINDOW_WIDTH / 2) - (this._width / 2),
            (DEFAULT_WINDOW_HEIGHT / 2) - (this._height / 2),
            this._width,
            this._height,
            8,      // round border
            this.border_color,
            this.fill_color,
            2,      // line width 
            1.0);
    }
}

PopUpWindow.prototype.Draw = function (gfx)
{
    this.DrawBase(gfx);
}

PopUpWindow.prototype.EventHandler = function (e) {
    this.EventHandlerBase(e);
}
