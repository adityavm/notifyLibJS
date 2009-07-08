/**
 * notifyLibJS.js - Version 1.0
 * Last update: 07-07-09
 *
 * Unified notifications library to handle Growl notifications across all
 * available platforms — Safari (with Growler), Firefox (with Yip), Fluid and Prism
 * 
 * @author Aditya Mukherjee - aditya@adityamukherjee.com
 *
 * @license modified MIT License

Copyright (c) 2009 Aditya Mukherjee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 */

(function(){
	//hopefully userAgent isn't being spoofed
	if(navigator.userAgent.indexOf('Safari') != -1){
		if(!window.fluid){//this isn't Fluid
			for(var i=0, growler = 0;i<navigator.plugins.length;i++){//check if Growler exists
				if(navigator.plugins[i].name == 'Growler'){
					growler = 1; break;
				}
			}

			if(growler){
 				window.addEventListener('load', function(){
					var e = document.createElement('embed');
					e.type = 'application/x-growl'; e.name = 'Growler'; e.width = '0px'; e.height = '0px';
					document.body.appendChild(e);
				}, true);
			}
		}
	}//Safari
	else if (navigator.userAgent.indexOf('Firefox')){
		if(!window.platform){//this isn't Prism
			//throw "Error: Yip not found"; //you should not throw things
		}
	} else {
		//no notifications API for IE (DIE!)
	}
	
	if(!window.notify){
		window.notify = function(values){
			var args = {
				title: (values.title) ? values.title : document.title,
				description: (values.description) ? values.description : "Notification from " + location.host,
				icon: (values.icon) ? values.icon : 'http://' + location.host + "/favicon.ico",
				priority: (values.priority) ? values.priority : 0,
				sticky: (values.sticky) ? values.sticky : false,
				identifier: (values.identifier) ? values.identifier : null
			};
			
			if(window.platform && window.platform.showNotification){//this is Firefox/Prism
				window.platform.showNotification(args.title, args.description, args.icon);
			} else {
				var plugin = window.fluid || document.embeds.Growler;
				if(plugin){
					plugin.showGrowlNotification(args);
				} else {
					//throw "Error: No notification API found"; //you should not keep on throwing things
				}
			}
		}
	}
}());