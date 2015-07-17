class HomeController < ApplicationController
  respond_to :html
  skip_before_action :authenticate_user!

  def index
  end
end
