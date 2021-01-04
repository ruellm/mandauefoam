/**
    Custom TextBox for TypingRush
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Feb 09, 2014
*/

function CustomTextBox() {
    
}

CustomTextBox.prototype = new TextBoxBase;

CustomTextBox.prototype.Update = function (elapsed) {
   
}

CustomTextBox.prototype.Draw = function (gfx) {

    // X and Y location, Width and Height, including color should be
    // dynamic
    gfx.FillRect(310, 370,
        410, 50,
        "rgb(15,8,0)", 1.0);

    var style = "25pt Fixedsys-TTF";
    var text = this.text;
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;

    var textWidth = ctx.measureText(text);
    var cursorX = 330;

    gfx.DrawText(text,
                330, 408,
                "rgb(255,255,255)", style);

    cursorX += textWidth.width +1;

    //----------------------------------------
    // Draw the cursor
    var ctx = gfx._canvasBufferContext;
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(cursorX, 408);
    ctx.lineTo(cursorX + 16, 408);
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.stroke();

    ctx.restore();
    //----------------------------------------
}