module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		clean: ['dist'],
		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['css/**','js/**','fonts/**','images/**','*.html','*.php','*.txt'],
						dest: 'dist/'
					}
				]
			}
		},
		'ftp-deploy': {
			build: {
				auth: {
					host: 'ftp.mandygodding.co.uk',
					port: 21,
					authKey: 'galacticDramaKey'
				},
				src:'dist',
				// .ftppass with details is needed (not included in repo)
				dest: '/htdocs/galacticDrama',
				exclusions: ['dist/.DS_Store', 'dist/Thumbs.db', 'dist/tmp', 'dist/.git']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-ftp-deploy');

	// Default task(s).
	grunt.registerTask('default', ['clean','copy']);
	grunt.registerTask('deploy', ['clean','copy','ftp-deploy']);
};