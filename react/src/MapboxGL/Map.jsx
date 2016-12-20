import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';


class Map extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = this.props.accessToken;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      style: this.props.mapStyle,
    });

    map.on('load', () => {
      this.addSources(this.props.sources);
      this.addLayers(this.props.layers);
    });

    this.map = map;
  }

  componentWillReceiveProps(nextProps) {
    // Here we receive the new sources and layers so we
    // update the map removing all the old source and
    // adding everything we find in nextProps.
    // This is the most simple solution but far from being the most efficient.
    //
    // We should use this approach instead:
    // https://github.com/mapbox/mapbox-gl-style-spec/blob/mb-pages/API.md#diffstylesbefore-after
    this.removeSources(this.props.sources);
    this.addSources(nextProps.sources);

    this.removeLayers(this.props.layers);
    this.addLayers(nextProps.layers);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  removeSources(sources) {
    sources.forEach(source => this.map.removeSource(source.id));
  }

  addSources(sources) {
    sources.forEach(source => this.map.addSource(source.id, source.data));
  }

  removeLayers(layers) {
    layers.map(layer => this.map.removeLayer(layer.id));
  }

  addLayers(layers) {
    layers.map(layer => this.map.addLayer(layer));
  }

  render() {
    const { width, height } = this.props;
    const style = { width, height };

    return (
      <div
        style={style}
        ref={(e) => { this.mapContainer = e; }}
      />
    );
  }
}


Map.propTypes = {
  accessToken: React.PropTypes.string.isRequired,

  // map properties
  lng: React.PropTypes.number,
  lat: React.PropTypes.number,
  zoom: React.PropTypes.number,
  mapStyle: React.PropTypes.string,

  // map container style
  width: React.PropTypes.string,
  height: React.PropTypes.string,

  // data sources and layers
  sources: React.PropTypes.array,
  layers: React.PropTypes.array,
};


Map.defaultProps = {
  lng: 0,
  lat: 0,
  zoom: 0,
};


export default Map;
