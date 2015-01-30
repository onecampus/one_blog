class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  include ApplicationHelper

  before_action :set_locale
  after_filter :set_csrf_cookie_for_ng

  rescue_from NotAuthenticatedError do
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end
  rescue_from AuthenticationTimeoutError do
    render json: { error: 'Auth token is expired' }, status: 419
  end
  rescue_from NoAuthTokenError do
    render json: { error: 'Auth token is not sent' }, status: 418
  end

  protected

  # In Rails 4.2 and above for angular X-XSRF-TOKEN
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end
end
