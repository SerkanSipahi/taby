var Taby = (function(document, window, undefined){

	'use strict';

	// > feature detecting
	var _feature = {
		querySelectorAll         : !!document.querySelectorAll,
		functionBind             : !!Function.prototype.bind,
		addClass                 : !!Element.prototype.addClass,
		removeClass              : !!Element.prototype.removeClass,
		hasClass                 : !!Element.prototype.hasClass,
		getAllClosestClass       : !!Element.prototype.getAllClosestClass,

		addEventListener         : !!Element.prototype.addEventListener,
		preventDefault           : !!Event.prototype.preventDefault,
		stopPropagation          : !!Event.prototype.stopPropagation,

	};

	// > helper Functions
	if(!_feature.addClass){
		Element.prototype.addClass = function(classname){
			var tmpContainer = [];
			tmpContainer = this.className.split(' ');
			for(var i= 0, length=tmpContainer.length;i<length; i++){
				if(tmpContainer[i].replace(' ', '')===classname){
					return;
				}
			}
			tmpContainer.push(classname);
			this.className = tmpContainer.join(' ');

			return this;
		};
	}
	if(!_feature.removeClass){
		Element.prototype.removeClass = function(classname){
			this.className = this.className.replace(classname, '');
			return this;
		};
	}
	if(!_feature.hasClass){
		Element.prototype.hasClass = function(classname){
			var pattern =  new RegExp(classname);
			if(pattern.test(this.className)){
				return true;
			} else {
				return false;
			}
		};
	}
	if(!_feature.getAllClosestClass){
		Element.prototype.getAllClosestClass = function(parentElement,  upToEndElement){

			/*
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
	}

	// > private vars
	// > $ without underline(private) for better tap on keyboard
	var $ = null;

	// > private methods
	var _initQuerySelector = function(){

		if(_feature.querySelectorAll && _feature.functionBind){
			$ = document.querySelectorAll.bind(document);
		} else {
			// > simulate querySelectorAll for ie7, ie8
			var s = document.createStyleSheet();
			document.querySelectorAll = function(r, c, i, j, a) {
				a=document.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
				for (i=r.length; i--;) {
					s.addRule(r[i], 'k:v');
					for (j=a.length; j--;) { a[j].currentStyle.k && c.push(a[j]); }
					s.removeRule(0);
				}
				return c;
			};
			// > simulate functionBind for ie7, ie8
			Function.prototype.bind = function (oThis) {
				if (typeof this !== 'function') {
					throw { name:'TypeError', message:'Function.prototype.bind - what is trying to be bound is not callable'};
				}
				var aArgs = Array.prototype.slice.call(arguments, 1),
					fToBind = this,
					fNOP = function () {},
					fBound = function () {
						return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
							aArgs.concat(Array.prototype.slice.call(arguments)));
					};

				fNOP.prototype = this.prototype;
				fBound.prototype = new fNOP();

				return fBound;
			};
			$ = document.querySelectorAll.bind(document);
		}
	},
	_initEventHandler = function(){

		var context                  = {};
		context._eventListeners      = [];
		context._addEventListener    = null;
		context._removeEventListener = null;

		if(!_feature.preventDefault){
			Event.prototype.preventDefault=function(){
				this.returnValue=false;
			};
		}
		if(!_feature.stopPropagation){
			Event.prototype.stopPropagation=function(){
				this.cancelBubble=true;
			};
		}

		if(!_feature.addEventListener){

			context._eventListeners=[];
			context._addEventListener=function(type, listener){

				var self=this,
					wrapper=function(e){

						e = window.event || e;

						e.target= e.srcElement;
						e.currentTarget=self;

						if(listener.handleEvent){
							listener.handleEvent(e);
						} else {
							listener.call(self, e);
						}
					};

				this.attachEvent('on'+type, wrapper);
				context._eventListeners.push({object:this, type:type, listener:listener, wrapper:wrapper});

			};
			context._removeEventListener=function(type, listener){

				var counter=0,i= 0,eListener;
				for(i=0,counter=context._eventListeners.length;i<counter;i++){
					eListener=context._eventListeners[i];

					if(eListener.object===this && eListener.type===type && eListener.listener===listener){
						this.detachEvent('on'+type, eListener.wrapper); delete context._eventListeners[i];
					}

				}
			};

			Element.prototype.addEventListener    = context._addEventListener;
			Element.prototype.removeEventListener = context._removeEventListener;

			if (Window) {
				Window.prototype.addEventListener    = context._addEventListener;
				Window.prototype.removeEventListener = context._removeEventListener;
			}

		}
	};

	// > context
	var context = {};

	// > Constructor
	function Taby(){

		context = this;

		// > core elements
		this.tabNamespaces    = '.taby';
		this.tab              = '.taby[data-tab]';
		this.tabContent       = '.taby[data-tab-content]';
		this.tabLockEl        = '.taby-lock',
		this.$tabyFixedEl     = {};
		this.$tabs            = {};
		this.tabsLength       = 0;
		this.tabWith          = 0;
		this.absoluteWith     = 93;

		this.$deeperTabs      = {};
		this.deeperTabsLength = 0;
		this.$children        = {};
		this.childrenLength   = 0;

		this.lastActiveTabs   = null;

		// > init helpers
		_initQuerySelector();
		_initEventHandler();

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
					this.lastActiveTabs[i].removeClass('taby-active');
				}
			}
			// >>> $target.getAllClosest('li').until('.taby');
			// >>> $target.closest('*li').until('.taby');
			this.lastActiveTabs = $target.getAllClosestClass('li', 'taby');

			for(i=0, length=this.lastActiveTabs.length;i<length;i++){
				this.lastActiveTabs[i].addClass('taby-active');
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
						$allTargets      = $(context.tab + ' ul');

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
						$allTargets[i].removeClass('show');
					}

					// > alle ul´s anzeigen die angezeigt werden sollen
					for(i=0, length=tmpUlContainer.length;i<length;i++){
						tmpUlContainer[i].addClass('show');
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
						$lastShowedTab.addClass('hidden');
					}

					// > wenn <a>tag inhalt anzeigen
					if(nodeName==='a'){
						ankerTarget = $thisAElement.getAttribute('href').replace('#','');
						$lastShowedTab = $($self.tabNamespaces+'[data-tab-content="'+ankerTarget+'"]')[0];
						$lastShowedTab.removeClass('hidden');
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
					if(!$lastShowedTab.hasClass('hidden') && !$($self.tab)[0].hasClass('hidden')){
						$lastShowedTab.addClass('hidden');
						$($self.tab)[0].addClass('hidden');
					} else {
						$($self.tab)[0].removeClass('hidden');
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