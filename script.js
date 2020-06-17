var zero = {lat: 49.0, lng: 31.0};
var url_map = 'https://coronavirusukraine.github.io/data_map.json';
var url_graph = 'https://coronavirusukraine.github.io/data_graph.json';
var chartAreas;
var dataArea = {
    "areas": {},
    "xAxes": []
};
var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        responsive: true,
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: false,
                stacked: true
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                stacked: false
            }]
        },
    }
};
var data = {
    "area": {
        "1": {
            "color": "INDIANRED",
            "name": "Винницкая область",
            "lat": 49.187211,
            "lng": 28.556336
        },
        "2": {
            "color": "CRIMSON",
            "name": "Волынская область",
            "lat": 51.147584,
            "lng": 24.880998
        },
        "3": {
            "color": "FIREBRICK",
            "name": "Днепропетровская область",
            "lat": 48.419174,
            "lng": 35.240662
        },
        "4": {
            "color": "PINK",
            "name": "Донецкая область",
            "lat": 47.961066,
            "lng": 37.958122
        },
        "5": {
            "color": "HOTPINK",
            "name": "Житомирская область",
            "lat": 50.210778,
            "lng": 28.827041
        },
        "6": {
            "color": "DEEPPINK",
            "name": "Закарпатская область",
            "lat": 48.495127,
            "lng": 22.792596
        },
        "7": {
            "color": "MEDIUMVIOLETRED",
            "name": "Запорожская область",
            "lat": 47.121217,
            "lng": 35.357896
        },
        "8": {
            "color": "CORAL",
            "name": "Ивано-Франковская область",
            "lat": 48.904808,
            "lng": 24.986804
        },
        "9": {
            "color": "ORANGERED",
            "name": "Киевская область",
            "lat": 49.485755,
            "lng": 30.677721
        },
        "10": {
            "color": "ORANGE",
            "name": "Кировоградская область",
            "lat": 48.396748,
            "lng": 32.358629
        },
        "11": {
            "color": "GOLD",
            "name": "Луганская область",
            "lat": 48.498770,
            "lng": 39.071275
        },
        "12": {
            "color": "DARKKHAKI",
            "name": "Львовская область",
            "lat": 49.778070,
            "lng": 24.294665
        },
        "13": {
            "color": "THISTLE",
            "name": "Николаевская область",
            "lat": 47.351784,
            "lng": 31.413805
        },
        "14": {
            "color": "VIOLET",
            "name": "Одесская область",
            "lat": 46.819232,
            "lng": 29.855748
        },
        "15": {
            "color": "MAGENTA",
            "name": "Полтавская область",
            "lat": 49.443484,
            "lng": 34.555894
        },
        "16": {
            "color": "MEDIUMORCHID",
            "name": "Ровенская область",
            "lat": 50.934544,
            "lng": 26.272204
        },
        "17": {
            "color": "MEDIUMPURPLE",
            "name": "Сумская область",
            "lat": 50.969150,
            "lng": 34.303209
        },
        "18": {
            "color": "REBECCAPURPLE",
            "name": "Тернопольская область",
            "lat": 49.679152,
            "lng": 25.415270
        },
        "19": {
            "color": "DARKORCHID",
            "name": "Харьковская область",
            "lat": 49.820618,
            "lng": 36.258775
        },
        "20": {
            "color": "PURPLE",
            "name": "Херсонская область",
            "lat": 46.366261,
            "lng": 32.633287
        },
        "21": {
            "color": "INDIGO",
            "name": "Хмельницкая область",
            "lat": 49.243064,
            "lng": 27.107165
        },
        "22": {
            "color": "MEDIUMSLATEBLUE",
            "name": "Черкасская область",
            "lat": 49.820618,
            "lng": 32.193834
        },
        "23": {
            "color": "CHARTREUSE",
            "name": "Черновицкая область",
            "lat": 48.184540,
            "lng": 25.668247
        },
        "24": {
            "color": "LIMEGREEN",
            "name": "Черниговская область",
            "lat": 51.730663,
            "lng": 31.756328
        },
        "25": {
            "color": "MEDIUMSEAGREEN",
            "name": "Киев",
            "lat": 50.436616,
            "lng": 30.684678
        }
    }
};
function getIcon(n) {
    var _color = '#FF99CC';
    var _scale = 12*1.4;
    var _colorText = '#184e0a';
    if (n >= 100 && n <500) {
        _color = 'LightSalmon';
        _scale = 17*1.4;
        _colorText = '#333';
    } else if (n >= 500 && n < 1000) {
        _color = 'Salmon';
        _scale = 19*1.4;
        _colorText = '#FFFF99';
    } else if (n >= 1000 && n < 2000) {
        _color = 'LightCoral';
        _scale = 22*1.4;
        _colorText = '#FFFF99';
    } else if (n >= 2000 && n < 10000) {
        _color = 'IndianRed';
        _scale = 25*1.4;
        _colorText = '#FFFF99';
    } else if (n >= 10000 && n < 100000) {
        _color = 'IndianRed';
        _scale = 27*1.4;
        _colorText = '#FFFF99';
    } else if (n >= 100000){
        _color = '#660033';
        _scale = 35*1.2;
        _colorText = '#FFFF99';
    }
    return {
        "icon": {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 1,
            fillColor: _color,
            strokeOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#fff',
            scale: _scale
        },
        "colorText": _colorText
    };
}

