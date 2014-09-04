
function milisecond(conVal)
{
	var retVal = 0;
	retVal = (60000/conVal);
	document.getElementById("result").innerHTML = retVal.toFixed(2);
}

function intervalConversion(interval)
{
	var newinterval = 0;
	var humanInt = ["unis", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7", "P8"];
	newinterval = (12-interval);


	document.getElementById("result1").innerHTML = newinterval;
	document.getElementById("intervalHumRes").innerHTML = humanInt[newinterval];
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x); 
    return o;
}




function rowGen(){
	
	var finRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
		humanInt = ["unis", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7", "P8"],
	    humanIntRes = new Array(11),
	    rhumanIntRes = new Array(11),
	    humanIndex;

	//initializes tone row (1-11), shuffles the elements and prepends the starting pitch (0)	
	var primeRow = shuffle(finRow);

	//add starting pitch 0 at beginning of row
	primeRow.unshift(0);

	var exRow = primeRow.slice();
	var trReverse = exRow.reverse();
	var retrow = new Array(11);
	var pitchdiff = new Array(11);

	//create intervals of row
	for (var i = 0; i < (primeRow.length-1); i++) {

		//determine direction of pitch movement
		if(primeRow[i] < primeRow[i+1])
		{
			//positive
			humanIndex = primeRow[i+1] - primeRow[i];
			humanIntRes[i] =  " + " + humanInt[humanIndex] + " ";

		}
		else
		{
			//negative
			humanIndex = primeRow[i] - primeRow[i+1];
			humanIntRes[i] = humanInt[humanIndex];
			humanIntRes[i] = " - " + humanIntRes[i] + " ";
		}

	};

	//create intervals of retrograde row
	for (var i = 0; i < (trReverse.length-1); i++) {

		//determine direction of pitch movement
		if(trReverse[i] < trReverse[i+1])
		{
			//positive
			humanIndex = trReverse[i+1] - trReverse[i];
			rhumanIntRes[i] =  " + " + humanInt[humanIndex] + " ";

		}
		else
		{
			//negative
			humanIndex = trReverse[i] - trReverse[i+1];
			rhumanIntRes[i] = humanInt[humanIndex];
			rhumanIntRes[i] = " - " + rhumanIntRes[i] + " ";
		}

	};


	//create pitch change array for prime array
	for (i = 0; i<11; i++){

		//pitchdiff assigned as the difference between two adjacent pitches in the prime row
		pitchdiff[i] = primeRow[i]-primeRow[i+1];

		//convert signs
		if(pitchdiff[i] < 0){
			pitchdiff[i] = Math.abs(pitchdiff[i]);
		}
		else
			pitchdiff[i] = -pitchdiff[i];

	};

	//Set to the differences (+/-) between pitches of primeRow[]
	var rpitchdiff = new Array(11);

	//load rpitchdiff with differences between elements of primeRow
	for (i = 0; i<11; i++){
		rpitchdiff[i] = trReverse[i]-trReverse[i+1];

		//convert signs
		if(rpitchdiff[i] < 0){
			rpitchdiff[i] = Math.abs(rpitchdiff[i]);
		}
		else
			rpitchdiff[i] = -rpitchdiff[i];

	};

	//Build retrograde pitch row
	retrow.unshift(0);

	for (i = 0; i < 12; i++){

		if (i != 11){
			retrow[i+1] = retrow[i] + rpitchdiff[i];
		}

		if(retrow[i] < 0){
			retrow[i] = 12-Math.abs(retrow[i]);
		}
		else
			if (retrow[i] > 11){
				retrow[i] = retrow[i]%11;
			}
			else
				retrow[i] = retrow[i];
	};
	
	document.getElementById("rowResult").innerHTML = primeRow;
	//document.getElementById("pitchdiff").innerHTML = pitchdiff;
	//document.getElementById("rpitchdiff").innerHTML = rpitchdiff;
	//document.getElementById("retrowResult").innerHTML = retrow;
	document.getElementById("rowIntResult").innerHTML = humanIntRes;
	//document.getElementById("rRowIntResult").innerHTML = rhumanIntRes;

	//document.getElementById("icVect").innerHTML = icVector;
}


$(document).ready(function() {

	$('#thebutton').on('click', function() {
		rowGen();
	});
});