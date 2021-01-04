/**
    Splash Screen State.
    @author <a href="mailto:ruellm@yahoo.com">Ruell Magpayo</a>
    Copyright (C) 2012 Salad Bowl Game Productions
*/
function SplashScreenState() {
    
    //set this state ID
    this._stateID = SPLASH_STATE;
    
    //current alpha for sample splash
    this._currentAlpha = 0.0;

    //we use animator to interpolate animation frame
    this._animator = new Animator();
    this._animator.Set(120);

    //company logo splash screen
    this._companyImage = new Image();
    this._companyImage.src = "images/splash/game-logo.png";
    this.image_loaded = false;
    var context = this;
    this._companyImage.onload = (function () {
        context.image_loaded = true;
    });

    // sequence flags, 
    // this serves as substate of SlashScreenState
    this.SEQUENCE_FADEIN_COMPANY_LOGO   = 0;
    this.SEQUENCE_STAY_COMPANY_LOGO     = 1;
    this.SEQUENCE_FADEOUT_COMPANY_LOGO = 2;

    //transition flags
    this._splashSequenceFlag = this.SEQUENCE_FADEIN_COMPANY_LOGO;
    this._fadeTransition = 5.0;
    this._staySeconds = 1;  // stay in for # seconds
    this._lastTime = 0;
}

// set base class to State
SplashScreenState.prototype = new State;

SplashScreenState.prototype.Load = function ()
{
	//...
}

SplashScreenState.prototype.Update = function (/**Number*/ elapsed) {
    if (!this.image_loaded) return;

    //uncomment this to animate fadeout
    if (this._splashSequenceFlag == this.SEQUENCE_FADEIN_COMPANY_LOGO) {
        if (this._currentAlpha < 1.0) {
            if (this._animator.Update(elapsed)) {
                this._currentAlpha += (this._fadeTransition * elapsed);
            }
        } else {
            this._splashSequenceFlag = this.SEQUENCE_STAY_COMPANY_LOGO;
            this._lastTime = new Date().getTime();
        }
    } else if (this._splashSequenceFlag == this.SEQUENCE_STAY_COMPANY_LOGO) {
        var currentTime = new Date().getTime();
        var diff = (currentTime - this._lastTime)/1000;
        if (diff >= this._staySeconds) {
             this._splashSequenceFlag = this.SEQUENCE_FADEOUT_COMPANY_LOGO;
			 //g_Engine.SetState(LOAD_STATE);
            //-----
			 
        }
    }

    else if (this._splashSequenceFlag == this.SEQUENCE_FADEOUT_COMPANY_LOGO) {
       if (this._currentAlpha > 0) {
            if (this._animator.Update(elapsed)) {
                var fadeoutrans = 2.0;
                this._currentAlpha -= this._fadeTransition * elapsed;
            }
        }
        if (this._currentAlpha <= 0) {
            //trap negative alpha values
            // Do Next action
            this._currentAlpha = 0;

            // change to menu state
        //     if (g_imageResourceList.length >= g_preLoadImages.length) {
                 g_Engine.SetState(LOAD_STATE);

          //  }
        }
    }  
}

SplashScreenState.prototype.Draw = function (/**Graphics*/gfx) {

    if (!this.image_loaded) return;

    /////////////////////////////////////////////
    // Temporary to load the font in advance
    gfx.DrawText("",
        0, 0,
        "rgb(255,255,255)",
         "1 DJBCHALKITUP");

    gfx.DrawText("",
        0, 0,
        "rgb(255,255,255)",
         "1 CurlzMTRegular");
	
	gfx.DrawText("",
        0, 0,
        "rgb(255,255,255)",
         "1 Androgyne_TB");	 
    /////////////////////////////////////////////

    //compute center
    var centerScrnX = (gfx.GetRenderWidth() / 2) - (this._companyImage.width / 2);
    var centerScrnY = (gfx.GetRenderHeight() / 2) - (this._companyImage.height / 2);

    gfx.FillRect(0, 0, gfx.GetRenderWidth(), gfx.GetRenderHeight(), "rgb(255,255,255)");
    //gfx.DrawImageFullA(this._companyImage, centerScrnX, centerScrnY, this._currentAlpha);
    gfx.DrawImage(this._companyImage, 0, 0, this._companyImage.width, this._companyImage.height,
        0, 0, DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT, 1.0);
}

///////////////////////////////////////////////
// Destructor
///////////////////////////////////////////////
SplashScreenState.prototype.Unload = function () {
    this.CleanupUIManager();

    if (this._companyImage) {
        delete this._companyImage;
        this._companyImage = null;
    }
}
