module.exports = function(grunt) {

	'use strict';

	var watch_files = [
		'Gruntfile.js',
		'karma.conf.js',
		'taby.js',
		'tests/*.js'
	];

	grunt.initConfig({
		jshint: {
			files: watch_files,
			options: {
				expr:true,
				newcap: false,
				quotmark: 'single',
				validthis:true,
				loopfunc: true,
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true
			}
		},
		'bower-install-simple': {
			options: {
				color: true,
				production:  false
			}
		},
		copy: {
			sass: {
				cwd : 'bower_components/bootstrap-sass-official/vendor/assets/stylesheets',
				src : '**',
				dest : 'vendor/scss',
				flatten : false,
				filter : 'isFile',
				expand: true
			}
		},
		concat: {
			ready: {
				files: {
					'vendor/js/ready.js': 'bower_components/domready/ready.js'
				}
			},
            jquery : {
                files : {
                    'vendor/js/jquery.js' : 'bower_components/jquery/dist/jquery.js'
                }
            },
            // >>> pages
            pages_jquery : {
                files : {
                    'gh-pages/jquery.js' : 'bower_components/jquery/dist/jquery.js'
                }
            },
            pages_ready : {
                files : {
                    'gh-pages/ready.js'  : 'bower_components/domready/ready.js'
                }
            },
            pages_tabyjs : {
                files : {
                    'gh-pages/taby.js'   : 'taby.js'
                }
            },
            pages_tabycss : {
                files : {
                    'gh-pages/taby.css'  : 'taby.css'
                }
            }
		},
		sass: {
			dist: {
				files: {
					'taby.css': 'scss/styles.scss'
				}
			},
			options: {
				style: 'expanded'
			}
		},
		clean : {
			bower : [
				'.sass-cache',
				'bower_components',
				'vendor/js/*.js',
				'vendor/scss/bootstrap',
				'vendor/scss/bootstrap.scss',
				'taby.css',
				'taby.min.css',
				'taby.min.js'
			]
		},
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
		watch: {
			js : {
				files: watch_files,
				tasks: ['jshint', 'concat'],
				options : {
					livereload : false
				}
			},
			sass : {
				files: ['scss/*.scss'],
				tasks: ['sass', 'concat'],
				options : {
					livereload : false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-install-simple');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['jshint', 'sass', 'concat', 'watch']);
    grunt.registerTask('tests', ['karma']);

	grunt.registerTask('bower', [
		'clean:bower',
		'bower-install-simple',
		'concat', 'copy'
	]);
	grunt.registerTask('clear', ['clean:bower']);

};