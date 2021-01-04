/**
    vector2D.js
    Vector 2D math class
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created: May 25, 2014
*/

function Vector2D(x,y) {
    this._X = 0;
    this._Y = 0;
    if (x) {
        this._X = x;
    }
    if (y) {
        this._Y = y;
    }
}

Vector2D.prototype.Length = function () {
    return Math.sqrt(this._X * this._X + this._Y * this._Y);
}

Vector2D.prototype.Normalize = function () {
    var length = this.Length();
    if (length != 0) {
        this._X = this._X / length;
        this._Y = this._Y / length;
    }
}

function DotProductNormalize(v1, v2)
{
    v1.Normalize();
    v2.Normalize();

    return ( (v1._X * v2._X) +
        (v1._Y * v2._Y));
}