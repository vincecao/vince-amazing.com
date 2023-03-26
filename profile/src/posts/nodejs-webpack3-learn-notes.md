---
title: Nodejs - Webpack3 学习笔记
date: 2018-06-15 11:25:27
tags: 
- Javascript
- Nodejs
categories: Notes
---

## Benefits

- Require assets, which are loaded when needed
- Code splitting
- Transformations

---

## Start and generate _bundle.js_

### 1. Install and init within the project folder.

``` bash
npm init
```

New _package.json_ file is generated as example

``` json
{
	"name": "webpack-overview",
	"version": "1.0.0",
	"description": "test",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "Vince",
	"license": "ISC"
}
```

### 2. Install the webpack

- At the same tome to save it as flag into the json dependencies for all folders

``` bash
npm install webpack @3 .6 .0--save - dev
```

- Run install again for other folders

``` bash
npm install
```

### 3. Create `bundle.js`

Create a `index.js`, we aim to get it as `bundle.js`

``` bash
node_modules /.bin/webpack index.js bundle.js
```

### 4. Use more optimized way

- Moving `index.js` to `./src/`

- Create webpack config file `webpack.config.js` in the root `/`. This way can keep the file more organized

``` js
module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js"
	}
};
```

- Run in termanial with webpack config file

``` bash
node_modules /.bin/webpack
```

- For specific the dist folder of `bundle.js`, `change webpack.config.js`

``` js
const path = require("path");
module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(_dirname, "dist")
	}
};
```

### 5. Use `bundle.js` in `index.html`

``` html
<script src = "./dist/bundle.js" ></script>
```

---

## Set npm build command with webpack

- Edit `package.json`

``` json
{
	"name": "webpack-overview",
	"version": "1.0.0",
	"description": "test",
	"main": "index.js",
	"scripts": {
		"build": "webpack"
	},
	"author": "Vince",
	"license": "ISC"
}
```

- Use build command to run the webpack

``` bash
npm run build
```

---

## Add watch when each save happen

- Edit `package.json`

``` json
{
	"name": "webpack-overview",
	"version": "1.0.0",
	"description": "test",
	"main": "index.js",
	"scripts": {
		"build": "webpack",
		"watch": "webpack --w"
	},
	"author": "Vince",
	"license": "ISC"
}
```

- run the watch command, get new bundle real time

``` bash
npm run watch
```

---

## Webpack Loaders

- Perform transformations on files
- Help load files and images
- Deal with dialects

### Babel-loader

Transpiling JSX or ES6 -- Babel --> plaint js

#### Config `webpack.config.js`

``` js
const path = require("path")
module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(_dirname, "dist")
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
				loader: "babel-loader",
				options: {
					presets: ["env"]
				}
			}
		}]
	}
}
```

#### `npm` install loader

Install `babel-loader` `babel-core` and `babel-preset-env` by npm

``` bash
npm install babel-loader babel-core babel-preset-env --save-dev
```

#### Create config file `.babeirc` for babel

Create `.babeirc` file in root

``` js
{
	"presets": ["env"]
}
```

#### `npm` build command (es6 to es5)

use build command to run the webpack

``` bash
npm run build
```

### Babel-loader enable `stage-0` features on [tc39 proposals](https://github.com/tc39/proposals)

- On terminal

``` bash
#from stage 0 to 3
npm install babel-preset-stage-0 --save-dev
```

- Edit `webpack.config.js`

``` js
options: {
	presets: ["env", "stage-0"];
}
```

- Edit `.babeirc` file in root

``` js
{
	"presets": ["env", "stage-0"]
}
```

- Use npm build

``` bash
npm run build
```

### Babel-preset-react

- install `babel-preset-react`, `react`, `react-dom`, and `serve`

``` bash
npm install babel-preset-react --save-dev
npm install react react-dom --save

#install serve
sudo npm install serve -g
```

- Edit `index.js`

