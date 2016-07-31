class RandomQuotesController < ApplicationController
  def index
    url= "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
#    url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&key=3459"
    response = HTTParty.get(url)
    puts "response.body = {response.body}"
#    bad_data = '{"quoteText:"We live in a wonderful world that is full of beauty, charm and adventure. There is no end to the adventures that we can have if only we seek them with our eyes open. ", "quoteAuthor":"Jawaharlal Nehru  ", "senderName":"", "senderLink":"", "quoteLink":"http://forismatic.com/en/c4c1593474/"}'
    begin
      parsed_body = JSON.parse(response.body)
      #parsed_body = JSON.parse(bad_data)
      return render json: parsed_body
    rescue JSON::ParserError
      return head 422
    end
  end
end
