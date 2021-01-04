//
// All Resource handling will be handled in here
// file created: March 16, 2013 in Los Angeles
// Author: Ruell Magpayo <ruellm@yahoo.com>
//

//
/////////////////////////////////////////////////////////////////////////////////////
// Image Resource filenames
//

function ImageResource() {
    this.image = null;
    this.path = null;
    this.load = false;

    this.Load = function (szPath) {
        this.image = new Image();
        this.image.src = szPath;
        this.path = szPath;
        var context = this;

        this.image.onload = (function () {
            context.load = true;
            g_imageResourceList.push(context);
        });
        this.image.onerror = (function () {
            g_errorImageList.push(context);
        });
    }

    this.Reload = function () {
        this.image = null;
        this.Load(this.path);
    }
}

// Image Resource global lists
g_imageResourceList = new Array();

// Image filename list
g_imageFileList = [

    // main menu splash screen images
    "images/mainmenu/saladbowlblack.png",
    "images/mainmenu/plainlogotext.png",
    "images/mainmenu/coloredbg.png",
    "images/mainmenu/inweirders_logo.png",
    "images/mainmenu/radial.png",
    "images/mainmenu/cloudbase.png",
    "images/mainmenu/cloudvariation2.png",
    "images/mainmenu/cloudvariation3.png",
    "images/mainmenu/cloudvariation4.png",

    "images/mainmenu/dodo.png",
    "images/mainmenu/greenpup.png",
    "images/mainmenu/pudding.png",
    "images/mainmenu/pup1.png",
    "images/mainmenu/pup2.png",
    "images/mainmenu/crabs.png",

    "images/mainmenu/buttons/CAMPAIGN_neutral.png",
    "images/mainmenu/buttons/CAMPAIGN_highlight.png",
    "images/mainmenu/buttons/ENDLESS_neutral.png",
    "images/mainmenu/buttons/ENDLESS_highlight.png",
    "images/mainmenu/buttons/ACHIEVE_neutral.png",
    "images/mainmenu/buttons/ACHIEVE_highlight.png",
    "images/mainmenu/buttons/OPTIONS_neutral.png",
    "images/mainmenu/buttons/OPTIONS_highlight.png",

    //////////////////////////////////////////////////////////////
    // Game related image resources
    // NOTE: This can be loaded separately before Game State loaded
    ///////////////////////////////////////////////////////////////
    "images/game/ground.png",
   /* "images/game/hpbar1.png",
    "images/game/hpbargreen.png",
    "images/game/hpbarlifered.png",
    "images/game/specialbar.png",
   */
   "images/game/cloud.png",
    "images/game/cloud2.png",
    "images/game/clouds3.png",
    "images/game/hpbarsolid.png",
    "images/game/specialbox.png",

    // game buttons
    "images/game/buttons/paws.png",
    "images/game/buttons/pause_over.png",
    "images/game/buttons/fire_button.png",
    "images/game/buttons/fire_button_over.png",
    "images/game/buttons/specialbutton.png",
    "images/game/buttons/special_over.png",
    "images/game/buttons/crankbody.png",
    "images/game/buttons/cranklever.png",

    // game monster resources
    "images/game/monsters/droid/droid_walk.png",
    "images/game/monsters/droid/droid_attack.png",
    "images/game/monsters/droid/droid_fly.png",

    // turret base themes
    "images/game/turret/basic/turretbase.png",
    "images/game/turret/basic/turretcannon.png",

    "images/game/bullet.png"
];

// count image loaded error
var g_errorImageList = new Array();
var RETRY_MAX = 3;
var g_retryCount = 0;

//
// helper functions
//
function GetImageResource(szPath) {
    var image = null;
    for (var idx = 0; idx < g_imageResourceList.length; idx++) {
        if (g_imageResourceList[idx].path == szPath) {
            image = g_imageResourceList[idx].image;
            break;
        }
    }
    return image;
}
