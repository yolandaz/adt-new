// set up youtube player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var paused = false;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        width: '1920',
        height: '1080',
        playerVars: {
            listType: 'playlist',
            list: 'PLW0xC9CIbqVP4bl9NUF3w33uOzpmW8ieP',
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            loop: 1,
            showinfo: 0,
            rel: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

function toggleMute() {
    $("#mute").removeClass("icon-volume-mute icon-volume-mute2");
    if (player.isMuted()) {
        player.unMute();
        $("#mute").addClass("icon-volume-mute");
    } else {
        player.mute();
        $("#mute").addClass("icon-volume-mute2");
    }
}

function togglePause() {
    $("#pause").removeClass("icon-pause2 icon-play3");
    if (paused) {
        player.playVideo();
        $("#pause").addClass("icon-pause2");
        paused = false;
    } else {
        player.pauseVideo();
        $("#pause").addClass("icon-play3");
        paused = true;
    }
}

function onPlayerStateChange(event) {
    // hide text until player loads
    if (event.data == YT.PlayerState.PLAYING) {
        $(".hide-load").css("opacity", 1);
    }
}

function onPlayerReady(event) {
    // mute player, set watch link, set mute toggle
    player.mute();
    $("#watch").attr("href", player.getVideoUrl());
    $("#mute").click(toggleMute);
    $("#pause").click(togglePause);

    // make youtube player correct size
    $(window).on("resize", function () {
        var $player = $("#player");
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        if (windowWidth / windowHeight > 16 / 9) {
            $player.width(windowWidth);
            var playerHeight = 9 * windowWidth / 16;
            $player.height(playerHeight);
            var marginTop = (windowHeight - playerHeight) / 2;
            $player.css('margin-left', 0);
            $player.css('margin-top', marginTop+'px');
        } else {
            var playerWidth = 16 * windowHeight / 9;
            $player.width(playerWidth);
            $player.height(windowHeight);
            var marginLeft = (windowWidth - playerWidth) / 2;
            $player.css('margin-top', 0);
            $player.css('margin-left', marginLeft+'px');
        }
    }).resize();
}
