class Api::SessionsController < ApplicationController
	def create
		if auth_hash
			@user = User.find_or_create_from_auth_hash(auth_hash)
			@user[:tour] = "false"
			login(@user)
			redirect_to "/"
			return
		else
			@user = User.find_by_credentials(
				params[:user][:username],
	      params[:user][:email],
	      params[:user][:password]
	    )
		end

    if @user
			@user[:tour] = params[:user][:tour].nil? ? "false" : "true"
			login(@user)
			render "api/users/show"
		else
			@errors = ["We couldn't find a user with that email and password."]
			render "api/shared/errors", status: 401
		end
	end

	def destroy
		@user = current_user
		if @user
			logout
			render "api/users/show"
		else
			@errors = ["Nobody signed in"]
			render "api/shared/errors", status: 404
		end
	end

	def show
		if current_user
			@user = current_user
			render "api/users/show"
		else
			@errors = []
			render "api/shared/errors"
		end
	end

	private

	def auth_hash
		request.env['omniauth.auth']
	end

end
