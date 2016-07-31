class QuotesController < ApplicationController

  #get all quotes
  def index
    quotes = Quote.all
    render json: quotes
  end

  #get a specific quote
  def show
    quote = Quote.find(params[:id])
    render json: quote
  end

  #Save a new quote
  def create
    quote = Quote.create({
      quote_text: params[:quote_text],
      author: params[:author]
      })
    render json: quote
  end

  #get quote to edit
  def edit
    quote = Quote.find(params[:id])
    url = "quotes/#{params[:id]}"
    render :json => {:data => quote, :url => url}
  end


  #update a quote
  def update
    quote = Quote.find(params[:id])
    quote.update({

      quote_text: params[:quote_text],
      author: params[:author]
      })
    render json: quote
  end

  #Delete quote
  def destroy
    quote = Quote.find(params[:id])
    if quote
      quote.destroy
      render :json => {:deleted => true} if quote
    else
      render :json => {:deleted => false}
    end
  end

end
