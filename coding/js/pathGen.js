'use strict';

var c = document.getElementById('c');
var ctx = c.getContext('2d');
var blockSize = 4;

var SAMPLE_RATE = Math.floor(640 / blockSize);
var WIDTH, HEIGHT;
c.width = WIDTH = SAMPLE_RATE * blockSize;
c.height = HEIGHT = SAMPLE_RATE * blockSize;

// ********** Canvas Draw Functions **********
function fillBackDefault(rc) {
  ctx.beginPath();
  ctx.rect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = 'rgb(' + rc + ', ' + rc + ', ' + rc + ')';
  ctx.fill();
  ctx.closePath();
}

function drawRect(clr, posx, posy, size) {
  ctx.beginPath();
  ctx.rect(posx, posy, size, size);
  ctx.fillStyle = clr;
  ctx.fill();
}

function drawRects(b) {
  for (var i = 0; i < b.blocks.length; i++) {
    for (var j = 0; j < b.blocks[i].length; j++) {
      drawRect(b.blocks[i][j].color, b.blocks[i][j].size * j, b.blocks[i][j].size * i, b.blocks[i][j].size);
    }
  }
}

function Block(rc) {
  this.size = blockSize;
  this.width = this.size;
  this.height = this.size;
  this.z = 0;
  this.color = 'rgb(' + rc + ', ' + rc + ', ' + rc + ')';
  this.blockType = 0;
}

function BlockGrid() {
  this.blocks = [];
  this.containedBlocks = 0;
  this.row = [];
}

BlockGrid.prototype = {
  constructor: BlockGrid,
  init: function () {
    var row = [];
    for (var i = 0; i < SAMPLE_RATE; i++) {
      row = [];
      for (var j = 0; j < SAMPLE_RATE; j++) {
        row[j] = new Block(0);
        row[j].blockType = 0;
      }
      this.blocks[i] = row;
    }

  },
  makePath: function () {

    var numMoves = 16000,
      y = SAMPLE_RATE / 2,
      x = SAMPLE_RATE / 2;
    var move = Math.floor(Math.random() * 3 + 1);

    var clr = '#fff';
    this.blocks[y][x].color = clr;

    var curBlock = this.blocks[y][x];

    var iterationCount = 0;

    var posResetOption = 2;

    while (numMoves--) {

      if (x === SAMPLE_RATE - 2 || y === SAMPLE_RATE - 2 || x === 2 || y === 2) {

        // if edge of map is hit, reset position either to middle position or to random position
        if (posResetOption === 1) {
          y = SAMPLE_RATE / 2;
          x = SAMPLE_RATE / 2;
        } else {
          y = Math.floor(Math.random() * (SAMPLE_RATE - (10 * blockSize)) + 10 * blockSize);
          x = Math.floor(Math.random() * (SAMPLE_RATE - (10 * blockSize)) + 10 * blockSize);
        }

        iterationCount++;
        if (iterationCount === 64) {
          console.log(iterationCount);
          return 0;
        }
      }

      var dirOption = 2;
      //dirOption = Math.floor(Math.random() * 3 + 1);
      if (dirOption === 1) {
        move = Math.floor(Math.random() * 8 + 1);
        switch (move) {
          case 1:
            y--;
            this.blocks[y][x].color = clr; // N
            break;
          case 2:
            x++;
            y--;
            this.blocks[y][x].color = clr; // NE
            break;
          case 3:
            x++;
            this.blocks[y][x].color = clr; // E
            break;
          case 4:
            x++;
            y++;
            this.blocks[y][x].color = clr; // SE
            break;
          case 5:
            y++;
            this.blocks[y][x].color = clr; // S
            break;
          case 6:
            y++;
            x--;
            this.blocks[y][x].color = clr; //SW
            break;
          case 7:
            x--;
            this.blocks[y][x].color = clr; // W
            break;
          case 8:
            y--;
            x--;
            this.blocks[y][x].color = clr; // NW 
            break;
          default:
            console.log('something bad happened in the switch statement.');
            break;
        }
      } else if (dirOption === 2) {
        move = Math.floor(Math.random() * 4 + 1);
        switch (move) {

          case 1:
            y--;
            this.blocks[y][x].color = clr;
            this.blocks[y][x].blockType = 1; // N
            break;
          case 2:
            x++;
            this.blocks[y][x].color = clr;
            this.blocks[y][x].blockType = 1; // E
            break;
          case 3:
            y++;
            this.blocks[y][x].color = clr;
            this.blocks[y][x].blockType = 1; // S
            break;
          case 4:
            x--;
            this.blocks[y][x].color = clr;
            this.blocks[y][x].blockType = 1; // W
            break;
          default:
            console.log('something bad happened in the switch statement.');
            break;
        }
      } else {
        move = Math.floor(Math.random() * 4 + 1);
        switch (move) {

          case 1:
            y--;
            x--;
            this.blocks[y][x].color = clr;
            break;
          case 2:
            y--;
            this.blocks[y][x].color = clr;
            break;
          case 3:
            y--;
            x++;
            this.blocks[y][x].color = clr;
            break;
          case 4:
            y--;
            x++;
            this.blocks[y][x].color = clr;
            x++;
            this.blocks[y][x].color = clr; // S
            break;

          default:
            console.log('something bad happened in the switch statement.');
            break;
        }
      }



    }
  },
  cleanGrid: function () {
    for (var i = 2; i < this.blocks.length - 2; i++) {
      for (var j = 2; j < this.blocks[i].length - 2; j++) {

        if (this.blocks[i][j].blockType === 0) {
          if (this.blocks[i + 1][j].blockType == 1 && this.blocks[i - 1][j].blockType == 1 && this.blocks[i][j + 1].blockType == 1 && this.blocks[i][j - 1].blockType == 1) {
            this.blocks[i][j].blockType = 1;
            this.blocks[i][j].color = '#fff';
          }
        }

      }
    }
  },
  placeResources: function () {
    for (var i = 0; i < this.blocks.length; i++) {
      for (var j = 0; j < this.blocks[i].length; j++) {
        if (this.blocks[i][j].blockType === 1) {
          var chancePlants = Math.floor(Math.random() * 20 + 1);
          var chanceGold = Math.floor(Math.random() * 100 + 1);
          if (chancePlants == 3) {
            this.blocks[i][j].bockType = 3;
            this.blocks[i][j].color = '#007802';
          }
          if (chanceGold == 7) {
            this.blocks[i][j].bockType = 4;
            this.blocks[i][j].color = '#FADD00';
          }
        }
      }
    }
  },
  placeLocations: function () {
    for (var i = 0; i < this.blocks.length; i++) {
      for (var j = 0; j < this.blocks[i].length; j++) {
        if (this.blocks[i][j].blockType == 1) {
          var chanceLoc = Math.floor(Math.random() * 150 + 1);
          if (chanceLoc == 75) {
            this.blocks[i][j].bockType = 5;
            this.blocks[i][j].color = '#ff0000';
          }

        }
      }
    }
  }
};


