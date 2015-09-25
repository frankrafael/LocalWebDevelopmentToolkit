'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

module.exports = function(grunt) {
	grunt.config.set('connect',{ //facade -> should overwrite?
		options: {
			port: 9000,
			hostname: 'localhost'
		},
		rules : [ //facade -> Get Rules
			{from:'^/b', to:'/index.html'}
		],
		server: {
            options :{
				middleware: function (connect, options, middlewares) {
					middlewares.unshift(rewriteRulesSnippet);
					middlewares.unshift(proxySnippet);

					return middlewares;
			    }
            },
            proxies: [ //facade -> Get Proxies
                {
                    context: '/google',
                    host: 'google.com',
                    port: 80,
                    https: true
                }
            ]
        }
    });
	grunt.loadNpmTasks('grunt-connect-rewrite');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-connect-proxy');
};
