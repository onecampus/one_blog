module ApplicationHelper
  # Logs in the given user.
  def log_in(user)
    session[:user_id] = user.id
  end

  # Returns the current logged-in user (if any).
  def current_user
    return unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end

  # Logs out the current user.
  def log_out
    session.delete(:user_id)
    @current_user = nil
  end

  def require_login
    unauthenticated unless current_user
  end

  def unauthenticated
    render text: 'unauthenticated', status: :unauthorized
  end
end
