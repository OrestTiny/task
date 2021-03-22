const tabsBtn = document.querySelectorAll('.tabs-btn');
const tabsItems = document.querySelectorAll('.tabs-item');



window.initMap = function () {
    let latInit = +tabsBtn[0].getAttribute('data-lat');
    let lngInit = +tabsBtn[0].getAttribute('data-lng');
    let queryInit = tabsBtn[0].getAttribute('data-query');


    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: latInit, lng: lngInit },
        styles: [{
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#88EAAD"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#88EAAD"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }]
    });



    var marker = new google.maps.Marker({
        map: map,
        scale: 5,
        icon: ' ',


        place: {
            location: { lat: latInit, lng: lngInit },
            query: queryInit

        },


        attribution: {
            source: 'Google Maps JavaScript API',
            webUrl: 'https://developers.google.com/maps/'
        }
    });

    var infoWindow = new google.maps.InfoWindow({
        content: queryInit + ', ' + latInit + ', ' + lngInit
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });

    google.maps.event.addDomListener(window, "load", window.initializeMap);



    tabsBtn.forEach(function (item) {
        item.addEventListener('click', function () {
            let currentBtn = item;
            let tabId = currentBtn.getAttribute('data-tab');
            let lat = +currentBtn.getAttribute('data-lat');
            let lng = +currentBtn.getAttribute('data-lng');
            let query = currentBtn.getAttribute('data-query');
            let currentTab = document.querySelector(tabId);

            if (!currentBtn.classList.contains('active')) {
                tabsBtn.forEach(function (item) {
                    item.classList.remove('active');
                })

                tabsItems.forEach(function (item) {
                    item.classList.remove('active');
                })

                currentBtn.classList.add('active');
                currentTab.classList.add('active');
            }

            map.setCenter({ lat: lat, lng: lng });
            var marker = new google.maps.Marker({
                map: map,
                icon: '../img/4.svg',

                place: {
                    location: { lat: lat, lng: lng },
                    query: query

                },
                attribution: {
                    source: 'Google Maps JavaScript API',
                    webUrl: 'https://developers.google.com/maps/'
                }
            });
        })
    });

    document.querySelector('.tabs-btn').click();


}




gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: "#services", start: 'top top', end: 'bottom bottom', scrub: 1, toggleActions: "play none none reset" } })
    .to('.c', { motionPath: '#p', immediateRender: true, duration: 1 })
    .from('#p', { drawSVG: '0 0' }, 0)





// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
const slider = $('#banner-slider');
var player;
function onYouTubeIframeAPIReady() {
    var ytUrl = [];
    var dataYt = document.querySelectorAll('.banner-slider .item');


    dataYt.forEach(function (el, index) {
        var elData = el.firstElementChild.getAttribute('data-yt');
        ytUrl.push(elData)


        for (let i = 1; i <= index + 1; i++) {
            el.firstElementChild.setAttribute('id', 'player' + i);
        }
    })
    ytUrl.forEach(function (e, i) {
        let a = i + 1;
        player = new YT.Player('player' + a, {
            height: '100%',
            width: '100%',
            videoId: e,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            },
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                enablejsapi: 0,
                fs: 0,
                iv_load_policy: 3,
                playlist: e,
                loop: 1,
                modestbranding: 0,
                '&showinfo': 1,
                rel: 0,
                autohide: 1,
                playsinline: 1,

            },
        });

    })



}



window.playThisVideo = [];

function onPlayerReady(event) {
    const index = event.target.m;
    event.target.mute();
    if (index != 1) {
        event.target.pauseVideo();
    }

    window.playThisVideo[index] = {
        play: function () {
            event.target.playVideo();
        },

        pause: function () {
            event.target.pauseVideo();
        }
    }

}



var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}


var playerState;
function PlayPause() {
    if (playerState == '1') {
        player.pauseVideo();
    }
    else {
        player.playVideo();
    }
}

$(document).ready(function () {







    slider.owlCarousel({
        items: 1,
        nav: true,
        merge: true,
        loop: false,
        margin: 0,
        video: true,
        lazyLoad: true,
        center: true,
        responsive: {
            480: {
                items: 2
            },
            600: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    });



    slider.on('translated.owl.carousel', function (event) {
        const index = event.page.index + 1;
        window.playThisVideo.forEach(function (val, k) {
            if (index != k) {
                val.pause();
            } else {
                val.play();
            }

        });
    });

    function checkPositionNavLine() {
        const st = $(window).scrollTop();

        $('.scroll-check-js').each(function () {
            var th = $(this),
                thTop = th.offset().top,
                index = th.index();

            if (st >= thTop) {
                $('.header nav a').removeClass('active');
                $('.header nav a').eq(index).addClass('active');
            }
        });
    }




    function checkScroll() {
        const st = $(window).scrollTop();
        if (st >= 400) {
            window.playThisVideo.forEach(function (val, k) {
                val.pause();
            });
        } else {
            window.playThisVideo.forEach(function (val, k) {
                const current = $('#banner-slider .owl-item.active').index() + 1;
                if (k == current) {
                    val.play();
                }
            });
        }


    }

    checkScroll();



    var cPNLBool = true;

    $(window).scroll(function (e) {
        checkScroll();
        if (cPNLBool) {
            checkPositionNavLine();
        }
    });

    $('.nav a').click(function () {
        var th = $(this);
        var attribut = th.attr('href');
        var top = $(attribut).offset().top;

        cPNLBool = false;

        $('html').animate({
            scrollTop: top
        }, 500);

        setTimeout(function () {
            $('.header nav a').removeClass('active');
            th.addClass('active');
            cPNLBool = true;
        }, 500);
    });



    $(".gallery").flipping_gallery({
        enableScroll: false,
        autoplay: false
    });

    $(".next").click(function () {
        $(".gallery").flipForward();
        return false;
    });
    $(".prev").click(function () {
        $(".gallery").flipBackward();
        return false;
    });



})





