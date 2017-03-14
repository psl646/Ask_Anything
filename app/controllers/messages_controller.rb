class MessagesController < ApplicationController
  include Webhookable

  after_filter :set_header
  skip_before_action :verify_authenticity_token

  def reply
    message_body = params["Body"]
    from_number = params["From"]
    boot_twilio
    sms = @client.messages.create(
      from: Rails.application.application.twilio_number,
      to: from_number,
      body: "Hello there, thanks for texting me. Your number is #{from_number}."
    )

  end

  private

  def boot_twilio
    account_sid = Rails.application.application.twilio_sid
    auth_token = Rails.application.application.twilio_token
    @client = Twilio::REST::Client.new account_sid, auth_token
  end
end
