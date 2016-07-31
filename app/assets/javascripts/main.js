$(document).ready(function(){

let houses = ["Gryffindor","Slytherin","Hufflepuff","Ravenclaw"];

function emptyContainer(){
  $('#container').empty();
}

$('.empty').click(emptyContainer);

function getData(e){
  emptyContainer();
  //$('#container').append($('<img src="http://www.arabianbusiness.com/skins/ab.main/gfx/loading_spinner.gif">'))
  var url = $(e.target).attr('data-url');
  console.log("Getting data from: ", url);
  return $.get(url)
}

function saveQuote(e) {
  var $target = $(e.target);
  var quote = $target.attr('data-quote');
  var author = $target.attr('data-author');
  console.log(`quote= ${quote}, author = ${author}`);
  $target.text("Saved");
  $target.attr('disabled', true);

}

function renderQuote(data) {
  var quoteText = data.quoteText;
  var quoteAuthor = data.quoteAuthor;
  var $quote = $(`<h3>`).text(quoteText);
  var $author = $(`<h4>`).text(` by ${quoteAuthor}`);
  var $savebutton = $(`<button id="save-quote" data-quote="${quoteText}" data-author="${quoteAuthor}">`).text("Save Quote");

  $('#current-quote').append($quote,$author, $savebutton);
  $('#save-quote').click(saveQuote);
}

function renderBadQuote() {
  var $msg =  $('<h3 class="error">').text("Sorry. An error has occured!");
  $('#current-quote').append($msg);
}

function getQuote(e){
  $('#current-quote').empty();
  $('#current-quote').append($('<img src="http://www.arabianbusiness.com/skins/ab.main/gfx/loading_spinner.gif">'))
  var url = $(e.target).attr('data-url');
  console.log("Getting data from url: ", url);
  $.get(url).done(function(data){
    console.log("got data = ", data);
    setTimeout(function(){
      $('#current-quote').empty();
      renderQuote(data);
     // $('.update').click(renderStudentUpdateForm);
      //$('.delete').click(deleteItem);
    },300)
  })
  .error(function(jqXHR, textStatus, errorThrown) {
    console.log("got error!!", textStatus, errorThrown)
      $('#current-quote').empty();
      renderBadQuote();
  });
}

function renderStart() {
  var $instructions = $(`<h2>`).text("Hold a problem in your mind, click the button below and there will be your answer")
  var $button = $(`<button id="get-quote" data-url="/random_quotes">`).text("Get Answer");
  var $quoteDiv = $(`<div id="current-quote">`);
  $('#container').append($instructions, $button, $quoteDiv);
  $('#get-quote').click(getQuote)

}

renderStart();


})

