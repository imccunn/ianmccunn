(function(){
  'use strict';

  //constants
  var chordMember = {
    root: 0,
    second: 2,
    third: 4,
    fourth: 5,
    fifth: 7,
    sixth: 9,
    seventh: 11
  };

  var pitchModifier = {
    'bb': -2,
    'b': -1,
    '#': 1,
    '##': 2,
    '+' : 1,
    'dim' : -1,
    'o' : -1,
    'aug' : 1

  };

  function PitchClass(pitch){
    this.pitch = pitch || -1;

    this.modify = function(modifier){
      this.pitch += pitchModifier[modifier];
    };
  }

  function Chord(cname){

    this.cname = cname;
    this.pcset = [0,4,7];
    this.quality = quality;

    this.init = function() {
      //set cname and pcset
    }

    this.chordNameToSet = function(){

      //Format includes slash notation
      var rxResult = chordRex.exec(this.cname);

      if (!chordRex.test(this.cname)){

        return console.log("Incorrect Chord Format to determine set.");

      } else {

        for (var i = 2; i < 15; i++){
          switch (rxResult[i]){
            case null : break;
            case 'mM' : this.pcset[1] = 3; this.pcset.push(11);
              break;
            case 'm' : this.pcset[1] = 3;
              break;
            case 'M' : this.pcset[1] = 4;
              break;
          }
        }
        //Process number following root PC (C9, C7)

        return;
      }
    }
  }


  function chordMemberModifier(modifier){
    var mod = modifier;

    switch (mod){
      case '#' :
    }
  }

  // ***************************
  // translateChordalModifiers()
  //
  //
  // @param chordalModifier
  // @return affectedPC, chordMember
  function translateChordalModifiers(chordalModifier){
    var cm = chordalModifier,
      chPC = -1,
      chordalPCMember = chordMember.root;

    switch (cm){
      case 'b2' : chPC = 1;
        break;
      case 'sus2' || 'add2': chPC = 2;
        break;
      case 'm' : chPC = 3;
        break;
      case 'M' : chPC = 4;
        break;
      case 'sus4' : chPC = 5;
        break;
    }

  }

  function init(){
    calcTraidSet.addEventListener('click', findSet);
  }

  function findSet(){

    //SAVED REGEX LINK: http://regex101.com/r/mN2sU1
    var re = /([A-Ga-g])(#|b)?([Mm])?([Mm])?(hd|dim)?([1-9][13]?)?(sus)?(\+|aug)?([#|b])?([1-9]?[1-9])?(add2|add4)?(omit)?([2-9])?(\/[A-Ga-g])?([#|b])?/;
    var mainChord = document.getElementById('triadPro').value;
    console.log("chord: " + mainChord);

    console.log(re.test(mainChord));
    var rxResult = re.exec(mainChord);

    if (!re.test(mainChord)){

      document.getElementById('triadSetResult').innerHTML = "<span style=\"color: red;\">Incorrect format.</span>";

    } else {
      console.log("truth reached");
      document.getElementById('triadSetResult').innerHTML = "";
      for (var i = 0; i < rxResult.length; i++){
        document.getElementById('triadSetResult').innerHTML += "<p>" + (i+1) + ". " + rxResult[i] + "</p>";
      }
    }
    return;
  }


  init();

  return {
    findSet: findSet
  };

})();
