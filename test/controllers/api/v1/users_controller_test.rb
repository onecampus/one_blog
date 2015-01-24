class Api::V1::UsersControllerTest < ActionController::TestCase
  self.use_instantiated_fixtures = true

  test "should get user index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  # http://matthewlehner.net/rails-api-testing-guidelines/
  test "should create a user via post" do
    assert_difference('User.count') do
      post :create, user: { name: 'yang', email: 'yang@gmail.com', password: '123456', avatar: '/test.png' }
    end
    assert_response :success
    json = JSON.parse(response.body)
    assert_not_empty(json, 'No user')
    assert_not_nil User.where(name: "yang").first
  end

  test 'should update a user pass' do
    # status 200
    # failure of validations => status 422
    # failure when saving => status 500
    put :update_pass, id: @yangkang.to_param, user: { password: '12345678' }
    assert_response :success
    assert_not_equal '269c74e5601e036cbb6d221e624cbd73858de8616ea3f17167363c0cfe8ba0ed', @yangkang.password
  end

  test 'should delete a user' do
    delete :destroy, id: @yangkang.to_param
    assert_response :success
    assert_nil User.where(name: "yangkang").first
  end
end
