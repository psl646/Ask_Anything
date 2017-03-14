source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.15'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

gem 'font-awesome-rails'

gem 'omniauth'
gem 'omniauth-twitter'

# Protect environment variables in Ruby on Rails with figaro
# Read more: https://rubygems.org/gems/figaro/versions/1.1.1
gem 'figaro'

# Real-time notifications with pusher.  Read more: https://pusher.com/tutorials
gem 'pusher'

# Add SMS feature to application.  Read more: https://github.com/twilio/twilio-ruby
gem 'twilio-ruby'

# Email delivery/testing framework.
# Read more: https://github.com/rails/rails/tree/master/actionmailer
gem 'actionmailer'

# Backend async
gem 'delayed_job_active_record'
gem 'daemons'
gem 'devise-async'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
end

group :production do
  gem 'rails_12factor'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  gem 'binding_of_caller'
  gem 'better_errors'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