``` js
import React from 'react'
import ReactDOM from 'react-dom`

const MyComponent = () => <h1>Webpack &amp; React</h1>

ReactDOM.render(<MyComponent />, document.getElementById('react-container'))
```

- Edit `index.html`

``` html
<!-- add -->
<div id="react-container"></div>
```

- Edit `package.json` add `serve`

``` json
"scripts":{
	"build": "webpack && serve",
	"watch": "webpack --w"
}
```

- Run build command

``` bash
npm run build
```

- Edit `webpack.config.js`

``` js
options: {
	presets: ["env", "stage-0", "react"];
}
```

- Edit `.babeirc` file in root

``` js
{
	"presets": ["env", "stage-0", "react"]
}
```

---

## load style with react way
### load css
- Edit `index.js`

``` js
import React from 'react'
import ReactDOM from 'react-dom`
import './style.css'

const Message extends React.Component {
	render(){
		return (
			<div>
				<h1>{this.props.title}</h1>
				<p>{this.props.message}</p>
			</div>
		)
	}
}

ReactDOM.render(<Message title="Email Alex" message="Email him" />, document.getElementById('react-container'))
```

- Create a new file `style.css` on `./src/` folder with simple style

``` css
h1 {
	font-family: Arial;
	color: #ff0000;
}
```

- install style and other loaders on terminal

``` bash
npm install style-loader css-loader --save-dev
```

- Change `webpack.config.js` with `style-loader` and `css-loader`

``` js
const path = require("path")

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(_dirname, "dist")
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}]
    }
}
```

- npm run command

``` bash
npm run build
```

### load scss
- Create a new file `style.scss` on `./src/` folder with simple style

``` scss
$green: #00FF00;
$white: #FFFFFF;

div{
	background-color: $green;
	color: $white;
}
```

- Edit `index.js` file

``` js
import './style.scss'
```

- install more loaders on terminal

``` bash
npm install sass-loader node-sass --save-dev
```

- Change `webpack.config.js` with scss

``` js
const path = require("path")

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(_dirname, "dist")
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "sass-loader"}
			]
		}]
    }
}
```

- npm run command

``` bash
npm run build
```

### load image
- Create a new file `style.scss` on `./src/` folder with simple style

``` scss
#image{
	background: url('123.png');
	height: 900px;
	width: 900px;
}
```

- install loaders on terminal

``` bash
npm install url-loader file-loader --save-dev
```

- Edit `index.js`

``` js
import React from 'react'
import ReactDOM from 'react-dom`
import './style.css'

const Image extends React.Component {
	render(){
		return (
			<div>
				<h1>{this.props.title}</h1>
				<p>{this.props.caption}</p>
				<div id="image"></div>
			</div>
		)
	}
}

ReactDOM.render(<Image title="Title" caption="Caption" />, document.getElementById('react-container'))
```

- Change `webpack.config.js` with image-loader

``` js
const path = require("path")

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(_dirname, "dist")
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "sass-loader"}
			]
		}, {
			test: /\.jpg$/,
			use: [
				{loader: "url-loader"}
			]
		}]
    }
}
```

- npm run command

``` bash
npm run build
```

---

## Webpack-dev-server
- Node.js Express server
- webpack-dev-middleware
- Socket.IO

### Dev Server
- install on terminal

``` bash
npm install webpack-dev-server --save-dev
```

- Change `webpack.config.js` with dev-server

``` js
const path = require("path")

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(_dirname, "dist")
	},

	devServer: {
		contentBase: path.join(_dirname, "dist"),
		port: 8080
	},

	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "sass-loader"}
			]
		}, {
			test: /\.jpg$/,
			use: [
				{loader: "url-loader"}
			]
		}]
    }
}
```

- Create a `index.html` under `./dist/`

``` html
<!DOCTYPE html>
<html>
	<head>
		<title>webpack</title>
	</head>
	<body>
		<div id="react-container"></div>
		<script src="./bundle.js"></script>
	</body>
