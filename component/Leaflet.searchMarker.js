const  $=(selector) => document.querySelector(selector)

L.Control.SearchMarker = L.Control.extend({
  options: {
    position: "topright",
    title: {
      false: "View SearchBar",
      true: "Exit SearchBar",
    },
    markers: null,
    isEpoch: false,
    startTimeIdx: 0,
    searchAttribute: 'name',
    maxValue: -1,
    minValue: 0,
  },
  initialize: function (options) {
    L.Util.setOptions(this, options);
    this._layer = this.options.layer;

},

  onAdd: function (map) {
    this.options.map = map;
    const options = this.options;
    this.options.markers = [];
 
    var container = L.DomUtil.create(
      "div",
      "leaflet-control-searchBar leaflet-searchBar"
    );
    this.link = L.DomUtil.create(
      "a",
      "leaflet-control-searchBar-button leaflet-searchbar-part",
      container
    );
    this.searchMarker = L.DomUtil.create(
      "input",
      "leaflet-search-marker",
      container
    );
    this.link.href = "#";
    this._map = map;

    if (this._layer) {
      var index_temp = 0;
      this._layer.eachLayer(function (layer) {
          options.markers[index_temp] = layer;
          ++index_temp;
      });
      options.maxValue = index_temp - 1;
      this.options = options;
  } else {
      console.log("Error: You have to specify a layer via new SliderControl({layer: your_layer});");
  }

  

    L.DomEvent.on(this.searchMarker, "click", this._click, this);
    L.DomEvent.on(this.searchMarker, "input", this._change, this);
    return container;
  },

  setPosition: function (position) {
    var map = this._map;

    if (map) {
        map.removeControl(this);
    }

    this.options.position = position;

    if (map) {
        map.addControl(this);
    }
    this.startSlider();
    return this;
  },
  changeValue: function(value){
    this.searchMarker.value = value;
    searchChange({target:{value: value}})
  },


  _click: function (e) {
    L.DomEvent.stopPropagation(e);
    L.DomEvent.preventDefault(e);
    console.log('clicked');
    //this._map.toggleFullscreen(this.options);
  },
  _change: function (e) {
    L.DomEvent.stopPropagation(e);
    L.DomEvent.preventDefault(e);
    console.log('changed')
    this.searchChange(e, this.options);
  },
 

  startSearch: function(e){
    _options = this.options;
    for (i = _options.minValue; i <= _options.minValue; i++) {
          _options.map.addLayer(_options.markers[i]);
          console.log('added')
    }
  },
  
  searchChange: function (e) {
    _options = this.options;
    var map = _options.map;
    var fg = L.featureGroup();
        var i;
        // clear markers
        for (i = _options.minValue; i <= _options.maxValue; i++) {
            if(_options.markers[i]) map.removeLayer(_options.markers[i]);
            console.log('removed a layer')
        }
        for (i = _options.minValue; i <= _options.maxValue; i++) {
                if(_options.markers[i] && _options.markers[i].options[_options.searchAttribute].includes(e.target.value)) {
                    map.addLayer(_options.markers[i]);
                    fg.addLayer(_options.markers[i]);
                }
            }
}
});

L.Map.include({
  isShowingSearchMark: function () {
    return this._isShowingSearchMark || false;
  },

  toggleShowSearchMarker: function(options){
    var container = this.getContainer();
    if(this.isShowingSearchMark){
            console.log('toggle is true')
            this._showSearchBar(container)
    }else{
            console.log('toggle is true but closing')
            this._hideSearchBar(container)
        
    }
  },
    _showSearchBar: function(container){
        L.DomUtil.addClass(container, 'leaflet-show-search-markers');
        this._setSearchMarker(true);
    },
    _hideSearchBar: function(container){
        L.DomUtil.removeClass(container, 'leaflet-show-search-markers');
        this._setSearchMarker(false);
    },
  

    _setSearchMarker: function (showSearch) {
        this._isShowingSearchMark = showSearch;
        this.invalidateSize();
  },

  _onSearchmarkerchange: function (e) {
      console.log('onSearchMarkerChange fired')

  },
  
});

L.control.SearchMarker= function (options) {
    return new L.Control.SearchMarker(options);
};
