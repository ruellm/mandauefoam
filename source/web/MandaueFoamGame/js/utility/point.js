/**
    Point definition.
    Author: Ruell Magpayo</a>
    Re-Use for Inweirders game, March 21, 2013
*/
function Point(x, y) {
    this._X = (x) ? x : 0;
    this._Y = (y) ? y : 0;
}

////////////////////////////////////////////////////////
// Note: ANGLE SHOULD BE IN RADIANS
//////////////////////////////////////////////////////
Point.prototype.Rotate = function (cx, cy, angle) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);

    //translate point back to the origin
    this._X -= cx;
    this._Y -= cy;

    //rotate the point
    var xnew = this._X * c - this._Y * s;
    var ynew = this._X * s + this._Y * c;

    //translate point back
    this._X = xnew + cx;
    this._Y = ynew + cy;
}


