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
    // >>> Helper Methods
    Array.prototype.$each = function(callback){

    };
    String.prototype.$each = function(callback){

    };
    Element.prototype.$addClass = function(classname){

        if(!classname) { return false; }

        if(_feature.classList){
            this.classList.add(classname);
        } else {
            $qs(this).addClass('classname');
        }
        return this;
    };
    Element.prototype.$removeClass = function(classname){

        if(!classname) { return false; }

        if(_feature.classList){
            this.classList.remove(classname);
        } else {
            $qs(this).removeClass('classname');
        }
        return this;
    };
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
		this.$childList       = null;

        this.$tabyFixedEl     = {};
		this.$tabs            = [];

        this.tabsLength       = 0;
        this.absoluteWith     = 95;

        this.$deeperTabs      = {};
        this.deeperTabsLength = 0;
        this.$children        = {};
        this.childrenLength   = 0;

        this.lastActiveTabs   = null;


		if(!this.isDomNode){
			this.tmpDest = this.$(this.dest)[0];
		} else {
			this.tmpDest = this.dest;
		}


		if(this.tmpDest.getAttribute('data-tab-initialized')==='true'){
			return;
		}

        // > init taby
        this.initTaby();

    }

    // > public methods
    Taby.prototype = {
		state : function(state){
			if(state==='activeTabs'){

			}
		},
        initTaby : function(){
            this.calculateTabSizes();
            this.setEvents();

        },
		//@todo: we need this mthod for IE8,9,10 ! Other Browser can use Flexbox
        calculateTabSizes : function(){

            var i = 0, d = 0;

			this.$childList = this.tmpDest.children[0].children;


			for(var x = 0, length=this.$childList.length; x<length; x++){
				if(this.$childList[x].$hasClass('taby-lock')){
					this.$tabyFixedEl = this.$childList[x];
				} else {
					this.$tabs.push(this.$childList[x]);
				}
			}

            this.tabsLength   = this.$tabs.length;
            this.tabWidth     = (this.$tabyFixedEl instanceof Element ? this.absoluteWith : 100) / this.tabsLength;

            //first level
            for(i=0;i<this.tabsLength;i++){
                this.$tabs[i].style.width = this.tabWidth+'%';
            }

            //deeper levels
            this.$deeperTabs      = this.tmpDest.children[0].querySelectorAll('ul');
            this.deeperTabsLength = this.$deeperTabs.length;


            for(i=0;i<this.deeperTabsLength; i++){
                this.$children      = this.$deeperTabs[i].children;
                this.childrenLength = this.$children.length;
                this.tabWidth       = 100 / this.childrenLength;
                for(d=0;d<this.childrenLength;d++){
                    this.$children[d].style.width = this.tabWidth+'%';
                }

            }
        },
        handleActiveTabs : function($target, parentElement, addClass, upToElement){

            var i, length;

            if(this.lastActiveTabs!== null){
                for(i=0, length=this.lastActiveTabs.length;i<length;i++){
                    this.lastActiveTabs[i].$removeClass('taby-active');
                }
            }
            this.lastActiveTabs = $target.$closest('*li:until(.taby)');

            for(i=0, length=this.lastActiveTabs.length;i<length;i++){
                this.lastActiveTabs[i].$addClass('taby-active');
            }


        },
        setEvents : function(){

            var event = {};
                event.preventDefault=function(){};

			// >>> set initialized default tag
			this.tmpDest.setAttribute('data-tab-initialized', false); //this.dest.setAttribute('data-tab-initialized', false);

            var $self = this,
                $lastShowedTab=null,
                callback = function(e){

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
                    for(i= 0, length=$allTargets.length; i<length;i++){
                        $allTargets[i].$removeClass('show');
                    }

                    // > alle ul´s anzeigen die angezeigt werden sollen
                    for(i=0, length=tmpUlContainer.length;i<length;i++){
                        tmpUlContainer[i].$addClass('show');
                    }

                    // >>> *****************************
                    // >>> set height of tab wrapper

                    var maxHeightOfTab    = 0,
                        $visibleListLayer = $self.tmpDest.querySelectorAll('ul.show > li:first-child');

                    for(i=0, length=$visibleListLayer.length;i<length;i++){
                        maxHeightOfTab += $visibleListLayer[i].clientHeight;

                    }
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
                            callback.call(null, event); break;
                        }
                    }



                };

            // >>> first self call
            event.target= this.tmpDest.querySelectorAll('ul li')[0];
            //event.target=$this.tmpDest.querySelectorAll('ul li')[25];
            callback.call(null, event);

            // >>> handle tabs handler
			this.tmpDest.querySelector('ul').addEventListener('click', callback);

            // >>> close tab handler

			if(this.$tabyFixedEl instanceof Element){
				this.$tabyFixedEl.addEventListener('click', function(e){
					if(!$lastShowedTab.$hasClass('hidden') && !$self.tmpDest.$hasClass('hidden')){
						$lastShowedTab.$addClass('hidden');
						$self.tmpDest.$addClass('hidden');
					} else {
						$self.tmpDest.$removeClass('hidden');
						event.target=$self.tmpDest.querySelector('ul').children[0];
						callback.call(null, event);
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