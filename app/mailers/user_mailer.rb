class UserMailer < ApplicationMailer
  default from: "support@AskAnything.site"

  def welcome_email(user)
    @user = user
    @url  = 'http://www.askanything.site/'
    mail(to: @user.email, subject: 'Welcome to AskAnything!')
  end
  handle_asynchronously :welcome_email, :priority => 20

  def forgot_password(user)
    @user = user
    @reset_password_url = 'testing'
    @url  = 'http://www.askanything.site/'
    mail(to: @user.email, subject: 'AskAnything: Account Password Reset')
  end
  handle_asynchronously :forgot_password, :priority => 20
end
