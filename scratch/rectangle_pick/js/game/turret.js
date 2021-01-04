//------------------------------------------
// The turret class
// Date Created: March 18, 2013
// Author: Ruell Magpayo 
// Made in the Los Angeles, CA. 90045
//--------------------------------------------

//////////////////////////////////////////////////////////////////////////////////
function TurretTheme() {
    // arrays are composed of TURRET LIFE sprites
    this.baseImgLists = new Array();    //create Array in constructor might CAUSE CONSISTENCY PROBLEM!!
    this.gunImgLists = new Array();

    // the nozzle coordinates is where the bullet will start
    //this.nozzle_x = 0;
    //this.nozzle_y = 0;
    this.nozzle_pt = new Point();

    // reference point is a normalize point above the nozzle
    // this is computed as nozzley -1 during nozzle coordinates set
    //this.reference_ptx = 0;
    //this.reference_pty = 0;
    this.reference_pt = new Point();

    // the cannon offset against/with its base
    this.cannon_pt = new Point();

    // the turret base coordinate
    this._X = 0;
    this._Y = 0;

    // current life index
    this.current_life_idx = 0;

    // the cannon angle
    // should it be here?
    this.angle = 0.0;
}


TurretTheme.prototype.Init = function(x,y)
{ /*X,Y parameters refers to the base coordinates*/ }

TurretTheme.prototype.Update = function (elapsed)
{
    if (this.current_life_idx > this.gunImgLists.length) return;
    this.gunImgLists[this.current_life_idx].Update(elapsed);
    this.baseImgLists[this.current_life_idx].Update(elapsed);
}

TurretTheme.prototype.Draw = function (gfx)
{
    if (this.current_life_idx > this.gunImgLists.length) return;
    this.gunImgLists[this.current_life_idx].Update(elapsed);
    this.baseImgLists[this.current_life_idx].Update(elapsed);
}

TurretTheme.prototype.Add = function (strBaseImg, strCannonImg) {
    var baseImage = new ImageObject();
    baseImage.Load(strBaseImg);
    var cannon = new ImageObject();
    cannon.Load(strCannonImg);

    this.baseImgLists.push(baseImage);
    this.gunImgLists.push(cannon);
}

TurretTheme.prototype.Rotate = function (amount)
{
    var limit_angle = 100;
    if (this.angle + amount < -limit_angle || this.angle + amount > limit_angle) return;
    this.angle += amount;
}

TurretTheme.prototype.SetRotationVal = function (angle) {
    // this function resets the rotation value
    this.angle = angle;
}

TurretTheme.prototype.GetTransformdRefPoint = function ()
{
    return this.TransformedPoint(this.reference_pt);
}

TurretTheme.prototype.GetTransformdNozzlePoint = function ()
{
    return this.TransformedPoint(this.nozzle_pt);
}

TurretTheme.prototype.TransformedPoint = function (pt)
{
    var ptresult = new Point(pt._X, pt._Y);
    var pivot = this.GetPivotPoint();
    var angleRadians = this.angle * Math.PI / 180;

    ptresult.Rotate(pivot._X, pivot._Y, angleRadians);

    return ptresult;
}

TurretTheme.prototype.GetPivotPoint = function ()
{
    return new Point(0, 0);
}

//////////////////////////////////////////////////////////////////////////////////


function TurretThemeBasic()
{
    //
    // Cannon points are offsets from base 
    //
    this.cannon_pt._X = 95;
    this.cannon_pt._Y = (268 / 2) - (71 / 2);
}

TurretThemeBasic.prototype = new TurretTheme;

TurretThemeBasic.prototype.Init = function (x,y)
{
    this.Add(
        "images/game/turret/basic/turretbase.png",
        "images/game/turret/basic/turretcannon.png");

    this._X = x;
    this._Y = y;

    this.nozzle_pt._X = this._X + this.cannon_pt._X + (71 / 2);
    this.nozzle_pt._Y = this._Y - this.cannon_pt._Y;

    this.reference_pt._X = this.nozzle_pt._X;
    this.reference_pt._Y = this.nozzle_pt._Y - 1;
}

TurretThemeBasic.prototype.Update = function (elapsed)
{
   
}

TurretThemeBasic.prototype.Draw = function (gfx)
{ 
    //////////////////////////////////////////////////////////////////
    // the X, y parameters are for the BASE of the turrent
  //  //////////////////////////////////////////////////////////////////
   // this.gunImgLists[this.current_life_idx].Draw(gfx,
   //     this._X + this.cannon_xoffset,
   //     this._Y - this.cannot_yoffset);
    //////////////////////////////////////////////////////////////////

    gfx.DrawRotateFull(this._X + this.cannon_pt._X,
        this._Y - this.cannon_pt._Y,

        71/2, 114+5,
       
        this.angle,
        this.gunImgLists[this.current_life_idx]._image, 1.0);

    this.baseImgLists[this.current_life_idx].Draw(gfx,
        this._X, this._Y);
}


TurretTheme.prototype.GetPivotPoint = function () {
    return new Point(this.nozzle_pt._X, this.nozzle_pt._Y + 114);
}
////////////////////////////////////////////////////////////


