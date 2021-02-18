$(document).ready(function () {

	/* INCLUDE PLUGINS */

	$("input.phone-mask").mask("+7 (999) 999-99-99");
	$("input.date-mask").mask("99-99-9999");
	$("input.time-mask").mask("99 99");
	$("input.short-date-mask").mask("99-99");

	$('input[type="checkbox"], input[type="radio"], select').styler({
		selectSearch: true
	});

	$(".fb").fancybox({
		touch: false
	});

	$(".draggable").draggable();



	/* 
		DATE RANGE
		docs: http://t1m0n.name/air-datepicker/docs/index-ru.html 
	*/


	$('.date-range').each(function () {
		var dateRange = $(this);
		var datepicker = $(this).find('.range-datepicker');

		datepicker.datepicker({
			startDate: new Date(),
			multipleDatesSeparator: '-',
			dateFormat: 'dd.mm.yy',
			autoClose: true,
			onSelect: function (formattedDate, date, inst) {
				dateRange.addClass('active');

				var rDate = formattedDate.split('-');
				dateRange.find('.date-start').val(rDate[0]);

				if (rDate[1]) {
					dateRange.find('.date-finish').val(rDate[1]);

					var dlTitle = dateRange.closest('.drop-list').find('.drop-list__title');

					dateRange.closest('.drop-list').find('.dl-dropdown__item').removeClass('active');

					if (dateRange.data('close-dropdown')) {
						$('.drop-list__dropdown').hide();
						$('.drop-list').removeClass('open');
					}

					if (dateRange.closest('.drop-list').data('title-replace')) {
						dlTitle.html(formattedDate);
					}
				}
			}
		});
	});



	/* BASE FUNCTION */

	$(".js-goto").on("click", function () {
		var scroll = 0;
		scroll = $($(this).attr("href")).offset().top - 20;
		$("html, body").animate({
			scrollTop: scroll
		}, 1000);
		return false;
	});


	$(".js-next-toggle").on("click", function () {
		$(this).toggleClass('open');
		$(this).next().slideToggle();
		return false;
	});

	$(".js-open-search-form").on("click", function () {
		$('.search').addClass('open');
		$('.search__text').focus();
		return false;
	});

	$("html").on("click touchstart", function () {
		$('.search').removeClass('open');
	});

	$(".search").on("click touchstart", function (event) {
		event.stopPropagation();
	});




	/* tabs */

	$('.tabs__header').delegate('.tabs__item:not(.active)', 'click', function () {
		$(this).closest('.tabs__header').find('.active').removeClass('active');
		$(this).addClass('active')
			.parents('.tabs').find('.tabs__box').hide().removeClass('visible').eq($(this).index()).show().addClass('visible');
	});



	/* drop select */

	$(".drop-list__title").on("click touchstart", function () {
		var dropList = $(this).closest('.drop-list');

		if (dropList.hasClass('open')) {
			dropList.find('.drop-list__dropdown').hide();
			dropList.removeClass('open');
		} else {
			$('.drop-list__dropdown').hide();
			$('.drop-list').removeClass('open');

			dropList.find('.drop-list__dropdown').show();
			dropList.addClass('open');
		}

		return false;
	});

	$(".dl-dropdown__item").on("click touchstart", function () {
		var dropList = $(this).closest('.drop-list');

		dropList.find('.active').removeClass('active');
		dropList.removeClass('open');
		dropList.find('.drop-list__dropdown').hide();

		$(this).addClass('active');

		if (dropList.data('title-replace')) {
			var title = dropList.find('.drop-list__title');
			title.html($(this).html());
		}

	});

	$("html").on("click touchstart", function () {
		$('.drop-list__dropdown').hide();
		$('.drop-list').removeClass('open');
	});

	$(".drop-list, .datepickers-container").on("click touchstart", function (event) {
		event.stopPropagation();
	});


	$(".toggle-sidebar").on("click", function () {
		var sidebar = $(".sidebar");

		sidebar.toggleClass('open');
		sidebar.addClass('animate-active');

		var minW = "72px";

		if (window.matchMedia('(max-width: 1360px)').matches) {
			minW = "64px";
		}

		if (sidebar.hasClass('open')) {

			sidebar.stop().animate({
				width: "240px"
			}, 300, function () {
				sidebar.removeClass('animate-active');
			});
		} else {
			sidebar.stop().animate({
				width: minW
			}, 300, function () {
				sidebar.removeClass('animate-active');
				sidebar.attr('style', '');
			});
		}
	});




	/* textarea auto height */

	function autoresize(textarea) {
		textarea.style.height = '0px';
		textarea.style.height = (textarea.scrollHeight + 1) + 'px';
	}

	$('.textarea-auto-h').keyup(function () {
		autoresize(this);
	});



	/* faq actions */

	function noanswerCalc() {
		var noanswerCount = $('.faq-item--noanswer').length;

		if (noanswerCount) {
			$('.faq-noanswer-count').text(noanswerCount);
		} else {
			$('.faq-noanswer-count').text('');
		}
	}

	function faqEditClose(obj) {
		obj.closest('.faq-item').removeClass('edit').removeClass('faq-item--noanswer');
	}

	$(".faq-item").on("click", function () {
		$(this).toggleClass('edit');

		return false;
	});

	$(".faq-item__form input").on("click touchstart", function (event) {
		event.stopPropagation();
	});


	$(".faq-form--radio .faq-button").on("click", function () {
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.faq-item').find('.faq-item__answer').text($(this).text());

		faqEditClose($(this));
		noanswerCalc();

		return false;
	});


	$(".faq-form--check .faq-button").on("click", function () {
		$(this).toggleClass('active');

		$(this).find('.faq-item__answer').text('');
		var checkList = '';

		$(this).parent().find('.active').each(function () {
			checkList += '<span>' + $(this).text() + '<span> ';
		});

		$(this).closest('.faq-item').find('.faq-item__answer').html(checkList);

		if (!checkList) {
			$(this).closest('.faq-item').addClass('faq-item--noanswer');
		} else {
			$(this).closest('.faq-item').removeClass('faq-item--noanswer');
		}

		noanswerCalc();

		return false;
	});


	$(".faq-form--date .datepicker-here").datepicker({
		onSelect: function (formattedDate, date, inst) {
			date = formattedDate.split('.');
			day = date[0];
			month = date[1];
			monthText = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');

			inst.$el.closest('.faq-item').find('.faq-item__answer').text(date[0] + ' ' + monthText[parseInt(month) - 1]);
			faqEditClose(inst.$el);

			noanswerCalc();
		}
	});



	/* manager drop list */

	$('.manager-list__title').on("click", function () {
		var managerList = $(this).closest('.manager-list');
		mlDrop = managerList.find('.manager-list__dropdown');
		mlDropPos = managerList.offset();

		mlDrop.show();

		if ($('.page-content').outerHeight() < mlDropPos.top + mlDrop.height() + managerList.height()) {
			mlDrop.addClass('open-top');
		}

		if (managerList.hasClass('open')) {
			managerList.find('.manager-list__dropdown').hide();
			managerList.removeClass('open');
		} else {
			$('.manager-list__dropdown').hide();
			$('.manager-list').removeClass('open');

			managerList.find('.manager-list__dropdown').show();
			managerList.addClass('open');
		}

		return false;
	});

	$("html").on("click touchstart", function () {
		$('.manager-list__dropdown').hide();
		$('.manager-list').removeClass('open');
		$('.manager-list__dropdown').removeClass('open-top');
	});

	$(".drop-list, .datepickers-container").on("click touchstart", function (event) {
		event.stopPropagation();
	});


	$(".ml-dropdown__item").on("click touchstart", function () {
		var managerList = $(this).closest('.manager-list');

		managerList.find('.active').removeClass('active');
		managerList.removeClass('open');
		managerList.find('.manager-list__dropdown').hide();

		$(this).addClass('active');

		managerList.find('.manager-list__title').html($(this).html());

		console.log($(this).html());
	});



	/* email drop list */

	$('.email-list__title').on("click", function () {
		var managerList = $(this).closest('.email-list');
		mlDrop = managerList.find('.email-list__dropdown');
		mlDropPos = managerList.offset();

		mlDrop.show();

		if (managerList.hasClass('open')) {
			managerList.find('.email-list__dropdown').hide();
			managerList.removeClass('open');
		} else {
			$('.email-list__dropdown').hide();
			$('.email-list').removeClass('open');

			managerList.find('.email-list__dropdown').show();
			managerList.addClass('open');
		}

		return false;
	});

	$("html").on("click touchstart", function () {
		$('.email-list__dropdown').hide();
		$('.email-list').removeClass('open');
	});

	$(".el-dropdown__item").on("click touchstart", function () {
		var managerList = $(this).closest('.email-list');

		managerList.find('.active').removeClass('active');
		managerList.removeClass('open');
		managerList.find('.email-list__dropdown').hide();

		$(this).addClass('active');

		managerList.find('.email-list__title').html('\
			<div class="email-list-title__name">'+$(this).find('.email-card__name').text()+'</div>\
			<div class="email-list-title__email">'+$(this).find('.email-card__email').text()+'</div>\
		');

		console.log($(this).html());
	});




	/* add new contact */

	function addNewContact(formBox, contactType, contact, comment, type) {

		if (contactType == 'phone') {
			newContact = '\
				<div class="ucard-contacts__item ucard-contact ucard-contact--phone">\
					<div class="ucard-contact__icon fi icon-phone"></div>\
					<div>\
						<div class="ucard-contact__title">' + contact + '</div>\
						<div class="ucard-contact__comment">' + comment + '</div>\
					</div>\
					<button class="ucard-contact__del button-cross fi icon-cross js-contact-remove"></button>\
				</div>\
			';
		} else {
			newContact = '\
				<div class="ucard-contacts__item ucard-contact">\
					<div class="ucard-contact__icon fi icon-mail-plus"></div>\
					<div>\
						<div class="ucard-contact__title">' + contact + '</div>\
						<div class="ucard-contact__comment">' + comment + '</div>\
					</div>\
					<button class="ucard-contact__del button-cross fi icon-cross js-contact-remove"></button>\
				</div>\
			';
		}


		formBox.before(newContact);
	}

	$(document).on("click", ".js-contact-remove", function () {
		$(this).closest('.ucard-contact').remove();
		return false;
	});

	$(".js-add-contact-show").on("click", function () {
		var addForm = $(this).parent().find('.add-contact-form');
		addForm.show();
		$(this).hide();
		addForm.find(".add-contact-form__contact").focus();

		return false;
	});

	$(".js-add-contact-close").on("click", function () {
		var addForm = $(this).closest('.add-contact-form');
		var contact = addForm.find('.add-contact-form__contact').val();
		var comment = addForm.find('.add-contact-form__comment').val();
		var contactType = addForm.data('type');

		if (contact) {
			addNewContact(addForm.closest('.ucard-contacts__action'), contactType, contact, comment);
		}

		addForm.hide();
		addForm.parent().find('.ucard-add').show();
		addForm.find('input').val('');

		return false;
	});

	$("html").on("click touchstart", function () {
		$(".js-add-contact-close").trigger('click');
	});

	$(".add-contact-form").on("click touchstart", function () {
		event.stopPropagation();
	});


	$(".add-contact-form__contact, .add-contact-form__comment").on('keypress', function (e) {
		if (e.which == 13) {
			$(".js-add-contact-close").trigger('click');
		}
	});


	function dateToText(formattedDate, sepor = '.') {
		date = formattedDate.split(sepor);
		day = date[0];
		month = date[1];
		monthText = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');

		return date[0] + ' ' + monthText[parseInt(month) - 1];
	}




	/* task actions */

	$(".task-variant").on("click", function () {

		var type = $(this).data("type");
		var val = $(this).data("val");
		var date = new Date();
		var dateNew = new Date(date);

		if (type == 'time') {
			dateNew.setMinutes(date.getMinutes() + val);
			newVal = dateNew.format("HH:MM");
		}

		if (type == 'date') {

			if (val == 'mon') {
				if (date.getDay()) {
					dateNew.setDate(date.getDate() + 8 - date.getDay())
				} else {
					dateNew.setDate(date.getDate() + 1)
				}
			} else {
				dateNew.setDate(date.getDate() + val);
			}

			newVal = dateNew.format("dd-mm");
		}

		$(this).closest('.task-field').find('.task-field__text').removeClass('error').val(newVal);

		return false;
	});

	$(".js-task-close").on("click", function () {
		var box = $(this).closest('.task-box');
		box.removeClass('open');

		return false;
	});

	$(".js-task-open").on("click", function () {
		var box = $(this).closest('.task-box');

		if (!box.hasClass('setTask')) {
			box.addClass('open');
		}

		return false;
	});


	$(".js-task-remove").on("click", function () {
		var box = $(this).closest('.task-box');
		box.removeClass('setTask');
		box.removeClass('task-box--warning');
		box.find('.task-box__task').html('');

		return false;
	});


	$(".js-task-create").on("click", function () {
		var box = $(this).closest('.task-box');
		var taskForm = $(this).closest('.task-form');
		var time = taskForm.find('.task-form__time').val();
		var date = taskForm.find('.task-form__date').val();

		if (!date || !time) {

			if (!date) {
				taskForm.find('.task-form__time').addClass('error');
			}

			if (!date) {
				taskForm.find('.task-form__date').addClass('error');
			}

		} else {

			box.find('.task-box__task').append('\
				<span>' + dateToText(date, '-') + '</span>\
				<span>' + time + '</span>\
			');

			box.addClass('setTask');

			taskForm.find('.js-task-close').trigger('click');
		}

		return false;
	});


	/* letter */

	$(".js-attachment-remove").on("click", function () {
		var box = $(this).parent().remove();
		return false;
	});


	$(".js-letter-title-clear").on("click", function () {
		$(this).parent().find('.letter-title__text').val('');
		return false;
	});

	$(".letter-tags-box").on("click", function () {
		console.log('sdf');
		$(this).find('input[type="text"]').focus();
		$(this).addClass('focus');
		$('.tag-list').show();
		$(this).closest('.letter-title').addClass('focus');

		return false;
	});

	$(".letter-tags-box input[type=text]").focus(function() {
		
	});

	$('.letter-tags').tagsinput();
	

	$('.letter-tags').on('itemAdded', function(event) {
		$('.letter-editor').addClass('unlock');
		$('.tag-list').hide();
	});
	

	$(".js-add-letter-tag").on("click", function () {
		$(this).addClass('active');
		$('.letter-tags').tagsinput('add', $(this).text());
	});

	$("html").on("click touchstart", function () {
		$('.tag-list').hide();
	});

	$(".tag-list").on("click touchstart", function () {
		event.stopPropagation();
	});

	
	

	/* actions */

	$(".add-to-fav").on("click", function () {
		$(this).toggleClass('active');

		return false;
	});

	$(".hcard-open-message").on("click", function () {
		$(this).parent().find('.hcard-message').toggleClass('open');

		return false;
	});

	$("input").on("focus", function () {
		$(this).removeClass('error');

		return false;
	});

	$(".js-popup-close").on("click", function () {
		$(this).closest('.popup-card').remove();

		return false;
	});



	$(".row-link").on('mousedown', function (e) {

		if (e.which != 3) {

			var link = $(this).data('link');

			if (link) {
				switch (e.which) {
					case 1:
						window.location.href = link;
						break;
					case 2:
						window.open(link, '_blank');
						break;
				}
			} else {
				alert('Для перехда по ссылке впишите её в параметр data-link');
			}
		}
		return true;
	});


	$(".tbl-action").on("mousedown touchstart", function () {
		event.stopPropagation();
	});




	/* player */

	$('.aplayer').each(function (index) {
		var player = $(this).find('audio');
		duration = player.get(0).duration;
		var pButton = $(this).find('.aplayer__button');
		var playhead = $(this).find('.aplayer__playhead');
		var timeline = $(this).find('.aplayer__timeline');

		var timelineWidth = timeline.outerWidth() - playhead.outerWidth();

		pButton.on("click", play);

		player.on("timeupdate", timeUpdate);

		timeline.on("click", function (event) {
			moveplayhead(event);
			player.get(0).currentTime = duration * clickPercent(event);
		});

		function clickPercent(event) {
			return (event.clientX - getPosition(timeline)) / timelineWidth;
		}

		playhead.on('mousedown', mouseDown);
		$(window).on('mouseup', mouseUp);

		var onplayhead = false;

		function mouseDown() {
			onplayhead = true;
			$(window).on('mousemove', moveplayhead);
			player.off('timeupdate', timeUpdate);
		}

		function mouseUp(event) {
			if (onplayhead == true) {
				moveplayhead(event);
				$(window).off('mousemove', moveplayhead);

				player.get(0).currentTime = duration * clickPercent(event);
				player.on('timeupdate', timeUpdate);
			}
			onplayhead = false;
		}

		function moveplayhead(event) {
			var newMargLeft = event.clientX - getPosition(timeline);

			if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
				playhead.width(newMargLeft);
			}
			if (newMargLeft < 0) {
				playhead.width(0);
			}
			if (newMargLeft > timelineWidth) {
				playhead.width(timelineWidth);
			}
		}

		function timeUpdate() {
			var playPercent = timelineWidth * (player.get(0).currentTime / player.get(0).duration);

			playhead.width(playPercent);

			if (player.get(0).currentTime == duration) {
				pButton.removeClass('pause');
				pButton.addClass('play');

				player.closest('.history-card').addClass('play');
			}
		}

		function play() {
			if (player.get(0).paused) {
				player.get(0).play();

				pButton.removeClass('play');
				pButton.addClass('pause');

				player.closest('.history-card').addClass('play');
			} else {
				player.get(0).pause();

				pButton.removeClass('pause');
				pButton.addClass('play');

				player.closest('.history-card').removeClass('play');
			}
		}

		player.on("canplaythrough", function () {
			duration = player.get(0).duration;
		});

		function getPosition(el) {
			return el.get(0).getBoundingClientRect().left;
		}
	});




});