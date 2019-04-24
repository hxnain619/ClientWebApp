'use strict';

/* 
Orginal Page: http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar 

*/

/* CUSTOM Form Validation */

let DOMStrings = {

	// ******* Text Fields *********

	// Favorite Audio Test Truck
	testTrack: '#testTrack',

	// Favorite Audio Gear Brand
	favBrand: '#favBrand',

	// Favorite Piece of Audio or Gear
	brandBrandOwned: '#brandBrandOwned',

	// Last Audio or Gear buy  
	lastPurchase: '#lastPurchase',

	// Audio or Gear Next Buy
	nextPurchase: '#nextPurchase',

	// Select box
	favMediaFormat: '#favMediaFormat',
	favStream: '#favStream',
	favFileFormat: '#favFileFormat',

	selectBox: '.select--box',
	customSelect: '.custom-select',
	selectSelected: '.select-selected',


	// Next Button
	first: '.first',
	second: '.second',
	third: '.third',
	fourth: '.fourth',
	fifth: '.fifth',
	sixth: '.sixth',
	seventh: '.seventh',
	finalBtn: '.final',
	submitForm: '#postForm',
	finalPrevious: '.finalPrevious',

	// Names
	fName: '#firstName',
	lName: '#lastName',
	email: '#email',
	zipCode: '#zipCode',
	state: '.state',
	selectedState: '.select-selected',
	stateSelect: '.state-select',
	terms: '#agreeTerms',
	termsClass: '.agreeTerms',
	resident: '#resident',
	residentClass: '.resident',

	// Error span messsages
	error1: '.error1',
	error2: '.error2',
	error3: '.error3',
	error4: '.error4',
	error5: '.error5',
	error6: '.error6',
	error7: '.error7',
	error8: '.error8',
	errorFirstName: '.errorFirstName',
	errorLastName: '.errorLastName',
	errorEmail: '.errorEmail',
	errorZipCode: '.errorZipCode',
	errorState: '.errorState',
	errorTerms: '.errorTerms',
	errorResident: '.errorResident',

	// Steps
	step1: '.step1',
	step2: '.step2',
	step3: '.step3',
	step4: '.step4',
	step5: '.step5',
	step6: '.step6',
	step7: '.step7',
	step8: '.step8',
	step9: '.step9',
}

let testTrack = document.querySelector(DOMStrings.testTrack);
let favBrand = document.querySelector(DOMStrings.favBrand);
// let brandBrandOwned = document.querySelector(DOMStrings.brandBrandOwned);
// let lastPurchase = document.querySelector(DOMStrings.lastPurchase);
// let nextPurchase = document.querySelector(DOMStrings.nextPurchase);

let first = document.querySelector(DOMStrings.first);
let second = document.querySelector(DOMStrings.second);
let third = document.querySelector(DOMStrings.third);
let fourth = document.querySelector(DOMStrings.fourth);
let fifth = document.querySelector(DOMStrings.fifth);
let sixth = document.querySelector(DOMStrings.sixth);
let seventh = document.querySelector(DOMStrings.seventh);
let finalBtn = document.querySelector(DOMStrings.finalBtn);
let submitForm = document.querySelector(DOMStrings.submitForm);
let finalPrevious = document.querySelector(DOMStrings.finalPrevious);

let error1 = document.querySelector(DOMStrings.error1);
let error2 = document.querySelector(DOMStrings.error2);
let error3 = document.querySelector(DOMStrings.error3);
let error4 = document.querySelector(DOMStrings.error4);
let error5 = document.querySelector(DOMStrings.error5);
let error6 = document.querySelector(DOMStrings.error6);
let error7 = document.querySelector(DOMStrings.error7);
let error8 = document.querySelector(DOMStrings.error8);
let errorFirstName = document.querySelector(DOMStrings.errorFirstName);
let errorLastName = document.querySelector(DOMStrings.errorLastName);
let errorZipCode = document.querySelector(DOMStrings.errorZipCode);
let errorEmail = document.querySelector(DOMStrings.errorEmail);
let errorState = document.querySelector(DOMStrings.errorState);
let errorTerms = document.querySelector(DOMStrings.errorTerms);
let errorResident = document.querySelector(DOMStrings.errorResident);

