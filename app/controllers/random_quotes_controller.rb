class RandomQuotesController < ApplicationController
  def index
#    url= "http://api.forismatic.com/api/1.0?method=getQuote&format=xml&lang=en"
    url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&key=3459"
    response = HTTParty.get(url)
    parsed_body = JSON.parse(response.body)
    render json: parsed_body
  end
end
