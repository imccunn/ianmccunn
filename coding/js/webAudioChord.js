/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//var angular = require('angular/angular');
	var Chord = __webpack_require__(1);
	var MusicModel = __webpack_require__(2);
	//var mDisplay = __webpack_require__(3);

	var audioCtx = __webpack_require__(4).audioCtx;
	var analyser = __webpack_require__(4).analyser;
	var MASTERGAIN = __webpack_require__(4).MASTERGAIN;

	window.Chord = __webpack_require__(1);

	// var stochApp = angular.module('stochApp', []);

	// stochApp.controller('mainCtrl', function($scope) {
	  
	// });

	window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame  ||
	  window.webkitRequestAnimationFrame ||
	  window.mozRequestAnimationFrame    ||
	  window.oRequestAnimationFrame      ||
	  window.msRequestAnimationFrame     ||
	  function(callback){
	    window.setTimeout(callback, 1000 / 60);
	  };
	})();

	var v = document.getElementById('v');
	v.width = 400;
	v.height = 100;
	var h = v.height;
	var w = v.width;
	var ctxV = v.getContext('2d');

	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);

	ctxV.clearRect(0, 0, v.width, v.height);

	function drawV() {

	  analyser.getByteTimeDomainData(dataArray);

	  ctxV.fillStyle = 'rgb(0, 0, 0)';
	  ctxV.fillRect(0, 0, w, h);

	  ctxV.lineWidth = 2;
	  ctxV.strokeStyle = 'rgb(0, 255, 120)';

	  ctxV.beginPath();

	  var sliceWidth = w * 1.0 / bufferLength;
	  var x = 0;

	  for (var i = 0; i < bufferLength; i++) {

	    var v = dataArray[i] / 128.0;

	    var y = (v * h/2);

	    if (i === 0) {
	      ctxV.moveTo(x, y);
	    } else {
	      ctxV.lineTo(x, y);
	    }

	    x += sliceWidth;
	  }

	  ctxV.lineTo(w, h/2);
	  ctxV.stroke();
	  window.requestAnimationFrame(drawV);
	}


	// ********************Object Creation********************

	// var chord1 = new Chord(30);
	// chord1.init();
	// var chord2 = new Chord(5);

	var chord1;

	var modelStartTime;
	var modelTimer;

	document.getElementById('makeChord').addEventListener('click', function() {

		var numPitches = parseInt(document.getElementById('numPitches').value);
		var fMax = parseInt(document.getElementById('fMax').value);
		var fMin = parseInt(document.getElementById('fMin').value);
		var dur = parseFloat(document.getElementById('duration').value);
		chord1 = new Chord(numPitches, fMax, fMin, dur);
		var dispFreqs = [];
		var freqContainer = document.getElementById('frequencies');
		freqContainer.innerHTML = '';
		for (var i = 0; i < chord1.notes.length; i++) {
			dispFreqs.push(chord1.notes[i].freq.toFixed(3));
		}
		dispFreqs.sort(function(a, b) {
			return a - b;	
		});
		for (var i = dispFreqs.length-1; i >= 0; i--) {
			var li = document.createElement('li');
			li.innerHTML = dispFreqs[i];
			freqContainer.appendChild(li);
		}

	  	drawV();
	});

	drawV();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Osc = __webpack_require__(5);
	var oscTypes = __webpack_require__(6).oscTypes;
	var ctx = __webpack_require__(4).audioCtx;
	var ADSR = __webpack_require__(7);
	var Monad = __webpack_require__(8);

	function Chord(nPitches, fMax, fMin, dur) {

	  this.notes = [];
	  this.root = Math.floor(Math.random() * 250 + 120);
	  this.rootGain = 0.002;
	  this.numPitches = nPitches;
	  this.fqMax = fMax || 1000;
	  this.fqMin = fMin || 200;
	  this.DURATION = dur || 1; //sec

	  this.init();
	}

	Chord.prototype = {
	  constructor: Chord,

	  init: function() {
	    var adsr1 = new ADSR(this.DURATION);
	    var f, t;
	    for (var i = 0; i < this.numPitches; i++) {
	      t = Math.random() * 0.5;
	      f = Math.random() * (this.fqMax - this.fqMin) + this.fqMin;
	      this.notes[i] = new Monad(this.DURATION, ctx.currentTime, oscTypes.sine, f, ctx);
	    }
	  },

	  setChord: function() {
	    for (var i = 1; i < this.notes.length; i++) {
	      // this.notes[i].freq = this.notes[i-1].freq * intvArr[rInt(1, 11)];
	      // this.notes[i].freq = this.notes[i-1].freq * intervals.p5;
	      this.notes[i].freq = Math.random() * 800 + 220;
	      this.notes[i].dur = 0.5;
	      this.notes[i].init();
	    }
	  },

	  atk: function() {

	    this.init(this.numPitches);
	    
	    for (var i = 0; i < this.notes.length; i++) {

	      // set variable note durations and start times
	      this.notes[i].osc.start(ctx.currentTime);
	      this.notes[i].gain.gain.setValueAtTime(0.0, ctx.currentTime);
	      this.notes[i].gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.15);
	      this.notes[i].gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 2);
	      this.notes[i].osc.stop(ctx.currentTime + 2);
	        
	    }
	  },

	  end: function() {
	    for (var i = 0; i < this.notes.length; i++) {
	      this.notes[i].stop();
	    }
	    this.init(this.numPitches);
	  }
	};

	module.exports = Chord;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Monad = __webpack_require__(8);
	var rand = __webpack_require__(6).rand;
	var oscArr = __webpack_require__(6).oscArr;
	var rInt = __webpack_require__(6).rInt;

	function MusicModel(dur, atks, atkMin, atkMax, fMin, fMax, oscType, audioCtx) {
	  this.ctx = audioCtx;
	  this.startTime = audioCtx.currentTime;
	  this.duration = dur;
	  this.totalAttacks = atks;
	  this.attacks = [];
	  this.atkMin = atkMin;
	  this.atkMax = atkMax;
	  this.fMin = fMin;
	  this.fMax = fMax;
	  this.oscType = oscType;
	  console.log(this.oscType);
	  this.isPlaying = false;
	  this.modelObj = [];
	}

	MusicModel.prototype = {

	  constructor: MusicModel,

	  setAttacks: function() {
	    var now = this.ctx.currentTime;
	    this.startTime = now;
	    var dur, atkTime, f, otype;

	    for (var i = 0; i < this.totalAttacks; i++) {
	      dur = rand() * (this.atkMax - this.atkMin) + this.atkMin;
	      atkTime = this.startTime + (rand() * this.duration) + 1;
	      f = rand() * (this.fMax - this.fMin) + this.fMin;
	      otype = (this.oscType === 4) ? oscArr(rInt(0, 3)) : oscArr(this.oscType);
	      this.modelObj.push(
	          {
	            dur: dur,
	            atkTime: atkTime - now,
	            freq: f
	          }
	        );
	      this.attacks.push(new Monad(dur, atkTime, otype, f, this.ctx));
	    }
	  },

	  scheduleModel: function() {
	    var now = this.ctx.currentTime;
	    for (var i = 0; i < this.attacks.length; i++) {

	    }
	  },

	  findLatestEndTime: function() {
	    var latest = this.ctx.currentTime - this.attacks[0].endTime;
	    for (var i = 1; i < this.attacks.length; i++) {
	      latest = (latest > this.attacks[i].endTime) ? latest : this.attacks[i].endTime;
	    }
	    return latest;
	  },

	  stop: function() {
	    for (var i = 0; i < this.attacks.length; i++) {
	      this.attacks[i].instrument.stop();
	    }
	  }
	};

	module.exports = MusicModel;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	var c = document.getElementById('c');
	c.width = 400;
	c.height = 200;
	var ctx = c.getContext('2d');

	module.exports =  {
	  fillBackDefault: function(rc) {
	    var rc = rc || 0;
	    ctx.beginPath();
	    ctx.rect(0, 0, c.width, c.height);
	    ctx.fillStyle = 'rgb(' + rc + ', ' + rc + ', ' + rc + ')';
	    ctx.fill();
	    ctx.closePath();
	  },

	  drawRect: function(clr, posx, posy, w, h) {
	    ctx.beginPath();
	    ctx.rect(posx, posy, w, h);
	    ctx.fillStyle = clr;
	    ctx.fill();
	  },

	  drawRects: function(rectArr) {
	    for (var i = 0; i < rectArr.length; i++) {

	    }
	  },

	  drawMusicModel: function(model) { // type: MusicModel
	    this.fillBackDefault(0, 0, 0);
	    var posX, posY, noteWidth;
	    var trueWidth = model.findLatestEndTime() - model.startTime;
	    for (var i = 0; i < model.attacks.length; i++) {

	      posX = ((model.attacks[i].startTime - model.startTime) * c.width)/trueWidth;
	      noteHeight = 1;
	      noteWidth = (model.attacks[i].duration * c.width) / trueWidth;
	      posY = c.height - ((c.height * (model.attacks[i].freq  - model.fMin)) / (model.fMax - model.fMin));

	      this.drawRect('#aa00ff', posX, posY, noteWidth, noteHeight);
	    }
	    // document.getElementById('dFreqMax').innerHTML = model.fMax + 'Hz';
	    // document.getElementById('dFreqMin').innerHTML = model.fMin + 'Hz';
	  },

	  rRGB: function() {
	    var c = rInt255();
	    return 'rgb(' + c + ',' + c + ',' + c +')';
	  },

	  rInt255: function() {
	    return Math.floor(Math.random() * 255);
	  },

	  drawTimeLine: function(posx) {
	    drawRect('#ff0000', posx, 0, 1, c.height)
	  },

	  draw: function() {
	    this.fillBackDefault(0, 0, 0);
	    requestAnimationFrame(this.draw);
	  }
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var A = {
	  audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
	  init: function() {
	    this.OUT = this.audioCtx.destination;
	    this.MASTERGAIN = this.audioCtx.createGain();
	    this.analyser = this.audioCtx.createAnalyser();
	    this.MASTERGAIN.connect(this.OUT);
	    this.MASTERGAIN.gain.value = 0.02;
	    this.analyser.connect(this.MASTERGAIN);
	    this.analyser.fftSize = 2048;
	    return this;
	  }
	}.init();

	module.exports = A;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var analyser = __webpack_require__(4).analyser;

	function Osc(f, t, adsr, dur, audioCtx) {
	  this.ctx = audioCtx;
	  this.osc = this.ctx.createOscillator();
	  this.type = t || 'sine';
	  this.gain = this.ctx.createGain();;

	  this.freq = f || 150.0;
	  this.dur = dur || 1.0;
	  this.startTime = 0;
	  this.endTime = this.startTime + this.dur;
	  this.adsr = adsr;
	  this.osc.type = this.type;
	  this.osc.frequency.value = this.freq;
	  this.gain.gain.value = 0.5;
	  
	  this.init();
	}

	Osc.prototype = {
	  constructor: Osc,

	  init: function() {
	    
	    this.gain.connect(analyser);
	    this.connectTo(this.gain);
	  },

	  set: function(x, dur, y, adsr) {
	    this.startTime = x;
	    this.dur = dur;
	    this.freq = y;
	    this.adsr = adsr;
	  },

	  schedule: function(x){
	    this.startTime = x;
	    this.endTime = this.startTime + this.dur + 3;
	    this.startAndStop();
	    this.setLinearGains();
	  },

	  setLinearGains: function(){
	    var gain = this.gain.gain;
	    gain.setValueAtTime(0, this.startTime);
	    gain.linearRampToValueAtTime(this.adsr.A.y, this.startTime + this.adsr.A.x);
	    gain.linearRampToValueAtTime(this.adsr.D.y, this.startTime + this.adsr.A.x + this.adsr.D.x);
	    gain.linearRampToValueAtTime(this.adsr.S.y, this.startTime + this.adsr.A.x + this.adsr.D.x + this.adsr.S.x);
	    gain.linearRampToValueAtTime(this.adsr.R.y, this.startTime + this.adsr.A.x + this.adsr.D.x + this.adsr.S.x + this.adsr.R.x);
	  },

	  connectTo: function(destination) {
	    this.osc.connect(destination);
	  },

	  start: function() {
	    this.osc.start();
	  },
	  startAndStop: function() {
	    this.osc.start(this.startTime);
	    this.osc.stop(this.endTime + 10);
	  },
	  stop: function() {
	    this.osc.stop();
	  }
	};

	module.exports = Osc;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  rand: Math.random,
	  rFloatFreq: function(min, max) {
	    return parstFloat(Math.random() * max + min);
	  },
	  rInt: function(min, max) {
	    return Math.floor(Math.random() * (max - min) + min);
	  },
	  oscArr: function(index) {
	    return objToArr(this.oscTypes)[index];
	  }.bind(this),
	  intervals: {
	    m2: (16/15),
	    M2: (9/8),
	    m3: (6/5),
	    M3: (5/4),
	    p4: (4/3),
	    tt: (45/32),
	    p5: (3/2),
	    m6: (8/5),
	    M6: (5/3),
	    m7: (16/9),
	    M7: (15/8),
	    P8: (2/1)
	  },
	  intvArr: objToArr(this.intervals),
	  scales: {
	    twelvetone: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	    major: [0, 2, 4, 5, 7, 9, 11],
	    minor: [0, 2, 3, 5, 6, 8, 10],
	    pent: [0, 3, 5, 8, 10]
	  },
	  oscTypes: {
	      sin: 'sine',
	      squ: 'square',
	      saw: 'sawtooth',
	      tri: 'triangle',
	      cus: 'custom'
	    }
	};

	function objToArr(o) {
	  var arr = [];
	  for (var val in o) {
	    arr.push(o[val]);
	  }
	  return arr;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Coord = __webpack_require__(9);

	function ADSR(duration) {
	  this.xRange = duration;
	  this.yRange = 0.999999;
	  this.A = new Coord();
	  this.D = new Coord();
	  this.S = new Coord();
	  this.R = new Coord();
	  this.adsrRatios = {
	    a: 0.25,
	    d: 0.25,
	    s: 0.25,
	    r: 0.25
	  };

	  this.rGainVecs();
	}

	ADSR.prototype = {

	  constructor: ADSR,
	  rGainVecs: function(){
	    this.A.x = (this.xRange * this.adsrRatios.a);
	    this.A.y = Math.random() * this.yRange;

	    this.D.x = (this.xRange * this.adsrRatios.d) + this.A.x;
	    this.D.y = Math.random() * this.yRange;

	    this.S.x = (this.xRange * this.adsrRatios.s) + this.D.x;
	    this.S.y = Math.random() * this.yRange;

	    this.R.x = (this.xRange * this.adsrRatios.r) + this.S.x;
	    this.R.y = 0;

	  }
	};

	module.exports = ADSR;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ADSR = __webpack_require__(7);
	var Osc = __webpack_require__(5);

	function Monad(d, s, t, f, audioCtx) {
	  this.ctx = audioCtx;
	  this.freq = f;
	  this.duration = d;
	  this.startTime = s;
	  this.endTime = s + d;
	  this.ADSR = new ADSR(this.duration);
	  this.instrument = new Osc(this.freq, t, this.ADSR, this.duration, this.ctx);
	  this.instrument.init();
	  this.instrument.schedule(this.startTime);
	}

	module.exports = Monad;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function Coord(x, y) {
	  this.x = x;
	  this.y = y;
	}

	module.exports = Coord;

/***/ }
/******/ ]);