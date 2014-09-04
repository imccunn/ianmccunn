//***********Generative Canvas Painter Script***********************************
//
//
//
//

(function() {
  'use strict';

  var timedDraw;

  var ctx = document.getElementById('prettyCanvas').getContext('2d');
  var canX = 500, 
      canY = 500;
  var height, width, x, y;

  var rr = getRandom(0, 255), 
      gg = getRandom(0, 255), 
      bb = getRandom(0, 255),
      rRange = randColorRange(),
      gRange = randColorRange(),
      bRange = randColorRange();

  var frameCount = 0,
      HZ = 30;

  var counter = 0;
  var sendToInterval = 500;
  var lowerRange, upperRange;

  function randColorRange() {
    var range = [getRandom(0, 256), getRandom(0, 256)];
    return range.sort();
  }

  function setColorRanges(){

    var rgbRange = randColorRange();
    rRange = randColorRange();

    gRange = randColorRange();

    bRange = randColorRange();
  }



  function drawIt() {
    
    if (frameCount <= 500){
      frameCount++;
    } else {
      frameCount = 0;
    }
  
    var loopAmount = getRandom(1, 200);
    for (var i = 0; i < loopAmount; i++){          
            
      ctx.fillStyle = "rgb(" + getRandom(rRange[0], rRange[1]) + "," + getRandom(gRange[0], gRange[1]) + "," + getRandom(bRange[0], bRange[1]) +")";
      for (var j = 0; j < 60; j++) {

        //pos
        x = getRandom(0, canX);
        y = getRandom(0, canY);

        //size
        height = getRandom(2, 3);
        width = getRandom(2, 3);

        //draw
        ctx.fillRect (x, y, width, height);       
      };

      for ( j = 0; j < 20; j++) {

        //pos
        x = getRandom(0, canX);
        y = getRandom(0, canY);

        //size
        height = getRandom(5, 9);
        width = getRandom(5, 9);

        //draw
        ctx.fillRect (x, y, width, height); 
      };

      for (j = 0; j < 5; j++) {

        //pos
        x = getRandom(0, canX);
        y = getRandom(0, canY);

        //size
        height = getRandom(1, 120);
        width = getRandom(2, 4);

        //draw
        ctx.fillRect (x, y, width, height); 
      };

      for (j = 0; j < 30; j++) {

        //pos
        x = getRandom(0, canX);
        y = getRandom(0, canY);

        //size
        height = getRandom(1, 2);
        width = getRandom(2, 1);

        //draw
        ctx.fillRect (x, y, width, height);   
      };
    };

  }
  
  function clear() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.rect(0, 0, canX, canY);
    ctx.closePath();
    ctx.fill();
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function init() {

    document.getElementById('timedDraw').addEventListener('click', function() {
      var pleaseClear = document.getElementById('clearCanvas');
      if (this.checked) {
        timedDraw = window.setInterval(
                      function(){

                        if(pleaseClear.checked){
                          clear();
                        }

                        drawIt();
                      }, HZ);
      } else {
        clearInterval(timedDraw);
      }
    });

    document.getElementById('makeArt').addEventListener('click', function() {
      clear();
      drawIt();

    });

    document.getElementById('rgbRanges').addEventListener('click', function() {
      setColorRanges();
      clear();
      drawIt();
    });

    drawIt();

  }

  init();

})();