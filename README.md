#### Magic, SEO-Friendly Tab. Build endless nested Tabs ;)

* no dependencies required, but if you want support <= IE8, make sure you have to load jQuery before Taby.
* you can conntect a "tab" with its "content" easly. Tab e.g. "#sub-tab-4" is related to data-tab-content="sub-tab-4".
* amd/commonjs (requirejs/node) ready

#### Commin soon

* tab generator ( without knowledge html/css )
* theme builder ( without knowledge html/css )

#### Demo Page

[Demo Page](http://serkansipahi.github.io/taby/)


##### Installation

````bash
git clone https://github.com/SerkanSipahi/taby.git
````

````html
    <head>
        <meta charset="utf-8">
        <title>Taby</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2, user-scalable=yes">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="stylesheet" type="text/css" href="taby.css" />
        <!--[if lte IE 9]>
        <script src="vendor/js/jquery.js"></script>
        <![endif]-->
        <script src="vendor/js/ready.js"></script>
        <script src="taby.js"></script>
        <script>
            domready(function () {
                var taby = new Taby(document.querySelector('.taby'));
            });
        </script>
    </head>
````

#### Design as Markup in progress

![Alt text](ui/ui-preview-2.png "Tabs Preview")

##### Tab Definition
````html
<div class="taby" data-tab>
    <ul>
        <li>Tab 1
            <ul>
                <li><a href="#sub-tab-1">Sub Tab 1</a></li>
                <li><a href="#sub-tab-2">Sub Tab 2</a></li>
                <li><a href="#sub-tab-3">Sub Tab 3</a></li>
            </ul>
        </li>
        <li><a href="#tab-2">Tab 2</a></li>
        <li>Tab 3
            <ul>
                <li><a href="#sub-tab-4">Sub Tab 4</a></li>
                <li>Sub Tag 5
                    <ul>
                        <li><a href="#sub-sub-tab-1">Sub Sub Tab 1</a></li>
                        <li><a href="#sub-sub-tab-2">Sub Sub Tab 2</a></li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
````

#### Contents
````html
<div class="taby hidden" data-tab-content="sub-tab-1">
    <h3><a name="sub-tab-1">Sub Tab 1</a></h3>
    <div class="content">
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
    </div>
</div>
<div class="taby hidden" data-tab-content="sub-tab-2">
    <h3><a name="sub-tab-2">Sub Tab 2</a></h3>
    <div class="content">
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
    </div>
</div>
<div class="taby hidden" data-tab-content="sub-tab-3">
    <h3><a name="sub-tab-3">Sub Tab 3</a></h3>
    <div class="content">
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
    </div>
</div>
<div class="taby hidden" data-tab-content="tab-2">
    <h3><a name="tab-2">Tab 2</a></h3>
    <div class="content">
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
    </div>
</div>
<div class="taby hidden" data-tab-content="sub-tab-4">
    <h3><a name="sub-tab-4">Sub Tab 4</a></h3>
    <div class="content">
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
    </div>
</div>
<div class="taby hidden" data-tab-content="sub-sub-tab-1">
    <h3><a name="sub-sub-tab-1">Sub Sub Tab 1</a></h3>
    <div class="content">
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
    </div>
</div>
<div class="taby hidden" data-tab-content="sub-sub-tab-2">
    <h3><a name="sub-sub-tab-2">Sub Sub Tab 2</a></h3>
    <div class="content">
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
        Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
    </div>
</div>
````

##### Init Taby after Document Ready
````js
  var tabyInstance = new Taby(document.querySelector('.taby')); // > as domNode
//var tabyInstance = new Taby('.taby'); // or as selector
````

Methods
````js

// > you can open a tab directly
tabyInstance.open('sub-sub-tab-2');

````