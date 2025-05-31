---
title: Ruby 学习笔记
date: 2017-08-08 13:43:39
tags:
- Ruby
categories: Notes
---

## 安装（不走rvm）
- Manjaro下用Pacman装 ruby，nodejs：

```bash
> sudo pacman -S nodejs
> sudo pacman -S ruby
```
- 改.bashrc

```bash
nano ~/.bashrc
#add
if which ruby >/dev/null && which gem >/dev/null; then
PATH="$(ruby -rubygems -e 'puts Gem.user_dir')/bin:$PATH"
fi
#
exec $SHELL
```
- 安装rails（国内最好换源）

```bash
sudo gem install rails --no-document
gem update
```
- 国内换源（https://gems.ruby-china.org/）

```bash
> gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
> gem sources -l
https://gems.ruby-china.org
# 确保只有 gems.ruby-china.org
```

## 初步使用
- 安装barckets（-bin）

    `yaourt barckets`
- 或安装sublime

    `yaourt sublime-text` / `sudo pacman -S sublime-text`
- 或安装visual-code

    `sudo pacman -S visual-studio-code`

- Rails

```bash
> rails new HelloWorld
> cd HelloWorld/
> rails g controller home  #rails d controller home
```

- 编辑 `controllers/home_controller.rb`

```ruby
class HomeController < ApplicationController
    def index
    end   
end
```
- 编辑 `views/home/index.html.erb`

```ruby
Hello World
```
- 编辑 `configs/routes.rb`

```ruby
Rails.application.routes.draw do
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root "home#index"
	end
```
- Rails Server

```bash
> rails s
```

## 禁用caffee
- Terminal

```bash
> rails d controller home
```
- 编辑`Gemfile`，注释`caffee`

```bash
23 # gem 'coffee-rails', '~> 4.2'
```
- 重新编辑 `controllers/home_controller.rb`，`views/home/index.html.erb`， `routes`可不动

- Terminal

```bash
> rake tmp:cache:clear
```
- rails s


## 禁用turbolinks, 容易和前端架构冲突，如react，轻量化可开启
- 编辑`Gemfile`，注释`turbolinks`

```bash
25 # gem 'turbolinks', '~> 5'
```
- 重新编辑 `app/assets/javascripts/application.js`，删除

```javascript
14 //= require turbolinks
```
- 重新编辑 `app/views/layouts/application.html.erb`，更改

```ruby
7  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
8  <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
->
7  <%= stylesheet_link_tag    'application', media: 'all' %>
8  <%= javascript_include_tag 'application' %>
```
- Terminal

```bash
> rake tmp:cache:clear
```
- rails s

---

## 增加转跳 Get 页面
### 增加 Get 在 `config/routes.rb`

```ruby
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

    root "home#index"

    get "first", to: "home#first"
    get "second", to: "home#second"
    get "post/:id", to: "home#show_post"
end
```

### def controller 在`app/controllers/home_controller.rb` (也可不定义默认不报错)
```ruby
class HomeController < ApplicationController
    def index
    end   

    def first
    end

    def second
    end

    def show_post
        @TestName = "Test" #@为全局变量
    end
end
```

### 增加`first.html.erb`, `second.html.erb`, `show_post.html.erb` 在`app/views/home/`目录下

## 显示所有routes
需 cd 至 rubyrails 文件夹下运行， 如果在更子目录下会自动跳转至主目录
```bash
> rake routes
```

## 用ruby语法安全替换html语法（预防死链）
```html
<%= link_to "First", first_url %>
<!--path始终从根目录-->
<%= link_to "First", first_path %>


<%= link_to "Second", second_path %>
<%= link_to "Posts/1", controller: :home, action: :show_post, id: 2, name: 'NameInBar' %>
<%= @testName %>

```

## 对于具体Html安全操作的ruby语句
```html
<%= link_to "<h1 style='color: brown;'>Hello</h1>".html_safe, root_path %>
<!--or-->
<%= link_to raw("<h1 style='color: brown;'>Hello</h1>"), root_path %>
<!--or-->
<%= link_to root_path do %>
	<h1 style='color: brown;'>Hello</h1>
<% end %>
```

## 制作 partial 的 layout
html.erb 端(比如，`app/views/layouts/application.html.erb`)
```html
<body>
	<%= render partial: 'layouts/nav' %>
	<%= yield %>
	<% if footerShow %>
		<%= render partial: 'layouts/footer' %>
	<% end %>
</body>
```
layout 端，命名需加下划线（如，添加`_nav.html.erb`, `_footer.html.erb` 至 `app/views/layouts/`）

## Ruby precompile feature
```bash
> rake assets: precompile #为了改变每次cache，生成随机
```
### 使用ruby链接至源文件（默认assets目录）
```html
<!--图片保存在assets里. -->
<img src="<%= image_path "1.jpg" %>" >
<%= image_tag "34.jpg" %>

<!--图片保存在`public/images`里,但无法被precompile. -->
<%= image_tag "/images/34.jpg", width: 300, hight: 200 %>
<%= image_tag "/images/34.jpg", style:"width:300px; height: 200px;" %>
```

---

## 增加字体 precompile
### Add `fonts.scss.erb` file_(first do ruby then css 先 ruby 再 css)_ in `app/assets/stylesheets/`
For example, `https://fonts.google.com/specimen/Encode+Sans?selection.family=Encode+Sans`