function Linear_Interpolate(a, b, x) {
  return a * (1 - x) + b * x;
}

function Cosine_Interpolate(a, b, x) {
  var ft = x * 3.1415927,
    f = (1 - Math.cos(ft)) * 0.5;

  return a * (1 - f) + b * f;
}


function rCol() {
  return Math.floor(Math.random() * 255);
}

// helper -1-1 : 0-255
function toRGBVal(n) {
  return Math.floor((n + 1) * 255);
}

function roundFloat(input, prec) {
  return parseFloat(input.toFixed(prec));
}

// Random number between -1.0 and 1.0
function getRandOne() {
  return parseFloat(Math.random() * 2 - 1).toFixed(4);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function loop() {
  fillBackDefault();
  blocks1.init();
  blocks1.makePath();
  drawRects(blocks1);
  requestAnimationFrame(loop);
}

fillBackDefault(0);

var blocks1 = new BlockGrid();
blocks1.init();
//blocks1.fillCoherentNoise();

function generate() {
  fillBackDefault();
  blocks1.init();
  blocks1.makePath();
  drawRects(blocks1);
}
document.getElementById('gen').addEventListener('click', function () {
  generate();
});

document.getElementById('clean').addEventListener('click', function () {
  fillBackDefault();
  blocks1.cleanGrid();
  drawRects(blocks1);
});

document.getElementById('plant').addEventListener('click', function () {
  fillBackDefault();
  blocks1.placeResources();
  drawRects(blocks1);
});

document.getElementById('loc').addEventListener('click', function () {
  fillBackDefault();
  blocks1.placeLocations();
  drawRects(blocks1);
});

window.onload = generate();