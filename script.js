var zero = {lat: 49.0, lng: 31.0};//49.429195, 31.688463
var data = {
    "area": {
        "1": {
            "name": "Винницкая область",
            "lat": 49.187211,
            "lng": 28.556336
        },
        "2": {
            "name": "Волынская область",
            "lat": 51.147584,
            "lng": 24.880998
        },
        "3": {
            "name": "Днепропетровская область",
            "lat": 48.419174,
            "lng": 35.240662
        },
        "4": {
            "name": "Донецкая область",
            "lat": 47.961066,
            "lng": 37.958122
        },
        "5": {
            "name": "Житомирская область",
            "lat": 50.210778,
            "lng": 28.827041
        },
        "6": {
            "name": "Закарпатская область",
            "lat": 48.495127,
            "lng": 22.392596
        },
        "7": {
            "name": "Запорожская область",
            "lat": 47.721217,
            "lng": 35.357896
        },
        "8": {
            "name": "Ивано-Франковская область",
            "lat": 48.904808,
            "lng": 24.986804
        },
        "9": {
            "name": "Киевская область",
            "lat": 49.685755,
            "lng": 30.677721
        },
        "10": {
            "name": "Кировоградская область",
            "lat": 48.396748,
            "lng": 32.358629
        },
        "11": {
            "name": "Луганская область",
            "lat": 48.498770,
            "lng": 39.071275
        },
        "12": {
            "name": "Львовская область",
            "lat": 49.778070,
            "lng": 24.294665
        },
        "13": {
            "name": "Николаевская область",
            "lat": 47.051784,
            "lng": 31.413805
        },
        "14": {
            "name": "Одесская область",
            "lat": 46.819232,
            "lng": 30.655748
        },
        "15": {
            "name": "Полтавская область",
            "lat": 49.443484,
            "lng": 34.555894
        },
        "16": {
            "name": "Ровенская область",
            "lat": 50.934544,
            "lng": 26.272204
        },
        "17": {
            "name": "Сумская область",
            "lat": 50.969150,
            "lng": 34.303209
        },
        "18": {
            "name": "Тернопольская область",
            "lat": 49.379152,
            "lng": 25.415270
        },
        "19": {
            "name": "Харьковская область",
            "lat": 49.820618,
            "lng": 36.258775
        },
        "20": {
            "name": "Херсонская область",
            "lat": 46.366261,
            "lng": 32.633287
        },
        "21": {
            "name": "Хмельницкая область",
            "lat": 49.243064,
            "lng": 27.107165
        },
        "22": {
            "name": "Черкасская область",
            "lat": 49.820618,
            "lng": 32.193834
        },
        "23": {
            "name": "Черновицкая область",
            "lat": 48.184540,
            "lng": 25.668247
        },
        "24": {
            "name": "Черниговская область",
            "lat": 51.730663,
            "lng": 31.756328
        },
        "25": {
            "name": "Киев",
            "lat": 50.436616,
            "lng": 30.684678
        }
    }
};
function getIcon(n) {
    var _color = '#FF99CC';
    var _scale = 12;
    if (n >= 100 && n <1000) {
        _color = '#FF0099';
        _scale = 17;
    } else if (n >= 1000 && n < 10000) {
        _color = '#CC0066';
        _scale = 22;
    } else if (n >= 10000 && n < 100000) {
        _color = '#990033';
        _scale = 27;
    } else if (n >= 100000){
        _color = '#660033';
        _scale = 35;
    }
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        fillColor: _color,
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#fff',
        scale: _scale
    };
}

function getMarker(map, position, title, n) {
    return new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        icon: getIcon(n),
        label: {
            color: '#FFFF99',
            fontSize: '11pt',
            fontWeight: '100',
            text: n.toString()
        }
    });
}

function getData(callback) {
    let url = 'https://coronavirusukraine.github.io/data_map.json';
    let data;

    fetch(url)
    .then(res => res.json())
    .then((out) => {
        callback(out);
    })
    .catch(err => { throw err });
}

function getTitle(item, area) {
    return area.name;
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: zero,
      gestureHandling: 'cooperative'
    });
    // var mark = getMarker(map, new google.maps.LatLng(49.393632, 31.856577), 'title', 10);
    getData((data_map) => {
        for(var index in data_map.confirmed) { 
            var item = data_map.confirmed[index];
            var area = data.area[index]; 
            getMarker(map, new google.maps.LatLng(area.lat, area.lng), getTitle(item, area), item.c);
        }    
    });
    
  }
