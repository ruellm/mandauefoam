/**
    Custom ListBox class for TypingRush Game
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Feb 09, 2014
*/

function CustomListBox() {
    //...
}

CustomListBox.prototype = new ListBoxBase;

CustomListBox.prototype.Update = function (elapsed) {
    //...
}

CustomListBox.prototype.Draw = function (gfx) {

    // X and Y location, Width and Height, including color should be
    // dynamic
    gfx.FillRect(310, 360,
        410,
        300,
        "rgb(15,8,0)", 1.0);

    var currY = 390;

    //--------------------------------------------
    //evaluate which text to display -- must be in baseclass ListBoxBase
    //transfer later
    var startX = 0;
    var end = this.max_to_scroll;
    if (end > this.textList.length) {
        end = this.textList.length;
    }
    if (this.currIdx >= this.max_to_scroll) {
        startX = (this.currIdx - this.max_to_scroll) + 1;
        end = (startX + this.max_to_scroll > this.textList.length) ? this.textList.length :
             startX + this.max_to_scroll;
    }
    //--------------------------------------------


    for (i = startX; i < end; i++) {
        var style = "20pt Fixedsys-TTF";
        var text = this.textList[i];
        var ctx = gfx._canvasBufferContext;
        ctx.font = style;

        var color = "rgb(255,255,255)";
        if (this.currIdx == i) {
            color = "rgb(255,0,0)"
        }

        var textWidth = ctx.measureText(text);
        gfx.DrawText(text,
                330, currY,
                color, style);
        currY += 35;

    }
}