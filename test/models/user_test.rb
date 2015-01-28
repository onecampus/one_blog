require 'test_helper'

class UserTest < ActiveSupport::TestCase
  self.use_instantiated_fixtures = true

  test 'should not save user without any' do
    user = User.new
    assert_not user.save, 'Saved the user without any'
  end

  test 'should not save user without name, email, password' do
    assert_not @without_name.save, 'Saved the user without name'
    assert_not @without_email.save, 'Saved the user without email'
    assert_not @without_password.save, 'Saved the user without password'
  end

  test 'should user count' do
    assert_equal 6, User.count
  end

  test 'should user one name yangkang' do
    assert_equal 'yangkang', @yangkang.name
  end

  test 'should validate the email of user invide_email' do
    assert_not @invide_email.save, 'Saved the user with invalide email'
  end

  test 'hash_password' do
    assert_equal '269c74e5601e036cbb6d221e624cbd73858de8616ea3f17167363c0cfe8ba0ed', User.hash_password('123456')
  end
end
