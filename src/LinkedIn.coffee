requirejs.config
	paths:
		"LinkedInSrc": '//platform.linkedin.com/in.js?async=true'

	shim:
		"LinkedInSrc":
			exports: 'IN'


define ['EventEmitter','module'], (EventEmitter, module) ->
	class LinkedIn extends EventEmitter
		constructor: (@config) ->
			## Init EventEmitter
			super()

			@injectScript()

			@once 'inInit', (IN) ->
				IN.parse()

		injectScript: () =>
			requirejs ['LinkedInSrc'], (IN) =>
				
				initFuncName = 'onLinkedInInit' + (new Date().getTime())
				window[initFuncName] = () => 
					@IN = IN
					@fireEvent 'inInit', IN

				IN.init
					onLoad: initFuncName
					deferParse: true
					locale: 'en_GB'

		onReady: (callback = @cb) =>
			if @IN?
				callback @IN
			else
				@once 'inInit', () => callback @IN

		renderPlugins: (cb = @cb) ->
			@onReady (IN) ->
				IN.parse()

		share: (params) =>
			@onReady (IN) =>
				IN.UI.Share().params(params).place()

	new LinkedIn module.config()
	