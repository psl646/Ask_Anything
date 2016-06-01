class Api::UsersController < ApplicationController

	def create
		@user = User.new(user_params)

		if @user.save
			login(@user)
			render "api/users/show"
		else
			user_errors = @user.errors.messages
			if (user_errors[:first_name])
				user_errors[:first_name] = ["First name can't be blank"]
			end

			if (user_errors[:last_name])
				user_errors[:last_name] = ["Last name can't be blank"]
			end

			if (user_errors[:email])
				if (user_errors[:email] == ["can't be blank"])
					user_errors[:email] = ["Email can't be blank"]
				elsif (user_errors[:email] = ["has already been taken"])
					user_errors[:email] = ["Email has already been taken"]
				end
			end

			if (user_errors[:password])
				user_errors[:password] = ["We need at least a 7 character password to keep your account safe"]
			end

			# @user.errors.full_messages... fix this later to dry up code
			render json: @user.errors, status: 422
		end
	end

	private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, :password)
	end

end
