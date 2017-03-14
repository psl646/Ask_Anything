class MessagesController < ApplicationController
  include Webhookable

  after_filter :set_header
  skip_before_action :verify_authenticity_token

  def reply
    message_body = params["Body"]
    from_number = params["From"]
    boot_twilio
    sms = @client.messages.create(
      from: ENV['TWILIO_PHONE_NUMBER'],
      to: from_number,
      body: "Thanks for voting! Your response of: #{message_body} was recorded!"
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
