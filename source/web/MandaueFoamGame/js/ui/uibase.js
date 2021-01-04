/**
    UI element base class.
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 01, 2012
*/
function UIBase() {
        //..
        this._fnMouseDownEvnt = null;
        this._fnMouseEnterMoveEvnt = null;
        this._fnMouseLeaveEvnt = null;

        this._dragged = false;
        this.pointerID = 0;
        this.index = -1;

        // added 05-31-2014
        this.id = -1;
        this.enable = true;
}

UIBase.prototype = new BaseObject;

UIBase.prototype.OnMouseDown = function (x, y) {
        if (this._fnMouseDownEvnt) {
                this._fnMouseDownEvnt();
        }
}

UIBase.prototype.OnMouseUp = function (x, y) {
        //...
}

UIBase.prototype.OnMouseEnterMove = function (x, y) {
        this.Select();
        if (this._fnMouseEnterMoveEvnt) {
                this._fnMouseEnterMoveEvnt();
        }
}

UIBase.prototype.OnMouseLeave = function () {
        this.UnSelect();
        if (this._fnMouseLeaveEvnt) {
                this._fnMouseLeaveEvnt();
        }
}

UIBase.prototype.Select = function () {
        //...
}

UIBase.prototype.UnSelect = function () {
        //...
}

// Key handling events
UIBase.prototype.OnKeyDown = function (key) {
    //...
    return false;
}

UIBase.prototype.OnKeyPress = function (key) {
    //...
    return false;
}

UIBase.prototype.SetEnable = function (value)
{
    this.enable = value;
}