
function removeFlashHandler() {
	var replaceNode = function(node) {
		if(node.hasFlashUnblocked) return;
		var div = document.createElement('div');
		var childDiv = document.createElement('div');
		div.setAttribute('class', 'flashBlockBlockedDiv');
		
		childDiv.style.width = div.style.width = Math.max(50, (node.clientWidth - 2)) + 'px';
		childDiv.style.height = div.style.height = Math.max(26, (node.clientHeight - 2)) + 'px';
		
		childDiv.style.backgroundImage = 'url(' + chrome.extension.getURL('flashBlockBg.png') + ')';
		
		div.appendChild(childDiv);
		
		div.onclick = function() {
			node.hasFlashUnblocked = true;
			
			this.parentNode.replaceChild(node, this);
		}
	
		node.parentNode.replaceChild(div, node);
	}
	
	var removeFlash = function() {
		objects = document.getElementsByTagName('object');
	
		for(var i = 0; i < objects.length; i++) {
			replaceNode(objects[i]);
		}
		
		embeds = document.getElementsByTagName('embed');
		
		for(var i = 0; i < embeds.length; i++) {
			replaceNode(embeds[i]);
		}
	}
	
	removeFlash();
	
	for (var i = 0; i < 10000; i+= 300) {
		window.setTimeout(function(){
			removeFlash();
		}, i);
	};
}

window.onload = function() {
	console.log(document.location.href);
	removeFlashHandler();
}

removeFlashHandler();
