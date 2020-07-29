const { remote } = require('electron')
var obj = require('./networks.json');
const { shell } = require('electron')


function percent(x,wc,w){
	return x*(wc-w)/100+w/2
}

function change(id,id2){

	document.getElementById(id).width = document.getElementById("width").value
	document.getElementById(id).height = document.getElementById("height").value

	var ctx = document.getElementById(id).getContext('2d')
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = document.getElementById("color").value
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"

	var social = document.getElementById("social").value
	var social = obj[social.toLowerCase()]
	var text = document.getElementById("text").value

	ctx.font = '100px "Networks"'
	var xlogo = percent(parseInt(document.getElementById("x-logo").value), document.getElementById("width").value, ctx.measureText(social).width)
	var ylogo = percent(parseInt(document.getElementById("y-logo").value), document.getElementById("height").value, ctx.measureText(social).width)
	ctx.fillText(social, parseInt(xlogo), parseInt(ylogo))

	ctx.font = document.getElementById("fontsize").value/16 + 'em"' + document.getElementById("font").value + '"';
	var xtext = percent(parseInt(document.getElementById("x-text").value), document.getElementById("width").value, ctx.measureText(text).width)
	var ytext = percent(parseInt(document.getElementById("y-text").value), document.getElementById("height").value, document.getElementById("fontsize").value)
	ctx.fillText(text, xtext, ytext);

	var fichier = document.getElementById(id2).files
	if (fichier.length != 0){
		var fichier = fichier[0]	
		ctx.globalCompositeOperation='destination-over'
		var img = new Image;
		img.onload = function() {
			var width = 395
			var height = width*this.height/this.width
			var x = 0
			var y =  - document.getElementById("y").value*(height-130)/100
			ctx.drawImage(img, x, y, width, height)
		}
		img.src = URL.createObjectURL(fichier)
	}
}	
function save(id){
	return document.getElementById(id).toDataURL('image/png')
}

function transform(classe, num){
    var classes = document.getElementsByClassName(classe)
    for (i = 0; i < classes.length; i++){
        classes[i].style.transform = 'translate(100%,0%)';
        
    }
    classes[num].style.transform = 'translate(0%,0%)';
    
}