</html>
```

- Add command in `package.json`

``` json
"scripts": {
	"build": "webpack && serve",
	"dev": "webpack-dev-server",
	"watch": "webpack --w"
}
```

- Make some modify in `index.js` to change the bundle

``` js
import React from 'react'
import ReactDOM from 'react-dom`
import './style.css'

const Image extends React.Component {
	// add the constructor
	constructor(props){
		super()
		this.state = {
			title: "Peaks"
		}
	}
	render(){
		return ( //change props to state
			<div>
				<h1>{this.state.title}</h1>
				<p>{this.props.caption}</p>
				<div id="image"></div>
			</div>
		)
	}
}

//remove the title
ReactDOM.render(<Image caption="Caption" />, document.getElementById('react-container'))
```

- npm run dev-server command

``` bash
npm run dev
```

- Go to localhost:8080 and each save will show on the browser

---

## Code splitting
- Create new `about.html` and `about.js` in `./src/`
_about.html_

``` html
<!DOCTYPE html>
<html>
<head>	
	<title>About</title>
</head>
<body>
	<div id="react-container"></div>
	<script type="text/javascript" src="../build/about.bundle.js"></script>
</body>
</html>
```

_about.js_

``` js
//es6 features, since we only use Component from React and reder from reactDOM
import { Component } from 'react'
import { render } from 'react-dom'

class About extends Component {
	render(){
		return (
			<div> This is info </div>
		)
	}
}

render(<About />, document.getElementById('react-contianer'))
```

- Create new `contact.html`, `contact.js` in `./src/`

``` html
<!DOCTYPE html>
<html>
<head>	
	<title>Contact</title>
</head>
<body>
	<div id="react-container"></div>
	<script type="text/javascript" src="../build/contact.bundle.js"></script>
</body>
</html>
```

_contact.js_

``` js
//es6 features, since we only use Component from React and reder from reactDOM
import { Component } from 'react'
import { render } from 'react-dom'

class Contact extends Component {
	render(){
		return (
			<div> Contact to us</div>
		)
	}
}

render(<Contact />, document.getElementById('react-contianer'))
```

- Edit the `webpack.config.js` with `entry` and `output`

``` js
const path = require("path")

module.exports = {
	// entry: "./src/index.js",
	entry: {
		about: "./src/about.js",
		contact: "./src/contact.js"
	},
	output: {
		// filename: "bundle.js",
		filename: "[name].bundle.js"
		path: path.join(_dirname, "dist")
	},

	devServer: {
		contentBase: path.join(_dirname, "dist"),
		port: 8080
	},

	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "sass-loader"}
			]
		}, {
			test: /\.jpg$/,
			use: [
				{loader: "url-loader"}
			]
		}]
    }
}
```

- npm run command

``` bash
npm run build
```

- Can see two bundle create

---

## Plugins -- use commons chunk bundle
- Edit the `webpack.config.js`

``` js
const path = require("path")
//add webpack const
const webpack = require("webpack")

module.exports = {
	entry: {
		about: "./src/about.js",
		contact: "./src/contact.js"
	},
	output: {
		filename: "[name].bundle.js"
		path: path.join(_dirname, "dist")
	},
	devServer: {
		contentBase: path.join(_dirname, "dist"),
		port: 8080
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "sass-loader"}
			]
		}, {
			test: /\.jpg$/,
			use: [
				{loader: "url-loader"}
			]
		}]
    },
	//add plugins
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: "commons.bundle.js"
		})
	]
}
```

- Edit the `about.html` and `contact.html` with common bundle

``` html
<body>
	<div id="react-container"></div>
	<script type="text/javascript" src="../build/common.bundle.js"></script>
	<script type="text/javascript" src="../build/*.bundle.js"></script>
