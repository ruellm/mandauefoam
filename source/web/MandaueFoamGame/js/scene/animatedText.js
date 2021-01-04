

var ANIMATION_TYPE_IDLE = 0;
var ANIMATION_TYPE_ZOOM_OUT = 1;
var ANIMATION_TYPE_ZOOM_IN = 2;

function AnimatedText()
{
        this.text = "";
        this.type = ANIMATION_TYPE_IDLE;
        this.size = 1;
        this.strike = "";       //Bold, normal,etc
        this.fontface = "";
        this.color = "rgb(255,255,255)";
        this.backcolor = "rgb(250,255,255)";

        // use for animation type zoom center
        this.centerx = 0;
        this.centery = 0;
        this.targetSize = 0;
        this.halfwaySize = 5;
        this.fnZoomDone = null;
        this.staySeconds = 0;
        this.lastTime = 0;
        this.ANIMTEXT_ZOOM_STEP = 300;
        this.alpha = 1;
        this.alpha_step = 0;
}

AnimatedText.prototype = new BaseObject;

AnimatedText.prototype.Update = function (elapsed)
{
        if (this.type == ANIMATION_TYPE_ZOOM_OUT) {
                if (this.size < this.targetSize) {
                        this.size += (this.ANIMTEXT_ZOOM_STEP * elapsed);
                } else if (this.size > this.targetSize &&
                        this.size < this.targetSize + this.halfwaySize) {
                        this.size = this.targetSize + this.halfwaySize;
                } else {
                        this.size = this.targetSize;
                        
                        if (this.lastTime == 0) {
                                this.lastTime = new Date().getTime();
                        } else {
                                var currTime = new Date().getTime();
                                var diff = currTime - this.lastTime;
                                if (diff > this.staySeconds) {
                                        //this.type = ANIMATION_TYPE_ZOOM_IN;
                                        if (this.fnZoomDone) {
                                                this.fnZoomDone();
                                        }
                                        return;
                                }
                        }
                }
        }
        if (this.type == ANIMATION_TYPE_ZOOM_IN) {
                if (this.size == this.targetSize ) {
                        this.size = this.targetSize + this.halfwaySize;
                } else if (this.size > this.targetSize) {
                        this.size -= (this.ANIMTEXT_ZOOM_STEP * elapsed);
                } else {
                    this.size = this.targetSize;
                    this.type = ANIMATION_TYPE_IDLE;
                        if (this.fnZoomDone) {
                                this.fnZoomDone();
                        }
                }
        }

        this.alpha += (this.alpha_step * elapsed);
        if (this.alpha < 0)
            this.alpha = 0;
        if (this.alpha > 1)
            this.alpha = 1;
}

AnimatedText.prototype.Draw = function (gfx)
{
        var ctx = gfx._canvasBufferContext;
        var style = this.strike +" "+this.size+"px " + this.fontface;
        ctx.font = style;

        var text = this.text;
        var textWidth = ctx.measureText(text);

        var x = this._X;
        var y = this._Y;

       // if (this.type == ANIMATION_TYPE_ZOOM_OUT || this.type ==
          //      ANIMATION_TYPE_ZOOM_IN) {
            x = this.centerx - (textWidth.width / 2);
            this._X = x;

            //y = this.centery - (textWidth.width / 2);
            //this._Y = y;
      //  }

    //gfx.DrawText(this.text, x + 1, y, this.backcolor, style);
    if(this.alpha > 0)
        gfx.DrawText(this.text, x, y, this.color, style, this.alpha);
}