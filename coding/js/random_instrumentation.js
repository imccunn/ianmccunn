(function() {
	'use strict';

	function Instrument() {
		this.iName;
		this.pitch;
		this.section;
		this.range;

	}

	function InstrumentGroup() {
		this.instruments = [];
	}


	document.getElementById('addInst').addEventListener('click', function(e) {
		
		e.preventDefault();

		var inst = new Instrument();

		inst.iName = document.getElementById('instName').value;
		inst.pitch = document.getElementById('instPitch').value;
		inst.section = document.getElementById('instSect').value;

		console.log(inst.iName + ' : ' + inst.pitch + ' : ' + inst.section);

		instrumentDB.instruments.push(inst);

		document.getElementById('instDB').innerHTML = '';

		for ( var i = 0; i < instrumentDB.instruments.length; i++ ){
			document.getElementById('instDB').innerHTML += '<li>' + instrumentDB.instruments[i].iName + ', ' 
															+ instrumentDB.instruments[i].pitch + ', '
															+ instrumentDB.instruments[i].section + '</li>';
		}

		
		//document.getElementById('instName').focus();
		document.getElementById('instName').select();
		
		
	});

	document.getElementById('logInst').addEventListener('click', function(e) {
		e.preventDefault();
		console.log(instrumentDB.instruments);
	});

	document.getElementById('instName').focus();
	document.getElementById('instName').select();

	var instrumentDB = new InstrumentGroup();


	// ************************ Web Storage ************************
	//
	//
	//

	if(typeof(Storage) !== "undefined") {
    	console.log('storage available')
	} else {
	    console.log('Sorry! No Web Storage support..');
	}
})();