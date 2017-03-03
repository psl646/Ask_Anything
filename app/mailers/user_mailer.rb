class UserMailer < ApplicationMailer
  default from: "pedrolong16@gmail.com"

  def welcome_email(user)
    @user = user
    @url  = 'http://www.askanything.site/'
    mail(to: @user.email, subject: 'Welcome to AskAnything!')
  end
end


# def send_simple_message
#   RestClient.post "https://api:key-a3cc04106ee8a75368cb777c8c7bee2a"\
#   "@api.mailgun.net/v3/sandbox09692a66dfa04111a21ecb5c541ac180.mailgun.org/messages",
#   :from => "Mailgun Sandbox <postmaster@sandbox09692a66dfa04111a21ecb5c541ac180.mailgun.org>",
#   :to => "Peter Lin <plinprog@gmail.com>",
#   :subject => "Hello Peter Lin",
#   :text => "Congratulations Peter Lin, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free."
# end