function getMarker(map, position, title, n) {
    var icon = getIcon(n);
    return new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        icon: icon.icon,
        label: {
            color: icon.colorText,
            fontSize: '12pt',
            text: n.toString()
        }
    });
}

function getData(url, callback) {
    let data;

    fetch(url)
    .then(res => res.json())
    .then((out) => {
        callback(out);
    })
    .catch(err => { throw err });
}

function getTitle(item, area) {
    return area.name + 
        '\n Заболевших - ' + item.c;
}

function getTableRow(item, area) {
    return  '<tr><td>' + area.name + 
            '</td><td align="right">' + item.c + '</td></tr>';
}

function getTableTitle() {
    return '<tr class="table-title"><td>Область</td><td width="100">Заболевших</td></tr>';
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: zero,
      gestureHandling: 'cooperative'
    });
    
    getData(url_map, (data_map) => {
        var table = "";
        for(var index in data_map.confirmed) { 
            var item = data_map.confirmed[index];
            var area = data.area[index];
            getMarker(map, new google.maps.LatLng(area.lat, area.lng), getTitle(item, area), item.c);
            table += getTableRow(item, area);
        }    
        document.getElementById('total-data-c').innerHTML = data_map.total.c;
        document.getElementById('total-data-d').innerHTML = data_map.total.d;
        document.getElementById('total-data-r').innerHTML = data_map.total.r;
        document.getElementById('current-date').innerHTML = data_map.date;
        document.getElementById('table').innerHTML = '<table width="100%">' + getTableTitle() + table + '</table>';
    });
    
}

function getDataGraph(data_graph) {
    let f = function(_total) {
        if (_total.r == 0 || _total.d == 0) {
            return 0;
        }
        let res = (_total.c - (_total.d + _total.r)) / (_total.d + _total.r);
        return res;
    }
    let data = {
        "c": [],
        "cSum": [],
        "ot": [],
        "d": [],
        "r": [],
        "xAxes": []
    }
    data_graph.forEach((el)=>{
        data.xAxes.push(el.date.replace(' 10:00', ''));
        data.c.push(el.total.c - el.total.d - el.total.r);
        data.cSum.push(el.total.c);
        data.ot.push(f(el.total));
        data.d.push(el.total.d);
        data.r.push(el.total.r);
    });

    return data;
}

