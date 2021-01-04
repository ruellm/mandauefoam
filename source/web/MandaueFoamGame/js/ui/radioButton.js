/**
    Definition of a radio button class
    Also contains definition for Radio Button Group
    and Toggle Button
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Jan 10, 2015

    First use in PopcakeLegend
*/

function RadioButton()
{
    this.selected = false;
    this.pressed = false;
    this.id = -1;
}

RadioButton.prototype = new Button;

RadioButton.prototype.Load = function (bgcolor, hicolor, selectedColor)
{
    this.bgcolor = bgcolor;
    this.hicolor = hicolor;
    this.selectedColor = selectedColor;
    this.selected = false;
    this.pressed = false;
    
}

RadioButton.prototype.OnMouseDown = function (x, y) {
    if (!this.enable) return;

    if (this._fnMouseDownEvnt) {
        this._fnMouseDownEvnt();
    }
}

RadioButton.prototype.Select = function () {
    if (!this.enable) return;
    this.selected = true;
}

RadioButton.prototype.UnSelect = function () {
    if (!this.enable) return;
    this.selected = false;
}

RadioButton.prototype.Draw = function (gfx) {
    
    var linecolor = 0;
    if (this.selected)
        linecolor = this.hicolor;

    gfx.DrawCircle(this._X + (this._width / 2),
        this._Y + (this._height / 2),
        (this._width / 2), // radius
        this.bgcolor, linecolor, 2);

    if( this.pressed){
        gfx.DrawCircle(this._X + (this._width / 2),
            this._Y + (this._height / 2),
            (this._width / 4), // radius
             this.selectedColor);
    }
}


/***/
/*TOGGLE BUTTON**/
/*Add to Radio button GROUP to work**/
function ToggleButton() {
    this.image = null;
    this.active = false;
}

ToggleButton.prototype = new RadioButton;

ToggleButton.prototype.Load = function (idle, hover, active) {
    this.image = new Array();

    var idlem = new ImageObject();
    idlem.Load(idle);
    this.image.push(idlem);

    var hoverm = new ImageObject();
    hoverm.Load(hover);
    this.image.push(hoverm);

    var activem = new ImageObject();
    activem.Load(active);
    this.image.push(activem);
}

ToggleButton.prototype.OnMouseDown = function (x, y) {
    if (!this.enable) return;

    this.active = !this.active;

    if (this.clickAudioPath != null) {
        LoadAndPlay(this.clickAudioPath);
    }

    if (this._fnMouseDownEvnt) {
        this._fnMouseDownEvnt();
    }
}

ToggleButton.prototype.Draw = function (gfx) {

    if (this.pressed) {
        this.image[2].Draw(gfx, this._X, this._Y);
    } else {
        if (this.selected) {
            this.image[1].Draw(gfx, this._X, this._Y);
        } else {
            this.image[0].Draw(gfx, this._X, this._Y);
        }
    }
}

//
// Radio Button Group
//

function RadioButtonGroup()
{
    this.buttonList = new Array;
    this.index = 0;
}

RadioButtonGroup.prototype.Add = function (radio)
{
    var context = this;
    radio.id = this.buttonList.length;
    radio._fnMouseDownEvnt = function () {
        context.OnSelectRadio(this.id);
    };
    if (this.buttonList.length == 0)
    {
        radio.pressed = true;
    }
    this.buttonList.push(radio);
}
RadioButtonGroup.prototype.OnSelectRadio = function (id)
{
    this.index = id;
    for (var n = 0; n < this.buttonList.length; n++) {
        this.buttonList[n].pressed = (n == this.index);
    }
}

