/**
    UI object handler manager class
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 01, 2012
*/

function UIManager() {
    // list of UIObject
    this._uiList = new Array();
    this.focus = null;
}

UIManager.prototype.Add = function (add) {
    add.index = this._uiList.length;
    this._uiList.push(add);
}

UIManager.prototype.Remove = function (obj) {
        for (var i = 0; i < this._uiList.length; i++) {
                if (this._uiList[i] == obj) {
                        this._uiList.splice(i, 1);
                        break;
                }
        }
}

UIManager.prototype.OnMouseMove = function (x, y) {
        for (var i = 0; i < this._uiList.length; i++) {
                var obj = this._uiList[i];
                if (obj._visible == false) continue;
                if (x >= obj._X && x <= obj._X + obj._width &&
                        (y >= obj._Y && y <= obj._Y + obj._height)) {
                                obj.OnMouseEnterMove(x, y);
                } else {
                        obj.OnMouseLeave();
                }
        }
}

UIManager.prototype.OnMouseDown = function (x, y, pointerID) {
        for (var i = 0; i < this._uiList.length; i++) {
                var obj = this._uiList[i];
                if (obj._visible == false) continue;
                if (x >= obj._X && x <= obj._X + obj._width) {
                        if (y >= obj._Y && y <= obj._Y + obj._height) {
                                obj.pointerID = pointerID;
                                obj.OnMouseDown(x, y);
                                // added 12/30/2014 -- if a button has been triggered
                                // no need to entertain others
                                return true;
                        }
                }
        }
        return false;
}

UIManager.prototype.OnMouseUp = function (x, y, pointerID) {
        for (var i = 0; i < this._uiList.length; i++) {
                var obj = this._uiList[i];
                if (obj._visible == false) continue;
                /*if ((
                    (x >= obj._X && x <= obj._X + obj._width) &&
                    (y >= obj._Y && y <= obj._Y + obj._height)
                    ) || obj._dragged) {
                        obj.OnMouseUp(x, y);
                    }
                    */
                if (pointerID == obj.pointerID)
                        obj.OnMouseUp(x, y);
        }
}

UIManager.prototype.Update = function (elapsed) {
        for (var i = 0; i < this._uiList.length; i++) {
                this._uiList[i].Update(elapsed);
        }
}

UIManager.prototype.Draw = function (gfx) {
        for (var i = 0; i < this._uiList.length; i++) {
                if (this._uiList[i]._visible) {
                        this._uiList[i].Draw(gfx);
                }
        }
}

UIManager.prototype.Destroy = function () {
        for (var i = 0; i < this._uiList.length; i++) {
                this._uiList[i].Destroy();
        }
}


UIManager.prototype.Find = function (obj) {
        for (var i = 0; i < this._uiList.length; i++) {
                if (this._uiList[i] == obj)
                        return this._uiList[i];
        }
        return null;
}

UIManager.prototype.OnKeyDown = function (keycode) {
    if (this.focus) {
        return this.focus.OnKeyDown(keycode);
    }
    return false;
}

UIManager.prototype.OnKeyPress = function (keycode) {
    if (this.focus) {
        return this.focus.OnKeyPress(keycode);
    }
    return false;
}

UIManager.prototype.SetFocus = function (control) {
    this.focus = control;
}

UIManager.prototype.SetFocusIdx = function (index) {
    for (var i = 0; i < this._uiList.length; i++) {
        if (this._uiList[i].index == index) {
            this.focus = this._uiList[i];
            break;
        }
    }
}

UIManager.prototype.GetByID = function (id)
{
    for (var i = 0; i < this._uiList.length; i++) {
        if (this._uiList[i].id == id) {
            return this._uiList[i];
        }
    }
    return null;
}

