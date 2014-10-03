/*!
 * Suitstrap's Gruntfile
 * http://suitstrap.maartenvanhoof.be/
 *
 * Copyright 2013-2014 Maarten Van Hoof
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function(grunt) {
	"use strict";

	/* Force use of Unix newlines */
	grunt.util.linefeed = '\n';

	RegExp.quote = function(string) {
		return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
	};

	var fs = require('fs');
	var path = require('path');
	var BsLessdocParser = require('./grunt/bs-lessdoc-parser.js');
	var generateRawFiles = require('./grunt/bs-raw-files-generator.js');



  	/* Project configuration. */
	grunt.initConfig({

		/* ==========================================================================
		 * Metadata
		 * ======================================================================== */
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
			' * Suitstrap <%= pkg.version %> by @vanhoofmaarten\n' +
			' *\n' +
			' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
			' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
			' *\n' +
			' * Forked from Bootstrap v3.0.0, designed and built with all the love in the world by @mdo and @fat.\n' +
			' */\n',
		jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'Suitstrap\\\'s JavaScript requires jQuery\') }\n\n',



		/* ==========================================================================
		 * Clean
		 * ======================================================================== */
		clean: {
			dist: ['dist'],
			docs: 'docs/dist'
		},



		/* ==========================================================================
		 * JSHint
		 * ======================================================================== */
		jshint: {
			options: {
				jshintrc: 'js/.jshintrc'
			},
			grunt: {
				options: {
					jshintrc: 'grunt/.jshintrc'
				},
				src: ['Gruntfile.js', 'grunt/*.js']
			},
			core: {
				src: 'js/*.js'
			},
			test: {
				options: {
					jshintrc: 'js/tests/unit/.jshintrc'
				},
				src: 'js/tests/unit/*.js'
			},
			assets: {
				src: ['docs/assets/js/src/*.js', 'docs/assets/js/*.js', '!docs/assets/js/*.min.js']
			}
		},


		/* ==========================================================================
		 * JSCS // JavaScript Code Style checker
		 * ======================================================================== */
		jscs: {
			options: {
				config: 'js/.jscsrc'
			},
			grunt: {
				src: '<%= jshint.grunt.src %>'
			},
			core: {
				src: '<%= jshint.core.src %>'
			},
			test: {
				src: '<%= jshint.test.src %>'
			},
			assets: {
				options: {
					requireCamelCaseOrUpperCaseIdentifiers: null
				},
				src: '<%= jshint.assets.src %>'
			}
		},



		/* ==========================================================================
		 * Concat
		 * ======================================================================== */
		concat: {
			options: {
				banner: '<%= banner %>\n<%= jqueryCheck %>',
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
		 * Uglify
		 * ======================================================================== */
		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			core: {
				src: '<%= concat.bootstrap.dest %>',
				dest: 'dist/js/<%= pkg.slug %>.min.js'
			},
			customize: {
				src: [
					'docs/assets/js/vendor/less.min.js',
					'docs/assets/js/vendor/jszip.min.js',
					'docs/assets/js/vendor/uglify.min.js',
					'docs/assets/js/vendor/blob.js',
					'docs/assets/js/vendor/filesaver.js',
					'docs/assets/js/raw-files.min.js',
					'docs/assets/js/src/customizer.js'
				],
				dest: 'docs/assets/js/customize.min.js'
			},
			docsJs: {
				// NOTE: This src list is duplicated in footer.html; if making changes here, be sure to update the other copy too.
				src: [
					'docs/assets/js/vendor/holder.js',
					'docs/assets/js/vendor/ZeroClipboard.min.js',
					'docs/assets/js/src/application.js'
				],
				dest: 'docs/assets/js/docs.min.js'
			}
		},


		/* ==========================================================================
		 * Qunit
		 * ======================================================================== */
		qunit: {
			options: {
				inject: 'js/tests/unit/phantom.js'
			},
			files: 'js/tests/index.html'
		},



		/* ==========================================================================
		 * Sass
		 * ======================================================================== */
		sass: {
			compileCore: {
				options: {
					sourceMap: true
				},
				src: 'sass/suitstrap.scss',
				dest: 'dist/css/<%= pkg.slug %>.css'
			},
			// compileTheme: {
			// 	options: {
			// 		//sourceMap: true
			// 	},
			// 	src: 'sass/theme.scss',
			// 	dest: 'dist/css/<%= pkg.name %>-theme.css'
			// }
		},



		/* ==========================================================================
		 * Autoprefixer
		 * ======================================================================== */
		autoprefixer: {
			options: {
				browsers: [
					'Android 2.3',
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24', // Firefox 24 is the latest ESR
					'Explorer >= 8',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6'
				]
			},
			core: {
				options: {
					map: true
				},
				src: 'dist/css/<%= pkg.slug %>.css'
			},
			// theme: {
			// 	options: {
			// 		map: true
			// 	},
			// 	src: 'dist/css/<%= pkg.slug %>-theme.css'
			// },
			docs: {
				src: 'docs/assets/css/src/docs.css'
			},
			examples: {
				expand: true,
				cwd: 'docs/examples/',
				src: ['**/*.css'],
				dest: 'docs/examples/'
			}
		},



		/* ==========================================================================
		 * CSS Lint
		 * ======================================================================== */
		csslint: {
			options: {
				csslintrc: 'sass/.csslintrc'
			},
			dist: [
				'dist/css/<%= pkg.slug %>.css',
				//'dist/css/<%= pkg.slug %>-theme.css'
			],
			examples: [
				'docs/examples/**/*.css'
			],
			docs: {
				options: {
					ids: false,
					'overqualified-elements': false
				},
				src: 'docs/assets/css/src/docs.css'
			}
		},



		/* ==========================================================================
		 * Minify CSS
		 * ======================================================================== */
		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				noAdvanced: true,
				banner: '<%= banner %>',
			},
			minifyCore: {
				src: 'dist/css/<%= pkg.slug %>.css',
				dest: 'dist/css/<%= pkg.slug %>.min.css'
			},
			// minifyTheme: {
			// 	src: 'dist/css/<%= pkg.slug %>-theme.css',
			// 	dest: 'dist/css/<%= pkg.slug %>-theme.min.css'
			// },
			docs: {
				src: [
					'docs/assets/css/src/docs.css',
					'docs/assets/css/src/pygments-manni.css'
				],
				dest: 'docs/assets/css/docs.min.css'
			}
		},



		/* ==========================================================================
		 * Reorder CSS
		 * ======================================================================== */
		csscomb: {
			options: {
				config: 'sass/.csscomb.json'
			},
			dist: {
				expand: true,
				cwd: 'dist/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/css/'
			},
			examples: {
				expand: true,
				cwd: 'docs/examples/',
				src: '**/*.css',
				dest: 'docs/examples/'
			},
			docs: {
				src: 'docs/assets/css/src/docs.css',
				dest: 'docs/assets/css/src/docs.css'
			}
		},



		/* ==========================================================================
		 * Copy
		 * ======================================================================== */
		copy: {
			fonts: {
				src: 'fonts/*',
				dest: 'dist/'
			},
			docs: {
				src: 'dist/*/*',
				dest: 'docs/'
			}
		},



		/* ==========================================================================
		 * Connect
		 * ======================================================================== */
		connect: {
			server: {
				options: {
					port: 3000,
					base: '.'
				}
			}
		},



		/* ==========================================================================
		 * Jekyll
		 * ======================================================================== */
		jekyll: {
			docs: {},
		},



		/* ==========================================================================
		 * Validation
		 * ======================================================================== */
		validation: {
			options: {
				charset: 'utf-8',
				doctype: 'HTML5',
				failHard: true,
				reset: true,
				relaxerror: [
					'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
					'Element img is missing required attribute src.',
					'Attribute autocomplete not allowed on element input at this point.',
					'Attribute autocomplete not allowed on element button at this point.'
				]
			},
			files: {
				src: '_gh_pages/**/*.html'
			}
		},



		/* ==========================================================================
		 * Find and replace
		 * ======================================================================== */
		sed: {
			versionNumber: {
				pattern: (function() {
					var old = grunt.option('oldver');
					return old ? RegExp.quote(old) : old;
				})(),
				replacement: grunt.option('newver'),
				recursive: true
			}
		},



		/* ==========================================================================
		 * Watch
		 * ======================================================================== */
		watch: {
			grunt : {
				files: '<%= jshint.grunt.src %>',
				tasks: ['jshint:grunt']
			},
			src: {
				files: '<%= jshint.core.src %>',
				tasks: ['jshint:src', 'qunit', 'concat']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			},
			sass: {
				files: ["sass/**/*.scss"],
				tasks: ['sass']
			}
		},



	});



	/*  Define used plugins
		========================================================================== */
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});



	/*  Define tasks
		========================================================================== */

	// Docs HTML validation task
	grunt.registerTask('validate-html', ['jekyll', 'validation']);

	var runSubset = function(subset) {
		return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
	};
	var isUndefOrNonZero = function(val) {
		return val === undefined || val !== '0';
	};

	// Test task.
	var testSubtasks = [];

	// Skip core tests if running a different subset of the test suite
	if (runSubset('core')) {
		testSubtasks = testSubtasks.concat(['dist-css', 'dist-js', 'csslint:dist', 'jshint:core', 'jshint:test', 'jshint:grunt', 'jscs:core', 'jscs:test', 'jscs:grunt', 'qunit', 'docs']);
	}

	// Skip HTML validation if running a different subset of the test suite
	if (runSubset('validate-html') &&
		// Skip HTML5 validator on Travis when [skip validator] is in the commit message
		isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) {
		testSubtasks.push('validate-html');
	}

	grunt.registerTask('test', testSubtasks);

	// JS distribution task.
	grunt.registerTask('dist-js', ['concat', 'uglify:core']);

	// CSS distribution task.
	// grunt.registerTask('sass-compile', ['sass:compileCore', 'sass:compileTheme']);
	// grunt.registerTask('dist-css', ['sass-compile', 'autoprefixer:core', 'autoprefixer:theme', 'csscomb:dist', 'cssmin:minifyCore', 'cssmin:minifyTheme']);

	grunt.registerTask('sass-compile', ['sass:compileCore']);
	grunt.registerTask('dist-css', ['sass-compile', 'autoprefixer:core', 'csscomb:dist', 'cssmin:minifyCore']);

	// Full distribution task.
	grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy:fonts', 'dist-js']);

	// Default task.
	grunt.registerTask('default', ['clean:dist', 'copy:fonts', 'test']);

	// Version numbering task.
	// grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
	// This can be overzealous, so its changes should always be manually reviewed!
	grunt.registerTask('change-version-number', 'sed');

	// task for building customizer
	// grunt.registerTask('build-customizer', ['build-customizer-html', 'build-raw-files']);
	// grunt.registerTask('build-customizer-html', 'jade');
	// grunt.registerTask('build-raw-files', 'Add scripts/less files to customizer.', function() {
	// 	var banner = grunt.template.process('<%= banner %>');
	// 	generateRawFiles(grunt, banner);
	// });

	// Docs task.
	grunt.registerTask('docs-css', ['autoprefixer:docs', 'autoprefixer:examples', 'csscomb:docs', 'csscomb:examples', 'cssmin:docs']);
	grunt.registerTask('lint-docs-css', ['csslint:docs', 'csslint:examples']);
	grunt.registerTask('docs-js', ['uglify:docsJs', 'uglify:customize']);
	grunt.registerTask('lint-docs-js', ['jshint:assets', 'jscs:assets']);
	grunt.registerTask('docs', ['docs-css', 'lint-docs-css', 'docs-js', 'lint-docs-js', 'clean:docs', 'copy:docs', 'build-customizer']);
};
