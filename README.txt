Unified notifications library to handle Growl notifications across all available platforms — Safari (with Growler), Firefox (with Yip), Fluid and Prism. The library is cross platform and takes care of any errors in posting notifications. If there is no notification API present, the call will silently fail (unless debug lines are un-commented).

Exposes a "notifications" namespace (new in 1.1) which contains the following properties and methods:

	Properties
	==========
	
	prism (boolean) 				: whether Prism notifications are supported
	fluid (boolean) 				: whether Fluid notifications are supported
	growler (boolean)				: whether Growler (for Safari) notifications are supported
	notifications_support (boolean)	: whether a notification API is present [^1]
	
	
	Methods
	=======
	
	notify 	({	title,
				description,
				icon,
				priority,
				sticky,
				identifier })		: post a notification with given information. All keys are optional
	

To post a default notification, simply call:

	notifications.notify();

---

[^1]: check this value to decide if you need to continue with notification specific code e.g. requesting additional data