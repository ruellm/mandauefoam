/**
    ListBox Base class
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Feb 09, 2014

    First Adopted for TypingRush
*/

function ListBoxBase()
{
    this.textList = null;
    this.currIdx = 0;
    this.max_to_scroll = 8;

    // Function callback when ListBox Hit Enter Key
    this._fnOnValidate = null;
    this.sorted = false;
}

ListBoxBase.prototype = new UIBase;

ListBoxBase.prototype.OnKeyDown = function (keycode) {

    if (this.textList == null) return;
    var result = false;

    if (keycode == DOWN_KEY) {

        // Down Key
        this.currIdx = (this.currIdx + 1);
        if (this.currIdx >= this.textList.length)
            this.currIdx = this.textList.length - 1;

        return true;
    } else if (keycode == UP_KEY) {

        this.currIdx = (this.currIdx == 0) ?
                0 : this.currIdx - 1;

        return true;
    } else if (keycode == ENTER_KEY) {
        // enter key
        if (this._fnOnValidate) {
            this._fnOnValidate.apply();
        }
        result = true;
    }

    if (!this.sorted) return;

    if (keycode != ESC_KEY && keycode != 16 && keycode != ENTER_KEY) {
        // Escape,left shift Keys 
        var text = String.fromCharCode(keycode);
        if (text != "" && text != null) {

            for (var i = 0; i < this.textList.length; i++) {
                if (this.textList[i].charAt(0) == text) {
                    this.currIdx = i;
                    break;
                }
            }
        }
    }

    return result;
}

ListBoxBase.prototype.OnKeyPress = function (key) {
   //... 
}

ListBoxBase.prototype.AddText = function (text) {
    if (this.textList == null) {
        this.textList = new Array();
    }

    this.textList.push(text);
}

ListBoxBase.prototype.Sort = function () {
    if (this.textList == null) return;
    this.textList.sort();
    this.sorted = true;
}

ListBoxBase.prototype.GetText = function (index) {
    if (this.textList == null) return;
    return this.textList[index];
}