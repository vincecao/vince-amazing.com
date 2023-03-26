---
title: Some examples of using Mustache templates.
date: 2018-07-03 11:10:36
tags: 
- Javascript
- html
categories: Notes
---
Just found `Mustache` is an elegent but powerful minimal templating tool. It supports many languages. Here is some notes of example for using [Mustache](https://mustache.github.io/) in JavaScript.

# Add `mustache.js` file
[mustache.min.js](https://github.com/janl/mustache.js)

``` html
<script src="../js/mustache.min.js"></script>
```

# The example from official tutorial

``` json
//A typical Mustache template:
Hello {{name}}
You have just won {{value}} dollars!
{{#in_ca}}
Well, {{taxed_value}} dollars, after taxes.
{{/in_ca}}
Given the following hash:

{
    "name": "Chris",
    "value": 10000,
    "taxed_value": 10000 - (10000 * 0.4),
    "in_ca": true
}

//Will produce the following:

Hello Chris
You have just won 10000 dollars!
Well, 6000.0 dollars, after taxes.
```

--- 
# Single html file using Mustache.js

## [Mustache.js example](https://codepen.io/SitePoint/pen/YyRxdP)

{% codeblock index.html lang:html %}
<div id="target"></div>

<script id="template" type="x-tmpl-mustache">
    <p>Use the <strong>{{power}}</strong>, {{name}}!</p>
</script>
{% endcodeblock %}

{% codeblock main.js lang:js %}
window.onload = function() {
    //Grab the inline template
    var template = document.getElementById('template').innerHTML;

    //Parse it (optional, only necessary if template is to be used again)
    Mustache.parse(template);

    //Render the data into the template
    var rendered = Mustache.render(template, {name: "Luke", power: "force"});

    //Overwrite the contents of #target with the rendered HTML
    document.getElementById('target').innerHTML = rendered;
}
{% endcodeblock %}

## [Mustache JS - Template Sample](https://codepen.io/johnsonshara/pen/jqeNZK)

{% codeblock index.html lang:html %}
<div id="output"></div>

<script type="text/html" id="test">
    <h1>{{Book}}</h1>
    <span>Auhtor </span>
    <span>{{Author}} </span>  
    <span>Category </span>
    <span>{{Category}} </span> 
</script>
{% endcodeblock %}

{% codeblock main.js lang:js %}
$(document).ready(function(){ 

    var template = $('#test').html();
    var output = $('#output');

    var data = {
        "Book": "Rich Dad Poor Dad",
        "Author": "Robert Kiyosaki",
        "Category" : "Finance"
    }

    var result = Mustache.render(template, data);
    output.append(result);

});
{% endcodeblock %}

---

# For Loop Sample

## [Mustache JS - For Loop Sample](https://codepen.io/johnsonshara/pen/mPzbBO)

``` html index.html
<div id="output"></div>
<script type="text/template" id="test">
	<h1>{{Subject}}</h1>
    <ul>
        {{#names}}
            <li>{{name}}</li>
        {{/names}}
    </ul>
</script>
```

{% codeblock main.js lang:js %}
$(document).ready(function(){ 
    var template = $('#test').html();
    var output = $('#output');

    var data = {
        "Subject": "Template Engines",
        "names": [
            {"name": "Mustache"},
            {"name": "HandleBar"}
        ]
    };

    var result = Mustache.render(template, data);

    output.append(result);

});
{% endcodeblock %}