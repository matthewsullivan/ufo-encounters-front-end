import React from 'react';

import { loadModules } from '@esri/react-arcgis';

export default class Encounters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          encounters: null,
          error: null,
          layer: null
      };
    }

    componentDidMount() {
      this.getEncounters();
    }
 
    componentWillUnmount() {
        this.props.map.layers.remove(this.state.layer);
    }
 
    render() {
        return null;
    }

    /**
     * Get Encounters
     */
    getEncounters = () => {
      fetch('http://127.0.0.1:3000/api/v1/encounters')
      .then(res => res.json())
      .then(
          (result) => {
            this.setState({encounters: result.rows});

            this.renderLayers(result.rows);
          },
          (error) => {
            this.setState({error});
          }
      )
    }

    /**
     * Render Layers
     * @param {array} encounters
     */
    renderLayers = (encounters) => {
      loadModules(['esri/Graphic',]).then(([Graphic]) => {

        const markerSymbol = {
          color: [226, 119, 40],
          type: "simple-marker"
        };

        for (let i = 0; i < encounters.length; i++) { 
          const encounter = encounters[i];

          const point = {
            latitude: encounter.latitude,
            longitude: encounter.longitude,
            type: "point"
          };

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
          });

          this.props.view.graphics.add(pointGraphic);

          if (i > 5000) {
            break;
          }

        }

    }).catch((error) => {
        console.error(error)
    });
  }

}