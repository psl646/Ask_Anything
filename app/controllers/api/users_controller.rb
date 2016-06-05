class Api::UsersController < ApplicationController

	def create
		@user = User.new(user_params)

		if @user.save
			login(@user)
			render "api/users/show"
		else
			@errors = @user.errors.full_messages

			if (!@user.errors[:password].empty?)
				@errors[-1] = "We need at least a 7 character password to keep your account safe"
			end
			
			render "api/shared/errors", status: 422
		end
	end

	def update
		@user = User.find(params[:user][:id])
		debugger
		if params[:user].keys.include?("first_name")
			if @user.update(user_params)
				session[:session_token] = @user.session_token
				render 'api/users/show'
			else
				render json: @user.errors, status: 422
			end
		else
			debugger
			if @user.password_is?(params[:user][:currentPassword])
			else
				@errors = ["Current password incorrect"]
				render "api/shared/errors", status: 401
			end
		end
	end

	private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, :password)
	end

end
