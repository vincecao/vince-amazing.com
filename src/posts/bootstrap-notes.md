---
title: Bootstrap Notes
date: 2019-03-07 14:38:37
tags:
- CSS
- Bootstrap
- Javascript
categories: Notes
---


## Heading Class

``` html
<div class="h1">this is heading 1</div>
<div class="display-4">this is bigger display font</div>
<div class="lead">this is lead paragraph</div>
```

## Alignment Utilities Class

- `text-center` / left / right
- `text-justify`
- `text-nowrap`
- `text-(xx)-(pos)`; xx: sm(>576), md(>768), lg(>992), xl(>1200) ; pos: left, center, right  
- --------------------------
- `text-lowercase`
- `text-uppercase`
- `text-capitalize`
- --------------------------
- `font-weight-bold`
- `font-weight-normal`
- `font-weight-italic`

## List Class

- `list-unstyled`: no bullets
- `list-inline` and `list-inline-item`

``` html
<ul class="list-inline">
    <li class="list-inline-item">item 1</li>
    <li class="list-inline-item">item 2</li>
    <li class="list-inline-item">item 3</li>
    <li class="list-inline-item">item 4</li>
    <li class="list-inline-item">item 5</li>
    <li class="list-inline-item">item 6</li>
</ul>
```

## Blockquote Class
- `blockquote`
- `blockquote-reverse`
- `blockquote-fotter`

## Text Color
- `text-COLOR`, primary, secondary, success, danger, warning, info, light, dark, white
- `bg-COLOR`, background: faded

## Image Class
### Image
- `img-fluid`
- `rounded`, `rounded-DIR`: top, right, bottom, left, circle, rounded-0
- `img-thumbnail`, 1px boder

### Image Align
- `float-left`
- `text-center`
- `mx-auto`, horizontally centering fixed-width block level content

### Figure
- `figure` in <figure>
- `figure-img`
- `figure-caption`, in <figcaption>

## Varibles
### Color/Contextual Variables
- `--blue`, `--indigo`, `--purple`, `--pink`, `--red`, `--orange`, `--yellow`, `--green`, `--teal`, `--cyan`, `--white`, `--gray`, `--gray-dark`
- `--light`, `--dark`
- `--primary`, `--secondary`, `--success`, `--info`, `--warning`, `--danger`

### Media Queries
- `--breakpoint-xs`, `--breakpoint-sm`, `--breakpoint-md`, `--breakpoint-lg`, `--breakpoint-xl`

### Fonts
- `--font-family-sans-serif`, `--font-family-monospace`

### Usage
``` html
<h2 style="color: var(--yellow);"></h2>
```

### Redefine
Can only alternative with css variable but not rebuild class
``` css
:root{
    --pink: #C4226F;
}
```

## Grid
- Responsive 12-column
- Flexbox Based

### Structure
- Containers
  - `container`
  - `container-fluid`
  - 12px padding
  - BreakPoints: **<576px**, **576px**, **768px**, **992px**, **1200px**
- Rows/Columns, `row` should inside the `container`, col inside the `row`
  - Columns
    - 12 col grid and can Span
    - `col(-BP)(-COL)`, BP, breakpoint: sm, md, lg, xl / COL, always try to span # of 12: 1-12, e.g. 
      - `col-md-6`: if bigger than md, col will take 50%, otherwise will not work
      - `col-6`

### example
``` html
<div class="container">
    <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <p>Bootstrap also includes an .mx-auto class for horizontally centering fixed-width block level content—that is, content that has display: block and a width set—by setting the horizontal margins to auto.</p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <p>Bootstrap also includes an .mx-auto class for horizontally centering fixed-width block level content—that is, content that has display: block and a width set—by setting the horizontal margins to auto.</p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <p>Bootstrap also includes an .mx-auto class for horizontally centering fixed-width block level content—that is, content that has display: block and a width set—by setting the horizontal margins to auto.</p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <p>Bootstrap also includes an .mx-auto class for horizontally centering fixed-width block level content—that is, content that has display: block and a width set—by setting the horizontal margins to auto.</p>
        </div>
    </div><!--<row> -->
</div><!--<container> -->
```

### Offset col
for move # in 12 of col at the begining, `offset-sm-2`, 
`offset-md-3`

### Delete Gutters
`no-gutters`

### Nesting col
Create Row inside Col

### Order of Column
`order-ORD`, ord is number, assign all column one by one is best

