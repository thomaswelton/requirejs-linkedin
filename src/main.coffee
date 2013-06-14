require ['LinkedIn'], (LinkedIn) ->
	console.log 'main init'

	document.body.addEvent 'click:relay(.linkedInShare)', (event) ->
		LinkedIn.share
			url: this.getProperty 'data-url'