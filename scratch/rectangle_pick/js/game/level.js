//------------------------------------------
// Game Level Base class
// Date Created: March 18, 2013
// Author: Ruell Magpayo 
// Made in the Los Angeles, CA. 90045
//--------------------------------------------

function GameLevel()
{
    this.name = null;
    this.index = 0;                     // cache the array index
    this.monster_list = null;
    this.monster_count_done = 0;        // counter to how many monsters are 
                                        // now killed or done appearing on screen
}

GameLevel.prototype.Update = function (elapsed)
{
    for (i = 0; i < this.monster_list.length; i++) {
        this.monster_list[i].Update(elapsed);
    }
}

GameLevel.prototype.Draw = function (gfx)
{
    for (i = 0; i < this.monster_list.length; i++) {
        this.monster_list[i].Draw(gfx);
    }
}