### Make flex
e.g.
``` html
<section class="col d-flex flex-column">
    <img class="order-2" src="images/image.png" alt="sample image">
    <h4>1. Exotic Pets</h4>
    <p>We offer <strong>specialized</strong> care for <em>reptiles, rodents, birds,</em> and other exotic pets.</p>
</section>
```

### Grid Alignment

#### Vertial Alignment
- Use in Row
- `align-items-ALN`, ALN: start, center, end
- Works on nested cols

e.g. with one center example that match the img
``` html
<div class="container">
    <div class="row">
        <div class="col align-items-center">
            <div class="row">
                <div class="col align-items-start"> <!--or not, start is default-->
                </div>
            </div>
        </div>
    </div>
</div>
```

#### individal Alignment
- Use in Col
- `align-self-ALN`, ALN: start, center, end

#### Horizontal Alignment
- Use in rows
- Need col width
- `justify-content-ALN`, ALN: start, center, end, around, between

## Positioon
- `fixed-top`
- `fixed-bottom`
- `sticky-top`

## Basic Display
- `d(-BP)-TYP`， BP: sm, md, lg, xl; TYP: none, inline, inline-block, block, table, table-row, table-cell, flex, inline-flex
- `d-none d-print-block`, only showing in printer

## Flex

### [Flex Container](https://www.lynda.com/Bootstrap-tutorials/Flexbox-container-options/372545/702965-4.html?autoplay=true)
- display, `d(-BP)(-inline)-flex`
- direction, `flex(-BP)(-DIR)(-reverse)`, DIR: row, column
- order, `order(-BP)-ORD`
- justify, `justify-content(-BP)-ALG`, ALG: start, center, end, around, between
- Wrap, `flex(-BP)-WRP(-reverse)`, WRP: wrap, nowrap
- Vertical Alignment, `align-content(-BP)-ALG`,ALG: start, center, end, around, between, stretch(fit the containter vertically)

### [Flex individual item](https://www.lynda.com/Bootstrap-tutorials/Individual-flex-elements/372545/722291-4.html?autoplay=true)
- Align Self, `align-self(-BP)-ALG`,ALG: start, center, end, baseline, stretch
- Controlling order, `order(-BP)-ORD`

## [Float](https://www.lynda.com/Bootstrap-tutorials/Floating-elements/372545/702967-4.html?autoplay=true)