</body>
```

- npm run command

``` bash
npm run build
```

---

## Building Vendor files

- `/src/index.js` (only file in src)

``` js
import { Component } from 'react'
import { render } from 'react-dom'

class Display extends Component {
	render(){
		return (
			<div> Display index</div>
		)
	}
}

render(<Display />, document.getElementById('react-contianer'))
```

- Modify `/webpack.config.js`

``` js
const path = require("path")
const webpack = require("webpack")

module.exports = {
	entry: {
		// about: "./src/about.js",
		// contact: "./src/contact.js"
		vendor: ["react", "react-dom"],
		app: "./src/index.js"
	},
	output: {
		filename: "[name].bundle.js"
		path: path.join(_dirname, "dist")
	},
	devServer: {
		contentBase: path.join(_dirname, "dist"),
		port: 8080
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "sass-loader"}
			]
		}, {
			test: /\.jpg$/,
			use: [
				{loader: "url-loader"}
			]
		}]
    },
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			// name: "commons",
			// filename: "commons.bundle.js"
			name: "vendor",
			filename: "vendor.bundle.js"
		})
	]
}
```

- npm run command

``` bash
npm run build
```

---

## HTML webpack plugin

- Install `html-webpack-plugin`

``` bash
npm install html-webpack-plugin --save-dev
```

- Modify `/webpack.config.js`

``` js
const path = require("path")
const webpack = require("webpack")
//add new plugin
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	entry: {
		vendor: ["react", "react-dom"],
		app: "./src/index.js"
	},
	output: {
		filename: "[name].bundle.js"
		path: path.join(_dirname, "dist")
	},
	devServer: {
		contentBase: path.join(_dirname, "dist"),
		port: 8080
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "sass-loader"}
			]
		}, {
			test: /\.jpg$/,
			use: [
				{loader: "url-loader"}
			]
		}]
    },
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.bundle.js"
		}),
		//new plugin
		new HTMLWebpackPlugin()
	]
}
```

- `/src/index.js` remain same

- npm run command

``` bash
npm run build
```

- New `/dist/index.html` generated, with correct order of `vendor.bundle.js` and `app.bundle.js`

---

## uglifyjs - Minify, get bundle in oneline

- Install `ulgifyjs-webpack-plugin`

``` bash
npm install ulgifyjs-webpack-plugin --save-dev
```

- Replace `/src/index.js`

``` js
const add = (x, y) => x + y
```

- Modify `/webpack.config.js`

``` js
const path = require("path")
const webpack = require("webpack")
//add uglyify plugin
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
	// entry: {
	// 	vendor: ["react", "react-dom"],
	// 	app: "./src/index.js"
	// },

	entry: "./src/index.js",
	output: {
		filename: "[name].bundle.js"
		path: path.join(_dirname, "dist")
	},
	devServer: {
		contentBase: path.join(_dirname, "dist"),
		port: 8080
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /(node_modules)/
			use: {
		loader: "babel-loader",
		options: {
			presets: ["env", "stage-0", "react"]
		}
			}
		}, {
			test: /\.css$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"}
			]
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
				{loader: "css-loader"},
				{loader: "sass-loader"}
			]
		}, {
			test: /\.jpg$/,
			use: [
				{loader: "url-loader"}
			]
		}]
    },
	//remove the plugins
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "vendor",
		// 	filename: "vendor.bundle.js"
		// }),
		// new HTMLWebpackPlugin()
		new UglifyJsPlugin()
	]
}
```

- npm run command

``` bash
npm run build
```

- Check the `/dist/main.bundle.js` is inlined

- **Show progress** in command, edit `/package.json`
``` json
"scripts": {
	"build": "webpack --progress && serve",
	"dev": "webpack-dev-server",
	"watch": "webpack --w"
}
```

## Reference
- [Note](https://www.lynda.com/Webpack-tutorials/Learning-Webpack-3/628711-2.html)
- [webpack](https://webpack.js.org/)
- [babel](http://babeljs.io/repl/)
...
