require 'test_helper'

class PostTest < ActiveSupport::TestCase
  test 'should not save a post without any' do
    p = Post.new
    assert_not p.save, 'Can not save a post without any'
  end

  test 'title uniq test' do
    p1 = Post.new(title: 't', can_comment: 1)
    assert p1.save, 'Saved a post with title t'
    p2 = Post.new(title: 't', can_comment: 1)
    assert_not p2.save, 'Can not save a post with title t'
  end

  test 'title and can_comment presence' do
    p_title = Post.new(title: 't')
    p_c = Post.new(can_comment: 1)
    assert_not p_title.save, 'Can not save a post without title'
    assert_not p_c.save, 'Can not save a post without can_comment'
  end
end
