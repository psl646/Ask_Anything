require 'twilio-ruby'

Twilio.configure do |config|
  config.account_sid = Rails.application.secrets.twilio_account_sid
  config.auth_token  = Rails.application.secrets.twilio_auth_token
end
