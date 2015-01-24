class BlogControllerTest < ActionController::TestCase

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:posts)
  end

  test "should get index_user" do
    get :index_user
    assert_response :success
    assert_not_nil assigns(:users)
  end
end
