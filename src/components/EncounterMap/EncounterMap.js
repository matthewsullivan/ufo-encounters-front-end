import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

import Encounters from './components/Encounters/Encounters';

import { Scene } from '@esri/react-arcgis';

import styles from './EncounterMap.module.css';

export default class EncounterMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            map: null,
            view: null
        };
    }

    render() {
        const { error, map } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
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
                    <Encounters />
                </Scene>

                <div className={styles.loader} hidden={!!map}>
                    <RingLoader
                        color={'#f2f2f2'}
                        sizeUnit={"px"}
                        size={50}
                        loading={!map}
                    />
                </div>
            </div>
        );
    }

    /**
     * Handle Map Load
     * @param {object} map 
     * @param {object} view 
     */
    handleMapLoad = (map, view) => {
        this.setState({map, view});
    }

    /**
     * Handle Map Fail
     * @param {object} error 
     */
    handleMapFail = (error) => {
        this.setState({error});
    }
}
