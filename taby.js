var Taby = (function(document, window, undefined){

	'use strict';

	/**
	*
	*	// > Tabs Definition as JSONObj
	*
	*	var tabsDefinition = [
	*		'Tipps' : {
	*			'__attr__' : {
	*				'class' : 'some-class onhover',
	*				'id' : 'some-id',
	*				'data-foo' : 'foo'
	*			}
	*			'__isOpen__' : true,
	*			'__content__ : new Tippsview(item)
	*		}
	*		'Bewertungen',
	*		'Informationen' : {
	*			'__attr__' : {
	*				'class' : 'some-class1 some-class2 subtav-container'
	*			},
	*			'__sub-tabs__' : {
	*				'Fahrzeug' : {
	*					'__attr__' : {
	*						'class' : 'some-class onhover',
	*						'id' : 'some-id',
	*						'data-foo' : 'foo',
	*					}
	*					'__content__ : function(){var v = new Fahrzeugview(item); return v.render(); }
	*				},
	*				'Vermieter' : {
	*					'__attr__' : {
	*						'class' : 'some-class onhover',
	*						'id' : 'some-id',
	*						'data-foo' : 'foo',
	*					},
	*					'__isOpen__' : true,
	*					'__content__ : new Vermieterview(item)
	*				},
	*				'Station : {
	*					'__attr__' : {
	*						'class' : 'some-class onhover',
	*						'id' : 'some-id',
	*						'data-foo' : 'foo',
	*					}
	*					'__content__ : new Stationview(item)
	*				}
	*			}
	*		},
	*		'__empty__' : {
	*			'__attr__' : {
	*				class : 'show-hide-icon'
	*				data-taby-toggle-visibility : '',
	*			}
	*		}
	*	]
	*
	*	var taby = new Taby(tabsDefinition, '.append-to-element');
	*
	*	// > taby sould generate this(see below) code
	*
	*	<div class="taby" data-tab>
	*		<ul>
	*			<li><a href="#tipp">Tipp</a></li>
	*			<li><a href="#bewertungen">Bewertungen</a></li>
	*			<li><a href="#informationen">Infomrationen
	*				<ul>
	*					<li><a href="#fahrzeug">Fahrzeug</a></li>
	*					<li><a href="#station">Station</a></li>
	*					<li><a href="#fahrzeug">Vermieter</a></li>
	*				</ul>
	*				</a>
	*			</li>
	*			<li data-taby-toggle-visibility class="show-hide-icon"></li>
	*		</ul>
	*	</div>
	*
	*	<div class="taby" data-tab-content>
	*		<!-- Contentarea-->
	*		<div class="tipp">
	*			<h3><a name="tipp">Tips</a></h3>
	*			<div class="content">
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*			</div>
	*		</div>
	*
	*		<!-- Contentarea-->
	*		<div class="bewertungen">
	*			<h3><a name="bewertungen">Bewertungsübersicht</a></h3>
	*			<div class="content">
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*			</div>
	*		</div>
	*
	*		<!-- Contentarea-->
	*		<div class="informationen">
	*
	*			<h3><a name="informationen">Fahrzeug</a></h3>
	*			<div class="content">
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*			</div>
	*
	*			<h3>Station</h3>
	*			<div class="content">
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*			</div>
	*
	*			<h3>Vermieter</h3>
	*			<div class="content">
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba. Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*				Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.Lorum Ipsum Cipsum Hipsum. Dada du huhu ba.
	*			</div>
	*		</div>
	*	</div>
	*
	*/

	// > feature detecting
	var _feature = {
		querySelectorAll : !!document.querySelectorAll,
		functionBind     : !!Function.prototype.bind,
		addClass         : !!Element.prototype.addClass,
		removeClass      : !!Element.prototype.removeClass,

		addEventListener : !!Element.prototype.addEventListener,
		preventDefault   : !!Event.prototype.preventDefault,
		stopPropagation  : !!Event.prototype.stopPropagation,
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
		};
	}
	if(!_feature.removeClass){
		Element.prototype.removeClass = function(classname){
			this.className = this.className.replace(classname, '');
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
		this.tab              = '.taby[data-tab]';
		this.tabContent       = '.taby[data-tab-content]';
		this.$tabyFixedEl     = {};
		this.$tabs            = {};
		this.tabsLength       = 0;
		this.tabWith          = 0;
		this.absoluteWith     = 93;

		this.$deeperTabs      = {};
		this.deeperTabsLength = 0;
		this.$children        = {};
		this.childrenLength   = 0;

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
		setEvents : function(){

			$(this.tab + ' ul')[0].addEventListener('click', function(e){

				// >>> *****************************
				// >>> read operation

				var target = e.target,
					tmpUlContainer = [], i= 0, length=0;

				if(e.target.nodeName.toLowerCase() === 'a'){
					target = e.target.parentNode;
				}

				var $thisChildTarget = target.querySelector('ul'),
					$allTargets = $(context.tab + ' ul');

				if($thisChildTarget===null) {
					$thisChildTarget = target;
				} else {
					tmpUlContainer.push($thisChildTarget);
				}

				var parentClassName='';

				while(parentClassName!=='taby'){
					var $parentNode = $thisChildTarget.parentNode;
					if($parentNode.nodeName.toLowerCase()==='ul'){
						tmpUlContainer.push($parentNode);
					}
					$thisChildTarget = $parentNode;
					parentClassName = $parentNode.className;
				}

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

			});
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