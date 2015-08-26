source 'http://rubygems.org'

ruby '2.2.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'

gem 'puma'

gem 'dotenv-rails'

# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

gem 'haml-rails'
gem 'sprockets', '~> 2'
gem 'bower-rails'
gem 'angular-rails-templates'
gem 'angular_rails_csrf'
gem 'devise', '~> 3.4.0'
gem 'api-versions'
gem 'active_model_serializers'
gem 'state_machines-activerecord'
gem 'carrierwave'
gem 'mini_magick'
gem 'fog', require: 'fog/aws'
gem 'delayed_job_active_record'
gem 'delayed_job_web'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'responders'
# gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'ffaker'

gem 'foreman'
group :production, :staging do
  gem 'rails_12factor'
  gem 'rails_stdout_logging'
  gem 'rails_serve_static_assets'
end

group :development do
  gem 'better_errors'

  # profiling
  gem 'bullet'

  # Static analysis & code metrics
  gem 'rubocop'
  gem 'reek'
  gem 'excellent'
  gem 'haml-lint'
  gem 'overcommit'
end

group :development, :test do
  gem 'color-logger'
  gem 'teaspoon-jasmine'
  gem 'jazz_hands', github: 'nixme/jazz_hands', branch: 'bring-your-own-debugger'
  gem 'pry-byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  gem 'rspec-rails'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'factory_girl_rails'
end