function getDataAreaGraph(data_graph) {
    let data = {
        "areas": {},
        "xAxes": []
    }
    data_graph.forEach((el)=>{
        data.xAxes.push(el.date.replace(' 10:00', ''));
        for (var key in el.confirmed) {
            if (data.areas[key] == undefined) {
                data.areas[key] = [el.confirmed[key].c];
            } else {
                data.areas[key].push(el.confirmed[key].c);
            }
        }
    });

    return data;
}

function getDatasetGraph(data, label, backgroundColor, borderColor, fill=false) {
    return {
        label: label,
        data: data,
        fill: fill,
        pointRadius: 2,
        pointHoverRadius: 4,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2
    }
}

function graphTotal(data) {
    var ctx = document.getElementById('chartTotal').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.xAxes,
            datasets: [
            getDatasetGraph(data.c, 'Заразившихся', 'rgba(255, 99, 132)', 'rgba(255, 99, 132)'),
            getDatasetGraph(data.d, 'Умерших', '#3f2419', '#3f2419'),
            getDatasetGraph(data.r, 'Выздоровевших', '#3875ff', '#3875ff'),
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                xAxes: [{
                    display: false,
                    stacked: true
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            },
            legend: {
                position: 'bottom'
            }
        }
    });
}

function graphOt(data) {
    var ctx = document.getElementById('chartOt').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xAxes,
            datasets: [
            getDatasetGraph(data.ot, 'Отношение', 'rgba(255, 99, 132, 0.3)', 'rgba(255, 99, 132)', true),
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                xAxes: [{
                    display: false,
                    stacked: true
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: false
                }]
            },
            legend: {
                position: 'bottom'
            }
        }
    });
}

function graphArea(data) {
    var ctx = document.getElementById('chartArea').getContext('2d');
    config.data.labels = data.xAxes;
    chartAreas = new Chart(ctx, config);
}

function graphDyn(data) {
    var ctx = document.getElementById('chartDyn').getContext('2d');
    var curValueC = 0;
    var curValueD = 0;
    var curValueR = 0;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xAxes,
            datasets: [
            getDatasetGraph(data.cSum.map((item, i, arr) => {
                var res = item - curValueC;
                curValueC = item;
                return res;
            }), 'Прирост заразившихся ', 'rgba(255, 99, 132, 0.1)', 'rgba(255, 99, 132)', true),
             getDatasetGraph(data.d.map((item, i, arr) => {
                var res = item - curValueD;
                curValueD = item;
                return res;
            }), 'Прирост умерших ', 'rgba(66, 66, 66, 0.2)', 'rgba(66, 66, 66)', true),
             getDatasetGraph(data.r.map((item, i, arr) => {
                var res = item - curValueR;
                curValueR = item;
                return res;
            }), 'Прирост выздоровевших ', 'rgba(56, 117, 255, 0.3)', 'rgba(56, 117, 255)', true)
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                xAxes: [{
                    display: false,
                    stacked: true
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: false
                }]
            },
            legend: {
                position: 'bottom'
            }
        }
    });
}

function initGrahp() {
    getData(url_graph, (data_graph) => {
        let data = getDataGraph(data_graph);
        graphTotal(data);
        graphOt(data);
        graphDyn(data);
        dataArea = getDataAreaGraph(data_graph);
        graphArea(dataArea);
        updateGraphArea();
    });
}

var el = document.getElementsByClassName('area-option');

function updateGraphArea() {
    var dataset = [];
    Array.prototype.forEach.call(el, (el) => {
        if (el.checked) {
            var newDataset = {
                label: data.area[el.dataset.id].name,
                backgroundColor: data.area[el.dataset.id].color,
                borderColor: data.area[el.dataset.id].color,
                data: dataArea.areas[el.dataset.id],
                fill: false
            };
            dataset.push(newDataset);
        }
    });
    config.data.datasets = dataset;
    chartAreas.update();
}

Array.prototype.forEach.call(el, (el) => {
    el.addEventListener('click', (event) => {
        // console.log(event.target.dataset.id);
        updateGraphArea();
    });
});



initGrahp();
