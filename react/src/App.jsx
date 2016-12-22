import React from 'react';

import Map from './MapboxGL/Map';
import items from './data';


/* global MAPBOX_ACCESS_TOKEN */
// To create an access token:
// https://www.mapbox.com/help/create-api-access-token/
const mapboxToken = MAPBOX_ACCESS_TOKEN;


const lineStyle = {
  type: 'line',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#22ff22',
    'line-width': 3,
  },
};


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#ff0000',
      value: '',

      items,

      sources: {},
      layers: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.updateSourcesLayers = this.updateSourcesLayers.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState({ value }, this.updateSourcesLayers);
  }

  handleColorChange(event) {
    this.setState({ color: event.target.value }, this.updateSourcesLayers);
  }

  updateSourcesLayers() {
    const sources = {};
    const layers = [];

    if (this.state.value) {
      const itemId = parseInt(this.state.value, 10);
      const item = this.state.items.find(obj => obj.id === itemId);

      const sourceId = `source-${item.id}`;
      sources[sourceId] = item.data;

      const pointStyle = {
        type: 'circle',
        paint: {
          'circle-color': this.state.color,
        },
      };
      layers.push({ id: `line-layer-${item.id}`, source: sourceId, ...lineStyle });
      layers.push({ id: `point-layer-${item.id}`, source: sourceId, ...pointStyle });
    }

    this.setState({ sources, layers });
  }

  render() {
    const options = this.state.items.map(item =>
      <option key={item.id} value={item.id}>{item.name}</option>);

    return (
      <div>
        <Map
          accessToken={mapboxToken}
          width="70%"
          height="500px"
          mapStyle="mapbox://styles/mapbox/light-v9"
          lng={12.2237299}
          lat={43.1406588}
          zoom={15}
          sources={this.state.sources}
          layers={this.state.layers}
        />
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="">-----</option>
          {options}
        </select>
        <select value={this.state.color} onChange={this.handleColorChange}>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
        </select>
      </div>
    );
  }
}


export default App;
