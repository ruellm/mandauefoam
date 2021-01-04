/**
    longAudio.js
    base class for long play audio, 
    the audio files are split into separate files
    Sometimes HTML5 audio cannot load and play more than 1 minute 
    of audio with more than 500KB in size
    Created May 25, 2014
    Author Ruell Magpayo <ruellm@yahoo.com>
*/

function LongAudio() {
    this.audioList = null;
    this.currIdx = 0;
    this.loop = true;
    this.volume = 1;
    this.whiteNoise = 1;
}

LongAudio.prototype.Load = function (list) {
    var context = this;
    this.audioList = new Array();

    for (var i = 0; i < list.length; i++) {
        var audio = GetAudioResource(list[i]);
        audio.loop = false;
        audio.autobuffer = true;

        audio.addEventListener("timeupdate", function () {
            if (this != context.audioList[context.currIdx]) {
                //this.currentTime = 1;
                return;
            }

            var ct = context.audioList[context.currIdx].currentTime;
            var d = this.duration;

            if (ct + 0.3 >= d) {
                var prev = context.currIdx;

                if (!context.loop) {
                    if (context.currIdx == context.audioList.length) {
                        context.currIdx = 0;
                        this.Stop();
                        return;
                    } else {
                        context.currIdx++;
                    }
                } else {
                    context.currIdx = (context.currIdx + 1) %
                    context.audioList.length;
                }


                context.CacheNext();
                context.audioList[context.currIdx].volume = this.volume;
                context.audioList[context.currIdx].currentTime = 0.1;
                context.audioList[context.currIdx].play();
                context.audioList[prev].pause();
            }
        });


        audio.addEventListener("ended", function () {

            return;
            //Stop current one
            // context.audioList[context.currIdx].pause();
            // context.audioList[context.currIdx].currentTime = 0;
            if (this != context.audioList[context.currIdx]) {
                //this.currentTime = 1;
                return;
            }

            var prev = context.currIdx;

            if (!context.loop) {
                if (context.currIdx == context.audioList.length) {
                    context.currIdx = 0;
                    this.Stop();
                    return;
                } else {
                    context.currIdx++;
                }
            } else {
                context.currIdx = (context.currIdx + 1) %
                    context.audioList.length;
            }


            context.CacheNext();
            context.audioList[context.currIdx].volume = this.volume;
            context.audioList[context.currIdx].currentTime = 0;
            context.audioList[context.currIdx].play();
            //context.audioList[prev].pause;

        });

        this.audioList.push(audio);
    }

}

LongAudio.prototype.Play = function () {

    this.Stop();

    this.CacheNext();
    this.audioList[0].play();
}

LongAudio.prototype.CacheNext = function () {
    var next = this.currIdx;
    if (!this.loop) {
        if (this.currIdx == context.audioList.length) {
            return;
        } else {
            next++;
        }
    } else {
        next = (next + 1) %
                    this.audioList.length;
    }

    this.audioList[next].volume = 0;
    this.audioList[next].play();

}

LongAudio.prototype.Stop = function () {

    this.currIdx = 0;
    for (var i = 0; i < this.audioList.length; i++) {
        this.audioList[i].pause();
        this.audioList[i].currentTime = 0;
    }
}

LongAudio.prototype.SetVolume = function (val) {
    this.volume = val;
    for (var i = 0; i < this.audioList.length; i++) {
        this.audioList[i].volume = val;
    }
}
