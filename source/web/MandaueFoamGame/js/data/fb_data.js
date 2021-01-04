/**
    fb_data.js
    Facebook related structure
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: June 12, 2014
*/

function FB_Profile()
{
    this.name = "";
    this.id = -1;
    this.pictureURL = "";
    this.isPlayer = false;

    this.image = null;
    this.image_loaded = false;
}

FB_Profile.prototype.LoadImage = function()
{
	this.image = new Image();
	this.image.src = this.pictureURL;
	context = this;
    this.image.onload = (function () {
        context.image_loaded = true;
    });
}

function FB_Profile_Level()
{
	this.fbProfile = null;
    this.score = 0;
}

var g_FBPlayerList = new Array();
var g_FBInvitableList = new Array();
var g_mainUser = new FB_Profile;
var g_FBProfileCtr = 0;

function LoadProfileImage(array)
{
    for (var i = 0; i < array.length; i++) {
        var profile = array[i];
		
		var res = profile.name.split(" ");
		profile.name = res[0];
		profile.LoadImage();
	    
		//profile.image = new Image();
		//profile.image.src = profile.pictureURL;
    }
}


function FB_LoadLevelData()
{
	Ajax_GetUserLevelData(g_mainUser.id);
	g_FBProfileCtr = 0;
}

function FB_GetProfile(fbid)
{
	for(var i=0; i < g_FBPlayerList.length; i++){
		if(g_FBPlayerList[i].id == fbid){
			return g_FBPlayerList[i];
		}		
	}
	
	return null;
}

function FB_AddProfile(id, name, is_player, pictureURL)
{
	var prof = new FB_Profile();
	prof.id = id;
	prof.name = name;
	prof.isPlayer = is_player;
	prof.pictureURL = pictureURL;
	
	if( is_player ){
		g_FBPlayerList.push(prof);
	}else{
		g_FBInvitableList.push(prof);
	}
}

function FB_SetCurrentUser(id, name, is_player, pictureURL)
{
	g_mainUser.id = id;
	g_mainUser.name = name;
	g_mainUser.isPlayer = is_player;
	g_mainUser.pictureURL = pictureURL;
}

// Export symbols for closure API
window['FB_AddProfile'] = FB_AddProfile;
window['FB_SetCurrentUser'] = FB_SetCurrentUser;
