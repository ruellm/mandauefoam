/**
    irateCustomer.js
    Irate customer pop-up information
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: Feb 24, 2016
*/

var IRATE_CUSTOMER_WIDTH = 370;
var IRATE_CUSTOMER_HEIGHT = 558;

function IrateCustomer()
{
    this.animationList = null;
    // 0: idle, 1: arghh aniamtion, 2: talking
    this.anim_Idx = 0;

    this._X = -IRATE_CUSTOMER_WIDTH;
    this._Y = 0;
}

IrateCustomer.prototype.Load = function ()
{
    //0: none, 1: moving in, 2: wait arg state, 3: arg, 4: talk, 5: moving out
    this.state = 0;

    this.targetX = 0;
    this.targetY = 0;
    this.dirX = 0;    //0:none, 1: right, 2:left

    this.next_state = 0;

    this.animationList = new Array();

    var idle = new AnimatedObject();
    idle.Load("images/characters/IRRITATED-CUSTOMER-IDDLE_sprite.png");
    idle.Set(13, 15.0, true);
    idle._frameWidth = 4810 / 13;

    var arg = new AnimatedObject();
    arg.Load("images/characters/IRRITATED-CUSTOMER-TALKING-(AAGHH)_sprite.png");
    arg.Set(3, 15.0, false);
    arg._frameWidth = 1110 / 3;

    var talking = new AnimatedObject();
    talking.Load("images/characters/IRRITATED-CUSTOMER-TALKING_sprite.png");
    talking.Set(7, 15.0, true);
    talking._frameWidth = 2590 / 7;

    this.animationList.push(idle);
    this.animationList.push(arg);
    this.animationList.push(talking);

    this._X = -IRATE_CUSTOMER_WIDTH;
    this._Y = DEFAULT_WINDOW_HEIGHT - IRATE_CUSTOMER_HEIGHT;
    
    this.bubble = new ImageObject();
    this.bubble.Load("images/characters/talk_bubble.png");

    this.fnOnExit = null;

}

IrateCustomer.prototype.GotoX = function (x)
{
    if (x - this._X > 0) {
        this.dirX = 1;
    } else {
        this.dirX = 2;
    }

    this.targetX = x;
}

IrateCustomer.prototype.In = function (targetX)
{
    this.GotoX(targetX);
    this.state = 1;
    this.next_state = 2;
}

IrateCustomer.prototype.Update = function (elapsed)
{
    if (this.state == 1 || this.state==6) {
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
            } else if (this.state == 6) {
                if (this.fnOnExit) {
                    this.fnOnExit();
                }
                this.state = 0;
            }
        }
    } else if (this.state == 2) {
        var currtime = new Date().getTime();
        var diff = (currtime - this.timer_wait) / 1000;
        if (diff > 1) {
            this.state = this.next_state;
            this.next_state = 4;
            this.anim_Idx = 1;
            this.timer_wait = new Date().getTime();
        }
    } else if (this.state == 3) {
        var currtime = new Date().getTime();
        var diff = (currtime - this.timer_wait) / 1000;
        if (diff > 1.5) {
            this.state = this.next_state;
            this.anim_Idx = 2;
            this.timer_wait = new Date().getTime();
        }
    } else if (this.state == 4) {
        var currtime = new Date().getTime();
        var diff = (currtime - this.timer_wait) / 1000;
        if (diff > 2) {
            this.state = 2;
            this.anim_Idx = 2;
            this.next_state = 5;

        }
    } else if (this.state == 5) {
        var currtime = new Date().getTime();
        var diff = (currtime - this.timer_wait) / 1000;
        if (diff > 2) {
            this.state = 6;
            this.GotoX(-IRATE_CUSTOMER_WIDTH);
        }
    }


    this.animationList[this.anim_Idx].Update(elapsed);
}

IrateCustomer.prototype.Draw = function (gfx) {
    this.animationList[this.anim_Idx]._X = this._X;
    this.animationList[this.anim_Idx]._Y = this._Y;
    this.animationList[this.anim_Idx].Draw(gfx);

    if (this.state == 3 || this.state == 4) {
        this.bubble.Draw(gfx, this._X + IRATE_CUSTOMER_WIDTH-50,
            this._Y - 130);

        var msg = [""];
        var y = 0;
        var x = 0;
        var fontsize = 10;
        if (this.state == 3) {
            msg = ["AGHHH!"];
            y = 439;
            fontsize = 40;
            x = 413;
        } else if (this.state == 4) {
            msg = ["When can", "I expect", "my furniture?", "It's LATE!"];
            y = 390;
            fontsize = 20;
            x = 413;
        }

        this.DisplayText(msg, gfx, x, y, fontsize);
    }
}

IrateCustomer.prototype.DisplayText = function (msg, gfx, x, y, fontsize)
{
    var style = "Bold "+fontsize+"pt Calibri";
    var ctx = gfx._canvasBufferContext;
    ctx.font = style;

    for (var i = 0; i < msg.length; i++) {

        var text = msg[i];
        var textWidth = ctx.measureText(text);
        

        gfx.DrawText(text,
                  x - (textWidth.width / 2), y,
                  "rgb(0,0,0)",
                 style);

        y += (fontsize +10);
    }
}
