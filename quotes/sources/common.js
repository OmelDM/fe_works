$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  getNewQuote();
  var i = 1;
  $(".btn__next").click(getNewQuote);
  
  $(".btn__tweet").click(function() {
    var quoteText = $(".quote__text q").text();
    var quoteAuthor = $(".quote__author small").text();
    quoteAuthor = "\nBy " + quoteAuthor;
    
    var MAX_TWEET_LENGTH = 140;
    
    if (MAX_TWEET_LENGTH < quoteText.length + quoteAuthor.length) {
      var shortcutStr = "...";
      var newLength = MAX_TWEET_LENGTH - shortcutStr.length - quoteAuthor.length;
      quoteText = quoteText.slice(0, newLength);
      quoteText += shortcutStr;
    }
    
    var newTweet = quoteText + quoteAuthor;
    newTweet = encodeURIComponent(newTweet);
    window.open("https://twitter.com/intent/tweet?text=" + newTweet);
  });
});

function getNewQuote() {
  $(".loader").show();
  $(".icon__next").hide();
  $(".quote").fadeToggle();
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(data) {
    var newQuote = data[0].content.replace("<p>", "").replace("</p>", "").trim();
    $(".quote__text q").html(newQuote);
    $(".quote__author small").html(data[0].title);
    $(".quote").fadeToggle();
    $(".icon__next").show();
    $(".loader").hide();
  });
}