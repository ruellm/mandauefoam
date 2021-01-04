//
// All Resource handling will be handled in here
// file created: March 16, 2013 in Los Angeles
// Author: Ruell Magpayo <ruellm@yahoo.com>
//
// Ported to Spirt Bubble May 23, 2014
// Ported to PopcakeLegend Oct 16, 2014
// Ported to Mandaue Foam game Jan 22, 2016
/////////////////////////////////////////////////////////////////////////////////////
// Image Resource filenames
//

// Image Resource global lists
g_imageResourceList = new Array();

// Image filename list
g_imageFileList = [
	"images/map/bg1.png",
    "images/map/bg2.png",
    "images/map/bg3.png",
    
    "images/elements/bubble1.png",
    "images/elements/bubble2.png",
    "images/elements/obstacle1.png",
    "images/elements/obstacle2.png",
    "images/elements/hump.png",
    "images/elements/CHICKEN_sprite.png",
    "images/elements/SUPERMAN_sprite.png",
    "images/elements/exclamation-mark-red-md.png",

    "images/truck.png",
    "images/furnitures/furniture0.png",
    "images/furnitures/furniture1.png",
    "images/furnitures/furniture2.png",
    "images/furnitures/furniture3.png",
    "images/furnitures/furniture4.png",
    "images/furnitures/furniture5.png",
    "images/furnitures/furniture6.png",
    "images/furnitures/furniture7.png",
    "images/furnitures/furniture8.png",

    "images/characters/IRRITATED-CUSTOMER-IDDLE_sprite.png",
    "images/characters/IRRITATED-CUSTOMER-TALKING-(AAGHH)_sprite.png",
    "images/characters/IRRITATED-CUSTOMER-TALKING_sprite.png",

    "images/characters/MF-personel-iddle_Sprite.png",
    "images/characters/MF-personel-talk_Sprite.png",
    "images/characters/MF-personel-blink_sprite.png",

    "images/characters/talk_bubble.png"
];

//////////////////////////////////////////////////////////////

// count image loaded error
var g_errorImageList = new Array();
var RETRY_MAX = 3;
var g_retryCount = 0;

// deferred loading of resources
var global_resource_index = 0;
var g_currentResource = g_imageFileList;
var g_resourceToLoad = null;
var g_resourceLoadCount = 0;
var g_audioLoadCount = 0;

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
			
			DEBUG_LOG(context.path + " Loading Done..." 
				+  g_imageResourceList.length);
			
			if(g_currentResource != null){
				if( ++global_resource_index < g_currentResource.length){
					new ImageResource().Load(g_currentResource[global_resource_index]);
				}else{
					g_currentResource = null;
				}
			}
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

//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// Audio Resource
//
//  Audio resources are divided into two categories
// WAV and MP3
// See audio support http://www.w3schools.com/html/html5_audio.asp
// Test Audio support http://textopia.org/androidsoundformats.html
// HTML5 audio issue 
// http://flowz.com/2011/03/apple-disabled-audiovideo-playback-in-html5/
// http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
//
// online mp3 converter (for OGG support)
// http://media.io/
// mp3 cutter
// http://mp3cut.net/
// Ported from Titays game to Spirit Bubble
// May 25, 2014 

// Image Resource global lists
g_audioResourceList = new Array();

g_audioFileList = [];


// for separate implementation

///////////////////////////////////////////////////////////////////////////////

function AudioResource() {
    this.audio = null;
    this.path = null;
    this.loaded = false;
    this.volume = 1.0;
    this.sfx = true;

    this.Load = function (aud) {
        var context = this;
        var audpath = GetAudPath(aud.fname);
        this.audio = buildAudio(audpath);
        if (this.audio == null) return;

        this.audio.addEventListener("canplay", function () {
            context.loaded = true;
           
        });

        this.audio.addEventListener("error", function (e) {
			console.log("error on "+context.path);
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    console.log('You aborted the video playback.');
                    break;
                case e.target.error.MEDIA_ERR_NETWORK:
                    console.log('A network error caused the audio download to fail.');
                    break;
                case e.target.error.MEDIA_ERR_DECODE:
                    console.log('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
                    break;
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    console.log('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
                    break;
                default:
                    console.log('An unknown error occurred.');
                    break;
            }
        });

        g_audioResourceList.push(context);
        this.path = aud.fname;
        this.audio.loop = false;
        this.sfx = aud.sfx;
    }
}

function buildAudio(path) {
    // Disable audio for Apple devices
    if (isMobileSafari()) {
        return null;
    }

    var audio = document.createElement("audio");
    if (audio != null && audio.canPlayType) {
        audio.src = path;
        audio.preload = "auto";
        audio.load();
    }

    return audio;
}

function LoadAndPlay(audpath)
{
    var aud = GetAudioResource(audpath);
    if (aud) {
    //    aud.volume = 1;
        aud.currentTime = 0;
        aud.loop = false;
        aud.play();
    }
}

function StopAudio(audpath) {
    var aud = GetAudioResource(audpath);
    if (aud) {
     //   aud.volume = 0;
        aud.pause();
    }
}

function GetAudioResource(szPath, vol) {
    var audio = null;
    if (!szPath || 0 === szPath.length) return null;
    for (var idx = 0; idx < g_audioResourceList.length; idx++) {
        if (g_audioResourceList[idx].path == szPath) {
            if (g_audioResourceList[idx].loaded) {
                audio = g_audioResourceList[idx].audio;

                if (vol) {
                    g_audioResourceList[idx].volume = vol;
                }

                
                if ((g_audioResourceList[idx].sfx && VOLUME_SFX_FLAG) ||
                    (!g_audioResourceList[idx].sfx && VOLUME_BGMUSIC_FLAG)) {
                    audio.volume = g_audioResourceList[idx].volume;
                } else {
                    audio.volume = 0;
                }
            }
            break;
        }
    }

    return audio;
}

// 
// NOTE: temporarily disabled soundbank feature
//

var SOUND_BANK_COUNT = 2;
var VOLUME_BGMUSIC_FLAG = true;
var VOLUME_SFX_FLAG = true;

function LoadAudio() {
    for (var idx = 0; idx < g_audioFileList.length; idx++) {
        new AudioResource().Load(g_audioFileList[idx]);
    }
}

function GetAudPath(audId) {
    var browser = BrowserVersion();
    var path = "mp3";
    if (browser[0] == "firefox" || browser[0] == "opera") {
        path = "ogg";
    }

    return ("sounds/" + path + "/" + audId + "." + path);
}


function UpdateAudio(flag, sfx) {
    //silent all the audio resource
    for (var idx = 0; idx < g_audioResourceList.length; idx++) {
        if ((sfx == g_audioResourceList[idx].sfx)) {

            if (!flag) {
                g_audioResourceList[idx].audio.volume = 0;
            } else {
                g_audioResourceList[idx].audio.volume = g_audioResourceList[idx].volume;
            }
        }
    }
    
    if (sfx) {
        VOLUME_SFX_FLAG = flag;
    } else {
        VOLUME_BGMUSIC_FLAG = flag;
    }
}
