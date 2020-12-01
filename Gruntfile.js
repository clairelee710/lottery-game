/*===========================================================================
 * css file architecture
 * -- watch files: assets/css
 * -- compass file: assets/css format from scss to css
 *
 * js file architecture
 * -- watch files: assets/js
 * -- closure(compiler and minify) files: 
 *       -- core_js(jQuery/jEasing)
 *       -- (Page).js
 *=========================================================================*/
module.exports = function(grunt) {
    grunt.initConfig({
        path: {
            closure: '/Library/closure/'
        },
        file: {
            core_js: {
                dest: 'dist/js/core.js',
                src: [
                    "assets/js/jquery/dist/jquery.min.js",
                    "assets/js/jEasing/jquery.easing.1.3.js"
                ]
            },
            main_js: {
                dest: 'dist/js/main.js',
                src: [
                    // "assets/js/data.js",
                    "assets/js/marquee.js",
                    "assets/js/slots.js",
                    "assets/js/audio.js",
                    "assets/js/lotto.js"
                ]
            }
        },
        compass: {
            develop: {
                options: {
                    outputStyle: 'compressed',
                    sassDir: 'assets/css',
                    cssDir: 'dist/css',
                    environment: 'develop'
                }
            }
        },
        'closure-compiler': {
            core: {
                closurePath: '<%= path.closure %>',
                js: ['<%= file.core_js.src %>'],
                jsOutputFile: '<%= file.core_js.dest %>',
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    warning_level: "DEFAULT",
                    define: {
                        DEBUG: true
                    }
                }
            },
            main: {
                closurePath: '<%= path.closure %>',
                js: ['<%= file.main_js.src %>'],
                jsOutputFile: '<%= file.main_js.dest %>',
                noreport: true,
                options: {
                    // compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    compilation_level: 'WHITESPACE_ONLY',
                    warning_level: "DEFAULT",
                    define: {
                        DEBUG: false
                    }
                }
            }
        },
        watch: {
            main_css: {
                files: ['assets/css/*.scss'],
                tasks: ['compass:develop'],
                options: {
                    spawn: false,
                }
            },
            main_js: {
                files: ['<%= file.main_js.src %>'],
                tasks: ['closure-compiler:main'],
                options: {
                    spawn: false
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-closure-compiler');

    var FileAy = ["cvs ci"];
    var Target = "";
    grunt.event.on('watch', function(action, filepath, target) {
        Target = target;
        grunt.log.writeln("[Run Lotto task!]" ['yellow'].bold);
        grunt.log.write("filepath:" + filepath + "\n");
        FileAy.push(filepath);
        var files = grunt.config("file." + target + ".dest");
        FileAy.push(files);
        grunt.log.writeln(target + " :" + FileAy.join(" ")["green"]);
        FileAy = ["cvs ci"];
        return;
    });
};