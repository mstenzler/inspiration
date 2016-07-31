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
    $(e.target).parent().remove();
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
    var $success = $('<h4>').text('Success!')
    $('#container').append($success)
  })
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
  $('#container').empty();
  $('#container').append($instructions, $button, $quoteDiv);
  $('#get-quote').click(getQuote)

}

function appendQuote(quote){
  var $quote = $('<h4>').text(quote.quote_text);
  var $author = $('<h5>').text(quote.author);
  var $update = $(`<button class="update">Update quote</button>`).attr('data-url',`/quotes/${quote.id}/edit`)
  var $delete = $(`<button class="delete">Delete quote</button>`).attr('data-url',`/quotes/${quote.id}`)
  var $div = $('<div>')
  $('#container').append($div.append($quote,$author,$update,$delete));
}

function renderQuoteUpdateForm(e){
  getData(e).done(function(data){
    emptyContainer();

    let $form = $(`<form data-url="${data.url}">`);
    let $quote = $(`<textarea name="quote_text" placeholder="Quote">`).text(data.data.quote_text);
    let $author = $(`<input type="text" name="author" value="${data.data.author}">`);
    let $submit = $('<input type="submit" value="UPDATE">');
    let $back = $('<button data-url="/quotes">Back to Quotes</button>')
    $('#container').append($form.append($quote,$author,$submit),$back);

    $form.submit(updateQuote);
    $back.click(listQuotes);
  })
}

function listQuotes(e){
  getData(e).done(function(data){
    emptyContainer();
    //renderNewQuoteForm();
    data.forEach(appendQuote);
    $('.update').click(renderQuoteUpdateForm);
    $('.delete').click(deleteQuote);
  });
}

renderStart();

$('.redirect').eq(0).click(renderStart);
$('.redirect').eq(1).click(listQuotes);


})

