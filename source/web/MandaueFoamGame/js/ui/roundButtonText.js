/**
  *  roundButtonText.js
  *  Round Button with Text
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: October 19, 2014
  * 
*/

function RoundButtonText()
{
    //...
    this.selected = false;
    this.border_color = "rgb(0,0,0)";
}

RoundButtonText.prototype = new Button;

RoundButtonText.prototype.Create = function (width, height, 
        color, colorhover, 
        txtcolor, txtcolorhover,
        text, textstyle, txtsize)
{
    this._width = width;
    this._height = height;
    this.text = text;
    this.bgcolor = color;
    this.bgcolor_hover = colorhover;
    this.textstyle = textstyle;
    this.txtcolor = txtcolor;
    this.txtcolor_hover = txtcolorhover;
    this.txtsize = txtsize;

}

RoundButtonText.prototype.Select = function () {
    if (!this.enable) return;
    this.selected = true;
}

RoundButtonText.prototype.UnSelect = function () {
    if (!this.enable) return;
    this.selected = false;
}

RoundButtonText.prototype.Draw = function (gfx) {

    var fillcolor = (this.selected) ? this.bgcolor_hover : this.bgcolor;
    var txtcolor = (this.selected) ? this.txtcolor_hover : this.txtcolor;

    var style = this.txtsize + "pt " + this.textstyle;

    gfx.DrawRoundRect_2(
        this._X,
        this._Y,
        this._width,
        this._height,
        8,      // round border
        this.border_color,
        fillcolor,
        2,      // line width 
        1.0);

    var center = this._X + (this._width / 2);
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;
    var text = this.text;

    // Render Text header
    var textWidth = ctx.measureText(text);
    gfx.DrawText(text,
       center - (textWidth.width / 2), 
       this._Y + (this._height / 2) + (this.txtsize/2),
       txtcolor,
       style);
}
