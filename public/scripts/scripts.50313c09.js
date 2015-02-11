"use strict";angular.module("ngblogApp",["angular-loading-bar","ngAnimate","ngCookies","ngMessages","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ngTagsInput","angularFileUpload","LocalStorageModule","angular-carousel","infinite-scroll"]).config(["$httpProvider",function(a){a.interceptors.push("SessionInjector")}]).config(["localStorageServiceProvider",function(a){a.setPrefix("ngblogApp").setStorageType("localStorage").setStorageCookie(10,"/").setNotify(!0,!0)}]).run(["$rootScope","$location","SessionService",function(a,b,c){a.$on("$routeChangeStart",function(a,d){var e=["views/admin_new_post.html","views/admin_edit_post.html","views/admin_posts.html"];_.include(e,d.templateUrl)&&null===c.authToken&&("views/login.html"===d.templateUrl||(c.setBackUrl(b.$$path),b.path("/login")))})}]).config(["$routeProvider","cfpLoadingBarProvider","$locationProvider",function(a,b,c){b.includeSpinner=!1;var d=function(){return!SmartPhone.isAny()}();a.when("/",{templateUrl:d?"views/main.html":"views/mobile/main.html",controller:"MainCtrl"}).when("/posts",{templateUrl:"views/posts.html",controller:"PostsCtrl"}).when("/posts/:postId",{templateUrl:d?"views/show_post.html":"views/mobile/show_post.html",controller:"PostShowCtrl"}).when("/admin/posts",{templateUrl:"views/admin_posts.html",controller:"AdminPostsCtrl",reloadOnSearch:!1}).when("/admin/posts/new",{templateUrl:"views/admin_new_post.html",controller:"PostNewCtrl",reloadOnSearch:!1}).when("/admin/posts/:postId",{templateUrl:"views/admin_edit_post.html",controller:"PostEditCtrl"}).when("/search/posts",{templateUrl:"views/search_posts.html",controller:"SearchPostsCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/admin/users",{templateUrl:"views/admin_users.html",controller:"AdminUsersCtrl"}).when("/admin/users/new",{templateUrl:"views/admin_new_user.html",controller:"UsersNewCtrl"}).when("/admin/users/:userId",{templateUrl:"views/admin_info_user.html",controller:"UserInfoCtrl"}).when("/users/password/update",{templateUrl:"views/update_password.html",controller:"UpdatePasswordCtrl"}).when("/users/avatar/update",{templateUrl:"views/update_avatar.html",controller:"UpdateAvatarCtrl"}).otherwise({redirectTo:"/"}),c.html5Mode(!0)}]),angular.module("ngblogApp").controller("BaseCtrl",["$scope","$location","SessionService",function(a,b,c){a.search=function(){b.path("/search/posts"),b.search("keyword="+a.keyword),b.replace()},a.mobilesearch=function(){b.path("/"),b.search("keyword="+a.keyword),b.replace()},a.currentUser=c.currentUser}]),angular.module("ngblogApp").controller("MainCtrl",["$scope","postsService","$http","$controller","$location","$timeout","$routeParams",function(a,b,c,d,e,f,g){a.posts=[],b.getPosts(1,10,0).success(function(b){a.posts=b.data.posts}),a.myInterval=5e3;var h=a.slides=[];a.addSlide=function(){var a=h.length+1;h.push({image:"/images/slide"+a+".jpg",text:["More","Extra","Lots of","Surplus"][h.length%4]+" "+["Cats","Kittys","Felines","Cutes"][h.length%4]})};for(var i=0;5>i;i++)a.addSlide();d("BaseCtrl",{$scope:a}),a.navAnimate=function(){a.animateMark=!0,f(function(){e.path("/posts"),e.replace()},930)},a.messageMark=!0,a.mobileposts=[],a.postsitem=10,a.load=!0,a.busy=!1,a.keyword=g.keyword,console.log(a.keyword),null===a.keyword||""===a.keyword||"undefined"==typeof a.keyword?(a.messageMark=!0,b.getPosts(1,a.postsitem,0).success(function(b){a.mobileposts=b.data.posts}),a.loadMore=function(){a.load===!1&&(a.loadMark=!0),a.load===!0&&(a.loadMark=!1,a.load=!1),b.getPosts(1,a.postsitem,0).success(function(b){a.busy=!0,f(function(){a.mobileposts=b.data.posts,a.loadMark=!1,a.busy=!1},1e3)}),a.postsitem+=10}):b.searchPost(a.keyword).success(function(b){a.mobileposts=b.posts,a.messageMark=null===a.mobileposts||""===a.mobileposts||0===a.mobileposts.length?!1:!0})}]),angular.module("ngblogApp").controller("PostsCtrl",["$scope","$log","postsService","$location","$anchorScroll","$controller",function(a,b,c,d,e,f){a.posts=[],a.itemsPerPage=5,a.bigTotalItems=null,a.bigCurrentPage=1,a.maxSize=8,c.getPosts(a.bigCurrentPage,a.itemsPerPage,0).success(function(b){a.posts=b.data.posts,a.bigTotalItems=b.data.total_count,console.log(a.posts)}),a.pageChanged=function(){c.getPosts(a.bigCurrentPage,a.itemsPerPage,0).success(function(b){a.posts=b.data.posts})},a.scrollTop=function(){e()},f("BaseCtrl",{$scope:a})}]),angular.module("ngblogApp").controller("AdminPostsCtrl",["$controller","$scope","$log","postsService","AuthService","$window","adminNavService",function(a,b,c,d,e,f,g){b.crumbs=[{anchor:"/#admin/posts",menu:"所有文章"}],b.navacitves={postsActive:!0,newpostActive:!1,adduserActive:!1,usersActive:!1,passwordActive:!1,avatarActive:!1},b.posts=[],b.itemsPerPage=20,b.bigTotalItems=null,b.bigCurrentPage=1,b.maxSize=8,d.getPosts(b.bigCurrentPage,b.itemsPerPage,0).success(function(a){b.posts=a.data.posts,b.bigTotalItems=a.data.total_count}),b.pageChanged=function(){d.getPosts(b.bigCurrentPage,b.itemsPerPage,0).success(function(a){b.posts=a.data.posts})},b.delPost=function(a){confirm("确定删除吗")&&d.delPost(a).success(function(c){if("destroied"===c.status){for(var d=b.posts.length-1;d>=0;d--)b.posts[d].id===a&&b.posts.splice(d,1);alert("删除成功")}else alert("删除失败")})},a("BaseCtrl",{$scope:b}),b.logout=function(){g.logout()}}]),angular.module("ngblogApp").controller("PostNewCtrl",["$controller","$scope","$http","postsService","$location","FileUploader","AuthService","$window","adminNavService",function(a,b,c,d,e,f,g,h,i){b.crumbs=[{anchor:"/#admin/posts",menu:"所有文章"},{anchor:"/#admin/posts/new",menu:"添加文章"}],b.navacitves={postsActive:!1,newpostActive:!0,adduserActive:!1,usersActive:!1,passwordActive:!1,avatarActive:!1},b.isCollapsed=!0,b.open=function(a){a.preventDefault(),a.stopPropagation(),b.opened=!0},b.post={},b.post.markdown="",b.markdown=function(a){return marked.setOptions({highlight:function(a){return hljs.highlightAuto(a).value}}),marked(a)},b.post.img="",b.uploader=new f({url:"/api/v1/posts/image/uploader",autoUpload:!0,onSuccessItem:function(a,c){"success"===c.state?b.post.img=c.url:alert("上传错误")}}),b.tags=[],b.loadTags=function(){},b.addPost=function(){for(var a=b.post.tags,c=[],f=0,g=a.length;g>f;f++)c.push(a[f].text);var h={title:b.post.title,summary:b.post.summary,content:b.post.content,markdown:b.post.markdown,author:b.post.author,img:b.post.img,is_recommend:b.post.is_recommend,is_published:b.post.is_published,can_comment:b.post.can_comment,tag_list:c};d.createPost(h).success(function(a){"created"===a.status?e.path("/admin/posts").replace():alert("创建失败")})},b.logout=function(){i.logout()},a("BaseCtrl",{$scope:b})}]),angular.module("ngblogApp").controller("PostEditCtrl",["$controller","$scope","postsService","$routeParams","$location","FileUploader","adminNavService",function(a,b,c,d,e,f,g){b.crumbs=[{anchor:"/#admin/posts",menu:"所有文章"},{anchor:"/#admin/posts/"+d.postId,menu:"编辑文章"}],b.isCollapsed=!0,b.open=function(a){a.preventDefault(),a.stopPropagation(),b.opened=!0},c.getPostById(d.postId).success(function(a){b.post=a.post,b.post.is_recommend=1===b.post.is_recommend?!0:!1,b.post.is_published=1===b.post.is_published?!0:!1,b.post.can_comment=1===b.post.can_comment?!0:!1,b.markdown=function(a){return marked.setOptions({highlight:function(a){return hljs.highlightAuto(a).value}}),marked(a)};for(var c=[],d=b.post.tags,e=0,f=d.length;f>e;e++){var g={text:d[e].name};c.push(g)}b.post.tags=c}),b.updatePost=function(a){for(var d=b.post.tags,f=[],g=0,h=d.length;h>g;g++)f.push(d[g].text);var i={id:a,title:b.post.title,summary:b.post.summary,content:b.post.content,markdown:b.post.markdown,author:b.post.author,img:b.post.img,is_recommend:b.post.is_recommend,is_published:b.post.is_published,can_comment:b.post.can_comment,tag_list:f};c.updatePost(i).success(function(a){"updated"===a.status?e.path("/admin/posts").replace():alert("更新失败")})},b.uploader=new f({url:"/api/v1/posts/image/uploader",autoUpload:!0,onSuccessItem:function(a,c){"success"===c.state?b.post.img=c.url:alert("上传错误")}}),a("BaseCtrl",{$scope:b}),b.logout=function(){g.logout()}}]),angular.module("ngblogApp").controller("PostShowCtrl",["$scope","$log","postsService","$routeParams","$controller",function(a,b,c,d,e){a.post=null,a.postimg=null,a.imageMark=!1,c.getPostById(d.postId).success(function(b){a.post=b.post,a.postimg=b.post.img,a.imageMark=null===a.postimg||""===a.postimg?!1:!0}),a.posts=[],c.getPosts(1,14,0).success(function(b){a.posts=b.data.posts,a.totalItems=b.data.total_count}),e("BaseCtrl",{$scope:a})}]),angular.module("ngblogApp").controller("SearchPostsCtrl",["$scope","postsService","$routeParams","$controller",function(a,b,c,d){a.keyword=c.keyword,a.messageMark=!0,b.searchPost(a.keyword).success(function(b){a.posts=b.posts,a.messageMark=null===a.posts||""===a.posts||0===a.posts.length?!1:!0}),d("BaseCtrl",{$scope:a})}]),angular.module("ngblogApp").controller("LoginCtrl",["$scope","AuthService","SessionService","$location",function(a,b,c,d){a.user={email:"",password:""},a.login=function(){var e={login:a.user};b.login(e).success(function(a){a.auth_token&&a.current_user?(alert("登陆成功"),c.setCurrentUser(a.current_user),c.setAuthToken(a.auth_token),d.path(c.backUrl||"/"),c.setBackUrl(null)):a.error&&alert("用户名或者密码错误, 请重新输入")})}}]),angular.module("ngblogApp").controller("UsersNewCtrl",["$controller","$scope","$http","FileUploader","usersService","$location","AuthService","$window","adminNavService",function(a,b,c,d,e,f,g,h,i){b.crumbs=[{anchor:"/#admin/users",menu:"所有用户"},{anchor:"/#admin/users/new",menu:"添加用户"}],b.navacitves={postsActive:!1,newpostActive:!1,adduserActive:!0,usersActive:!1,passwordActive:!1,avatarActive:!1},b.user={},b.user.avatar="",b.uploader=new d({url:"/api/v1/users/image/uploader",autoUpload:!0,onSuccessItem:function(a,c){"success"===c.state?b.user.avatar=c.url:alert("上传错误")}}),b.addUser=function(){var a={name:b.user.name,email:b.user.email,password:b.user.password,avatar:b.user.avatar};console.log(a),e.createUsers(a).success(function(a){"created"===a.status?f.path("/admin/users").replace():alert("创建失败")})},a("BaseCtrl",{$scope:b}),b.logout=function(){i.logout()}}]),angular.module("ngblogApp").controller("AdminUsersCtrl",["$controller","$scope","$log","usersService","AuthService","$window","adminNavService",function(a,b,c,d,e,f,g){b.crumbs=[{anchor:"/#admin/posts",menu:"所有用户"}],b.navacitves={postsActive:!1,newpostActive:!1,adduserActive:!1,usersActive:!0,passwordActive:!1,avatarActive:!1},b.itemsPerPage=20,b.bigTotalItems=null,b.bigCurrentPage=1,b.maxSize=8,d.getUsers(b.bigCurrentPage,b.itemsPerPage,0).success(function(a){b.users=a.data.users,b.bigTotalItems=a.data.total_count}),b.pageChanged=function(){d.getUsers(b.bigCurrentPage,b.itemsPerPage,0).success(function(a){b.users=a.data.users})},b.delUser=function(a){confirm("确定删除吗")&&d.delUser(a).success(function(c){if("destroied"===c.status){for(var d=b.users.length-1;d>=0;d--)b.users[d].id===a&&b.users.splice(d,1);alert("删除成功")}else alert("删除失败")})},a("BaseCtrl",{$scope:b}),b.logout=function(){g.logout()}}]),angular.module("ngblogApp").controller("UserInfoCtrl",["adminNavService","$scope","$log","usersService","$routeParams","$controller",function(a,b,c,d,e,f){b.crumbs=[{anchor:"/#admin/users",menu:"所有用户"},{anchor:"/#admin/users/"+e.userId,menu:"用户详情"}],b.isCollapsed=!0,b.open=function(a){a.preventDefault(),a.stopPropagation(),b.opened=!0},d.getUserById(e.userId).success(function(a){console.log(a),b.user=a.user}),b.logout=function(){a.logout()},f("BaseCtrl",{$scope:b})}]),angular.module("ngblogApp").controller("UpdatePasswordCtrl",["$controller","$scope","$http","usersService","$location","AuthService","$window","adminNavService",function(a,b,c,d,e,f,g,h){b.crumbs=[{anchor:"/#users/password/update",menu:"修改密码"}],a("BaseCtrl",{$scope:b}),b.navacitves={postsActive:!1,newpostActive:!1,adduserActive:!1,usersActive:!1,passwordActive:!0,avatarActive:!1},console.log(b.currentUser),d.getUserById(b.currentUser.id).success(function(a){b.user=a.user}),b.updatePassword=function(a){var c={id:a,password:b.user.password};d.updatePassword(c).success(function(a){"password_updated"===a.status?e.path("/admin/users").replace():alert("更新失败")})},b.logout=function(){h.logout()}}]),angular.module("ngblogApp").controller("UpdateAvatarCtrl",["FileUploader","$controller","$scope","$http","usersService","$location","AuthService","$window","adminNavService",function(a,b,c,d,e,f,g,h,i){c.crumbs=[{anchor:"/#users/avatar/update",menu:"修改头像"}],b("BaseCtrl",{$scope:c}),c.navacitves={postsActive:!1,newpostActive:!1,adduserActive:!1,usersActive:!1,passwordActive:!1,avatarActive:!0},console.log(c.currentUser),e.getUserById(c.currentUser.id).success(function(a){c.user=a.user}),c.updateAvatar=function(a){var b={id:a,avatar:c.user.avatar};e.updateAvatar(b).success(function(a){"avatar_updated"===a.status?(c.currentUser.avatar=c.user.avatar,f.path("/admin/users").replace()):alert("更新失败")})},c.uploader=new a({url:"/api/v1/users/image/uploader",autoUpload:!0,onSuccessItem:function(a,b){"success"===b.state?c.user.avatar=b.url:alert("上传错误")}}),c.logout=function(){i.logout()}}]),angular.module("ngblogApp").directive("ueditor",["$timeout",function(a){return{restrict:"AE",require:"?ngModel",link:function(b,c,d,e){if(e&&void 0!==UE){var f=UE.getEditor(c[0],{initialFrameWidth:"100%",initialFrameHeight:"300",autoHeightEnabled:!0}),g=function(){var c=f.getContent();return""===c?null:void(c!==e.$viewValue&&(b.$root.$$phase||a(function(){b.$apply(function(){e.$setViewValue(f.getContent())})},0)))};void 0!==f&&null!==f&&(f.addListener("ready",function(){e.$render=function(){f.setContent(e.$viewValue||"")}}),f.addListener("blur",g))}}}}]),angular.module("ngblogApp").directive("ngEnter",function(){return function(a,b,c){b.bind("keydown keypress",function(b){13===b.which&&(a.$apply(function(){a.$eval(c.ngEnter,{event:b})}),b.preventDefault())})}}),angular.module("ngblogApp").directive("ace",["$timeout",function(a){return{require:"?ngModel",link:function(b,c,d,e){var f=ace.edit(c[0]);f.setTheme("ace/theme/monokai"),f.getSession().setMode("ace/mode/markdown"),f.setShowPrintMargin(!1),f.setOptions({fontSize:"10pt"}),void 0!==f&&null!==f&&(e.$render=function(){f.setValue(e.$viewValue)},f.on("change",function(){a(function(){b.$apply(function(){e.$setViewValue(f.getValue())})},0)}))}}}]),angular.module("ngblogApp").directive("breadcrumbs",function(){return{restrict:"E",replace:!0,templateUrl:"views/directives/breadcrumbs.html"}}),angular.module("ngblogApp").directive("navmenu",function(){return{restrict:"E",replace:!0,templateUrl:"views/directives/nav.html"}}),angular.module("ngblogApp").directive("disableAnimation",["$animate",function(a){return{restrict:"A",link:function(b,c,d){d.$observe("disableAnimation",function(b){a.enabled(!b,c)})}}}]),angular.module("ngblogApp").factory("postsService",["$http",function(a){return{getPosts:function(b,c,d){b="undefined"!=typeof b?b:1,c="undefined"!=typeof c?c:20,d="undefined"!=typeof d?d:0;var e="?page="+b+"&per_page="+c+"&offset="+d;return a.get("/api/v1/posts"+e)},getPostById:function(b){return a.get("/api/v1/posts/"+b)},createPost:function(b){return a.post("/api/v1/posts",{post:b})},delPost:function(b){return a["delete"]("/api/v1/posts/"+b)},updatePost:function(b){return a.patch("/api/v1/posts/"+b.id,{post:b})},searchPost:function(b){return a.get("/api/v1/posts/search?keyword="+b)}}}]),angular.module("ngblogApp").factory("SessionService",["localStorageService",function(a){a.isSupported||alert("不支持localStorage");var b={currentUser:a.get("currentUser"),authToken:a.get("authToken"),backUrl:null,isLoggedIn:function(){return null!==b.currentUser?!0:!1},setCurrentUser:function(c){a.set("currentUser",c),b.currentUser=c},getCurrentUser:function(){return b.currentUser},setAuthToken:function(c){a.set("authToken",c),b.authToken=c},getAuthToken:function(){return b.authToken},setBackUrl:function(a){b.backUrl=a},getBackUrl:function(){return b.backUrl}};return b}]),angular.module("ngblogApp").factory("AuthService",["$http","SessionService","localStorageService",function(a,b,c){var d={};return d.login=function(b){return a.post("/api/v1/users/auth",b)},d.logout=function(){b.setCurrentUser(null),b.setAuthToken(null),c.remove("currentUser"),c.remove("authToken")},d}]),angular.module("ngblogApp").factory("adminNavService",["AuthService","$window",function(a,b){return{logout:function(){a.logout(),b.location.href="/"}}}]),angular.module("ngblogApp").factory("usersService",["$http",function(a){return{getUsers:function(b,c,d){b="undefined"!=typeof b?b:1,c="undefined"!=typeof c?c:20,d="undefined"!=typeof d?d:0;var e="?page="+b+"&per_page="+c+"&offset="+d;return a.get("/api/v1/users"+e)},getUserById:function(b){return a.get("/api/v1/users/"+b)},delUser:function(b){return a["delete"]("/api/v1/users/"+b+"/destroy")},updatePassword:function(b){return a.put("/api/v1/users/"+b.id+"/password/update",{user:b})},updateAvatar:function(b){return a.post("/api/v1/users/"+b.id+"/avatar/update",{user:b})},createUsers:function(b){return console.log(b),a.post("/api/v1/users/create",{user:b})}}}]),angular.module("ngblogApp").factory("SessionInjector",["SessionService","$injector","$window",function(a,b,c){var d={request:function(c){return null!==a.authToken&&void 0!==a.authToken&&(b.get("$http").defaults.headers.common.Authorization=a.authToken),c},response:function(a){return a},responseError:function(a){return(401===a.status||418===a.status||419===a.status)&&(c.location.href="/#/login"),a}};return d}]),angular.module("ngblogApp").filter("postFilter",function(){return function(a){return"postFilter filter: "+a}});