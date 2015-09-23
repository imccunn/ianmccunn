(function(){
  "use strict";

  var WIDTH = 1024,
    HEIGHT = 768;

  var c = document.getElementById('c');
  var ctx = c.getContext('2d');

  c.width = WIDTH;
  c.height = HEIGHT;

  function clear() {

    c.fillStyle = '#000';
    ctx.beginPath();
    ctx.rect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();
    ctx.fill();
  }

  function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandBool(){
    return (getRandom(0, 10) > 5) ? true : false;
  }
  
  function Coordinate() {
    this.xx;
    this.yy;
    this.xxTrig; 
    this.yyTrig;
  }
  
  function Polygon(numPoints) {

    var that = this;

    this.numPoints = numPoints;
    // Polygon points (x, y)
    this.points = [];

    this.minSegmentLength = 10;
    this.maxSegmentLength = 30;

    this.points[0] = new Coordinate();
    this.points[0].xx = getRandom(0, WIDTH);
    this.points[0].yy = getRandom(0, HEIGHT);
    for (var i = 1; i < numPoints; i++) {

      this.points[i] = new Coordinate();

      this.points[i].xx = getRandom(this.points[i-1].xx+this.minSegmentLength, this.points[i-1].xx+this.maxSegmentLength);
      this.points[i].yy = getRandom(this.points[i-1].yy+this.minSegmentLength, this.points[i-1].yy+this.maxSegmentLength);

      // Polygon point canvas edge triggers
      // this.points[i].xxTrig = true;
      // this.points[i].yyTrig = true;
    }

    this.setPoints = function() {

      that.points[0].xx = getRandom(0, WIDTH);
      that.points[0].yy = getRandom(0, HEIGHT);
      for (var i = 1; i < numPoints; i++) {

        //this.points[i] = new Coordinate();
        
        that.points[i].xx = getRandom(that.points[i-1].xx+that.minSegmentLength, that.points[i-1].xx+that.maxSegmentLength);
        that.points[i].yy = getRandom(that.points[i-1].yy+that.minSegmentLength, that.points[i-1].yy+that.maxSegmentLength);

      }
    }

    // Internal Direction modifiers
    this.posDir = 1;
    this.negDir = -1;

    // Triangle/Line Color
    this.clr = '#fff';

    // Canvas draw functions
    this.draw = function() {
      ctx.beginPath();
      ctx.moveTo(that.p1x, that.p1y);
      for (var i = 0; i < numPoints; i++) {
        ctx.lineTo(that.points[i].xx, that.points[i].yy);
      }
      ctx.closePath();
      ctx.strokeStyle = that.clr;
      ctx.stroke();
    }

    this.initToRand = function(spaceError) {

      this.spaceCorrectWidth = WIDTH - spaceError;
      this.spaceCorrectHeight = HEIGHT - spaceError;

      for (var i = 0; i < numPoints; i++) {
        that.points[i].xx = getRandom(spaceError, this.spaceCorrectWidth);
        that.points[i].yy = getRandom(spaceError, this.spaceCorrectHeight);
      }
      that.draw();
    }

    this.move = function() {

      // Check for canvas edge collision, change trigger value

      for (var i = 0; i < numPoints; i++) {

        //Check to see if point of polygon will be drawn outside of canvas context in next draw iteration, if it will be, change direction of movement
        if ((that.points[i].xx+that.posDir > width) || (that.points[i].xx+that.negDir < 0)){
          that.points[i].xxTrig= !that.points[i].xxTrig;
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

  function frameLoop() {

    clear();
    
    apoly.draw();
    var gLoop = setTimeout(frameLoop, 1000 / 60);
    
  }

  var apoly = new Polygon(5);
  document.getElementById('gen').addEventListener('click', apoly.setPoints);

  frameLoop();

})();
