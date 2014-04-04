
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