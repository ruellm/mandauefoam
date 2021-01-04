/**
    TextBox Base class
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Feb 09, 2014

    First Adopted for TypingRush
*/

function TextBoxBase() 
{
    this.text = "";
    this.max_char = 10;
}

TextBoxBase.prototype = new UIBase;

TextBoxBase.prototype.OnKeyDown = function (keycode) {
    if (keycode == 8) {
        //backspace delete character
        this.text = this.text.slice(0, this.text.length - 1);
    }
}

TextBoxBase.prototype.OnKeyPress = function (keycode) {
    //...
    if (this.text.length + 1 >= this.max_char) return;

    if (keycode != 27 && keycode != 8 && keycode != 13) {

        //hardcoded: accept letters for now
        var input = String.fromCharCode(keycode)
        if (isChar(input)) {
            //NOTE: this testing must be configured in later 
            // versions of the engine/framework
            this.text += input;
        }
    }
}