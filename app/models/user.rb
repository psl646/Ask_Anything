require_relative 'survey'

class User < ActiveRecord::Base

	attr_reader :password

	validates :first_name, :last_name, :email, :password_digest, :session_token, presence: true
	validates :email, :session_token, uniqueness: true
	validates :password, length: {minimum: 7}, allow_nil: :true

	after_initialize :ensure_session_token, :ensure_initial_survey, :ensure_username
	before_validation :ensure_session_token_uniqueness

	has_many(
    :surveys,
    class_name: "Survey",
    foreign_key: :author_id,
    primary_key: :id,
		dependent: :destroy
  )

	has_many(
		:questions,
		through: :surveys,
		source: :questions,
		dependent: :destroy
	)

	has_many(
		:responses,
		class_name: "Response",
		foreign_key: :user_id,
		primary_key: :id,
		dependent: :destroy
	)

	def password= (password)
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	# Check for email first since there is a uniqueness constraint & validation on email
	def self.find_by_credentials (username, email, password)
		user = User.find_by(email: email) || User.find_by(username: username)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

	def password_is? (password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
		ensure_session_token_uniqueness
		self.save
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
		SecureRandom.base64
	end

	def ensure_session_token_uniqueness
		while User.find_by(session_token: self.session_token)
			self.session_token = new_session_token
		end
	end

	def ensure_initial_survey
		if self.surveys.where(ungrouped: "true").empty?
			Survey.create(title: "Ungrouped", author_id: self.id, ungrouped: "true")
		end
	end

	def ensure_username
		username = ""
		if self[:username].nil?
			# Revisit this later.  If we have 1000 users with the same first 5 chars(first_name)
			# and the same first 3 chars (last_name); the 1001 user will cause the below
			# condition User.find_by(username: username).nil? to ALWAYS be false
			# IE PETERLIN000 to PETERLIN999 users will exist
			until (User.find_by(username: username).nil?) && (username.length == 11)
				username = ""
				username.concat(self[:first_name].downcase[0,5])
				username.concat(self[:last_name].downcase[0,3])
				username = generate_numbers_to_eleven_chars(username)
			end
			self[:username] = username
			self.save
		end
	end

	# generates numbers to append to username until username is 11 characters
	def generate_numbers_to_eleven_chars(username_before_numbers)
		while username_before_numbers.length < 11
			username_before_numbers.concat(Random.rand(10).to_s)
		end

		username_before_numbers
	end
end
