var numPics = 30;
var page = 1;

function setPicNum(i){
	numpics=i;
}

function loadImages() {
	var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=9c990a7b0a5e6cdad6b6b5d5749f1de2&tags=' + document.getElementById("tags").value;
	url += '&page=' + page;
	
	$.ajax({url:url, dataType:"json"}).then(function(data) {
		
		console.log(data);
		
		var set = '';
		
		for (var i = 0; i < numPics; i++){
			var src = 'https://live.staticflickr.com/' + data.photos.photo[i].server;
			src += '/' + data.photos.photo[i].id + '_' + data.photos.photo[i].secret + '_m.jpg';
			
			if (i%5 == 0){
				set = '<div class="row">';
			}
			
			var card = '<div style="width:4%"></div><div style="width:15%" height=400px><div class="card">';
			
			card += '<img class="card-img-top" src="' + src + '" alt="' + data.photos.photo[i].title + '">';
			card += '<div class="card-body"><h5 class="card-title">' + data.photos.photo[i].title + '</h5></div>';
			
			card += '</div></div>';
			
			
			set += card;
			
			if (i%5 == 4){
				set += '<div style="width:4%"></div></div><br>';
				document.getElementById("pics").innerHTML += set;
			}
		}
		
		page += 1;
	});
}

$(document).ready(function(){
	$(window).scroll(function(){

		var position = $(window).scrollTop();
		var bottom = $(document).height() - $(window).height();
		
		if (position == bottom) {
			loadImages();
		}
	});
});
