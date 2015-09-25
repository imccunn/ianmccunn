

//********************************
// Finger Pattern Generator
//
// Author: Ian McCunn, @IanMcCunn

(function(){
  'use strict';

  // **************
  // Constants
  var rightHandData, // possible fingers (i, m, a, c) and pick or thumb ( p ) used to attack string
      nonRepeat = ['i', 'm', 'a', 'c'], // finger attacks that cannot be adjacent
      tableData,
      statData,
      excludePinky;

  // **************
  // init() 
  // used to bind events to the dom after the
  // page is loaded
  //
  // @param none
  // @return none

  function init(){
    initCalc.addEventListener('click', checkInput);

    // fetch input once
    checkInput();
  }

  // **************
  // checkInput()
  // checks user input on the form to determine
  // if calculations should be made
  //
  // @param none
  // @return none

  function checkInput(){
    console.log("run");

    // set the size of the set, optionally create several different random patterns
    var numPermutations = document.getElementById('nPerms').value;
    var setSize = document.getElementById('setSize').value;

    // Check user input, fail fasts
    // 1. check set size and limit it
    if( !(setSize <= 400) || !(setSize > 1)) {
      alert("Check your input and try again.");
      return;
    }

    // check number of patterns and limit
    if (!(numPermutations <= 500) || !(numPermutations > 0) || !numPermutations.trim().length){
      alert("Check your input and try again.");
      return;
    }


    // **************
    // If the conditional passes we do stuff

    //Determine picking style and set Right hand data to use
    if ( document.getElementById('hybridStyle').checked){
      rightHandData = ['p', 'm', 'a', 'c'];
      if (document.getElementById('noPinky').checked){
        rightHandData = ['p', 'm', 'a'];
      }
      
    }
    else if (document.getElementById('fingerStyle').checked){
      rightHandData = ['p', 'i', 'm', 'a', 'c'];
      if (document.getElementById('noPinky').checked){
        rightHandData = ['p', 'i', 'm', 'a'];
      }
    }

    // calculate the tabular data
    tableData = createNPermutations(numPermutations, setSize);

    // calculate stat distribution
    statData = findStatDistribution(tableData.flat);

    // Update the DOM
    updateDOM();
  }

  // **************
  // findOneCombo()
  // used to determine the next attack in the pattern
  //
  // @param nAttacks
  //   # of attacks specified in the user input
  //
  // @return newCombo
  //   array of new attacks to be added to the list
  function findOneCombo(nAttacks){

    var newCombo = [],  // placeholder for final series of randomly generated attacks
        nextDigit, // temp placeholder for finger char to be verified as possible next finger
        i,
        nextDigitFound,
        index; 


    for (var i = 0; i < nAttacks; i++){
      nextDigitFound = false;

      while (!nextDigitFound){
        // find random index
        index = Math.floor(Math.random() * rightHandData.length);

        nextDigit = rightHandData[index];

        if ((nextDigit == 'p') || (nextDigit != newCombo[i-1])){
          newCombo.push( nextDigit );
          nextDigitFound = true;
        }
      }
    }

    return newCombo;
  }

  // **************
  // findStatDistribution()
  // used to find the percentage of each attack
  // calculated within createNPermutations
  //
  // @param attacksArray
  //   a flattened array of all the attacks chosen by the generator
  //
  // @return nAttackType
  //   an array representing the count of each type used
  function findStatDistribution(attacksArray){

    var attackCheck,
        nAttackType = [0,0,0,0,0],
        percent = 0,
        i;


    //count the number of attacks by type of passed attacks array
    for ( i = attacksArray.length - 1; i >= 0; i--) {

      attackCheck = attacksArray[i];

      switch (attackCheck){

        case 'p' : nAttackType[0]++;
          break;
        case 'i' : nAttackType[1]++;
          break;
        case 'm' : nAttackType[2]++;
          break;
        case 'a' : nAttackType[3]++;
          break;
        case 'c' : nAttackType[4]++;
          break;
        default:
          return;
      }
    }

    return nAttackType;
  }

  // **************
  // createNPermutations()
  // used to create n (numPermutations) number randomly
  // arranged arrays (groups of RH attacks) of size nAttacks
  //
  // @param none
  // @return none
  function createNPermutations(numPermutations, setSize){

    var allSets = [],
        setForDist = [],
        tempCombo,
        i,
        j;

    // iterate over the premutations
    for ( i = 0; i < numPermutations; i++ ) {
      tempCombo = findOneCombo(setSize);
      allSets.push( tempCombo );

      //combine all sets into one
      for( j = 0; j < setSize; j++ ){
        setForDist.push( tempCombo[j] );
      }
    }
    return {
      flat: setForDist,
      whole: allSets
    };

  }

  // **************
  // updateDOM()
  // used to update the dom after all
  // computations have been made
  //
  // @param none
  // @return none
  function updateDOM(){

    var distAttackType = [0,0,0,0,0],
        output = "<table>";

    //Add the statistical data to the DOM
    for (var i = 4; i >= 0; i--) {
      percent = (statData[i] / tableData.flat.length) * 100;
      distAttackType[i] = percent.toFixed(2);
    }

    document.getElementById('fpick').innerHTML = distAttackType[0];
    document.getElementById('find').innerHTML = distAttackType[1];
    document.getElementById('fmid').innerHTML = distAttackType[2];
    document.getElementById('fanu').innerHTML = distAttackType[3];
    document.getElementById('fpinky').innerHTML = distAttackType[4];

    // Add the tabular data to the DOM
    var patternDomString;

    for (var i = 0; i < tableData.whole.length; i++ ) {
      patternDomString = "";
      for (var j = 0; j < tableData.whole[i].length; j++) {
        patternDomString += tableData.whole[i][j] + "&nbsp&nbsp";
      }
      output += ("<tr><td>" + patternDomString + "</td></tr>");
    }
    output += "</table>";

    // append to the DOM
    document.getElementById('result').innerHTML = output;
  }

  // **************
  // Bootstrap the application by running init()
  // which binds the event handlers
  init();

  return {
    checkInput: checkInput
  };

})();
