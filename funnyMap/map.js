function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 13.736184, lng: 100.531881 },
    zoom: 18
  });

  const icons = {
    puukluuk: {
      name: 'puukluuk',
      icon: '../images/puukluuk.png'
    }
  };

  const features = [
    {
      position: new google.maps.LatLng(13.736906, 100.533191),
      type: 'puukluuk'
    },
    {
      position: new google.maps.LatLng(13.734128, 100.530105),
      type: 'puukluuk'
    }
  ];

  features.forEach(function(feature) {
    const marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });
  });
}