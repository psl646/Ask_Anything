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

	def show
		if params[:username].nil?
			@user = User.find_by_email(params[:user][:email])
		else
			@user = User.find_by_username(params[:username])
		end

		if @user
			render "api/users/show"
		else
			@errors = ["We could not find a user with that email address."]
			render "api/shared/errors", status: 404
		end
	end

	def update
		@user = User.find(params[:user][:id])

		if params[:user].keys.include?("first_name")
			if @user.update(user_params)
				session[:session_token] = @user.session_token
				render 'api/users/show'
			else
				@errors = @user.errors.full_messages
				render "api/shared/errors", status: 422
			end
		else
			@errors = []
			input = params[:user]
			email = input[:email]

			if @user.password_is?(input[:currentPassword])
				if (User.find_by_email(email) && @user[:email] != email)
					@errors.push("Email has already been taken")
				end

				if (input[:password1].length < 7 && input[:password1].length > 1)
					@errors.push("Password is too short (minimum is 7 characters)")
				end

				if (input[:password1] != input[:password2])
					@errors.push("Password confirmation does not match password")
				end

				if @errors.empty?
					@user[:email] = input[:email]
					@user[:password_digest] = BCrypt::Password.create(input[:password1])
					session[:session_token] = @user.reset_session_token!
					render 'api/users/show'
				else
					render "api/shared/errors", status: 422
				end
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
