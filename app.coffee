

NavbarComponent = require "NavbarComponent"
flow = new FlowComponent
flow.index = 1
flow.showNext(first)  
# Allows for only Horizontal scrolling
scrollComp = new ScrollComponent
   scrollHorizontal: false
   y: 0
   width: 435
   height: 781
scrollComp.contentInset = 
	top: 170
	
scrollComp.index = 2
############################################
# Example usage.
# For all features, please check the README.
############################################

myNavbar = new NavbarComponent
	# General
	style: "light"
	size: "large"
	title: "12C"

	# Search bar
	searchLabel: "Search"
	search: true
	dictation: true
myNavbar.index = 3

placeholderComponent = scrollComp
myNavbar.scrollWith(placeholderComponent) # replace placeholderComponent with the name of your FlowComponent or ScrollComponent


