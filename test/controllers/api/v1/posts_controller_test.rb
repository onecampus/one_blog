class Api::V1::PostsControllerTest < ActionController::TestCase
  self.use_instantiated_fixtures = true

  test "should get post index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:posts)
  end
end
