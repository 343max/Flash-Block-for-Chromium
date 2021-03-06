
function removeFlashHandler() {
	var replaceNode = function(node, backgroundImageName) {
		
		// was blocked, but user clicked allready
		if(node.hasFlashUnblocked) return;
		
		// embed tag inside an object tag - don't block twice
		if(node.parentNode.nodeName == 'OBJECT') return;
		
		
		var div = document.createElement('div');
		var childDiv = document.createElement('div');
		div.setAttribute('class', 'flashBlockBlockedDiv');
		
		//div.setAttribute('style', window.getComputedStyle(node));
		
		childDiv.style.width = div.style.width = Math.max(50, (node.clientWidth - 2)) + 'px';
		childDiv.style.height = div.style.height = Math.max(26, (node.clientHeight - 2)) + 'px';
		
		childDiv.style.backgroundImage = 'url(' + chrome.extension.getURL(backgroundImageName) + ')';
		
		div.appendChild(childDiv);
		
		div.onclick = function() {
			node.hasFlashUnblocked = true;
			
			this.parentNode.replaceChild(node, this);
		}
	
		node.parentNode.replaceChild(div, node);
	}
	
	var removeFlash = function(doc) {
		var iframes = doc.getElementsByTagName('iframe');
		for(var i = 0; i < iframes.length; i++) {
			replaceNode(iframes[i], 'iframeBlockBg.png');
		}

		var objects = doc.getElementsByTagName('object');
	
		for(var i = 0; i < objects.length; i++) {
			replaceNode(objects[i], 'flashBlockBg.png');
		}
		
		var embeds = doc.getElementsByTagName('embed');
		
		for(var i = 0; i < embeds.length; i++) {
			replaceNode(embeds[i], 'flashBlockBg.png');
		}
	}
	
	removeFlash(document);
	
	for (var i = 0; i < 10000; i+= 300) {
		window.setTimeout(function(){
			removeFlash(document);
		}, i);
	};
}

/* window.onload = function() {
	console.log(document.location.href);
	removeFlashHandler();
} */

removeFlashHandler();
