require 'test_helper'

class Api::V1::AuthControllerTest < ActionController::TestCase

  test 'should auth via post' do
    post :authenticate, user: {
      email: 'yang@gmail.com',
      password: '123456'
    }
    # assert_response :success
    json = JSON.parse(response.body)
    puts '-' * 20
    puts json
    assert_not_empty(json, 'Not Authorized')
    assert_equal('qQ_MU5nDjhSPxFTM1TWhyg', json[:auth_token])
  end
end
