var CHANNLES_LIST = ["ESL_SC2", "imaqtpie", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var API_URL_TMP = 'https://wind-bow.gomix.me/twitch-api/streams/:stream?callback=?';
var TWITCH_URL = 'https://www.twitch.tv/';

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  $('[data-role="menu"]').hide();
  
  $('[data-role="toggle-menu"]').click(function() {
    toogleMenu();
  });
  
  $('[data-filter]').click(filter);
  
  getAllStreams();
  
});

function filter() {
  if (!$(this).hasClass('filter_selected')) {
    $('.filter_selected').removeClass('filter_selected');
    $(this).addClass('filter_selected');
    switch ($(this).data('filter')) {
      case 'online':
        showOnline();
        break;
      case 'offline':
        showOffline();
        break;
      default:
        showAll();
      }
      closeMenu();
  }
}

function showOnline() {
  $('.stream_offline').hide();
  $('.stream_online').show();
}

function showOffline() {
  $('.stream_offline').show();
  $('.stream_online').hide();
}

function showAll() {
  $('.stream_offline').show();
  $('.stream_online').show();
}

function closeMenu() {
  $('[data-role="menu"]').slideUp(); 
}

function getAllStreams() {
  
  CHANNLES_LIST.forEach(function(streamName) {
    getStream(streamName);
  });
}

function getStream(streamName) {
  
  // Prepare endpoint
  var url = API_URL_TMP.replace(':stream', streamName);
  
  $.getJSON(url).done(function(data) {
    var newStream = null;
    if (data.stream) {
      var link = TWITCH_URL + data.stream.channel.name;
      var previewUrl = data.stream.preview.medium;
      var iconUrl = data.stream.channel.logo;
      var name = data.stream.channel.display_name;
      var game = data.stream.game;
      var status = data.stream.channel.status;
      newStream = makeStream(link, previewUrl, iconUrl, name, game, status);
    } else {
      newStream = makeOfflineStream(streamName);
    }
    
    $(".streams").append(newStream);
    
  }).fail(function( jqxhr, textStatus, error ) {
    // TODO: handle failed request
    $(".error").text(error +' ' + textStatus);
  });
}

function makeOfflineStream(name) {
  var link = TWITCH_URL + name;
  var stream = $('<a/>', {
    href: link,
    class: 'stream stream_offline',
    target: '_blank'
  });
  
  // preview
  stream.append('<div class="stream__preview"><img class="stream__preview-img" src="https://static-cdn.jtvnw.net/ttv-static/404_preview-640x360.jpg" alt="" /></div>');
  
  // info
  stream.append('<div class="stream__info"><div class="stream__logo"><div class="stream__name">'+ name +'</div></div><div class="stream__details"><div class="stream__status stream__status_offline">offline</div></div></div>');
  
  return stream;
}

function makeStream(link, previewUrl, iconUrl, name, game, status) {
  var stream = $('<a/>', {
    href: link,
    class: 'stream stream_online',
    target: '_blank'
  });
  
  // preview
  stream.append('<div class="stream__preview"><img class="stream__preview-img" src="' + previewUrl + '" alt="" /></div>');
  
  // info
  stream.append('<div class="stream__info"><div class="stream__logo"><img class="stream__logo-img" src="'+ iconUrl +'" alt="'+ name +'" /><div class="stream__name">'+ name +'</div><div class="stream__game">Playing <span class="stream__game-name">'+ game +'</span></div></div><div class="stream__details"><div class="stream__status">'+ status +'</div></div></div>');
  
  return stream;
}

function toogleMenu() {
  // $('.header').slideToggle('linear'); 
  // $('.streams-container').slideToggle('linear'); 
  $('[data-role="menu"]').slideToggle(); 
  
}