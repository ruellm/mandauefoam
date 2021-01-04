/**
    Rectangle definition.
    @author <a href="mailto:ruellm@yahoo.com">Ruell Magpayo</a>
    @class
    Copyright (C) 2012 Salad Bowl Game Productions
*/

function Rect( x, y, w, h) {
    // offset location
    this._x = (x) ? x : 0;;
    this._y = (y) ? y : 0;;

    // dimensions
    this._width = (w) ? w : 0;;
    this._height = (h) ? h : 0;;
}