/**
  *  checkBox.js
  *  Checkbox UI
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: November 09, 2015
  *  First use in PopcakeLegend
*/
function CheckBoxCtrl() {
    this.selected = false;
    this.checked = false;
    this.id = -1;
}

CheckBoxCtrl.prototype = new Button;

CheckBoxCtrl.prototype.Load = function (width, height,
            bgcolor, hicolor, text, textcolor, textStyle) {

    this._width = width;
    this._height = height;

    this.bgcolor = bgcolor;
    this.hicolor = hicolor;

    this.text = text;
    this.textColor = textcolor;
    this.textStyle = textStyle;

    this.selected = false;
    this.checked = false;
    this.border_size = 2;
    this.textDistance = 5;
}

CheckBoxCtrl.prototype.OnMouseDown = function (x, y) {
    if (!this.enable) return;

    this.checked = !this.checked;

    if (this._fnMouseDownEvnt) {
        this._fnMouseDownEvnt();
    }
}

CheckBoxCtrl.prototype.Select = function () {
    if (!this.enable) return;
    this.selected = true;
}

CheckBoxCtrl.prototype.UnSelect = function () {
    if (!this.enable) return;
    this.selected = false;
}

CheckBoxCtrl.prototype.Draw = function (gfx) {

    var color = this.bgcolor;
    if (this.selected)
        color = this.hicolor;

    gfx.FillRect(this._X, this._Y,
        this._width, this._height,
        color, 1);


    gfx.FillRect(this._X + this.border_size, this._Y + this.border_size,
        this._width - (this.border_size*2), this._height - (this.border_size*2),
        this.bgcolor, 1);

    if (this.checked) {
        // Draw an X
        gfx.DrawLine(
			this._X + this.border_size,  
			this._Y+ this.border_size,
            this._X + this._width - (this.border_size), 
			this._Y + this._height - (this.border_size), 
			2,
            "rgb(0,0,0)");

        gfx.DrawLine(this._X + this._width - (this.border_size), 
		    this._Y + this.border_size,
            this._X + this.border_size, 
			this._Y + this._height - (this.border_size), 2,
            "rgb(0,0,0)");
    }

    gfx.DrawText(this.text,
           this._X + this._width + this.textDistance,
           this._Y + this._height, this.textColor, this.textStyle);
}