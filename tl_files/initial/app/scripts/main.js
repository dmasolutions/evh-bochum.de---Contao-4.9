$( document ).ready(function() {
	'use strict';

	//Storage

	if (JSON.parse(localStorage.getItem( 'accessible' ))) {
		var accessible = JSON.parse(localStorage.getItem( 'accessible' ));
	} else {
		var accessible = {'contrast':false,'fontsize':'1','images':true};
	}

	if (accessible.contrast) {
		$('body').addClass( 'accessible' );
	} else {
		$('body').removeClass( 'accessible' );
	}

	if (accessible.images === false) {
		$('figure.titleimage').addClass( 'toggle' );
	}
	
	switch(accessible.fontsize) {
		case '0':
			$('body').addClass('font-small');
			break;
		case '1':
			$('body').addClass('font-medium');
			break;
		case '2':
			$('body').addClass('font-large');
			break;
		default:
			$('body').addClass('font-medium');
			break;
	}
	
	//Accessible

	$('.contrast').click(function() {
		if ( accessible.contrast ) {
			$('body').removeClass( 'accessible' );
			accessible.contrast = false;
			localStorage.accessible = JSON.stringify(accessible);
		} else {
			$('body').addClass( 'accessible' );
			accessible.contrast = true;
			localStorage.accessible = JSON.stringify(accessible);
		}
	});

	$('.trigger-font-small').click(function() {
		$('body').removeClass('font-large');
		$('body').removeClass('font-medium');
		$('body').addClass('font-small');
		accessible.fontsize = '0';
		localStorage.accessible = JSON.stringify(accessible);
	});


	$('.trigger-font-medium').click(function() {
		$('body').removeClass('font-small');
		$('body').removeClass('font-large');
		$('body').addClass('font-medium');
		accessible.fontsize = '1';
		localStorage.accessible = JSON.stringify(accessible);
	});

	$('.trigger-font-large').click(function() {
		$('body').removeClass('font-small');
		$('body').removeClass('font-medium');
		$('body').addClass('font-large');
		accessible.fontsize = '2';
		localStorage.accessible = JSON.stringify(accessible);
	});

	//TopBar
	$('.topbarTrigger').click(function() {
		$('#topbar-off').toggleClass( 'toggle' );
		$('#topbar').toggleClass( 'toggle' );
	});

	$('.quicklinks').click(function() {
		$('#topbar-off').toggleClass( 'toggle' );
		$('#topbar').toggleClass( 'toggle' );
	});

	// First Visit

	if (localStorage.getItem('fv') != 1) {
		$('#topbar-off').removeClass( 'toggle' ).delay(2000).addClass('toogle');
		$('#topbar').removeClass( 'toggle' ).delay(2000).addClass('toogle');

		localStorage.fv = 1;
	}
	
	//MobileNav

	$('.mobileNavTrigger').click(function() {
		//$('.mobileNavCage').toggleClass('active');
		$('.mobileNavTrigger').toggleClass('active');
		$('#offCanvas').toggleClass('active');
	});

	//MobileQuicklinkstrigger

	$('.quicklinksTrigger').click(function() {
		$('#offCanvas').find('.quicklinks').toggleClass('toggle');
		$('.quicklinksTrigger').toggleClass('toggle');
	});

	//MobileMainNav

	var dom = {
		mobileMainNav: $('#mobileMainNav'),
		dive: $('a.dive'),
		backBtn: $('a#backBtn')
	}

	var navLevel = 1;
	var backBtnStatus = false;

	showLevel(navLevel);

	dom.mobileMainNav.find('a.submenu').wrap('<div class="floatWrap"></div>')
	dom.mobileMainNav.find('a.submenu').after('<a class="dive">>></a><div style="clear: both"></div>');
	dom.mobileMainNav.find('li.submenu').addClass('dive');
	dom.mobileMainNav.find('ul.level_1').before('<a class="backBtn" id="backBtn">Zurück</a>');
	dom.mobileMainNav.find('ul.level_1').addClass('active');
	dom.mobileMainNav.find('a.backBtn').hide();

	$('a.dive').click(function(){

		navLevel = navLevel + 1;
		showLevel(navLevel);
		showBackBtn(navLevel);
		$(this).parent().next('ul.level_'+navLevel).addClass('active');
		$(this).parents('ul').removeClass('active');
		$(this).parents('ul').addClass('tail');
		$(this).parents('li.dive').addClass('tail');
	});

	$('#backBtn').click(function(){

		dom.mobileMainNav.find('ul.tail.level_'+(navLevel-1)).addClass('active');
		dom.mobileMainNav.find('ul.tail.level_'+(navLevel-1)).removeClass('tail');
		dom.mobileMainNav.find('ul.level_'+navLevel).removeClass('active');
		dom.mobileMainNav.find('ul.level_'+(navLevel-1)).find('li.tail').removeClass('tail');

		navLevel = navLevel - 1;
		showLevel(navLevel);
		showBackBtn(navLevel);

		console.log(navLevel);
	});

	function showBackBtn(navLevel) {
	       
	    if (navLevel >= 2 && backBtnStatus == false){
	        backBtnStatus = true;
	        $('#backBtn').show();
	    } else if (navLevel == 1 && backBtnStatus == true){
	        backBtnStatus = false;
	        $('#backBtn').hide();
	    }
	}

	function showLevel(navLevel) {
		$('#mobileMainNav').addClass('showLevel_'+navLevel);
		$('#mobileMainNav').removeClass('showLevel_'+(navLevel-1));
		$('#mobileMainNav').removeClass('showLevel_'+(navLevel+1));
	}

	//$('.scroll-pane').jScrollPane({contentWidth: window.innerWidth});

	//Coverpicture Toogle
	$('.titleimage-toggle').click(function() {
		if (accessible.images) {
			accessible.images = false;
			localStorage.accessible = JSON.stringify(accessible);
			$('figure.titleimage').addClass( 'toggle' );
		} else {
			accessible.images = true;
			localStorage.accessible = JSON.stringify(accessible);
			$('figure.titleimage').removeClass( 'toggle' );
		}
	});

	//SVGMAGIC
	$('.svg').svgmagic();
	$('a#logo').svgmagic();

	//ARTICLENAV

	var articlenav = $(".articlenav");
	
	$(function() {
		var articlenav = $(".articlenav");
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			var articleNavVerticalPosition = scroll - 400;
		
			if (scroll >= 400) {
				articlenav.css("top", articleNavVerticalPosition);
			} else {
				articlenav.css("top", "0");
			}
		});
	});

	//Responsive Tables

	var switched = false;
	var updateTables = function() {
	if (($(window).width() < 767) && !switched ){
	  switched = true;
	  $("table.calendar").each(function(i, element) {
	    splitTable($(element));
	  });
	  return true;
	}
	else if (switched && ($(window).width() > 767)) {
	  switched = false;
	  $("table.calendar").each(function(i, element) {
	    unsplitTable($(element));
	  });
	}
	};

	$(window).load(updateTables);
	$(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
	$(window).on("resize", updateTables);


	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");
		
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

	setCellHeights(original, copy);
	}

	function unsplitTable(original) {
	original.closest(".table-wrapper").find(".pinned").remove();
	original.unwrap();
	original.unwrap();
	}

	function setCellHeights(original, copy) {
		var tr = original.find('tr'),
		    tr_copy = copy.find('tr'),
		    heights = [];

		tr.each(function (index) {
		  	var self = $(this),
		      tx = self.find('th, td');

			tx.each(function () {
			var height = $(this).outerHeight(true);
			heights[index] = heights[index] || 0;
			if (height > heights[index]) heights[index] = height;
			});

		});

		tr_copy.each(function (index) {
			$(this).height(heights[index]);
		});
	}

});