// Steps
let step1 = document.querySelector(DOMStrings.step1);
let step2 = document.querySelector(DOMStrings.step2);
let step3 = document.querySelector(DOMStrings.step3);
let step4 = document.querySelector(DOMStrings.step4);
let step5 = document.querySelector(DOMStrings.step5);
let step6 = document.querySelector(DOMStrings.step6);
let step7 = document.querySelector(DOMStrings.step7);
let step8 = document.querySelector(DOMStrings.step8);
let step9 = document.querySelector(DOMStrings.step9);


let selectBox = document.querySelectorAll(DOMStrings.selectBox);
let favMediaFormat = document.querySelectorAll(DOMStrings.favMediaFormat);
let favStream = document.querySelectorAll(DOMStrings.favStream);
let favFileFormat = document.querySelectorAll(DOMStrings.favFileFormat);
let customSelect = document.querySelector(DOMStrings.customSelect);

let fName = document.querySelector(DOMStrings.fName);
let lName = document.querySelector(DOMStrings.lName);
let email = document.querySelector(DOMStrings.email);
let zipCode = document.querySelector(DOMStrings.zipCode);
let state = document.querySelectorAll(DOMStrings.state);
let selectedState = document.querySelector(DOMStrings.selectedState);
let stateSelect = document.querySelector(DOMStrings.stateSelect);
let terms = document.querySelector(DOMStrings.terms);
let termsClass = document.querySelector(DOMStrings.termsClass);
let resident = document.querySelector(DOMStrings.resident);
let residentClass = document.querySelector(DOMStrings.residentClass);

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

let addLoader = () => {
	let load = document.querySelector('.loader-default');
	load.classList.add('is-active');
}

// Previous function in jquery
let proceedToPrevious = () => {

	let previous = document.querySelectorAll('.previous');
	for (let i = 0; i < previous.length; i++) {
		previous[i].addEventListener('click', function () {

			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			previous_fs = $(this).parent().prev();

			//de-activate current step on progressbar & activate previous step
			//	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
			$(".step").eq($("fieldset").index(current_fs)).removeClass("active");
			$(".step").eq($("fieldset").index(previous_fs)).addClass("active");

			//show the previous fieldset
			previous_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale previous_fs from 80% to 100%
					scale = 0.8 + (1 - now) * 0.2;
					//2. take current_fs to the right(50%) - from 0%
					left = ((1 - now) * 50) + "%";
					//3. increase opacity of previous_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'left': left });
					previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		})
	}
}

proceedToPrevious();


