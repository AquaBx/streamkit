const {remote,shell} = require("electron")

var elec_window = remote.getCurrentWindow()

function percent(x,wc,w){
	return x*(wc-w)/100+w/2
}

function maxchk(id){
	var doc = document.getElementById(id)
	if (parseInt(doc.value) >= parseInt(doc.max)){
		doc.value = doc.max
	}
	else if (parseInt(doc.value) <= parseInt(doc.min)){
		doc.value = doc.min
	}
	return document.getElementById(id).value
}

function change(id,id2){
	var width = maxchk("width")
	var height = maxchk("height")

	document.getElementById(id).width = maxchk("width")
	document.getElementById(id).height = maxchk("height")

	var ctx = document.getElementById(id).getContext('2d')
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = document.getElementById("color").value
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"

	var social = document.getElementById("social").value
	var social = obj[social.toLowerCase()]
	var text = document.getElementById("text").value

	ctx.font = '100px "Networks"'
	var xlogo = percent(maxchk("x-logo"), maxchk("width"), ctx.measureText(social).width)
	var ylogo = percent(maxchk("y-logo"), maxchk("height"), ctx.measureText(social).width)
	ctx.fillText(social, xlogo, ylogo)

	ctx.font = document.getElementById("fontsize").value/16 + 'em"' + document.getElementById("font").value + '"';
	var xtext = percent(maxchk("x-text"), maxchk("width"), ctx.measureText(text).width)
	var ytext = percent(maxchk("y-text"), maxchk("height"), document.getElementById("fontsize").value)
	ctx.fillText(text, xtext, ytext);

	var fichier = document.getElementById(id2).files
	if (fichier.length != 0){
		var fichier = fichier[0]	
		ctx.globalCompositeOperation='destination-over'
		var img = new Image;
		img.onload = function() {
			var nwidth = width
			var nheight = this.height*width/this.width
			var nx = 0
			var ny = - maxchk("y")*(nheight-height)/100

			ctx.drawImage(img, nx, ny, nwidth, nheight)
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

