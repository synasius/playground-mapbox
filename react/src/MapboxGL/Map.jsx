import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import diffStyles from 'mapbox-gl-style-spec/lib/diff';


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
      // add all sources
      const sources = Object.entries(this.props.sources);
      sources.forEach(([id, source]) => map.addSource(id, source));

      // add all sources
      this.props.layers.forEach(layer => map.addLayer(layer));
    });

    this.map = map;
  }

  componentWillReceiveProps(nextProps) {
    // Here we receive the new sources and layers so we
    // update the map using this approach
    // https://github.com/mapbox/mapbox-gl-style-spec/blob/mb-pages/API.md#diffstylesbefore-after
    //
    // A detailed explanation:
    // https://www.mapbox.com/blog/mapbox-gl-js-reactive/
    const before = { sources: this.props.sources, layers: this.props.layers };
    const after = { sources: nextProps.sources, layers: nextProps.layers };
    const changes = diffStyles(before, after);
    changes.forEach((change) => {
      this.map[change.command](...change.args);
    });
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
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
  sources: React.PropTypes.shape({ }),
  layers: React.PropTypes.arrayOf(
    React.PropTypes.shape({ }),
  ),
};


Map.defaultProps = {
  lng: 0,
  lat: 0,
  zoom: 0,
};


export default Map;
