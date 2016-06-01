class Api::UsersController < ApplicationController

	def create
		@user = User.new(user_params)

		if @user.save
			login(@user)
			render "api/users/show"
		else
			@user.errors.messages[:first_name] = ["First name can't be blank"]
			@user.errors.messages[:last_name] = ["Last name can't be blank"]
			@user.errors.messages[:email] = ["That email doesn't seem right. We'll never share or sell your email address."]
			@user.errors.messages[:password] = ["We need at least a 7 character password to keep your account safe"]
			render json: @user.errors, status: 422
		end
	end

	private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, :password)
	end

end
