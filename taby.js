var Taby = (function(document, window, undefined){

	'use strict';

	// > feature detecting

	var tmpElement = document.createElement('div'),
        _feature = {
        classList : !!('classList' in tmpElement)
	};
    // >>> Helper Methods
    Array.prototype.$each = function(callback){

    };
    Element.prototype.$addClass = function(classname){

        if(_feature.classList){
            this.classList.add(classname);
        } else {
            var tmpContainer = [];
            tmpContainer = this.className.split(' ');
            for(var i= 0, length=tmpContainer.length;i<length; i++){
                if(tmpContainer[i].replace(' ', '')===classname){
                    return;
                }
            }
            tmpContainer.push(classname);
            this.className = tmpContainer.join(' ');
        }
        return this;
    };
    Element.prototype.$removeClass = function(classname){

        if(_feature.classList){
            this.classList.remove(classname);
        } else {
            // > mit replace zu unsicher weil wenn xxx entfernd werden soll
            // aber xxx-auch dort, wird das auch erstezt
            this.className = this.className.replace(classname, '');
        }
        return this;
    };
    Element.prototype.$hasClass = function(){

        var res = false;

        if(_feature.classList){
            res = this.classList.contains(classname);
        } else {
            var pattern =  new RegExp(classname);
            if(pattern.test(classname)){
                res = true;
            }
        }
        return res;

    };
    Element.prototype.$closest = function(expression){

        var $this         = this,
            pattern       = /^(\*)?(.*?)(:until\((.*?)\))?$/,
            result        = pattern.exec(expression),
            allElements   = result[1] || null,
            parentElement = result[2] || null,
            untilElement  = result[4] || null;

        if(_feature.classList){
            console.log(result);
        }
    };
    Element.prototype.$until = function(){

    };
    Element.prototype.$getAllClosestClass = function(parentElement,  upToEndElement){
        /*
         * $target.closest('*li:until(.taby)');
         * todo: @target kann ein domNode oder ein Element, Id, Class oder ein mix aus allen sein !
         * todo; @parentElement kann ein Element, Id, Class oder ein mix aus allen drei sein !
         * todo: @upToEndElement kann ein Element, ID, Class oder ein mix aus allen drei sein !
         */

        var parentClassName='',
            tmpContainer =[],
            pattern=new RegExp(upToEndElement),
            target=null;

        target=this;
        tmpContainer.push(target);

        /*
         * das matchen über !pattern.test(parentClassName) ist zu unsicher!
         * in diesem Fall soll bis class taby die while schleife laufen ! aber
         * bis zu seinem weg sind li tags mit taby-active vorhanden, diese können
         * auch gemachted werden. Also genauere Prüfung
         **/
        while(!pattern.test(parentClassName)){
            var $parentNode = target.parentNode;
            if($parentNode.nodeName.toLowerCase()===parentElement){
                tmpContainer.push($parentNode);
            }
            target = $parentNode;
            parentClassName = $parentNode.className;

        }

        return tmpContainer;
    };

    // >>> bind querySelectorAll to $
    var $ = document.querySelectorAll.bind(document);

	// > context
	var thisTaby = {};

	// > Constructor
	function Taby(){

        thisTaby = this;

		// > core elements
		this.tabNamespaces    = '.taby';
		this.tab              = '.taby[data-tab]';
		this.tabContent       = '.taby[data-tab-content]';
		this.tabLockEl        = '.taby-lock',
		this.$tabyFixedEl     = {};
		this.$tabs            = {};
		this.tabsLength       = 0;
		this.tabWith          = 0;
		this.absoluteWith     = 95;

		this.$deeperTabs      = {};
		this.deeperTabsLength = 0;
		this.$children        = {};
		this.childrenLength   = 0;

		this.lastActiveTabs   = null;

		// > init taby
		this.initTaby();
	}

	// > public methods
	Taby.prototype = {
		initTaby : function(){
			this.calculateTabSizes();
			this.setEvents();
		},
		calculateTabSizes : function(){

			var i = 0, d = 0, $children = {}, $childrenLength;
			this.$tabyFixedEl = $(this.tab+' > ul > li[data-taby-fixed-size]');
			this.$tabs        = $(this.tab+' > ul > li:not([data-taby-fixed-size])');
			this.tabsLength   = this.$tabs.length;
			this.tabWidth     = (this.$tabyFixedEl.length === 1 ? this.absoluteWith : 100) / this.tabsLength;

			//first level
			for(i=0;i<this.tabsLength;i++){
				this.$tabs[i].style.width = this.tabWidth+'%';
			}

			//deeper levels
			this.$deeperTabs      = $(this.tab+' > ul ul');
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
			// >>> $target.getAllClosest('li').until('.taby');
			// >>> $target.closest('*li:until(.taby)');
            $target.$closest('*li:until(.taby)');
			this.lastActiveTabs = $target.$getAllClosestClass('li', 'taby');

			for(i=0, length=this.lastActiveTabs.length;i<length;i++){
				this.lastActiveTabs[i].$addClass('taby-active');
			}


		},
		setEvents : function(){

			var event = {};
				event.preventDefault=function(){};

			var $self = this,
				$lastShowedTab=null,
				callback = function(e){

					e.preventDefault();

					// >>> *****************************
					// >>> read operation

					// >>> start event delegation auslagern
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
						$allTargets      = $(thisTaby.tab + ' ul');

					// > wenn kein ul, dann akuellen li auf
					//   $thisChildTarget setzen, damit
					//   aus dieser das parent ul ermittelt werden kann
					if($thisChildTarget===null) {
						$thisChildTarget = target;
					} else {
						tmpUlContainer.push($thisChildTarget);
					}

					// >>> start closest auslagern
					var parentClassName='';
					while(!/^taby$/.test(parentClassName)){
						var $parentNode = $thisChildTarget.parentNode;
						if($parentNode.nodeName.toLowerCase()==='ul'){
							tmpUlContainer.push($parentNode);
						}
						$thisChildTarget = $parentNode;
						parentClassName = $parentNode.className.replace(' ', '');

					}
					// >>> end closest auslagern

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
						$visibleListLayer = $($self.tab + ' ul.show > li:first-child');

					for(i=0, length=$visibleListLayer.length;i<length;i++){
						maxHeightOfTab += $visibleListLayer[i].clientHeight;

					}
					$($self.tab)[0].style.height = maxHeightOfTab+'px';

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
						$lastShowedTab = $($self.tabNamespaces+'[data-tab-content="'+ankerTarget+'"]')[0];
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
			event.target=$(this.tab + ' ul li')[0];
			callback.call(null, event);

			// >>> handle tabs handler
			$(this.tab + ' ul')[0].addEventListener('click', callback);

			// >>> close tab handler
			var $locks = $(this.tabLockEl);

			for(var i= 0, length=$locks.length; i<length;i++){
				$locks[i].addEventListener('click', function(e){
					if(!$lastShowedTab.$hasClass('hidden') && !$($self.tab)[0].$hasClass('hidden')){
						$lastShowedTab.$addClass('hidden');
						$($self.tab)[0].$addClass('hidden');
					} else {
						$($self.tab)[0].$removeClass('hidden');
						event.target=$($self.tab + ' > ul > li')[0];
						callback.call(null, event);
					}
				});
			}

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