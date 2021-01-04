/**
    mfPersonel.js
    Mandaue Foam personel pop-up information
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: Feb 24, 2016
*/


var MF_PERSONEL_WIDTH = 334;
var MF_PERSONEL_HEIGHT = 638;

function MFPersonel() {
    this.animationList = null;
    // 0: idle, 1: talking, 2: blinking
    this.anim_Idx = 0;

    this._X = -MF_PERSONEL_WIDTH;
    this._Y = 0;
}

MFPersonel.prototype.Load = function () {
    //0: none, 1: moving in, 2: wait talking state, 3: talk, 4: moving out
    this.state = 0;

    this.targetX = 0;
    this.targetY = 0;
    this.dirX = 0;    //0:none, 1: right, 2:left

    this.next_state = 0;

    this.animationList = new Array();

    var idle = new AnimatedObject();
    idle.Load( "images/characters/MF-personel-iddle_Sprite.png");
    idle.Set(13, 15.0, true);
    idle._frameWidth = 4342 / 13;

    var blink = new AnimatedObject();
    blink.Load("images/characters/MF-personel-blink_sprite.png");
    blink.Set(5, 4.0, true);
    blink._frameWidth = 1670 / 5;

    var talking = new AnimatedObject();
    talking.Load( "images/characters/MF-personel-talk_Sprite.png");
    talking.Set(14, 15.0, true);
    talking._frameWidth = 4676 / 14;

    this.animationList.push(idle);
    this.animationList.push(talking);
    this.animationList.push(blink);

    this._X = -MF_PERSONEL_WIDTH;
    this._Y = DEFAULT_WINDOW_HEIGHT - MF_PERSONEL_HEIGHT;

    this.bubble = new ImageObject();
    this.bubble.Load("images/characters/talk_bubble.png");

    this.fnOnExit = null;
    this.type = 0;
}

MFPersonel.prototype.GotoX = function (x) {
    if (x - this._X > 0) {
        this.dirX = 1;
    } else {
        this.dirX = 2;
    }

    this.targetX = x;
}

MFPersonel.prototype.In = function (targetX) {
    this.GotoX(targetX);
    this.state = 1;
    this.next_state = 2;
}

MFPersonel.prototype.Update = function (elapsed) {
    if (this.state == 1 || this.state == 5) {
        var MOVE_ACCEL = 400;
        if (this.dirX == 1) {
            if (this._X < this.targetX) {
                this._X += (MOVE_ACCEL * elapsed);
            } else {
                this._X = this.targetX;
            }
        } else if (this.dirX == 2) {
            if (this._X > this.targetX) {
                this._X -= (MOVE_ACCEL * elapsed);
            } else {
                this._X = this.targetX;
            }
        }

        if (this._X == this.targetX) {
            if (this.next_state == 2) {
                this.state = this.next_state;
                this.timer_wait = new Date().getTime();
                this.next_state = 3;
            } else if (this.state == 5) {
                if (this.fnOnExit) {
                    this.fnOnExit();
                }
                this.state = 0;
            }
        }
    } else if (this.state == 2) {
        var currtime = new Date().getTime();
        var diff = (currtime - this.timer_wait) / 1000;
        if (diff > 0.5) {
            this.state = this.next_state;
            this.next_state = 4;
            this.anim_Idx = 1;
            this.timer_wait = new Date().getTime();
        }
    } else if (this.state == 3) {
        var currtime = new Date().getTime();
        var diff = (currtime - this.timer_wait) / 1000;

        var delay = [2];
        if (diff > delay[this.type]) {
            this.state = this.next_state;
            this.anim_Idx = 2;
            this.timer_wait = new Date().getTime();
        }
    } else if (this.state == 4) {
        var currtime = new Date().getTime();
        var diff = (currtime - this.timer_wait) / 1000;

        var delay = [1.5];
        if (diff > delay[this.type]) {
            this.state = 5;
            this.GotoX(-MF_PERSONEL_WIDTH);
        }
    }

    this.animationList[this.anim_Idx].Update(elapsed);
}

MFPersonel.prototype.Draw = function (gfx) {
    this.animationList[this.anim_Idx]._X = this._X;
    this.animationList[this.anim_Idx]._Y = this._Y;
    this.animationList[this.anim_Idx].Draw(gfx);

    if (this.state == 3) {
        this.bubble.Draw(gfx, this._X + MF_PERSONEL_WIDTH - 90,
            this._Y - 130);

        var y = 0;
        var x = 0;
        var fontsize = 10;

        var messages = [
            ["Be wary of", "obstacles...", "Drive Safe!"],

        ];

        var msg = messages[this.type];
        if (this.type == 0) {
            y = 330;
            fontsize = 20;
            x = 341;
        }
        
        this.DisplayText(msg, gfx, x, y, fontsize);
    }
}

MFPersonel.prototype.DisplayText = function (msg, gfx, x, y, fontsize) {
    var style = "Bold " + fontsize + "pt Calibri";
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;

    for (var i = 0; i < msg.length; i++) {

        var text = msg[i];
        var textWidth = ctx.measureText(text);


        gfx.DrawText(text,
                  x - (textWidth.width / 2), y,
                  "rgb(0,0,0)",
                 style);

        y += (fontsize + 10);
    }
}