## [Sizing](https://getbootstrap.com/docs/4.1/utilities/sizing/)
- [Margin and padding](https://www.lynda.com/Bootstrap-tutorials/Margin-padding/372545/702968-4.html?autoplay=true)
    - m-(1-5, auto)
    - mx-(1-5, auto)
    - my-(1-5, auto)
    - p-(1-5, auto)
    - px-(1-5, auto)
    - py-(1-5, auto)
- Width
    - `w-25`
    - `w-50`
    - `w-75`
    - `w-100`
- Height
    - `h-25`
    - `h-50`
    - `h-75`
    - `h-100`
    - `mh-100`, maxheight


## Visibility
`visible`, `invisible`, use `d-sm-none` more useful

## [Sizing](https://www.lynda.com/Bootstrap-tutorials/Sizing-utilities/372545/702970-4.html?autoplay=true)

## Border
- `border(-SID)(-COLOR)(-0)`, SID: top, right, left, bottom / COLOR: primary, secondary, success, danger, warning, info, light, dark, white
- Border-radius, `ROUNDED(-SID)(-CIRCLE)(-0)`, SID: right, left, top, bottom

## Navigation
- Navs
- Tabs
- Pills
- Navbars

### Nav
- `nav`
- `nav-item`
- `nav-link`
  - `active`
  - `disabled`

### Nav style
- `nav-pills`
- `nav-tabs`

### Nav Alignment
- `justify-content-center`
- `justify-content-end`
- `nav-fill`, auto width
- `nav-justified`, all same width
- `flex-column`

### Example
``` html
<ul class="nav nav-pills nav-justified">
    <li class="nav-item"><a class="nav-item nav-link active" href="#">aaaaa</a></li>
    <li class="nav-item"><a class="nav-link" href="#">b</a></li>
    <li class="nav-item"><a class="nav-link" href="#">vvvv</a></li>
    <li class="nav-item"><a class="nav-link disabled" href="#">d</a></li>
</ul>

<nav class="nav nav-tabs justify-content-end">
    <a class="nav-item nav-link active" href="#">a</a>
    <a class="nav-item nav-link" href="#">b</a>
    <a class="nav-item nav-link" href="#">c</a>
    <a class="nav-item nav-link disabled" href="#">d</a>
</nav>

<nav class="nav nav-pills flex-column flex-sm-row">
    <a class="nav-item nav-link active" href="#">a</a>
    <a class="nav-item nav-link" href="#">bbbbbbb</a>
    <a class="nav-item nav-link" href="#">c</a>
    <a class="nav-item nav-link disabled" href="#">ddddddd</a>
</nav>
```

### [Navbar in Bootstrap4](https://www.lynda.com/Bootstrap-tutorials/Create-navbar/372545/702972-4.html?autoplay=true)
``` html
<nav class="navbar bg-dark navbar-dark navbar-expand-sm" style="background: yellow;">
    <div class="container">
        <h2 class="navbar-brand m-0">ABC</h2>
        <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">a</a>
            <a class="nav-item nav-link" href="#">bbbbbbb</a>
            <div class="dropdown">
                <a class="nav-item nav-link dropdown-toggle" data-toggle="dropdown" id="servicesDropdown" aria-haspopup="true" aria-expanded="false" href="#">service</a>
                <div class="dropdown-menu" aria-labelledby="servicesDropdown">
                    <a class="dropdown-item" href="#">item1</a>
                    <a class="dropdown-item" href="#">item2</a>
                    <a class="dropdown-item" href="#">item3</a>
                    <a class="dropdown-item" href="#">item4</a>
                </div>
            </div>
            <a class="nav-item nav-link disabled" href="#">ddddddd</a>
        </div>
    </div>
</nav>

<!--form example-->
<nav class="navbar navbar-dark navbar-expand-sm fixed-top">
    <div class="container">
        <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="#">item1</a></li>
            <li class="nav-item"><a class="nav-link" href="#">item2</a></li>
            <li class="nav-item"><a class="nav-link" href="#">item3</a></li>
            <li class="nav-item"><a class="nav-link" href="#">item4</a></li>
        </ul>
        <form class="form-inline">
            <input class="form-control mr-2" type="text" placeholder="Search">
            <button class="btn btn-outline-light" type="submit"></button>
        </form>
    </div>
</nav>
```

### Collapseble
- `collapse`
- `navbar-collapse`
- `id`
- Toggle Classes, `navbar-toggler`

``` html
<nav class="navbar navbar-dark bg-dark navbar-expand-sm">
  <div class="container">

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myToggleNav" aria-controls="myToggleNav" aria-expanded="false" aria-label="Toggle Nav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <a href="#" class="navbar-brand">Wisdom Pet Medicine</a>

    <div class="collapse navbar-collapse" id="myToggleNav">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="#">Home</a>
        <a class="nav-item nav-link" href="#">Mission</a>
        <a class="nav-item nav-link" href="#">Services</a>
        <a class="nav-item nav-link" href="#">Staff</a>
        <a class="nav-item nav-link" href="#">Testimonials</a>
      </div><!-- navbar -->
    </div><!--collapse-->
    
  </div><!-- container -->
</nav><!-- nav -->
```

## Button
- `btn-SIZ`, SIZ: sm, lg, block
- `btn-outline-COLOR`
- `btn-COLOR`

## List Group
``` html
<ul class="list-group mb-3">
    <li class="list-group-item list-group-item-action list-group-item-success">AAAAAA</li>
    <li class="list-group-item list-group-item-action list-group-item-danger">BBBBBB</li>
    <li class="list-group-item list-group-item-action list-group-item-info d-flex justify-content-between align-items-center">Nutrition
    <span class="badge badge-primary badge-pill">12</span></li>
</ul>
```

## Jumbotron for highlight
- `jumbotron`
- `jumbotron-fluid`

## Card
``` html
<div class="container">
      <div class="card-columns">
        <section class="card mb-5" id="drwinthrop">
          <img class="card-img-top" src="images/doctor-winthrop.jpg" alt="Doctor Winthrop Photo">
          <div class="card-body">
            <h2 class="card-title">Dr. Stanley Winthrop</h2>
            <h5 class="card-subtitle">Behaviorist</h5>
            <p class="card-text">Dr. Winthrop is the guardian of Missy, a three-year old Llaso mix, who he adopted at the shelter. Dr. Winthrop is
              passionate about spay and neuter and pet adoption, and works tireless hours outside the clinic, performing free
              spay and neuter surgeries for the shelter.</p>
          </div>
          <div class="card-footer">
            <a class="card-link text-dark" href="#">About Me</a>
            <a class="card-link text-dark" href="#">My Pets</a>
            <a class="card-link text-dark" href="#">Client Slideshow</a>
          </div>
        </section>

        <section class="card mb-5" id="drchase">
          <img class="card-img" src="images/doctor-chase.jpg" alt="Doctor Chase Photo">
          <div class="card-img-overlay text-light">
            <h2 class="card-title">Dr. Elizabeth Chase</h2>
            <h5 class="card-subtitle">Dentistry</h5>
            <p class="card-text">Dr. Chase spends much of her free time helping the local bunny rescue organization find homes for bunnies, such as
              Kibbles - a Dalmatian bunny who is part of the large Chase household, including two dogs, three cats, and a turtle.</p>
            
          </div>
          <div class="card-footer">
            <a class="card-link text-dark" href="#">About Me</a>
            <a class="card-link text-dark" href="#">My Pets</a>
            <a class="card-link text-dark" href="#">Client Slideshow</a>
          </div>
        </section><!-- card -->

        <section class="card mb-5" id="drsanders">
          <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-sanders.jpg" alt="Doctor Sanders Photo">
            <h2 class="card-title">Dr. Kenneth Sanders</h2>
            <h5 class="card-subtitle">Nutritionist</h5>
            <p class="card-text">Leroy walked into Dr. Sanders front door when she was moving into a new house. After searching for weeks for Leroy's
              guardians, she decided to make Leroy a part of her pet family, and now has three cats.</p>
          </div>
          <div class="list-group list-group-flush">
            <a class="list-group-item" href="#">About Me</a>
            <a class="list-group-item" href="#">My Pets</a>
            <a class="list-group-item" href="#">Client Slideshow</a>
          </div>
        </section><!-- card -->

        <section class="card mb-5" id="drgardner">
          <img class="card-img-top" src="images/doctor-gardner.jpg" alt="Doctor Gardner Photo">
          <div class="card-body">
            <h2 class="card-title">Dr. Michael Gardner</h2>
            <h5 class="card-subtitle">Practitioner</h5>
            <p class="card-text">When Dr. Gardner was 8 his family moved to Colorado, where he spent most of his free time playing on his neighbors
              farm. He came to love spending time with the horses, chickens, and goats. He still considers all of his family's
              farm animals his own, but Frank, his Cattle dog is his nearest and dearest friend.</p>
          </div>
          <div class="list-group list-group-flush">
            <a class="list-group-item" href="#">About Me</a>
            <a class="list-group-item" href="#">My Pets</a>
            <a class="list-group-item" href="#">Client Slideshow</a>
          </div>
        </section><!-- card -->

        <section class="card mb-5" id="drruiz">
          <img class="card-img-top" src="images/doctor-ruiz.jpg" alt="Doctor Ruiz Photo">
          <div class="card-body">
            <h2 class="card-title">Dr. Brook Ruiz</h2>
            <h5 class="card-subtitle">Radiology</h5>
            <p class="card-text">Dr. Brook has spent countless hours helping the local animal shelter with injured animals ,that find their way into
              their doors. She recently adopted a new feline friend, Trish, that she helped rescue from a flooded area. Trish
              loves playing with her new sister, Else.</p>
          </div><!-- card-body -->
          <div class="list-group list-group-flush">
            <a class="list-group-item" href="#">About Me</a>
            <a class="list-group-item" href="#">My Pets</a>
            <a class="list-group-item" href="#">Client Slideshow</a>
          </div>
        </section><!-- card -->

        <section class="card mb-5" id="drwong">
          <img class="card-img-top" src="images/doctor-wong.jpg" alt="Doctor Wong Photo">
          <div class="card-body">
            <h2 class="card-title">Dr. Olivia Wong</h2>
            <h5 class="card-subtitle">Preventive Care</h5>
            <p class="card-text">Dr. Wong is a cancer survivor who was fortunate enough to get to spend time with a therapy dog during her recovery.
              She became passionate about therapy animals, and has started her own foundation to train and provide education
              to patients in recovery. Now she gets her own dose of daily therapy from her husky, Lilla.</p>
          </div><!-- card-body -->
          <div class="list-group list-group-flush">
            <a class="list-group-item" href="#">About Me</a>
            <a class="list-group-item" href="#">My Pets</a>
            <a class="list-group-item" href="#">Client Slideshow</a>
          </div>
        </section><!-- card -->

      </div>
      
</div><!-- content container -->
```

## Form
[ref1](https://www.lynda.com/Bootstrap-tutorials/Size-validation-styles/372545/600633-4.html?autoplay=true)

[ref2](https://www.lynda.com/Bootstrap-tutorials/Multicolumn-forms/372545/722296-4.html?autoplay=true)
- `form-group`
- `form-text`, `text-muted`
- input / select / textarea, `form-control`. file-input with `form-control-file`
- label, `form-control-label`
- checkbox div, `form-check` and `form-check-inline` / checkbox label, `form-check-label` / checkbox input,  `form-check-input`
- `form-contorl-sm / lg`
- `has-COLOR`, sucess, warning, danger, outside the input
- `form-contorl-COLOR`, sucess, warning, danger, text of the input

## Tooltips
- Link or content
- `data-toggle="tooltip"`
- `title = "text"`

### Configuration
- `data` or JS config
- JavaScript Activation

E.g.
``` javascript
$(function(){
    $('[data-toggle="tooltip"]').tooltip({OPTIONS})
})
```

``` html
<div class="tooltip bs-tooltip-top" role="tooltip">
    <div class="arrow"></div>
    <div class="tooltip-inner">
        Some Tooltip Text!
    </div>
</div>
```

### Common Option
- `placement`: top, right, bottom, left
- `trigger`: click, hover, focus
- `html`: true, false

E.g.
``` html
<a href="#" data-toggle="tooltip" data-placement="bottom" title="blablablabla">Here</a>
<!--load bootstrap and jquery script-->
<script>
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
})
</script>
```

## PopOvers
- `data-toggle="popover"`
- `title="text"`
- `data-content="content"`

E.g.
``` javascript
$(function(){
    $('[data-toggle="popover"]').popover({OPTIONS}) // placement: top, right, bottom, left ; trigger: click, hover, focus; container
})
```

``` html
<button type="button" class="btn btn-info" 
  data-toggle="popover" 
  data-placement="bottom"
  data-trigger="hover"
  title="Standard Checkups" 
  data-content="Out standard checkups offer .....">
  Checkup Info
</button>
<!--load bootstrap and jquery script-->
<script>
$(function(){
    $('[data-toggle="popover"]').popover({
      //placement: "top",
      //trigger: "hover"
    });
})
</script>
```

## Alerts
- `alert`
- `alert-COLOR`, primary, secondary, success, danger, warning, info, light, dark

### Alert Content
- `alert-heading`
- `alert-link`

### Dismissible Alerts
- `alert-dismissible fade show`
- Add Close button, `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`

## [Dropdown](https://getbootstrap.com/docs/4.0/components/dropdowns/)
- `dropdown`
- `dropdown-toggle`
- `dropdown-menu`
- `dropdown-item`

### Dropdown Elements
- `dropdown-header`
- `dropdown-divider`
- `disabled`

### Dropdown Options
- `btn-sm`, `btn-lg`
- `dropup`
- `dropdown-menu-right`
- `btn-group`, `dropdown-toggle-split`

E.g.
``` html
<div class="dropdown show">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown link
  </a>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
```

## Collapse & Accordions
- [ref](https://getbootstrap.com/docs/4.1/components/collapse/)
- [ref2](https://www.lynda.com/Bootstrap-tutorials/Add-collapse-accordions/372545/600642-4.html?autoplay=true)

## Modal
- [ref](https://getbootstrap.com/docs/4.0/components/modal/)
- [ref2](https://www.lynda.com/Bootstrap-tutorials/Use-modals/372545/600643-4.html?autoplay=true)

## Carousel - image slider
- [ref](https://getbootstrap.com/docs/4.0/components/carousel/)
- [ref2](https://www.lynda.com/Bootstrap-tutorials/Build-carousels/372545/702989-4.html?autoplay=true)

## Scrollspy
- [ref](https://getbootstrap.com/docs/4.0/components/scrollspy/)
- [ref2](https://www.lynda.com/Bootstrap-tutorials/Use-scrollspy/372545/702990-4.html?autoplay=true)

## [Modal](https://getbootstrap.com/docs/4.1/components/modal/)

# Reference
- [getbootstrap](https://getbootstrap.com/docs/4.0/utilities/spacing/)
- [Bootstrap 4 Essential Training](https://www.lynda.com/Bootstrap-tutorials/Bootstrap-4-Essential-Training/372545-2.html)