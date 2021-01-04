/**
    AudioBG.js
	Audio background handler for Popcake Legend
    Random sequence of background music
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: April 25, 2015
*/

function AudioBG()
{
    this.audioList =
        ["Music-Loop-A",
        "Music-Loop-B",
        "Music-Loop-C"];

    this.index = 0;
    this.audio = null;
    this.isplayed = false;
}

AudioBG.prototype.Play = function ()
{
    var random = Math.floor(Math.random() * 10);

    if ((random % 2) == 0) {
        this.index = 0;
    } else if (random <= 5) {
        this.index = 1;
    } else {
        this.index = 2;
    }

}

AudioBG.prototype.Update = function ()
{
    if (this.audio == null) {
        this.audio = GetAudioResource(this.audioList[this.index]);
    }

    if (this.audio != null && !this.isplayed) {
        this.audio.play();
        this.isplayed = true;
        var context = this;
     //   DEBUG_LOG("STARTED " + this.audioList[this.index]);
        this.audio.addEventListener('ended',
           function () {
               context.isplayed = false;
               this.pause();
               this.addEventListener('ended', null);

             //  DEBUG_LOG("ENDED " + context.audioList[context.index]);

               var random = Math.floor(Math.random() * 10);
               if ((random % 2) == 0) {
                   context.index = 0;
               } else if (random <= 5) {
                   context.index = 1;
               } else {
                   context.index = 2;
               }

               context.audio = null;
           });
    }
}