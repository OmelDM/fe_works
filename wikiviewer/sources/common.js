$(document).ready(function() {
  
  $(".js_search").prop("disabled", true);
  
  $(".js_input").keyup(function(event) {
    if ($(this).val() != '') {
      $(".js_search").prop("disabled", false);
      
      // Check if `Enter` is pressed
      if (event.which === 13) {
          makeSearch();
      }
    } else {
      $(".js_search").prop("disabled", true);
    }
  });
  
  $(".js_search").click(makeSearch);
  
});

function makeSearch() {
  $(".results-container").empty();
  if (!$(".search-container").hasClass("search-container_reduced"))
  {
    $(".search-container").toggleClass("search-container_reduced");
    $(".results-container").toggleClass("results-container_expanded");
  }
  
  var searchedText = $(".js_input").val();
  var query = "https://en.wikipedia.org/w/api.php?action=query&format=json&errorformat=plaintext&prop=extracts&list=&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrsearch=" + searchedText + "&callback=?";
  var baseUrl = "http://en.wikipedia.org/?curid=";
  
  $.getJSON(query, function(data) {
    $.each(data.query.pages, function(key, value) {
      var url = baseUrl + value.pageid;
      var title = '<h3 class="result__title"><a class="link" href="' + url + '" target="_blank">' + value.title + '</a></h3>';
      var text = '<p class="result__description">' + value.extract + '</p>';
      $(".results-container").append('<div class="result">' + title + text + '</div>');
    });
    
  }).fail(function(jqxhr, textStatus, error) {
    $(".error").text(textStatus + ", " + error);
  });
  
}