  (function(){
    var 
      init = function() {
          setup_listener();

      } ;
    setup_listener = function () {
        $('.call-client__comment-list-item').on('click', function () {

            $('.call-client__comment textarea').val($(this).text());
        });
        function textarea_resize(event, line_height, min_line_count)
        {
            var min_line_height = min_line_count * line_height;
            var obj = event.target;
            var div = document.getElementById(obj.id + '_div');
            div.innerHTML = obj.value;
            var obj_height = div.offsetHeight;
            if (event.keyCode == 13)
                obj_height += line_height;
            else if (obj_height < min_line_height)
                obj_height = min_line_height;
            obj.style.height = obj_height + 'px';
        }
        var now = moment();
        moment.lang('ru');
        var div = $('.tbl-active');
        $('.anketa__but--js').on('click', function () {
            $('.anketa__popup--js').show();
        });
        $('.anketa__block-item').on('click', function () {
            var $this = $(this);
            $this.closest('.anketa__block').find('.anketa__block-item').removeClass('select');
            $this.addClass('select');
        });
        $('.close_add_can--js').on('click', function () {
            $('.popup_right').removeClass('right-open');
        });
        $('.add_client--js').on('click', function (e) {
            e.preventDefault();
            $('.popup_right').addClass('right-open');
        });
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var div = $(".popup_right"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                div.removeClass('right-open'); // скрываем его
            }
        });
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var div = $(".time-insert"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                div.remove(); // скрываем его
            }
        });
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var div = $(".popup, .datepickers-container"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $(".popup").hide(); // скрываем его
            }
        });
        div.each(function (index,element) {
            var elem = $(element).children('button'),
                count = elem.length;
            if(count ==1){
                elem.css('background','#D4DFF3')
            }
            if(count ==2){
                elem.css('background','#9EB5D4')
            }
            if(count ==3){
                elem.css('background','#567397')
            }
        });
        var popup = $('.popup__write--js');
        var x;
        var y;
        $('.rasp-tbl').on('click','.rasp__time_main',function (e) {
            var block = $(this).closest('tr').find('.rasp__block');
            block.each(function () {
                var complete = $(this).find('.rasp-item').attr('data-complete');
                if(complete !== 'true'){
                    var time = $(this).closest('.rasp__row').find('.rasp__time').text();
                    var time1 = time.slice(0,-3);
                    var time2 = ':20',
                        time3= ':40';
                    time2 = time1 + time2;
                    time3 = time1 + time3;
                    var times = '<div class="time-insert"> <div class="time-insert__item">'+time+'</div> <div class="time-insert__item">'+time2+'</div> <div class="time-insert__item">'+time3+'</div> </div>';
                    $(this).html(times);
                    $(this).find('.rasp-item').data('complete', 'true');
                }
            });

        });
        $('.rasp-tbl').on('click','.rasp__block',function (e) {
            var complete = $(this).find('.rasp-item').attr('data-complete');
            if(complete !== 'true'){
                var time = $(this).closest('.rasp__row').find('.rasp__time').text();
                     var time1 = time.slice(0,-3);
                     var time2 = ':20',
                         time3= ':40';
                time2 = time1 + time2;
                time3 = time1 + time3;
                var times = '<div class="time-insert"> <div class="time-insert__item">'+time+'</div> <div class="time-insert__item">'+time2+'</div> <div class="time-insert__item">'+time3+'</div> </div>';
                $(this).html(times);
                $(this).find('.rasp-item').data('complete', 'true');
            }
        });
        $('body').on('click','.perenos__ok--js',function (e) {
            var $this = $(this);
            var vr = $this.closest('.popup__wrap').find('.jq-selectbox__select-text').text();
            var block = $this.closest('.rasp-item');
            block.addClass('perenos');
            block.find('.rasp-item__vac').text('Перенесено '+now.format('DD.MM')+' в');
            var date = $this.closest('.popup__wrap').find('.popup__date input').val();
            var date2 = $this.closest('.popup__wrap').find('.popup__clock input').val();
            date = date.slice(0,-5)
            console.log(date);
            console.log(date2);
            $this.closest('.popup').hide();
            block.find('.rasp-item__hr-name').text(now.format('hh:mm')+' на '+date+', '+date2);
        });
        $('body').on('click','.cancel__ok--js',function (e) {
            var $this = $(this);
            var vr = $this.closest('.popup__wrap').find('.jq-selectbox__select-text').text();
            var block = $this.closest('.rasp-item');
            block.addClass('perenos');
            block.find('.rasp-item__vac').text(vr);
            date = now.format('DD.MM в hh:mm');
            block.find('.rasp-item__hr-name').text(date);
            $this.closest('.popup').hide();
        });
        $('body').on('click','.write__ok--js',function (e) {
            var time = popup.attr("data-time"),
                name = $('.name--js').find('.jq-selectbox__select-text').text(),
                vac = $('.vac--js').find('.jq-selectbox__select-text').text(),
                intervier = $('.intervier--js').find('.jq-selectbox__select-text').text(),
                block = '<div class="rasp-item" data-complete="true"><a class="rasp-item__left" href="#">\n' +
                    '        <div class="rasp-item__info">\n' +
                    '            <div class="rasp-item__name">'+name+'</div>\n' +
                    '            <div class="rasp-item__vac">'+vac+'</div>\n' +
                    '            <div class="rasp-item__hr-name">'+intervier+'</div>\n' +
                    '        </div>\n' +
                    '        <div class="rasp-item__photo"><img src="assets/img/new/img.png" /></div>\n' +
                    '    </a>\n' +
                    '    <div class="rasp-item__menu">\n' +
                    '        <div class="rasp-menu"><img class="rasp-menu__img" src="assets/img/new/dots.svg" /></div>\n' +
                    '        <div class="rasp-item__cebab">\n' +
                    '            <div class="rasp-cebab">\n' +
                    '                <div class="rasp-cebab__li"><a class="phone-icon__right" href="#">Позвонить</a></div>\n' +
                    '                <div class="rasp-cebab__li"><a class="perenos--js" href="#">Перенести интервью</a></div>\n' +
                    '                <div class="rasp-cebab__li"><a class="cancel--js" href="#"> Отменить интервью</a></div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div class="popup-card popup popup__cancel--js">\n' +
                    '        <div class="popup__wrap">\n' +
                    '            <div class="popup__head">Отмена интервью</div>\n' +
                    '            <div class="popup__manager">Константинопольский Константин</div>\n' +
                    '            <div class="popup__vac">Менеджер по продажам</div>\n' +
                    '            <div class="popup__name"><select data-placeholder=" ">\n' +
                    '                    <option>Инициатива кандидата</option>\n' +
                    '                    <option>Не прошел собеседование</option>\n' +
                    '                    <option>Отказ от hr</option>\n' +
                    '                </select></div>\n' +
                    '            <div class="popup__button"><button class="button perenos__ok perenos__ok--js">Сохранить изменения</button></div>\n' +
                    '        </div><button class="popup-card__close button-cross fi icon-cross popup-close--js"></button>\n' +
                    '    </div>\n' +
                    '    <div class="popup-card popup popup__perenos--js">\n' +
                    '        <div class="popup__wrap">\n' +
                    '            <div class="popup__head">Перенос интервью</div>\n' +
                    '            <div class="popup__name"><select data-placeholder=" ">\n' +
                    '                    <option>Никольский Илья</option>\n' +
                    '                    <option>Никольский Илья</option>\n' +
                    '                    <option>Никольский Илья</option>\n' +
                    '                </select></div>\n' +
                    '            <div class="popup__time">\n' +
                    '                <div class="popup__date"><input class="forms__date datepicker-here popup__input" type="text" value="" placeholder="дд-мм-гггг" maxlength="10" data-auto-close="true" /></div>\n' +
                    '                <div class="popup__clock"><input class="popup__clock-input popup__input clock-input" /></div>\n' +
                    '            </div>\n' +
                    '            <div class="popup__button"><button class="button perenos__ok perenos__ok--js">Сохранить изменения</button></div>\n' +
                    '        </div><button class="popup-card__close button-cross fi icon-cross popup-close--js"></button>\n' +
                    '    </div>\n' +
                    '</div>';

            var itemY = $('tbody').find('tr').eq(y);
                itemY = itemY.find('th').eq(x).find('.rasp__block');
            var tr = $('tbody').find('tr');
            if(time.slice(3) == '00'){
                itemY.html(block);
            }
            else{
                tr.each(function (index, domElem) {
                    var elem = tr.eq(index).find('.rasp__time').text();
                    if(elem == time){
                        itemY.html('');
                        tr.eq(index).find('th').eq(x).find('.rasp__block').html(block);
                    }
                });
            }

            $('input[type="checkbox"], input[type="radio"], select').styler({
                selectSearch: true
            });
            popup.hide();
        });
        $('.rasp-tbl').on('click','.time-insert__item',function (e) {
            $this = $(this);
            popup.attr("data-time", $this.text());
            x = $this.closest('th').index();
            y = $this.closest('tr').index();
            popup.show();
        });


        $('body').on('click','.perenos--js',function (e) {
            e.preventDefault();
            $(this).closest('.rasp-item').find('.popup__perenos--js').show();
        });
        $('body').on('click','.cancel--js',function (e) {
            e.preventDefault();
            $(this).closest('.rasp-item').find('.popup__cancel--js').show();
        });
        $("input.clock-input").mask("99:99");



        $('.edit__ok--js').on('click',function () {
            $('.edit-popup__ok').show();
            // setTimeout(function () {
            //     $('.edit-popup__ok').hide();
            // },2000)
        });
        $('body').on('click','.popup-close--js',function () {
            $(this).closest('.popup-card').hide();
            // setTimeout(function () {
            //     $('.edit-popup__ok').hide();
            // },2000)
        });

        var intervier = $('.active__inter--js'),
            intervierItem = $('.active__inter--js'),
            intervierAll = $('.inii__inter--js'),
            intervierAllItem = $('.inii__inter--js'),
            butInter = $('.interwiew__trans--js');
        intervierAllItem.on('click','.forms-todo',function () {
            $(this).toggleClass('selected');
        });
        butInter.on('click',function () {
            var rep = intervierAll.find('.selected');
            rep.removeClass('selected');
            intervier.append(rep);
        });
        intervierItem.on('click','.forms-todo',function(){
            var rep = $(this);
            intervierAll.append(rep);

        });

