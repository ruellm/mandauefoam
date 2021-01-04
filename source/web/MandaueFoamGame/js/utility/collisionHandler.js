/**
    collisionHandler.js
    Ported from Stuck in a nightmare
    author: Ruell Magpayo <ruellm@yahoo.com>
    Date ported: July 5, 2014
*/

//
// more accurate but slow hot test, Rect vs Rect collision
//
function Collision_RectCollide(subjRect, targetRect) {
    var xHit = false;
    var yHit = false;

    for (var sx = subjRect._x; sx < subjRect._x + subjRect._width; sx++) {
        if (sx > targetRect._x && sx < targetRect._x + targetRect._width) {
            xHit = true;
            break;
        }
    }

    for (var sy = subjRect._y; sy < subjRect._y + subjRect._height; sy++) {
        if (sy > targetRect._y && sy < targetRect._y + targetRect._height) {
            yHit = true;
            break;
        }
    }

    return (xHit && yHit);
}