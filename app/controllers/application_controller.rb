class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_locale
  before_action :set_current_user, :authenticate_request
	after_filter :set_csrf_cookie_for_ng

  include ApplicationHelper

  rescue_from NotAuthenticatedError do
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end
  rescue_from AuthenticationTimeoutError do
    render json: { error: 'Auth token is expired' }, status: 419 # unofficial timeout status code
  end

  def ping
    render text: 'pong'
  end

	protected

  # In Rails 4.2 and above
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  private

	def set_csrf_cookie_for_ng
		cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  # Check to make sure the current user was set and the token is not expired
  def authenticate_request
    if !@current_user
      fail NotAuthenticatedError
    elsif auth_token_expired?
      fail AuthenticationTimeoutError
    end
  end

  def auth_token_expired?
    unless @current_user.blank?
      unless @current_user.expiration_time.blank?
        @current_user.expiration_time.to_i <= Time.now.to_i
      end
    else
      fail NotAuthenticatedError
    end
  end

  def set_current_user
    @auth_token = get_auth_token
    unless @auth_token.blank?
      @current_user ||= User.where(auth_token: @auth_token).first
    end
  end

  def get_auth_token
    return @http_auth_header_content if defined? @http_auth_header_content
    @http_auth_header_content = begin
      if request.headers['Authorization'].present?
        request.headers['Authorization'].split(' ').last
      elsif params[:auth_token].present?
        params[:auth_token]
      else
        nil
      end
    end
  end
end
