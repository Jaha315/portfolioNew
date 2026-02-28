

//--------- Функция появления имени, заголока и описания в блоке Intro
$(function() {
    var $leftItemsName = $('.left_items-upper > h2')
    var $leftItemsTitle = $('.left_items-upper > h1')
    var $leftItemsText = $('.left_items-upper > p')

    setTimeout(function() {
        $leftItemsName.css ({
            "transform": "translateX(0)",
            "opacity": "1"
        });
    }, 350);

    setTimeout(function() {
        $leftItemsTitle.css ({
            "transform": "translateX(0)",
            "opacity": "1"
        });
    }, 550);

    setTimeout(function() {
        $leftItemsText.css ({
            "transform": "translateX(0)",
            "opacity": "1"
        });
    }, 750);
});


//-----------Функция появления ссылок на блоке Intro
$(function() {
    const $introLinks = $('.links li');

   

    for(let i = 0; i < $introLinks.length; i++) {
        setTimeout(function() {
            $introLinks.eq(i).css ({
                "transform": "scale(1)",
                "opacity": "1"
            });

        }, i * 400);
    }


});

$(function() {
    const $introImg = $('.intro_right > img');

    setTimeout(function() {
        $introImg.fadeIn(2350);
    }, 150);
    
});


//---------Анимации появления
$(function() {
    // Добавляем классы элементам
    $('h2').addClass('scroll-fade-up');

    function checkVisibility() {
        var windowHeight = $(window).height();
        var scrollPosition = $(window).scrollTop();

        // Анимация для элементов с классом scroll-fade-up
        $('.scroll-fade-up').each(function(index) {
            var $element = $(this);
            var elementTop = $element.offset().top;

            if (scrollPosition > elementTop - windowHeight + 70) {
                setTimeout(function() {
                    $element.css({
                        'opacity': '1',
                        'transform': 'translateY(0)'
                    });
                }, 100);
            } else {
                setTimeout(function() {
                    $element.css({
                        'opacity': '0',
                        'transform': 'translateY(30px)'
                    });
                }, index * 50);
            }
        });

        // Анимация для элементов с классом scroll-slide-left
        $('.scroll-slide-left').each(function(index) {
            var $element = $(this);
            var elementTop = $element.offset().top;

            if (scrollPosition > elementTop - windowHeight + 70) {
                setTimeout(function() {
                    $element.css({
                        'opacity': '1',
                        'transform': 'translateX(0)'
                    });
                }, index * 100);
            } else {
                setTimeout(function() {
                    $element.css({
                        'opacity': '0',
                        'transform': 'translateX(-50px)'
                    });
                }, index * 50);
            }
        });

        $('.scroll-slide-right').each(function(index) {
            var $element = $(this);
            var elementTop = $element.offset().top;

            if(scrollPosition > elementTop - windowHeight + 70) {
                setTimeout(function() {
                    $element.css({
                        'opacity': '1',
                        'transform': 'translateX(0)'
                    });
                }, index * 100);
            } else {
                setTimeout(function() {
                    $element.css({
                        'opacity': '0',
                        'transform': 'translateX(50px)'
                    }, index * 50);
                })
            }
        });

        // Анимация для элементов с классом scroll-slide-left
        $('.slide-inBig').each(function(index) {
            var $element = $(this);
            var elementTop = $element.offset().top;

            if (scrollPosition > elementTop - windowHeight + 70) {
                setTimeout(function() {
                    $element.css({
                        'opacity': '1',
                        'transform': 'scale(1)'
                    });
                }, index * 100);
            } else {
                setTimeout(function() {
                    $element.css({
                        'opacity': '0',
                        'transform': 'scale(0)'
                    });
                }, 50);
            }
        });

    }

    $(window).on('scroll', function() {
        checkVisibility();
    });

    checkVisibility();
});