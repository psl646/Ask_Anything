class MessagesController < ApplicationController
  include Webhookable

  after_filter :set_header
  skip_before_action :verify_authenticity_token

  def reply
    message_body = params["Body"]
    from_number = params["From"]

    boot_twilio

    message_contents = message_body.split
    question_id = message_contents[0]
    answer_choice = message_contents[1]

    if (!valid_question = Response.is_valid_question_id?(question_id))
      return_message = "Invalid question number, try again!"
    elsif (!current_answer = Response.is_valid_answer_choice?(answer_choice, valid_question))
      return_message = "Invalid response to question, try again!"
    else
      Response.create(answer_id: current_answer.id)
      return_message = "Your response of: #{answer_choice} to question #{question_id} was recorded! Thanks!"
    end

    sms = @client.messages.create(
      from: ENV['TWILIO_PHONE_NUMBER'],
      to: from_number,
      body: return_message
    )

    render json: {}
  end

  private

  def boot_twilio
    account_sid = Twilio.account_sid
    auth_token = Twilio.auth_token
    @client = Twilio::REST::Client.new account_sid, auth_token
  end
end
