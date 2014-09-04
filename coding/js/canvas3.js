// ********************************
// Polygon Goup Animator
//
// Description:
//
// A small screen saver like animation that generates polygons
// of n points, animates the movement of those points in 
// random directions, and generates a color gradient 
// based on an initial randomly generated hue - it looks
// like a screen saver.
//
//
// Made by @iandmccunn in 2014
//
//*********************************

(function () {
    'use strict';

    //canvas size
    var width = 1024,
        height = 768,
        c = document.getElementById('c'),
        ctx = c.getContext('2d');

    //setting canvas size 
    c.width = width;
    c.height = height;



    function clear() {
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.closePath();
        ctx.fill();
    }

    // *******************************
    // getRandom()
    // 
    //
    //
    // @params min, max
    // @return interger within range of min and max

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Sloppy random true or false
    function getRandBool() {
        return (getRandom(0, 10) > 5) ? true : false;
    }



    // *******************************
    // Coordinate Object
    // 
    // Simple object that holds and x and y value
    // and a boolean trigger value for each.
    // trigger values are used for canvas context
    // collision detection.
    //
    // @params none
    // @return none
    // *******************************

    function Coordinate() {
        this.xx;
        this.yy;
        this.xxTrig;
        this.yyTrig;
    }

    // ******************************
    // Polygon Object
    //
    // Generates a polygon of n sides/points where each point is
    // randomly placed within the canvas context.
    //
    // @params numPoints
    // @return none
    // ******************************

    function Polygon(numPoints) {

        var that = this, 
        	i;

        this.numPoints = numPoints;
        // Polygon points (x, y)
        this.points = [];
        for (i = 0; i < numPoints; i++) {

            this.points[i] = new Coordinate();

            this.points[i].xx = 0;
            this.points[i].yy = 0;
            // Polygon point canvas edge triggers
            this.points[i].xxTrig = true;
            this.points[i].yyTrig = true;
        }

        this.setPoints = function() {

        }

        // Internal Direction modifiers
        this.posDir = 1;
        this.negDir = -1;

        // Triangle/Line Color
        this.clr;

        // Canvas draw functions
        this.draw = function() {
            ctx.beginPath();
            ctx.moveTo(that.p1x, that.p1y);
            for ( i = 0; i < numPoints; i++ ) {
                ctx.lineTo(that.points[i].xx, that.points[i].yy);
            }
            ctx.closePath();
            ctx.strokeStyle = that.clr;
            ctx.stroke();
        }

        this.initToRand = function(spaceError) {

            this.spaceCorrectWidth = width - spaceError;
            this.spaceCorrectHeight = height - spaceError;

            for ( i = 0; i < numPoints; i++ ) {
                that.points[i].xx = getRandom(spaceError, this.spaceCorrectWidth);
                that.points[i].yy = getRandom(spaceError, this.spaceCorrectHeight);
            }
            that.draw();
        }

        this.move = function() {

            // Check for canvas edge collision, change trigger value

            for ( i = 0; i < numPoints; i++) {

                // Check to see if point of polygon will be drawn outside of canvas context in next draw iteration, 
                //      if it will be, change direction of movement
                if ((that.points[i].xx + that.posDir > width) || (that.points[i].xx + that.negDir < 0)) {
                    that.points[i].xxTrig = !that.points[i].xxTrig;
                }
                if ((that.points[i].yy + that.posDir >= height) || (that.points[i].yy + that.negDir <= 0)) {
                    that.points[i].yyTrig = !that.points[i].yyTrig;
                }


                if (that.points[i].xxTrig) {
                    that.points[i].xx += that.posDir;
                } else {
                    that.points[i].xx += that.negDir;
                }
                if (that.points[i].yyTrig) {
                    that.points[i].yy += that.posDir;
                } else {
                    that.points[i].yy += that.negDir;
                }
            }

            that.draw();

        }
    }

    // *******************************
    //
    //
    //
    // *******************************

    function PolyGroup() {
        var that = this;
        this.amount;
        this.polys = [];
        this.triSpacing = 4;
        this.clr;
        this.ofXPoints = 4;

        this.initTris = function() {

            // Initialize color gradient for group of polygons
            that.clr = new ColorGroup(that.amount, getRandom(1, 360));
            that.clr.init();
            // Initialize starting polygon
            that.polys[0] = new Polygon(that.ofXPoints);
            that.polys[0].initToRand(that.triSpacing * that.amount);
            that.polys[0].clr = 'hsla(' + that.clr.colorGradient[0].h + ', ' + that.clr.colorGradient[0].s + '%, ' + that.clr.colorGradient[0].l + '%, ' + that.clr.colorGradient[0].a + ')';

            var pointDirs = [],
                pointDirs2 = [],
                i;
            for (i = 0; i < that.ofXPoints; i++) {
                pointDirs[i] = getRandBool();
                pointDirs2[i] = getRandBool();
                that.polys[0].points[i].xxTrig = pointDirs[i];
                that.polys[0].points[i].yyTrig = pointDirs2[i];
            }

            for (i = 1; i < that.amount; i++) {
                var xDir = getRandBool();
                that.polys[i] = new Polygon(that.ofXPoints);
                for (var j = 0; j < that.polys[0].numPoints; j++) {
                    that.polys[i].points[j].xx = that.polys[0].points[j].xx + (i * that.triSpacing);
                    that.polys[i].points[j].yy = that.polys[0].points[j].yy + (i * that.triSpacing);
                    that.polys[i].points[j].xxTrig = pointDirs[j];
                    that.polys[i].points[j].yyTrig = pointDirs2[j];

                    that.polys[i].clr = 'hsla(' + that.clr.colorGradient[i].h + ', ' + that.clr.colorGradient[i].s + '%, ' + that.clr.colorGradient[i].l + '%, ' + that.clr.colorGradient[i].a + ')';
                }

            }
        }

        this.moveGroup = function() {
            for (var i = 0; i < that.amount; i++) {
                that.polys[i].move();
            }
        }
    }

    // *******************************
    // HslaColor()
    // 
    // Object that simply stores four 
    // values representing an hsla color.
    //
    // @param none
    // @return none
    // *******************************

    function HslaColor() {
        var that = this;
        this.h;
        this.s;
        this.l;
        this.a;

        this.init = function(startColor) {
            that.h = startColor;
            that.s = 60;
            that.l = 55;
            that.a = 100;
        }
    }

    // *******************************
    // ColorGroup()
    //
    // Object for a group of colors that create 
    // a gradient each defined by an hsla color (HslaColor())
    //
    // @params numColors, startColor
    // @return none
    // *******************************

    function ColorGroup(numColors, startColor) {

        var that = this;
        this.colorGradient = [];
        this.numColors = numColors;
        this.initColor = startColor;
        this.hueDiff = 2;

        this.init = function() {
            that.colorGradient[0] = new HslaColor();
            that.colorGradient[0].init(that.initColor);
            for (var i = 1; i <= that.numColors; i++) {
                that.colorGradient[i] = new HslaColor();
                that.colorGradient[i].init(that.initColor + (that.hueDiff * i));
            }
        }
    }

    var frameCount = 0;

    function frameLoop() {

        clear();

        // Move the points of each polygon on each loop interation
        polyGroup1.moveGroup();

        var gLoop = setTimeout(frameLoop, 1000 / 60);
    }

    // Instantiate a group of polygons...
    var polyGroup1 = new PolyGroup();

    // set the number of polygons in the group
    polyGroup1.amount = 50;

    // distance between each polygon
    polyGroup1.triSpacing = 4;

    // number of points/sides each polygon has
    polyGroup1.ofXPoints = 4;

    // Initialize polygon points randomly and generate colors
    polyGroup1.initTris();
    document.getElementById('newSeed').addEventListener('click', polyGroup1.initTris);

    // Main Loop
    frameLoop();

}());