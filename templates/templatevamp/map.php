<!DOCTYPE html>
<html>
<head>
    <title>Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrKbZ9zq1_L-xHXQg_6lHtYBGbFtqV6vI&callback=initMap" async defer></script>
    <style>
        /* Always set the map height explicitly to define the size of the div
        * element that contains the map. */
        #map {
            height: 100%;
        }
        /* Optional: Makes the sample page fill the window. */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        var map;
        function initMap() {
            var latitude = parseFloat(<?php echo $pos[0]->lat ?>);
            var longitude = parseFloat(<?php echo $pos[0]->lng ?>);

            var posisi = {lat: latitude, lng: longitude}
            map = new google.maps.Map(document.getElementById('map'), {
                center: posisi,
                zoom: 16
            });
            var marker = new google.maps.Marker({position: posisi, map: map});
        }
    </script>
</body>
</html>