import React from 'react';
import RingLoader from 'react-spinners/RingLoader';
import HeatMap from './components/HeatMap/HeatMap';

import { Scene } from '@esri/react-arcgis';

import styles from './EncounterMap.module.css';

export default class EncounterMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            encounters: null,
            error: null,
            isLoaded: false,
            map: null,
            view: null
        };
    }

    componentDidMount() {
        this.getEncounters();
    }

    render() {
        const { error, isLoaded } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        
        if (!isLoaded && !this.state.map) {
            return (
                <div className={styles.loader}>
                    <RingLoader
                        color={'#f2f2f2'}
                        sizeUnit={"px"}
                        size={50}
                        loading={!this.state.isLoaded}
                    />
                </div>
            );
        } else {
            return (
                <Scene
                    mapProperties={{basemap: 'satellite'}}
                    onFail={this.handleMapFail}
                    onLoad={this.handleMapLoad}
                    style={
                        {
                            color: '#f2f2f2',
                            height: '100vh', 
                            width: '100vw'
                        }
                    }
                    viewProperties={{
                        center: [56.1304, 106.3468],
                        zoom: 0
                    }}
                >
                    <HeatMap />
                </Scene>
            );
        }
    }

    /**
     * Get Encounters
     */
    getEncounters = () => {
        fetch('http://127.0.0.1:3000/api/v1/encounters')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({encounters: result.rows, isLoaded: true});
            },
            (error) => {
                this.setState({error, isLoaded: true});
            }
      )
    }

    /**
     * Handle map load
     * @param {object} map 
     * @param {object} view 
     */
    handleMapLoad = (map, view) => {
        this.setState({map, view});
    }

    /**
     * Handle map fail
     * @param {object} error 
     */
    handleMapFail = (error) => {
        this.setState({error});
    }
}
