import React from 'react';

import Map from './MapboxGL/Map';
import { items } from './data';

// this is obtained from https://www.mapbox.com
const mapboxToken =
  'pk.eyJ1Ijoic3luYXNpdXMiLCJhIjoiY2lnM3JrdmRjMjJ4b3RqbTNhZ2hmYzlkbyJ9.EA86y0wrXX1eo64lJPTepw';


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

const pointStyle = {
  type: 'circle',
  paint: {
    'circle-color': '#ff0000',
  },
};


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: [],
      layers: [],
      items,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.value) {
      const value = parseInt(event.target.value);
      const item = this.state.items.find(obj => obj.id === value);

      if (item) {
        const sourceId = `source-${item.id}`;
        const sources = [{ id: sourceId, data: item.data }];
        const layers = [
          { id: `line-layer-${item.id}`, source: sourceId, ...lineStyle },
          { id: `point-layer-${item.id}`, source: sourceId, ...pointStyle },
        ];

        this.setState({ layers, sources });
      }
    } else {
      // the empty choice resets the sources and layers
      // so that mapbox draws nothing
      this.setState({ sources: [], layers: [] });
    }
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
      </div>
    );
  }
}


export default App;
