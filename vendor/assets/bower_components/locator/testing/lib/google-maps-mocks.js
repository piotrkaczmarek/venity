var GoogleMapsMock;
var __hasProp = Object.prototype.hasOwnProperty;

var __extends = function(child, parent) {
  for(var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }

  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;

  return child;
};

this.google = {
  maps: {
    event: {
      addDomListener: function() {},
      addDomListenerOnce: function() {},
      addListener: function() {},
      addListenerOnce: function() {},
      bind: function() {},
      clearInstanceListeners: function() {},
      clearListeners: function() {},
      forward: function() {},
      removeListener: function() {},
      trigger: function() {},
      vf: function() {}
    },
    GeocoderStatus: {
      OK: 'OK'
    },
    places: {
      PlacesServiceStatus: {
        OK: 'OK'
      }
    }
  }
};

GoogleMapsMock = (function() {
  function GoogleMapsMock() {}
  GoogleMapsMock.prototype.setMap = function() {};
  GoogleMapsMock.prototype.getMap = function() {};
  return GoogleMapsMock;
})();

google.maps.LatLng = (function() {
  __extends(LatLng, GoogleMapsMock);

  function LatLng(lat, lng) {
    this.latitude = parseFloat(lat);
    this.longitude = parseFloat(lng);
  }
  LatLng.prototype.lat = function() {
    return this.latitude;
  };
  LatLng.prototype.lng = function() {
    return this.longitude;
  };
  return LatLng;
})();

google.maps.LatLngBounds = (function() {
  __extends(LatLngBounds, GoogleMapsMock);

  function LatLngBounds(ne, sw) {
    this.ne = ne;
    this.sw = sw;
  }
  LatLngBounds.prototype.getSouthWest = function() {
    return this.sw;
  };
  LatLngBounds.prototype.getNorthEast = function() {
    return this.ne;
  };
  return LatLngBounds;
})();

google.maps.OverlayView = (function() {
  __extends(OverlayView, GoogleMapsMock);

  function OverlayView() {
    OverlayView.__super__.constructor.apply(this, arguments);
  }
  return OverlayView;
})();

google.maps.Marker = (function() {
  __extends(Marker, GoogleMapsMock);

  function Marker() {
    Marker.__super__.constructor.apply(this, arguments);
  }
  Marker.prototype.getAnimation = function() {};
  Marker.prototype.getClickable = function() {};
  Marker.prototype.getCursor = function() {};
  Marker.prototype.getDraggable = function() {};
  Marker.prototype.getFlat = function() {};
  Marker.prototype.getIcon = function() {};
  Marker.prototype.getPosition = function() {};
  Marker.prototype.getShadow = function() {};
  Marker.prototype.getShape = function() {};
  Marker.prototype.getTitle = function() {};
  Marker.prototype.getVisible = function() {};
  Marker.prototype.getZIndex = function() {};
  Marker.prototype.setAnimation = function() {};
  Marker.prototype.setClickable = function() {};
  Marker.prototype.setCursor = function() {};
  Marker.prototype.setDraggable = function() {};
  Marker.prototype.setFlat = function() {};
  Marker.prototype.setIcon = function() {};
  Marker.prototype.setPosition = function() {};
  Marker.prototype.setShadow = function() {};
  Marker.prototype.setShape = function() {};
  Marker.prototype.setTitle = function() {};
  Marker.prototype.setVisible = function() {};
  Marker.prototype.setZIndex = function() {};
  Marker.prototype.setMap = function() {};
  Marker.prototype.getMap = function() {};
  return Marker;
})();

google.maps.MarkerImage = (function() {
  __extends(MarkerImage, GoogleMapsMock);

  function MarkerImage() {
    MarkerImage.__super__.constructor.apply(this, arguments);
  }
  return MarkerImage;
})();

google.maps.Map = (function() {
  __extends(Map, GoogleMapsMock);

  function Map() {
    Map.__super__.constructor.apply(this, arguments);
  }
  Map.prototype.setCenter = function() {};
  return Map;
})();

google.maps.Point = (function() {
  __extends(Point, GoogleMapsMock);

  function Point() {
    Point.__super__.constructor.apply(this, arguments);
  }
  return Point;
})();

google.maps.Size = (function() {
  __extends(Size, GoogleMapsMock);

  function Size() {
    Size.__super__.constructor.apply(this, arguments);
  }
  return Size;
})();

google.maps.InfoWindow = (function() {
  __extends(InfoWindow, GoogleMapsMock);

  function InfoWindow() {
    InfoWindow.__super__.constructor.apply(this, arguments);
  }
  return InfoWindow;
})();

google.maps.Geocoder = (function() {
  __extends(Geocoder, GoogleMapsMock);

  function Geocoder() {
    Geocoder.__super__.constructor.apply(this, arguments);
  }

  Geocoder.prototype.geocode = function(loc, success) {
    success(geocodeResults, 'OK');
  };

  return Geocoder;
})();

google.maps.places.AutocompleteService = (function() {
  __extends(AutocompleteService, GoogleMapsMock);

  function AutocompleteService() {
    AutocompleteService.__super__.constructor.apply(this, arguments);
  }

  AutocompleteService.prototype.getPlacePredictions = function(input, success) {
    success(predictionsResults, 'OK');
  };

  return AutocompleteService;
})();

google.maps.places.PlacesService = (function() {
  __extends(PlacesService, GoogleMapsMock);

  function PlacesService() {
    PlacesService.__super__.constructor.apply(this, arguments);
  }

  PlacesService.prototype.getDetails = function(input, success) {
    success(locationDetail, 'OK');
  };

  return PlacesService;
})();