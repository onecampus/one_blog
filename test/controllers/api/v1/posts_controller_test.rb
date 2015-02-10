require 'test_helper'

class Api::V1::PostsControllerTest < ActionController::TestCase
  self.use_instantiated_fixtures = true

  test 'should get post index' do
    get :index
    assert_response :success
    assert_not_nil assigns(:posts)
  end

  test 'should create a post via post' do
    @request.headers['Authorization'] = 'Basic 848dpYnHGcw9xon8Q3K_Eg'
    assert_difference('Post.count') do
      post :create, post: {
        title: 'title1',
        summary: 'summary1',
        content: 'content1',
        markdown: 'markdown1',
        author: 'author1',
        img: 'img',
        publish_time: Time.now,
        is_recommend: 1,
        is_published: 1,
        can_comment: 1,
        tag_list: 'tag1, hehe'
      }
    end
    assert_response :success
    json = JSON.parse(response.body)
    assert_not_empty(json, 'No post')
    assert_not_nil Post.where(title: 'title1').first
  end

  test 'should update a post' do
    @request.headers['Authorization'] = 'Basic 848dpYnHGcw9xon8Q3K_Eg'
    put :update, id: @one.to_param, post: { title: 'title_of_one' }
    assert_response :success
  end

  test 'should delete a post' do
    @request.headers['Authorization'] = 'Basic 848dpYnHGcw9xon8Q3K_Eg'
    delete :destroy, id: @two.to_param
    assert_response :success
    assert_nil Post.where(title: 'title_two').first
  end
end
