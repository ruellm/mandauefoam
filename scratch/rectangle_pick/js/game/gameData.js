//------------------------------------------
// Contains Global game data
// Date Created: May 4, 2013
// Author: Ruell Magpayo 
// Made in the Los Angeles, CA. 90045
//--------------------------------------------

var GROUND_Y = 0;
var DEFAULT_ROT_FRICTION = 2;

function GameData()
{
    this.levelList = null;
    this.game_mode = 0;
    this.currentScore = 0;
}

GameData.prototype.LoadLevels = function ()
{
    var level_cnt = 1;
    this.levelList = new Array();

    var monsterCount = [5, 20, 30];
    var range = [1, 2, 3];
    var levelNames = ["Level 1", "Level 2", "Level 3"];

    for (i = 0; i < level_cnt; i++) {
        var level = new GameLevel();
        level.name = levelNames[i];
        level.index = i;
        level.monster_list = new Array();
        for (m = 0; m < monsterCount[i]; m++) {
            var type = Math.floor(Math.random() * range[i]);
            var x = Math.floor(Math.random() * DEFAULT_WINDOW_WIDTH);
            var y = -Math.floor(Math.random() * DEFAULT_WINDOW_HEIGHT);
            var dir = (x > DEFAULT_WINDOW_WIDTH / 2) ? 1 : 0;
            var monster = null;
            switch (type) {
                case MONSTER_TYPE_DROID:
                    monster = new DroidMonster();
                    break;
            }
            if (monster != null) {
                monster.direction = dir;
                monster._X = x;
                monster._Y = y;
                monster.Initialize();
                level.monster_list.push(monster);
            }
        }


        this.levelList.push(level);
    }
}

GameData.prototype.Load = function ()
{
    if (this.game_mode == 0) {
        this.LoadLevels();
    }
}