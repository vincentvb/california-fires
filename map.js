mapboxgl.accessToken = "pk.eyJ1IjoidmluY2VudHZhbmJ1c2tpcmsiLCJhIjoiY2wxOHFjajk2MjFiMjNqbjF1bWxsaWt4YiJ9.RX0gnSYBbgZYKkfiXZ0h2g";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vincentvanbuskirk/cl4x6w466004a15q9qvhjt8d6',
    maxZoom: 7,
    minZoom: 5,
});

map.on("load", function () {
    map.addLayer(
        {
          id: "county-outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/Counties_In_California.geojson",
          },
          paint: {
            "line-color": "#000000",
            "line-width": .5,
          },
        },
        "waterway-label" // Here's where we tell Mapbox where to slot this new layer
      );
      map.addLayer(
        {
          id: "county-fill",
          type: "fill",
          source: {
            type: "geojson",
            data: "data/california_fire.geojson",
          },
          paint: {
            'fill-color': [
                "match",
                ["get", "quantiles"],
                "0 - 20 percentile",
                "#96d0e7",
                "20 - 40 percentile",
                "#62b8dc",
                "40 - 60 percentile",
                "#2ea0cf",
                "60 - 80 percentile",
                "#23779a",
                "80 - 100 percentile",
                "#174f66",
                "#ffffff",
            ]
          },
        },
        "county-outline"
      );
});

map.on('click', 'county-fill', function (e) {
    var countyName = e.features[0].properties.NAME_x;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `
          ${countyName} County
          `
            )
        .addTo(map);
  });

  map.on('mouseenter', 'county-fill', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'county-fill', function () {
    map.getCanvas().style.cursor = '';
  });