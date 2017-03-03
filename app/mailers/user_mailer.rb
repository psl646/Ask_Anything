class UserMailer < ApplicationMailer
  default from: "support@AskAnything.site"

  def welcome_email(user)
    @user = user
    @url  = 'http://www.askanything.site/'
    mail(to: @user.email, subject: 'Welcome to AskAnything!')
  end
end
