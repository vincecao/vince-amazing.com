---
title: React for web 学习笔记
date: 2018-06-20 15:07:58
tags: 
- React
- Javascript
categories: Notes
---

## React

- JavaScript library for creating usr interface
- Work in browser `ReactDOM`, on a server `ReactDOMServer` and as an app `React Native`
- [awesome-react-render](http://goo.gl/FJfwxr)

### React Toolbox

- ES6
- [JSX](https://reactjs.org/docs/introducing-jsx.html): JavaScript Extension
- [Babel](https://babeljs.io/): JavaScript Transpiler (JSX -> JS / ES6 -> ES5)
- [Yarn](https://yarnpkg.com/lang/en/) (or [npm](https://www.npmjs.com/)): Dependency Manager
- [webpack](https://webpack.js.org/): JavaScript Bundler

### React Jargon

- State and props
- One-way data flow
- Virtual DOM
- Synthetic events

### Components & Elements

**Components**: React building blocks / JS functions or Classes / should be reusable / Can be abstruct / Made up by the elements

### React & CSS

Separation of concerns: components are more independent

### React Extension

React Developer Tools: [chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) / [firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

Shown in inspect
![](https://i.imgur.com/AzU3kUk.png 'Shown in inspect')

Toggle on the `Allow access to file URLs`
![](https://i.imgur.com/Z3gu8Ea.png 'Toggle on the Allow access to file URLs')

### import React js

``` html
<div id="react-root"></div>

<!--
Polyfills for older browsers
@see https://reactjs.org/docs/javascript-environment-requirements.html
<script crossorigin src="https://unpkg.com/core-js@2.5.1/client/shim.min.js"></script>
<script>window.core || document.write('<script src="../../../node_modules/core-js/client/shim.min.js"><\/script>')</script>
<script src="../../../assets/polyfills/raf-3.4.0-polyfill.min.js"></script>
-->

<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script>window.React || document.write('<script src="../../../node_modules/react/umd/react.development.js"><\/script>')</script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script>window.ReactDOM || document.write('<script src="../../../node_modules/react-dom/umd/react-dom.development.js"><\/script>')</script>
<script crossorigin src="https://unpkg.com/create-react-class@15/create-react-class.js"></script>

<!-- createReactClass for implement class states -->
<script>window.createReactClass || document.write('<script src="../../../node_modules/create-react-class/create-react-class.js"><\/script>')</script>

<!-- your own react code here -->
<script src="app.js"></script>

<!-- if use babel -->
<script src="app.js" type="text/babel"></script>

```

### `app.js`

``` js
(function () {
  "use strict";

  // Start here
  var ProductCustomizer = React.createElement('div', {
    className: "customizer"
  }, "Product customizer will go here");

  ReactDOM.render(ProductCustomizer, document.getElementById('react-root'));
  // ReactDOM.render(ProductCustomizer, document.querySelector('#react-root'));

})();
```

--- 

### React receate html mockup

- _Final html static way_

``` html
<div class="customizer">
    <div class="product-image">
        <img src="../../../assets/red.jpg" alt="" />
    </div>
    <div class="selectors">
        <div class="field-group">
            <label for="size-options">Size:</label>
            <select name="sizeOptions" id="size-options">
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
                <option>8.5</option>
                <option>9</option>
                <option>9.5</option>
                <option>10</option>
                <option>10.5</option>
                <option>11</option>
                <option>11.5</option>
                <option>12</option>
                <option>12.5</option>
            </select>
        </div>
        <div class="field-group">
            <label for="color-options">Color:</label>
            <select name="colorOptions" id="color-options">
                <option>Red</option>
                <option>Blue</option>
                <option>Green</option>
                <option>Brown</option>
            </select>
        </div>
    </div>
</div>
```

- Create `app.js`

``` js
(function () {
"use strict";

    function ProductImage(props) {
        // <img src="../../../assets/red.jpg" alt="" />

        return React.createElement("img", {
        src: "../../../assets/red.jpg",
        alt: "Product image"
        })
    }

    function ProductCustomizer(props) {
    return React.createElement(
    "div", 
    {
        className: "customizer"
    },
    React.createElement("div", {
        className: "product-image"
    }, React.createElement(ProductImage))
    );
}

    ReactDOM.render(React.createElement(ProductCustomizer), document.getElementById("react-root")); 
})();
```

- For avoid `React.createElement()`

    * Method One - Object syntax

    ``` js
    var rce = React.createElement;
    rce();
    ```

    * Method Two - JSX / Babel, ES6 class syntax

    ES6 class syntax used by JSX (need to use server)

        1. Add `babel` in `index.html`

        ``` html
        <script crossorigin src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        <script>window.Babel || document.write('<script src="../../../node_modules/babel-standalone/babel.min.js"><\/script>')</script>

        <!-- modify type to babel -->
        <script src="app.js" type="text/babel"></script>
        ```

        2. Change js to jsx

        ``` js
        (function () {
            "use strict";

            function ProductImage(props) {

                return <img src = "../../../assets/red.jpg"
                alt = "Product image" / > ;
            }

            function ProductCustomizer(props) {
                // return React.createElement(
                //   "div", {
                //     className: "customizer"
                //   },
                //   React.createElement("div", {
                //     className: "product-image"
                //   }, React.createElement(ProductImage))
                // );

                return (
                <div className="customizer">
                    <div className="product-image">
                    <ProductImage />
                    </div>
                </div>
                );
            }

            ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
        })();
        ```

- Add one external js

    1. Edit external js

    ``` js
    window.Inventory = {
        allSizes: (function(small, large) {
            var sizes = [];
            for (var i = small; i <= large; i++) {
            sizes.push(i);
            sizes.push(i + 0.5);
            }

            return sizes;
        })(7, 12),

        allColors: ['red', 'blue', 'green', 'purple', 'brown'],

        bySize: {
            "7": [
            "red", "blue"
            ],
            "7.5":  [
            "red", "blue"
            ],
            "8":  [
            "red", "brown", "green", "purple", "blue"
            ],
            "8.5":  [
            "red", "blue"
            ],
            "9":  [
            "brown", "green", "purple"
            ],
            "9.5":  [
            "brown", "green", "purple"
            ],
            "10":  [
            "brown", "green", "purple"
            ],
            "10.5":  [
            "brown", "green", "purple"
            ],
            "11":  [
            "brown", "green", "purple"
            ],
            "11.5":  [
            "brown", "green", "purple"
            ],
            "12":  [
            "brown", "green", "purple"
            ],
            "12.5":  [
            "brown", "green", "purple"
            ]
        },

        byColor: {
            "red" : ["7", "7.5", "8", "8.5"],
            "blue" : ["7", "7.5", "8", "8.5"],
            "brown" : ["8", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5"],
            "purple" : ["9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5"],
            "green" : ["8", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5"]
        }
    };
    ```

    2. Modify `app.js` more for select with external data js

    ``` js
    (function() {
        "use strict";

        function SizeSelector(props) {
            function sizeOptions() {
                var sizes = window.Inventory.allSizes;
                
                //sizes.map is loop work for each element in the array

                return sizes.map(function(num) {
                    return (
                        //key is needed to be unique for React rendering correct
                        <option value={num} key={num}>
                            {num}
                        </option>
                    );
                });
            }

            return (
                <div className="field-group">
                    <label htmlFor="size-options">Size:</label>
                    <select name="sizeOptions" id="size-options">
                    {sizeOptions()}
                    </select>
                </div>
            );
        }

        function ProductImage(props) {
            return (
                <img src="../../../assets/red.jpg" alt="Product Image" />
            );
        }

        function ProductCustomizer(props) {
            return (
                <div className="customizer">
                    <div className="product-image">
                    <ProductImage />
                    </div>
                    <div className="selectors">
                    <SizeSelector />
                    </div>
                </div>
            );
        }

        ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
    })();
    ```

- Use `props`

``` js
(function() {
    "use strict";

    function SizeSelector(props) {
    function sizeOptions() {
        var sizes = window.Inventory.allSizes;

        return sizes.map(function(num) {
            return (
                <option value={num} key={num}>
                {num}
                </option>
            );
        });
    }

    return (
        <div className="field-group">
        <label htmlFor="size-options">Size:</label>
        <select defaultValue={props.size} name="sizeOptions" id="size-options">
            {sizeOptions()}
        </select>
        </div>
    );
    }

    function ProductImage(props) {
    return (

        //ES6 way
        
        <img src={`../../../assets/${props.color}.jpg`} alt="Product Image" />

        //old way

        <img src={"../../../assets/" + props.color + ".jpg"} alt="Product Image" />
    );
    }

    function ProductCustomizer(props) {
    return (
        <div className="customizer">
        <div className="product-image">
            <ProductImage color="red" />
        </div>
        <div className="selectors">
            <SizeSelector size={8} />
        </div>
        </div>
    );
    }

    ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
})();

```

- Implement `states`

    1. Make sure `createReactClass` is added in `index.html`

    ``` html
    <!-- createReactClass for implement class states -->
    <script>window.createReactClass || document.write('<script src="../../../node_modules/create-react-class/create-react-class.js"><\/script>')</script>
    ```

    2. Edit `app.js`

        - Method One - Object syntax

        ``` js
        (function() {
            "use strict";

            function SizeSelector(props) {
                function sizeOptions() {
                    //var sizes = window.Inventory.allSizes; //move it to the ProductCustomizer render function
                    return props.sizes.map(function(num) {
                        return (
                            <option value={num} key={num}>
                                {num}
                            </option>
                        );
                    });
                }

                return (
                <div className="field-group">
                    <label htmlFor="size-options">Size:</label>
                    <select defaultValue={props.size} name="sizeOptions" id="size-options">
                    {sizeOptions()}
                    </select>
                </div>
                );
            }

            function ProductImage(props) {
                return (
                    <img src={`../../../assets/${props.color}.jpg`} alt="Product Image" />
                );
            }

            var ProductCustomizer = createReactClass({
                getInitialState: function() { //like constructor
                    var sizes = window.Inventory.allSizes;
                    return {
                        color: "red",
                        size: 8,
                        sizes: sizes
                    };
                },

                render: function() {
                    return (
                        <div className="customizer">
                        <div className="product-image">
                            <ProductImage color={this.state.color} />
                        </div>
                        <div className="selectors">
                            <SizeSelector size={this.state.size} sizes={this.state.sizes} />
                        </div>
                        </div>
                    );
                }
            });

            ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
        })();
        ```
        - Method Two - ES6 class syntax
    
- React Listener

``` js
function onSizeChange(evt) { //used in html as onChange()
    console.log("Change event fired", evt.target.value);
}
```

To make the change happen, add `state` in the parent, then pass to child as `props`

> React会根据props或state更新视图状态。虽然二者有些类似，但应用范围确不尽相同。具体表现如下：
> - props会在整个组件数中传递数据和配置，props可以设置任命类型的数据，应该把它当做组件的数据源。其不但可以用于上级组件与下组件的通信，也可以用其做为事件处理器。
> - state只能在组件内部使用，state只应该用于存储简单的视图状（如：上面示例用于控制下拉框的可见状态）。
>
> props和state都不能直接修改，而应该分别使用setProps()和setSate()方法修改。

完整代码
``` js
(function() {
    "use strict";

    function SizeSelector(props) {
        function sizeOptions() {
        return props.sizes.map(function(num) {
            return (
                <option value={num} key={num}>
                    {num}
                </option>
            );
        });
        }

        function onSizeChange(evt) {
            //调用 props 中的 handleSizeChange 方法,因为该方法是和 state 一样从 parent 传给 <SizeSelector />, 再传给他的 child 的, 所以每个child都有

            console.log("Change event fired", evt.target.value);
            props.handleSizeChange(evt.target.value); 
        }

        return (
            //add onSizeChange() in <select /> as listener
        <div className="field-group">
            <label htmlFor="size-options">Size:</label>
            <select
                defaultValue={props.size}
                name="sizeOptions"
                id="size-options"
                onChange={onSizeChange}>
                {sizeOptions()}
            </select>
        </div>
        );
    }

    function ColorSelector(props) {
        function colorOptions() {
        return props.colors.map(function(name) {
            return (
                <option value={name} key={name}>
                    {name}
                </option>
            );
        });
        }

        return (
        <div className="field-group">
            <label htmlFor="color-options">Color:</label>
            <select defaultValue={props.color} name="colorOptions" id="color-options">
                {colorOptions()}
            </select>
        </div>
        );
    }

    function ProductImage(props) {
            return <img src={`../../../assets/${props.color}.jpg`} alt="Product Image" />;
    }

    var ProductCustomizer = createReactClass({
        getInitialState: function() {
            var sizes = window.Inventory.allSizes,
                colors = window.Inventory.allColors;

            return {
                color: "red",
                colors: colors,
                size: 8,
                sizes: sizes
            };
        },
        //add handleSizeChange() in to pass to the child
        handleSizeChange: function(selectedSize) {
            var availableColors = window.Inventory.bySize[selectedSize];
            //make this.setState in the function of parent
            this.setState({
                colors: availableColors
            });
        },

        render: function() {
            return (
                //add handleSizeChange() in <SizeSelector /> to pass to the child
                <div className="customizer">
                <div className="product-image">
                    <ProductImage color={this.state.color} />
                </div>
                <div className="selectors">
                    <SizeSelector
                    size={this.state.size}
                    sizes={this.state.sizes}
                    handleSizeChange={this.handleSizeChange}
                    />
                    <ColorSelector color={this.state.color} colors={this.state.colors} />
                </div>
                </div>
            );
        }
    });

    ReactDOM.render(<ProductCustomizer />, document.getElementById  ("react-root"));
})();

```

- Continue: https://www.lynda.com/React-js-tutorials/Make-plan/645063/731460-4.html

## Reference
- [Notes](https://www.lynda.com/React-js-tutorials/React-Web-Designers/645063-2.html)
- [React 数据流与状态控制－props与sate的区别](https://itbilu.com/javascript/react/4k5RfzDKx.html#props-state)