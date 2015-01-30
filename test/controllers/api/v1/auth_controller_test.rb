require 'test_helper'

class Api::V1::AuthControllerTest < ActionController::TestCase

  test 'should auth via post' do
    post :create, user: { email: 'yang@gmail.com', password: '123456' }
    json = JSON.parse(response.body)
    assert_not_empty(json, 'Not Authorized')
    assert_equal('qQ_MU5nDjhSPxFTM1TWhyg', json[:auth_token])
  end
end
