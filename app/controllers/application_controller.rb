require 'responder'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  before_action :authenticate_user!

  respond_to :json
  self.responder = Responder

  rescue_from ActiveRecord::RecordNotFound, with: :not_found!

  private

  def not_found!
    render json: { message: 'record not found' }, status: :not_found
  end

  def ack!(message = 'OK')
    render json: { message: message }, status: :ok
  end

  def forbidden!
    render json: { message: 'Forbidden' }, status: :forbidden
  end

  def unauthorized!
    render json: { message: 'Unauthorized' }, status: :unauthorized
  end
end