`app/assets/stylesheets/fonts.scss`
```css
/* latin-ext */
@font-face {
  font-family: 'Encode Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Encode Sans Regular'), local('EncodeSans-Regular'), url('<%= assets_url("EncodeSans-Regular.ttf")%>') format('truetype');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Encode Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Encode Sans Regular'), local('EncodeSans-Regular'), url('<%= assets_url("EncodeSans-Regular.ttf")%>') format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
```

`app/assets/stylesheets/application.css`
```css
body{
	ont-family: 'Encode Sans', sans-serif;
}
```

### Add `fonts` folder in `app/assets/` and copy the font file

[EncodeSans-Regular.ttf](https://fonts.google.com/specimen/Encode+Sans?selection.family=Encode+Sans)

### `config/initialzers/assets.rb` for add font compile

```ruby
#Add
Rails.application.config.assets.paths << Rails.root.join('app', 'asssets', 'fonts')
Rails.application.config.assets.precompile += %w( .svg .eot .woff .ttf)
```

## 改变 `app/assets/` 中 js 和 css 的加载顺序（不改变按照字母顺序加载）
`app/assets/javascipts/application.js` （jq需手动下载）
```js
//= require jquery/jquery-3.2.1.min
//= require_tree ./jquery
//= require z
//= require a
```

`app/assets/javascipts/application.css`
```css
*= require z
*= require a
```

## 增加 BootStrap
 - #### 改 js
`app/assets/javascipts/application.js`
```js
//= require rails-ujs
//= require_tree ./jquery
//= require_tree ./bootstrap
//= require_tree .
```

 - #### 改 css
`app/assets/javascipts/application.css`
```css
*= require bootstrap/bootstrap
*= require bootstrap/bootstrap-theme
*= require_tree .
*= require_self
```

 - #### 改 font 为 precompile 或者 直接放至 `public` 文件夹下
change `app/assets/stylesheets/bootstrap.css/` to `app/assets/stylesheets/bootstrap.css.erb/`
加入字体至 `app/assets/fonts/bootstrap/`

```css
@font-face {
  font-family: 'Glyphicons Halflings';
  src: url('<%= assets_url("bootstrap/glyphicons-halflings-regular.ttf")%>') format('truetype');
}
```

## 使用 Gem 安装 bootstrap 3
- `/Gemfile`改版本号
```bash
gem 'sass-rails', '-> 5.0'
gem 'bootstrap-sass', '-> 3.3.7'
```
- 终端更新
```bash
> bundle install
```

- rename `application.css` to `application.scss`

- import Bootstrap style in `app/assets/stylesheets/application.scss`
```css
@import "bootstrap-sprockets";
@import "bootstrap";
```
- 调整js `app/assets/javascipts/application.js`
```javascript
//= require jquery
//= require bootstrap-sprockets
```

## *只用 sass 丢进 RoR
- [下载sass](https://getbootstrap.com/getting-started/)
- 在 `app/assets` 放 `fonts`, `images`; `app/assets/javascript` 放 js； `app/assets/styelesheets`放 css
- 删掉 compile 的 js
- 调整js `app/assets/javascipts/application.js`
```javascript
//= require jquery
//= require bootstrap-sprockets
```

- rename `application.css` to `application.scss`
- 调整`app/assets/stylesheets/application.scss`, __remove all the `*= require_self` and `*= require_tree .`,__
```css
@import "bootstrap-sprockets";
@import "bootstrap";
```

---

## Rails ruby console mode
```ruby
> rails c

a = "aaa"
b = "bbb"
a.class
a.methods
ab = a + b #"aaabbb"
ab = "#{a}#{b}" #"aaabbb"
ab = '#{a}#{b}' #"\#{a}\#{b}"
ab = "a+b: #{a}, #{b}" #"a+b: aaa, bbb"
```

## Hash
```ruby
> rails c

o = {}
o.class #hash
o.a = "a" #!wrong
o["a"] = "a"
o["a"] #"a"
o.a #!wrong

o[:a] = "a1"
o["a"] = "a2"
"a".to_sym #:a
"a".class # String
:a.class # Symbol 更有效率

o = { :a => "a" } #{:a=>"a"}
o = { a: "a"} #{:a=>"a"}
```
### 应用
`app/controllers/home_controller.rb`
```ruby
class HomeController < ApplicationController
    def index
        @ad = {
            title: "大型广告",
            des: "这是一个广告",
            action_title: "点击"
            }

        #@ad_title = "大型广告"
        #@ad_des = "这是一个广告"
        #@ad_action_title = "点击"

    end   

end
```

`app/views/home/index.html.erb`
```html
...
<div class="jumbotron col-xs-12">
    <h1> <%= @ad[:title] %> </h1>
    <p> <%= @ad[:des] %> </p>
    <p><a class="btn btn-primary btn-lg" href="#" role="button"> <%= @ad[:action_title] %> </a></p>
</div>
...
```
_more..._

## Reference
- [Install-Ruby-on-Rails-Manjaro/](https://lvasquez.github.io/2014/08/10/Install-Ruby-on-Rails-Manjaro/)
- [Ruby_on_Rails](https://wiki.archlinux.org/index.php/Ruby_on_Rails)
- [ruby-china.org](https://gems.ruby-china.org/)
- [Progress Bar](https://www.youtube.com/playlist?list=PL2SrkGHjnWcxjbzuSI0k43hiIBJAqLHvh)
- [Bootstrap](https://getbootstrap.com/getting-started/)
- [Bootstrap CSS component](https://getbootstrap.com/docs/3.3/components/#navbar-forms/)
