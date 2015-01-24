# README #

学壹blog

### 开发介绍 ###

* rails version 4.2.0
* ruby version 2.1.5
* apache + passenger
* mysql5

### TEST ###

```ruby
# http://api.rubyonrails.org/classes/ActiveRecord/FixtureSet.html
# http://guides.rubyonrails.org/testing.html
rake test test/models/user_test.rb test_should_validate_the_email_of_user_two
rake test test/models/user_test.rb

rake test test/controllers/blog_controller_test.rb
rake test test/controllers/api/v1/users_controller_test.rb
```

### CMD ###

```ruby
rails g model User name email password avatar

rails generate uploader Avatar

rails g serializer user

rails g model Post title summary:text content:text markdown:text author img user_id:integer publish_time:datetime is_recommend:integer is_published:integer can_comment:integer

rails generate uploader PostImg
```

### 部署 ###

```bash
git clone git@bitbucket.org:flowerwrong/one_campus.git
cd one_campus
cp ./config/database.yml.example ./config/database.yml
# 编辑 database.yml, 修改为你的 mysql 数据库密码, 其他最好别动
bundle install
rake db:create # 创建数据库
rake db:migrate # 导入数据库表
rake db:seed # 导入测试数据
rails s # 启动开发服务器
# 访问 http://127.0.0.1:3000/

# 如果需要重置数据库
rake db:reset
```

### live reload ###

```ruby
# 作用: 不用刷新浏览器, 自动更新所修改的网页
# 原理: websocket and guard

# 使用
# 1. 启动监听服务器
guard start

# 2. 启动开发服务器
rails s
```

### git workflow

```bash
git clone git@bitbucket.org:flowerwrong/one_campus.git
git branch -r
git checkout -b dev origin/dev # 检出 dev 分支, 并对应到本地的dev分支
git checkout -b your_name dev # 创建自己的私有分支, start_point 为dev
# 做修改, 提交, 注意不要推送到远程
git checkout dev # 切换到 dev 分支
git pull # 拉取远程更新
# 如果拉取遇到问题, 可能需要 git branch --set-upstream-to=origin/dev dev
git merge --no-ff your_name # 合并 your_name 到当前分支, 这里是 dev, 必须使用 --no-ff
git branch -d your_name # 删除 your_name 本地分支
git push origin dev # 推送 dev 分支到远程
```

### 注意 ###

* 在每次合并前, 都要先 git pull 来拉取远程更新, 然后再合并
* 除了我外, 其他人不要操作 master 分支
* 多用 git status, git branch, git log
* 把不用的文件加入到 .gitignore, 例如 .idea
* 不要直接在 dev 分支上开发, 按步骤来, 先建立自己的私有分支, 开发后再合并
* 保证每一次提交都是必要的, 而不是为了保存代码就做一次提交
* 当合并功能分支的时候，加上 -no-ff 选项强制进行一次全新的commit

### 联系我 ###

* yangkang@thecampus.cc
