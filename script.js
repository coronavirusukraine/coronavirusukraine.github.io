var zero = {lat: 49.393632, lng: 31.856577};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: zero
    });
    // var markers = locations.map(function(location, i) {
    //   return new google.maps.Marker({
    //     position: createDelta(location),
    //     label: 'A',
    //     map: map
    //   });
    // });
  }