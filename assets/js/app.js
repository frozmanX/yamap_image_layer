let images = null;
let map = null;
init('http://map.loc/data/json/images.json');
/*
* =================================================================================
* */

function init(url){
  loadJSON(url).then((response)=>{
    ymaps.ready(drawMap);
  });
}

async function loadJSON (url) {
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      images = myJson.images;
      map = myJson.map;
    });
}

function drawMap () {
  const myMap = new ymaps.Map('map', {
    center: map.center,
    zoom: map.zoom
  });
  let imageSize = images.defaultSize;
  
  for(const index in images.items){
    if(images.items.hasOwnProperty(index))
    {
      const image = images.items[index];
      if(image.size){
        imageSize = image.size
      }
      myMap.geoObjects.add(
        new ymaps.Placemark(image.position, {
          balloonContent: image.balloonContent
        }, {
          iconLayout: 'default#image',
          iconImageHref: image.url,
          iconImageSize: imageSize,
          iconImageOffset: [Math.round(imageSize[0]/2), Math.round(-imageSize[1]/2)],
        })
      );
    }
  }
  
}
