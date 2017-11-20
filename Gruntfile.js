module.exports = function(grunt) {

    grunt.initConfig({
		connect: {
            all: {
                options: {
                    port: 1337,
                    hostname: 'localhost',
                    base: './www-root',
                    keepalive: false,
                    livereload: true,
                    open: true
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                cwd: {
                    files: './www-root'
                }
            },
            js: {
                 files: ['**/*.js']
            },
            html: {
                files: ['**/*.html']
            },
            css: {
                files: ['**/*.css']
            },
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        },
        sass: {
            options: {
                style: 'expanded',
                sourcemap: 'none',
            },
            dist: {
              files: [{
                expand: true,
                cwd: './www-root/sass',
                src: ['*.scss'],
                dest: './www-root/css',
                ext: '_compiled.css'
                }]
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('server', ['connect', 'watch']);
};
