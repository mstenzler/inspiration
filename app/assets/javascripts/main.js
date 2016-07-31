$(document).ready(function(){

function emptyContainer(){
  $('#page-container').empty();
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
  var data = {
    quote_text: quote,
    author: author
  }

  $.ajax({
    url: '/quotes',
    method: 'post',
    data: data
  }).done(function(){
    console.log(arguments);
    $target.text("Saved");
    $target.attr('disabled', true);
    //let quote = arguments[0];
    //appendStudent(student);
  })

}

function deleteQuote(e){
  var url = $(e.target).attr('data-url');
  $.ajax({
    url: url,
    method: 'delete'
  }).done(function(){
    console.log(arguments);
    $(e.target).closest('.row').remove();
  })
}

function updateQuote(e){
  e.preventDefault();
  var url = $(e.target).attr('data-url');
  var $children = $(e.target).children()
  var data =  { 
    quote_text: $children.eq(0).val(),
    author : $children.eq(1).val()
  }
  $.ajax({
    url: url,
    method: 'put',
    data: data
  }).done(function(){
    console.log(arguments);
    var $success = $('<h4>').text('Quote updated!')
    $('#page-container').append($success)
  })
}

function buildListCard(quote) {
  var $d = $(`<div class="row">
  <div class="col s12">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
       <p>${quote.quote_text}</p>
       <br />
       <p>By: ${quote.author}</p>
      </div>
      <div class="card-action">
        <button class="update btn waves-effect waves-light orange" data-url="/quotes/${quote.id}/edit">Update quote</button>
        <button class="delete btn waves-effect waves-light orange" data-url="/quotes/${quote.id}">Delete quote</button>
      </div>
    </div>
  </div>
</div>`);
  return $d;
}

function buildResultCard(quote, author) {
  var $d = $(`<div class="row">
  <div class="col s12">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
       <p>${quote}</p>
       <br />
       <p>By: ${author}</p>
      </div>
      <div class="card-action">
        <button class="btn waves-effect waves-light orange" id="save-quote" data-quote="${quote}" data-author="${author}">Save Quote</a>
      </div>
    </div>
  </div>
</div>`);
  return $d;
}

function renderQuote(data) {
  var quoteText = data.quoteText;
  var quoteAuthor = data.quoteAuthor;

  var $myQuote = buildResultCard(quoteText, quoteAuthor);
//  console.log($myQuote);
//  $('#current-quote').append($quote,$author, $saveButton);
  $('#current-quote').append($myQuote);
  $('#save-quote').click(saveQuote);
}

function renderBadQuote() {
  var $msg =  $('<h3 class="error">').text("Sorry. An error has occured!");
  $('#current-quote').append($msg);
}

function getQuote(e){
  $('#current-quote').empty();
  var $spinner = $(`<div class="row center">
    <img class="center" src="http://www.arabianbusiness.com/skins/ab.main/gfx/loading_spinner.gif">
    </div>`);
  $('#current-quote').append($spinner);
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
  var $welcome = $(`<h1 class="header center orange-text">`).text("Welcome!");
  var $instructionsDiv = $(`<div class="row center">`);
  var $instructions = $(`<h5 class="header col a12 light">`).text("Hold a problem in your mind, click the button below and there will be your answer");
  var $buttonDiv = $(`<div class="row center">`);
  var $button = $(`<button id="get-quote" class="btn-large waves-effect waves-light orange" data-url="/random_quotes">`).text("Get Answer");
  var $quoteDiv = $(`<div id="current-quote">`);
  //$('#container').empty();
  emptyContainer();
  $instructionsDiv.append($instructions);
  $buttonDiv.append($button);
  $('#page-container').append($welcome, $instructionsDiv, $buttonDiv, $quoteDiv);
  $('#get-quote').click(getQuote)

}

function appendQuote(quote){
  var $quoteCard = buildListCard(quote);
  $('#page-container').append($quoteCard);
}

function renderQuoteUpdateForm(e){
  getData(e).done(function(data){
    emptyContainer();

    let $form = $(`<form data-url="${data.url}">`);
    let $quote = $(`<textarea name="quote_text" placeholder="Quote">`).text(data.data.quote_text);
    let $author = $(`<input type="text" name="author" value="${data.data.author}">`);
    let $submit = $('<input class="btn waves-effect waves-light orange" type="submit" value="UPDATE">');
    let $back = $('<button class="btn waves-effect waves-light orange top-space" data-url="/quotes">Back to Quotes</button>')
    $('#page-container').append($form.append($quote,$author,$submit),$back);

    $form.submit(updateQuote);
    $back.click(listQuotes);
  })
}

function listQuotes(e){
  getData(e).done(function(data){
    emptyContainer();
    //renderNewQuoteForm();
    var $header = $(`<h1 class="header center orange-text">`).text("Saved Quotes");
    $('#page-container').append($header);
    data.forEach(appendQuote);
    $('.update').click(renderQuoteUpdateForm);
    $('.delete').click(deleteQuote);
  });
}

renderStart();

$('.redirect').eq(0).click(renderStart);
$('.redirect').eq(1).click(listQuotes);


})

