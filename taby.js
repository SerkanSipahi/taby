var Taby = (function(document, window, undefined){

    'use strict';

    //@todo: addEventlistern = jQuery/Zepto.on <<<-- mapping
    //@todo: http://www.polymer-project.org/ / or as shadowdom

    // > feature detecting

    var tmpElement = document.createElement('div'),
        /* > we use Zepto or jQuery for some features
         * which are not supported by other browser.
         * mainly: from ie8 or ie9 !
         * we recomended Conditional Comments for
         * loading Zepto or jQuery on the fly !
         */
        $qs = window.Zepto || window.jQuery,
        _feature = {
            classList : !!('classList' in tmpElement)
        };

    // >>> Hybridjs

    Window.prototype._$forLoop = function(callback){

        if (this === void 0 || this === null) { throw new TypeError(); }

        var t = Object(this),
            len = t.length >>> 0;
        if (typeof callback !== 'function') { throw new TypeError(); }

        for (var i = 0; i < len; i++){
            if (i in t){
                callback.call(t[i], i, t[i]);
            }
        }
    };
    Array.prototype.$each =
    NodeList.prototype.$each =
    HTMLCollection.prototype.$each = function(callback){
        Window.prototype._$forLoop.call(this, callback);
    };

    // >>> $addClass
    Element.prototype.$addClass = function(classname){

        if(!classname) { return false; }

        if(_feature.classList){
            this.classList.add(classname);
        } else {
            $qs(this).addClass('classname');
        }
        return this;
    };
    Array.prototype.$addClass =
    NodeList.prototype.$addClass =
    HTMLCollection.prototype.$addClass = function(classname){
        this.$each(function(){
            this.$addClass(classname);
        });
        return this;
    };
    /////////////////////////////////////////////

    // >>> $removeClass
    Element.prototype.$removeClass = function(classname){

        if(!classname) { return false; }

        if(_feature.classList){
            this.classList.remove(classname);
        } else {
            $qs(this).removeClass('classname');
        }
        return this;
    };
    Array.prototype.$removeClass =
    NodeList.prototype.$removeClass =
    HTMLCollection.prototype.$removeClass = function(classname){
        this.$each(function(){
            this.$removeClass(classname);
        });
        return this;
    };
    /////////////////////////////////////////////

    // >>> $hasClass
    Element.prototype.$hasClass = function(classname){

        if(!classname) { return false; }

        var res = false;

        if(_feature.classList){
            res = this.classList.contains(classname);
        } else {
            if($qs(this).hasClass(classname)){
                res = true;
            } else {
                res = false;
            }
        }
        return res;

    };
    // > eventListeners
    /* > units tests nicht vergessen
     * infos: es können mehrere click events, mit verschiedenen callbacks,
     * auf ein domnode gesetzt werden! diese sollten auch spearat gelöscht werden
     * können!
     *
     * Alternate Syntax:
     * domnode.$on({
     *    'click:filter('li.some-class')' : function(){
     *
     *    },
     *    'click:filter('li.some-class-2')' : function(){
     *
     *    },
     *    'mouseenter:find('li.other-class')' : function(){
     *
     *    }
     * }, 'li');
     *
     *
     *
     * Element.prototype.filter = function(){
     *
     * };
     *
     * Element.prototype.find = function(element){
     *    return this.querySelectorAll(element);
     * };
     *
     * Element.prototype.delegate = function(element){
     *    return this.querySelectorAll(element);
     * };
     *
     * ...or...
     *
     * domnode.$on('click:filter('.some-element')', function(){
     *
     * }, 'global-filter-element');
     *
     * ...or for delegate...
     *
     * domnode.$on('ul:delegate(li)', function(){
     *
     * });
     *
     **/
    Element.prototype.$on = function(){
        /*
            Event Delegation:
            ======================
            Event.prototype.$delegate = function(foo){

                var target = e ? e.target : window.event.srcElement;

                //element
                if(true){}
                //class or id
                if(true){}
                //and it has attribute
                if(true){}

                return target.nodeName.toLowerCase() === foo ? true : false;
            }
            Element.prototype.on = function(type, callback, foo){
                this.addEventListener(type, function(e){
                    if(e.$delegate(foo) && foo !==void(0)){
                        callback.apply(e.target, arguments);
                    } else if(foo===void(0)){
                        callback.apply(this, arguments);
                    }
                });
            }

            var someid = document.querySelector('#huhuu');
            someid.on('click', function(e){
                console.log('Hello World!');
            }, 'span');
        */

        /*
            this._$eventQuees[
                { click : customFunc1 },
                { click : customFunc2 },
                { 'click:nm(foo)' : customFunc2 },
                { 'click:nm(boo)' : customFunc3 },
                { mouseenter : customFunc4 }
                { mouseenter : customFunc4 }
                { 'click:filter(.cumstom-class)' : customFunc4 }
                { 'click:find(.cumstom-class)' : customFunc4 }
            ]
         * */

        this._$eventQueues = {};
        this._$eventQueues[arguments[0]] = arguments[1];
        this._$capture  = arguments[2] || false;
        this.addEventListener.apply(this, arguments); return this;
    };
    Array.prototype.$on =
    NodeList.prototype.$on =
    HTMLCollection.prototype.$on = function(){
        this.$each(function(){
            this.$on.apply(this, arguments);
        });
        return this;
    };

    Element.prototype.$off = function(type){
        this.removeEventListener.apply(this, [
            type, this._$eventQueues[type], this._$capture
        ]);
    };
    Array.prototype.$off =
    NodeList.prototype.$off =
    HTMLCollection.prototype.$off = function(){
        this.$each(function(){
            this.$off.apply(this, arguments);
        });
        return this;
    };

    window.$regex_until = /^(\*)?(.*?)(:until\((.*?)\))?$/;
    window.$regex_element = /^(?:(#|\.)*?([\w-]*?))$/;
    window.$regex_$elAttributs = /(?:\[(.*?)(?:=*?(?:"(.*?)")*?)\])/;

    Element.prototype.$closest = function(expression){

        //@todo: allElements is not finished!

        var $this            = this,
            result           = $regex_until.exec(expression),
            allElements      = result[1] === '*' ? true : false,
            closestElement   = result[2],
            untilElement     = result[4] || 'body',
            untilLoop        = false,
            closestContainer = [];

        if(_feature.classList){

            var $currentElement = void(0),
				oElement  = null,
				oElements = {
					closest : $regex_element.exec(closestElement),
					until   : $regex_element.exec(untilElement)
				};

            closestContainer.push($this);
            while(untilLoop === false){

                $currentElement = $currentElement === void(0) ? $this.parentNode : $currentElement.parentNode;

				for(oElement in oElements){
					// > if element
					if(oElements[oElement][1]===void(0)){
						if($currentElement.localName === oElements[oElement][2]){
							oElement === 'until' ? untilLoop = true : closestContainer.push($currentElement);
						}
					// > if class
					} else if(oElements[oElement][1]==='.'){
						if($currentElement.classList.contains(oElements[oElement][2])){
							oElement === 'until' ? untilLoop = true : closestContainer.push($currentElement);
						}
					// > if id
					} else if(oElements[oElement][1]==='#') {
						if($currentElement.id === oElements[oElement]){
							oElement === 'until' ? untilLoop = true : closestContainer.push($currentElement);
						}
					}
				}
                if(!allElements){ break; }
            }

        } else {
			closestContainer = $qs($this).closest(expression);
        }

        return closestContainer;
    };

	function Taby(dest){

		this.$ = document.querySelectorAll.bind(document);

		this.isDomNode        = dest instanceof Element ? true : false;
        this.dest             = dest;

		this.tmpDest          = null;

        this.$tabyFixedEl     = {};
		this.$tabs            = [];

        this.tabsLength       = 0;
        this.absoluteWith     = 95;

        this.$deeperTabs      = {};
        this.deeperTabsLength = 0;
        this.$children        = {};
        this.childrenLength   = 0;
		this.callback         = null;

        this.lastActiveTabs   = null;


		if(!this.isDomNode){
			this.tmpDest = this.$(this.dest)[0];
		} else {
			this.tmpDest = this.dest;
		}


		if(this.tmpDest.getAttribute('data-tab-initialized')==='true'){
			return this;
		}

        // > init taby
        this.initTaby();

    }

    // > public methods
    Taby.prototype = {
		open : function(tabname){
			var event = { preventDefault:function(){}};
			event.target= this.tmpDest.querySelector('li a[href="#'+tabname+'"]');
			this.callback.call(null, event);
		},
        initTaby : function(){
            this.calculateTabSizes();
            this.setEvents();

        },
		//@todo: we need this mthod for IE8,9,10 ! Other Browser can use Flexbox
        calculateTabSizes : function(){

            var self=this;

            var $childList = this.tmpDest.children[0].children;
            $childList.$each(function(){
                if(this.$hasClass('taby-lock')){
                    self.$tabyFixedEl = this;
                } else {
                    self.$tabs.push(this);
                }
            });

            this.tabsLength   = this.$tabs.length;
            this.tabWidth     = (this.$tabyFixedEl instanceof Element ? this.absoluteWith : 100) / this.tabsLength;

            //first level
            this.$tabs.$each(function(){
                this.style.width = self.tabWidth+'%';
            });

            //deeper levels
            this.$deeperTabs      = this.tmpDest.children[0].querySelectorAll('ul');
            this.deeperTabsLength = this.$deeperTabs.length;

            this.$deeperTabs.$each(function(){
                self.$children      = this.children;
                self.childrenLength = self.$children.length;
                self.tabWidth       = 100 / self.childrenLength;

                self.$children.$each(function(){
                    this.style.width = self.tabWidth+'%';
                });
            });
        },
        handleActiveTabs : function($target){

            if(this.lastActiveTabs!== null){
                this.lastActiveTabs.$removeClass('taby-active');
            }
            this.lastActiveTabs = $target.$closest('*li:until(.taby)');
            this.lastActiveTabs.$addClass('taby-active');

        },
        setEvents : function(){

            var event = {};
                event.preventDefault=function(){};

			// >>> set initialized default tag
			this.tmpDest.setAttribute('data-tab-initialized', false); //this.dest.setAttribute('data-tab-initialized', false);

            var $self = this,
                $lastShowedTab=null;

            this.callback = function(e){

                    e.preventDefault();

                    // >>> *****************************
                    // >>> read operation

                    // >>> start event delegation auslagern nach addeventlistener
                    var target = e.target,
                        $thisAElement = {},
                        tmpUlContainer = [], i= 0, length=0;

                    if(e.target.nodeName.toLowerCase() === 'a'){
                        $thisAElement = e.target;
                        target = e.target.parentNode;
                    } else {
                        $thisAElement = e.target.children[0];
                        if(e.target.children.length===0){
                            return;
                        }
                    }

                    // >>> *******************************
                    // >>> set active class

                    $self.handleActiveTabs(target);

                    // >>> ende delegation auslagern

                    var $thisChildTarget = target.querySelector('ul'),
                        $allTargets      = $self.tmpDest.querySelectorAll('ul');

                    // > wenn kein ul, dann akuellen li auf
                    //   $thisChildTarget setzen, damit
                    //   aus dieser das parent ul ermittelt werden kann
                    if($thisChildTarget===null) {
                        $thisChildTarget = target;
                    }

                    tmpUlContainer = $thisChildTarget.$closest('*ul:until(.taby)');
                    // >>> *****************************
                    // >>> write operation

                    // > alle ul´s ausblenden
                    $allTargets.$removeClass('show');

                    // > alle ul´s anzeigen die angezeigt werden sollen
                    tmpUlContainer.$addClass('show');

                    // >>> *****************************
                    // >>> set height of tab wrapper

                    var maxHeightOfTab    = 0,
                        $visibleListLayer = $self.tmpDest.querySelectorAll('ul.show > li:first-child');

                    $visibleListLayer.$each(function(){
                        maxHeightOfTab += this.clientHeight;
                    });
					$self.tmpDest.style.height = maxHeightOfTab+'px';

                    // >>> *****************************
                    // >>> handle content visibilty

                    var ankerTarget = '', $children,
                        nodeName    = $thisAElement.nodeName.toLowerCase();

                    if($lastShowedTab !== null){
                        $lastShowedTab.$addClass('hidden');
                    }

                    // > wenn <a>tag inhalt anzeigen
                    if(nodeName==='a'){
                        ankerTarget = $thisAElement.getAttribute('href').replace('#','');
						$lastShowedTab = $self.tmpDest.parentNode.querySelector('[data-tab-content="'+ankerTarget+'"]');
                        $lastShowedTab.$removeClass('hidden');
                        // > wenn <ul> dann innerhalb ul erstes li anzeigen wenn es nicht nested ist
                    } else {

                        $children = $thisAElement.children;
                        for(i= 0, length=$children.length; i<length;i++){
                            event.target=$children[i];
							$self.callback.call(null, event); break;
                        }
                    }



                };

            // >>> first self call
            event.target= this.tmpDest.querySelectorAll('ul li')[0];
            this.callback.call(null, event);

            // >>> handle tabs handler
			this.tmpDest.querySelector('ul').$on('click', this.callback);

            // >>> close tab handler

			if(this.$tabyFixedEl instanceof Element){
				this.$tabyFixedEl.$on('click', function(e){
					if(!$lastShowedTab.$hasClass('hidden') && !$self.tmpDest.$hasClass('hidden')){
						$lastShowedTab.$addClass('hidden');
						$self.tmpDest.$addClass('hidden');
					} else {
						$self.tmpDest.$removeClass('hidden');
						event.target=$self.tmpDest.querySelector('ul').children[0];
						$self.callback.call(null, event);
					}
				});
			}

			// >>> set initialized tag
			this.tmpDest.setAttribute('data-tab-initialized', true);

        }

    };

    // Based off Lo-Dash's excellent UMD wrapper (slightly modified) - https://github.com/bestiejs/lodash/blob/master/lodash.js#L5515-L5543
    // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
    if(typeof define === 'function' && define.amd) {
        define(function(require) { return Taby; });
    } else if(typeof module === 'object' && module.exports){
        module.exports = Taby;
    } else if(window.jQuery || window.Zepto){
        (function ($) {
            $.fn.taby = function () {
                return new Taby(this);
            };
        })(window.jQuery || window.Zepto);
    } else {
        return Taby;
    }


}(document, this, void(0)));