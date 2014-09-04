// Contact Form Validation
//
//
//
// Made by IDM, @idmccunn

(function() {
	'use strict';

	// Regular Expression Qualifiers
	var RX_NAME,
		RX_ADDR,
		RX_SUBJ,
		RX_MSG;

	function init() {

		var fName, fAddr, fSubject, fMsg;
		var goodToGo = false;

		document.getElementById('contactSubmit').addEventListener('click', function(e) {
			e.preventDefault();
			fName = document.getElementById('formName').value;
			fAddr = document.getElementById('formAddr').value;
			fSubject = document.getElementById('formSubject').value;
			fMsg = document.getElementById('formMsg').value;

			goodToGo = validateAllFields(fName, fAddr, fSubject, fMsg);

		});

		return goodToGo;
	}

	function validateAllFields(n, a, s, m) {
		return validateName(n) && validateEAddr(a) && validateSubj(s) && validateMsg(m);

	}

	function validateName(n) {
		// check form value against RegEx

		// if Error, indicate in DOM

	}

	function validateEAddr(a) {

	}

	function validateSubj(s) {

	}

	function validateMsg(m) {

	}


})();