// audio
        var divs = document.querySelectorAll('.calls-audio');
        divs.forEach(function(el){
            // var children = el.children;
            var audioPlayer = el.querySelector('.green-audio-player');

        var close = audioPlayer.querySelector('.audio__close');
        var playPause = audioPlayer.querySelector('.playPause');
        var playpauseBtn = audioPlayer.querySelector('.play-pause-btn');
        var loading = audioPlayer.querySelector('.loading');
        var progress = audioPlayer.querySelector('.progress');
        var sliders = audioPlayer.querySelectorAll('.slider');
        var volumeBtn = audioPlayer.querySelector('.volume-btn');
        var volumeControls = audioPlayer.querySelector('.volume-controls');
        var volumeProgress = volumeControls.querySelector('.slider .progress');
        var player = audioPlayer.querySelector('audio');
        var currentTime = audioPlayer.querySelector('.current-time');
        var totalTime = audioPlayer.querySelector('.total-time');
        var speaker = audioPlayer.querySelector('.speaker');

        var draggableClasses = ['pin'];
        var currentlyDragged = null;

        window.addEventListener('mousedown', function(event) {

            if(!isDraggable(event.target)) return false;

            currentlyDragged = event.target;
            let handleMethod = currentlyDragged.dataset.method;

            this.addEventListener('mousemove', window[handleMethod], false);

            window.addEventListener('mouseup', () => {
                currentlyDragged = false;
                window.removeEventListener('mousemove', window[handleMethod], false);
            }, false);
        });

        close.addEventListener('click', function () {
            el.classList.remove('visible');
            playPause.attributes.d.value = "M18 12L0 24V0";
            player.pause();
        });
        playpauseBtn.addEventListener('click', togglePlay);
        player.addEventListener('timeupdate', updateProgress);
        player.addEventListener('volumechange', updateVolume);
        player.addEventListener('loadedmetadata', () => {
            totalTime.textContent = formatTime(player.duration);
        });
        player.addEventListener('canplay', makePlay);
        player.addEventListener('ended', function(){
            playPause.attributes.d.value = "M18 12L0 24V0";
            player.currentTime = 0;
        });

        volumeBtn.addEventListener('click', () => {
            volumeBtn.classList.toggle('open');
            volumeControls.classList.toggle('hidden');
        })

        window.addEventListener('resize', directionAware);

        sliders.forEach(slider => {
            let pin = slider.querySelector('.pin');
            slider.addEventListener('click', window[pin.dataset.method]);
        });

        directionAware();

        function isDraggable(el) {
            let canDrag = false;
            let classes = Array.from(el.classList);
            draggableClasses.forEach(draggable => {
                if(classes.indexOf(draggable) !== -1)
                    canDrag = true;
            })
            return canDrag;
        }

        function inRange(event) {
            let rangeBox = getRangeBox(event);
            let rect = rangeBox.getBoundingClientRect();
            let direction = rangeBox.dataset.direction;
            if(direction == 'horizontal') {
                var min = rangeBox.offsetLeft;
                var max = min + rangeBox.offsetWidth;
                if(event.clientX < min || event.clientX > max) return false;
            } else {
                var min = rect.top;
                var max = min + rangeBox.offsetHeight;
                if(event.clientY < min || event.clientY > max) return false;
            }
            return true;
        }

        function updateProgress() {
            var current = player.currentTime;
            var percent = (current / player.duration) * 100;
            progress.style.width = percent + '%';

            currentTime.textContent = formatTime(current);
        }

        function updateVolume() {
            volumeProgress.style.height = player.volume * 100 + '%';
            if(player.volume >= 0.5) {
                speaker.attributes.d.value = 'M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z';
            } else if(player.volume < 0.5 && player.volume > 0.05) {
                speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z';
            } else if(player.volume <= 0.05) {
                speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667';
            }
        }

        function getRangeBox(event) {
            let rangeBox = event.target;
            let el = currentlyDragged;
            if(event.type == 'click' && isDraggable(event.target)) {
                rangeBox = event.target.parentElement.parentElement;
            }
            if(event.type == 'mousemove') {
                rangeBox = el.parentElement.parentElement;
            }
            return rangeBox;
        }

        function getCoefficient(event) {
            let slider = getRangeBox(event);
            let rect = slider.getBoundingClientRect();
            let K = 0;
            if(slider.dataset.direction == 'horizontal') {

                let offsetX = event.clientX - slider.offsetLeft;
                let width = slider.clientWidth;
                K = offsetX / width;

            } else if(slider.dataset.direction == 'vertical') {

                let height = slider.clientHeight;
                var offsetY = event.clientY - rect.top;
                K = 1 - offsetY / height;

            }
            return K;
        }

        function rewind(event) {
            if(inRange(event)) {
                player.currentTime = player.duration * getCoefficient(event);
            }
        }

        function changeVolume(event) {
            if(inRange(event)) {
                player.volume = getCoefficient(event);
            }
        }

        function formatTime(time) {
            var min = Math.floor(time / 60);
            var sec = Math.floor(time % 60);
            return min + ':' + ((sec<10) ? ('0' + sec) : sec);
        }

        function togglePlay() {
            divs.forEach(function(it){
                var audioPlayer = it.querySelector('.green-audio-player');
                var player = audioPlayer.querySelector('audio');
                var playPause = audioPlayer.querySelector('.playPause');
                it.classList.remove('visible');
                if(it !== el){
                    playPause.attributes.d.value = "M18 12L0 24V0";
                    player.pause();
                }

            });
            el.classList.add('visible');
            if(player.paused) {
                playPause.attributes.d.value = "M0 0h6v24H0zM12 0h6v24h-6z";
                player.play();
            } else {
                playPause.attributes.d.value = "M18 12L0 24V0";
                player.pause();
            }
        }

        function makePlay() {
            playpauseBtn.style.display = 'block';
            loading.style.display = 'none';
        }

        function directionAware() {
            if(window.innerHeight < 250) {
                volumeControls.style.bottom = '-54px';
                volumeControls.style.left = '54px';
            } else if(audioPlayer.offsetTop < 154) {
                volumeControls.style.bottom = '-164px';
                volumeControls.style.left = '-3px';
            } else {
                volumeControls.style.bottom = '52px';
                volumeControls.style.left = '-3px';
            }
        }

        });
        // audio

    };
      return init();
  })();