let validateTextSteps = (a, b, c, d, e) => {
	first.addEventListener('click', function () {
		if (a.value.length === 0) {
			first.style.border = '1px solid #FF0000';
			error1.textContent = 'Please fill this field';

			//end
		} else {
			error1.textContent = '';
			first.style.backgroundColor = 'rgb(255, 0, 131)'; //pink
			first.style.border = '1px solid #fff';
			step1.style.backgroundColor = 'rgba(102, 159, 59, 0.81)'; //dark green
			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			//activate next step on progressbar using the index of next_fs
			//				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			$(".step1").eq($("fieldset").index(next_fs)).addClass("active");
			//added to fix step opacity
			$(".step1").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'transform': 'scale(' + scale + ')' });
					next_fs.css({ 'left': left, 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});
	second.addEventListener('click', function () {

		if (b.value.length === 0) {

			second.style.border = '1px solid #FF0000';
			error2.textContent = 'Please fill this field';

			//end
		} else {
			error2.textContent = '';
			second.style.backgroundColor = 'rgb(255, 0, 131)'; //pink
			second.style.border = '1px solid #fff';
			step2.style.backgroundColor = 'rgba(102, 159, 59, 0.81)'; //dark green
			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			//activate next step on progressbar using the index of next_fs
			//				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			$(".step2").eq($("fieldset").index(next_fs)).addClass("active");
			//added to fix step opacity
			$(".step2").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'transform': 'scale(' + scale + ')' });
					next_fs.css({ 'left': left, 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});
	sixth.addEventListener('click', function () {

		if (c.value.length === 0) {

			sixth.style.border = '1px solid #FF0000';
			error6.textContent = 'Please fill this field';

			//end
		} else {
			error6.textContent = '';
			sixth.style.backgroundColor = 'rgb(255, 0, 131)'; //pink
			sixth.style.border = '1px solid #fff';
			step6.style.backgroundColor = 'rgba(102, 159, 59, 0.81)'; //dark green
			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			//activate next step on progressbar using the index of next_fs
			//				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			$(".step6").eq($("fieldset").index(next_fs)).addClass("active");
			//added to fix step opacity
			$(".step6").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'transform': 'scale(' + scale + ')' });
					next_fs.css({ 'left': left, 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});
	seventh.addEventListener('click', function () {

		if (d.value.length === 0) {

			seventh.style.border = '1px solid #FF0000';
			error7.textContent = 'Please fill this field';

			//end
		} else {
			error7.textContent = '';
			seventh.style.backgroundColor = 'rgb(255, 0, 131)'; //pink
			seventh.style.border = '1px solid #fff';
			step7.style.backgroundColor = 'rgba(102, 159, 59, 0.81)'; //dark green
			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			//activate next step on progressbar using the index of next_fs
			//				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			$(".step7").eq($("fieldset").index(next_fs)).addClass("active");
			//added to fix step opacity
			$(".step7").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'transform': 'scale(' + scale + ')' });
					next_fs.css({ 'left': left, 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});
	finalBtn.addEventListener('click', function () {

		if (e.value.length === 0) {

			finalBtn.style.border = '1px solid #FF0000';
			error8.textContent = 'Please fill this field';

			//end
		} else {
			error8.textContent = '';
			finalBtn.style.backgroundColor = 'rgb(255, 0, 131)'; //pink
			finalBtn.style.border = '1px solid #fff';
			step8.style.backgroundColor = 'rgba(102, 159, 59, 0.81)'; //dark green
			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			//activate next step on progressbar using the index of next_fs
			//				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			$(".step8").eq($("fieldset").index(next_fs)).addClass("active");
			//added to fix step opacity
			$(".step8").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'transform': 'scale(' + scale + ')' });
					next_fs.css({ 'left': left, 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});

}


let validateSelectBoxStep = (x, y, z) => {
	third.addEventListener('click', function () {

		if (x[0].options && (x[0].options[x[0].selectedIndex].value === 'Choose An Option')) {

			customSelect.style.border = '3px solid #FF0083'; //pink
			third.style.border = '1px solid #FF0000';
			error3.textContent = 'Please choose an option';

		} else {
			error3.textContent = ' ';
			customSelect.style.border = '1px solid #ccc';
			third.style.backgroundColor = '#FF0083'; //pink
			third.style.border = '1px solid #fff';
			step3.style.backgroundColor = 'rgba(102, 159, 59, 0.81)'; //dark green
			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			$(".step3").eq($("fieldset").index(next_fs)).addClass("active");
			//added to fix step opacity
			$(".step3").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'transform': 'scale(' + scale + ')' });
					next_fs.css({ 'left': left, 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});
	fourth.addEventListener('click', function () {
		if (y[0].options && (y[0].options[y[0].selectedIndex].value === 'Select Services')) {
			customSelect.style.border = '3px solid #FF0083'; //pink
			fourth.style.border = '1px solid #FF0000';

			error4.textContent = 'Please choose an option';

		} else {
			error4.textContent = ' ';
			customSelect.style.border = '1px solid #ccc';
			fourth.style.backgroundColor = '#FF0083'; //pink
			fourth.style.border = '1px solid #fff';
			step4.style.backgroundColor = 'rgba(102, 159, 59, 0.81)'; //dark green
			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			//activate next step on progressbar using the index of next_fs
			$(".step4").eq($("fieldset").index(next_fs)).addClass("active");
			//added to fix step opacity
			$(".step4").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'transform': 'scale(' + scale + ')' });
					next_fs.css({ 'left': left, 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});
	fifth.addEventListener('click', function () {
		if (z[0].options && (z[0].options[z[0].selectedIndex].value === 'Select Format')) {
			customSelect.style.border = '3px solid #FF0083'; //pink
			fifth.style.border = '1px solid #FF0000';
			error5.textContent = 'Please choose an option';

		} else {
			error5.textContent = ' ';
			customSelect.style.border = '1px solid #ccc';
			fifth.style.backgroundColor = '#FF0083'; //pink
			fifth.style.border = '1px solid #fff';
			step5.style.backgroundColor = 'rgba(102, 159, 59, 0.81)'; //dark green
			if (animating) return false;
			animating = true;

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			//activate next step on progressbar using the index of next_fs
			//				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			$(".step5").eq($("fieldset").index(next_fs)).addClass("active");
			//added to fix step opacity
			$(".step5").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'transform': 'scale(' + scale + ')' });
					next_fs.css({ 'left': left, 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});
}


let nameFirst = (x) => {
	let letters = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
	if (isNaN(x.value) && x.value !== null && x.value.match(letters)) {
		errorFirstName.textContent = '';
		fName.style.backgroundColor = '#ffffff';
		fName.style.border = '1px solid #ccc';
		return true;
	} else {
		errorFirstName.textContent = 'Please enter a valid First name without numbers';
		//		errorFirstName.style.color = '#FF0000'; //red
		errorFirstName.style.color = 'rgb(255, 0, 131)'; //pink
		fName.style.backgroundColor = '#ffdddd';
		//		fName.style.border = '1px solid #980000';
		fName.style.border = '3px solid rgb(255, 0, 131)'; //pink
		//		submitForm.style.background = '#980000';
		submitForm.style.border = '1px solid #FF0000';
		return false;
	}
}


let nameLast = (x) => {
	let letters = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
	if (isNaN(x.value) && x.value !== null && x.value.match(letters)) {
		errorLastName.textContent = '';
		lName.style.backgroundColor = '#ffffff';
		lName.style.border = '1px solid #ccc';
		return true;
	} else {
		errorLastName.textContent = 'Please enter a valid Last name without numbers';
		//		errorLastName.style.color = '#FF0000'; //red
		errorLastName.style.color = 'rgb(255, 0, 131)'; //pink
		lName.style.backgroundColor = '#ffdddd';
		//		lName.style.border = '1px solid #980000';
		lName.style.border = '3px solid rgb(255, 0, 131)'; //pink
		//		submitForm.style.background = '#980000';
		//		submitForm.style.border = '#980000';
		submitForm.style.border = '1px solid #FF0000';
		return false;
	}
}

let emailDeclare = (e) => {
	let mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
	if (e.value.match(mailFormat)) {
		errorEmail.textContent = '';
		email.style.backgroundColor = '#ffffff';
		email.style.border = '1px solid #ccc';
		return true;
	} else {
		errorEmail.textContent = 'Please enter a valid email address',
			//		errorEmail.style.color = '#FF0000' //red
			errorEmail.style.color = 'rgb(255, 0, 131)'; //pink
		email.style.backgroundColor = '#ffdddd';
		//		email.style.border = '1px solid #980000';
		email.style.border = '3px solid rgb(255, 0, 131)'; //pink
		//		submitForm.style.background = '#980000';
		//		submitForm.style.border = '#980000';
		submitForm.style.border = '1px solid #FF0000';
		return false;
	}
}


let zipCodeDeclare = (x) => {
	let numbers = /^\d{5}(?:[-\s]\d{4})?$/;
	if (x.value.match(numbers)) {
		errorZipCode.textContent = '';
		zipCode.style.border = '1px solid #ccc';
		zipCode.style.backgroundColor = '#ffffff';
		return true;
	} else {
		errorZipCode.textContent = "Please enter your five digit zip code"
		//		errorZipCode.style.color = '#FF0000'; //red
		errorZipCode.style.color = 'rgb(255, 0, 131)'; //pink
		//		zipCode.style.border = '1px solid #980000';
		zipCode.style.border = '3px solid rgb(255, 0, 131)'; //pink
		zipCode.style.backgroundColor = '#ffdddd';
		//		submitForm.style.background = '#980000';
		//		submitForm.style.border = '#980000';
		submitForm.style.border = '1px solid #FF0000';
		return false;
	}
}

let stateDeclare = (x) => {
	for (let i = 0; i < x.length; i++) {
		if (x[i].value === 'Select State:') {
			errorState.textContent = 'Please select your home State';
			//			errorState.style.color = '#FF0000'; //red
			errorState.style.color = 'rgb(255, 0, 131)'; //pink
			//			stateSelect.style.border = '1px solid #980000';
			//			stateSelect.style.border = '1px solid #FF0000'; //Red
			stateSelect.style.border = '3px solid rgb(255, 0, 131)'; //pink
			//			submitForm.style.background = '#980000';
			//			submitForm.style.border = '#980000';
			submitForm.style.border = '1px solid #FF0000';
			return false;
		} else {
			errorState.textContent = '';
			stateSelect.style.border = '1px solid #ccc';
			return true;
		}
	}
}


let agreeToTerms = (x, y) => {
	if (x.checked === true) {
		termsClass.style.border = '1px solid #bbb';
		termsClass.style.background = '#ccc'
		errorTerms.textContent = '';
		return true;
	} else {
		//		termsClass.style.border = '1px solid #980000';
		//		termsClass.style.border = '1px solid #bbbbbb'; //dark grey
		termsClass.style.border = '3px solid rgb(255, 0, 131)'; //pink
		termsClass.style.background = '#ffdddd' //light grey
		errorTerms.textContent = 'Please accept the Terms & Conditions';
		//		errorTerms.style.color = '#FF0000'; //red
		errorTerms.style.color = 'rgb(255, 0, 131)'; //pink
		//		submitForm.style.background = '#980000';
		//		submitForm.style.border =  '1px solid #980000';
		submitForm.style.border = '1px solid #FF0000';
		return false;
	}
}
let agreeToResident = (y) => {
	if (y.checked === true) {
		residentClass.style.border = '1px solid #bbb';
		residentClass.style.background = '#ccc'
		errorResident.textContent = '';
		return true;
	} else {
		//		termsClass.style.border = '1px solid #980000';
		//		termsClass.style.border = '1px solid #bbbbbb'; //dark grey
		residentClass.style.border = '3px solid rgb(255, 0, 131)'; //pink
		residentClass.style.background = '#ffdddd' //light grey
		errorResident.textContent = 'Please enter your residency';
		//		errorTerms.style.color = '#FF0000'; //red
		errorResident.style.color = 'rgb(255, 0, 131)'; //pink
		//		submitForm.style.background = '#980000';
		//		submitForm.style.border =  '1px solid #980000';
		submitForm.style.border = '1px solid #FF0000';
		return false;
	}
}

let concludeInit = () => {
	validateTextSteps(testTrack, favBrand, brandBrandOwned, lastPurchase, nextPurchase)
	validateSelectBoxStep(favMediaFormat, favStream, favFileFormat);
}

concludeInit();

let redirectFromValuesOne = (x) => {
	for (let i = 0; i < x.length; i++) {
		if (x[i].value === 'AK' || x[i].value === 'CO' || x[i].value === 'CT' || x[i].value === 'HI' || x[i].value === 'IA' || x[i].value === 'IL' || x[i].value === 'KY' || x[i].value === 'LA' || x[i].value === 'MS' || x[i].value === 'MI' || x[i].value === 'NV' || x[i].value === 'ME' || x[i].value === 'NH' || x[i].value === 'ND' || x[i].value === 'OK' || x[i].value === 'OR' || x[i].value === 'VT' || x[i].value === 'VA' || x[i].value === 'WV' || x[i].value === 'WY') {
			return true;
		} else {
			return false;
		}
	}
}

let redirectMileageAgeCredit = () => {
	if (vehicleAgeNo.checked === true || mileageNo.checked === true || poor.checked === true) {
		return true
	} else {
		return false
	}
}

let redirectVehicleMake = (x) => {
	for (let i = 0; i < x.length; i++) {
		if (x[i].value === 'Any commercial vehicle' || x[i].value === 'Any diesel Volkswagen' || x[i].value === 'Daewoo' || x[i].value === 'Dodge Neon' || x[i].value === 'Hummer' || x[i].value === 'Isuzu' || x[i].value === 'Saturn' || x[i].value === 'Pontiac' || x[i].value === 'Oldsmobile' || x[i].value === 'Suzuki') {
			return true
		} else {
			return false;
		}
	}
}

// const scriptURL = 'https://script.google.com/macros/s/AKfycbxgD1gpxmsLbSahvWCSJb5VKE2JJ1XHXVrtD6aPX7LikUIAXUQ/exec'

const scriptURL = 'https://script.google.com/macros/s/AKfycbx27M0FyRrClEBKB8YVeMKp4Yd7HkCgkTIBnm4LRdpH7Ufg-j6t/exec'

let complete = () => {

	let form = document.querySelector('form');
	form.addEventListener('submit', e => {
		if ((nameFirst(fName) && nameLast(lName) && emailDeclare(email) && zipCodeDeclare(zipCode) && stateDeclare(state) && agreeToTerms(terms) && agreeToResident(resident)) === true) {

			e.preventDefault();
			addLoader();
			fetch(scriptURL, { method: 'POST', body: new FormData(form) })
				.then(function (response) {
					if (response) {
						window.location.replace('submitSuccess.html');
					}
				})
		} else {
			e.preventDefault();
			nameFirst(fName);
			nameLast(lName);
			emailDeclare(email);
			zipCodeDeclare(zipCode);
			stateDeclare(state);
			agreeToTerms(terms);
			agreeToResident(resident);
		}
	});
}

complete();