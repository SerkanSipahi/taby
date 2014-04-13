#### Magic, SEO-Friendly Tab. Build endless nested Tabs ;)

* no dependencies required, but if you want support <= IE8, make sure you have to load jQuery before Taby.
* you can conntect a "tab" with its "content" easly. Tab e.g. "#sub-tab-4" is related to data-tab-content="sub-tab-4".
* amd/commonjs (requirejs/node) ready

#### Demo Page

[Demo Page](http://serkansipahi.github.io/taby/)


##### Installation

see source code on [Demo Page](http://serkansipahi.github.io/taby/)

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