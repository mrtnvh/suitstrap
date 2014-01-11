/* jshint node: true */

module.exports = function(grunt) {
	"use strict";

	var btoa = require('btoa')

	/* Project configuration. */
	grunt.initConfig({

	/* ==========================================================================
		Metadata
		========================================================================== */
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
							' * Suitstrap <%= pkg.version %> by @vanhoofmaarten\n' +
							' *\n' +
							' * Forked from Bootstrap v3.0.0 by @fat and @mdo\n' +
							' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
							' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
							' *\n' +
							' * Designed and built with all the love in the world by @mdo and @fat.\n' +
							' */\n',
		jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',

	/* ==========================================================================
		Clean
		========================================================================== */
		clean: {
			dist: ['dist']
		},

	/* ==========================================================================
		JSHint
		========================================================================== */
		jshint: {
			options: {
				jshintrc: 'js/.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			src: {
				src: ['js/*.js']
			},
			test: {
				src: ['js/tests/unit/*.js']
			},
			docs:{
				src: ['docs-assets/js/application.js']
			}
		},

	/* ==========================================================================
		Concat
		========================================================================== */
		concat: {
			options: {
				banner: '<%= banner %><%= jqueryCheck %>',
				stripBanners: false
			},
			bootstrap: {
				src: [
					'js/transition.js',
					'js/alert.js',
					'js/button.js',
					'js/carousel.js',
					'js/collapse.js',
					'js/dropdown.js',
					'js/modal.js',
					'js/tooltip.js',
					'js/popover.js',
					'js/scrollspy.js',
					'js/tab.js',
					'js/affix.js'
				],
				dest: 'dist/js/<%= pkg.slug %>.js'
			}
		},

	/* ==========================================================================
		Uglify
		========================================================================== */
		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			bootstrap: {
				src: ['<%= concat.bootstrap.dest %>'],
				dest: 'dist/js/<%= pkg.slug %>.min.js'
			}
		},

	/* ==========================================================================
		Compass
		========================================================================== */
		compass: {
			options: {
				config: 'config.rb',
			},
			development: {
				src: ["sass/**/*.scss"]
			}
		},

	/* ==========================================================================
		Minify CSS
		========================================================================== */
		cssmin: {
			options: {
				banner: '<%= banner %>',
			},
			minify: {
				expand: true,
				cwd: 'dist/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/css/',
				ext: '.min.css'
			}
		},

	/* ==========================================================================
		Copy
		========================================================================== */
		copy: {
			fonts: {
				expand: true,
				src: ["fonts/*"],
				dest: 'dist/'
			}
		},

	/* ==========================================================================
		Qunit
		========================================================================== */
		qunit: {
			options: {
				inject: 'js/tests/unit/phantom.js'
			},
			files: ['js/tests/*.html']
		},

	/* ==========================================================================
		Connect
		========================================================================== */
		connect: {
			server: {
				options: {
					port: 3000,
					base: '.'
				}
			}
		},

	/* ==========================================================================
		Jekyll
		========================================================================== */
		jekyll: {
			docs: {

			},
			build: {
				options: {
					dest: '_gh_pages',
					config: '_config.yml'
				}
			},
			serve: {
				options: {
					serve: true,
					dest: '_gh_pages',
					drafts: true,
					server_port: 5000,
					exclude: ['node_modules', 'less'],
				}
			}
		},

	/* ==========================================================================
		Validation
		========================================================================== */
		validation: {
			options: {
				reset: true
			},
			files: {
				src: ["_gh_pages/**/*.html"]
			}
		},

	/* ==========================================================================
		Watch
		========================================================================== */
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src', 'qunit']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			},
			compass:{
				files: '<%= compass.development.src %>',
				tasks: [
					'compass:development',
					'cssmin:minify',
					'jekyll:build'
				]
			},
			docs_js:{
				files: ['<%= jshint.docs.src %>', '<%= concat.bootstrap.src %>'],
				tasks: ['jshint:docs', 'dist-js']
			},
			docs:{
				files: [
					'_includes/**/*.html',
					'_layouts/**/*.html',
					'*.html',
					'docs/**/*.*',
					'docs-assets/**/*.*'
				],
				tasks: ['jekyll:build']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'_gh_pages/**/*'
				]
			}
		}
	});


	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('browserstack-runner');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-recess');

	// Docs HTML validation task
	grunt.registerTask('validate-html', ['jekyll', 'validation']);

	// Test task.
	var testSubtasks = ['dist-css', 'jshint', 'qunit', 'validate-html'];
	// Only run BrowserStack tests under Travis
	if (process.env.TRAVIS) {
		// Only run BrowserStack tests if this is a mainline commit in twbs/bootstrap, or you have your own BrowserStack key
		if ((process.env.TRAVIS_REPO_SLUG === 'twbs/bootstrap' && process.env.TRAVIS_PULL_REQUEST === 'false') || process.env.TWBS_HAVE_OWN_BROWSERSTACK_KEY) {
			testSubtasks.push('browserstack_runner');
		}
	}
	grunt.registerTask('test', testSubtasks);

	// JS distribution task.
	grunt.registerTask('dist-js', ['concat', 'uglify']);

	// CSS distribution task.
	grunt.registerTask('dist-css', ['compass:development']);

	// Fonts distribution task.
	grunt.registerTask('dist-fonts', ['copy']);

	// Full distribution task.
	grunt.registerTask('dist', ['clean', 'dist-css', 'dist-fonts', 'dist-js']);

	// Default task.
	grunt.registerTask('default', ['test', 'dist', 'build-customizer']);

	// task for building customizer
	grunt.registerTask('build-customizer', 'Add scripts/sass files to customizer.', function () {
		var fs = require('fs')

		function getFiles(type) {
			var files = {}
			fs.readdirSync(type)
				.filter(function (path) {
					return type == 'fonts' ? true : new RegExp('\\.' + type + '$').test(path)
				})
				.forEach(function (path) {
					var fullPath = type + '/' + path
					return files[path] = (type == 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8'))
				})
			return 'var __' + type + ' = ' + JSON.stringify(files) + '\n'
		}

		var files = getFiles('js') + getFiles('less') + getFiles('fonts')
		fs.writeFileSync('docs-assets/js/raw-files.js', files)
	});
};
