import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

import Encounters from './components/Encounters/Encounters';
import Progress from 'react-progressbar';

import { Scene } from '@esri/react-arcgis';

import styles from './EncounterMap.module.css';

export default class EncounterMap extends React.Component {
    state = {
        error: null,
        map: null,
        percentage: null,
        status: 'Loading Map',
        view: null
    }

    render() {
        const {basemap} = this.props;
        const {error, percentage, status} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
                <Progress
                    className={styles.progress}
                    color={'rgba(242, 242, 242, 0.5)'}
                    completed={parseInt(percentage)}
                    hidden={status.length}
                />

                <Scene
                    mapProperties={{basemap: basemap}}
                    onFail={this.handleMapFail}
                    onLoad={this.handleMapLoad}
                    style={
                        {
                            color: '#f2f2f2',
                            height: '100vh',
                            width: '100vw'
                        }
                    }
                    viewProperties={
                        {
                            center: [56.1304, 106.3468],
                            zoom: 0
                        }
                    }
                >
                    <Encounters
                        progress={this.getProgress} 
                        status={this.handleStatus} 
                    />
                </Scene>

                <div className={styles.loader} hidden={!status.length}>
                    <RingLoader
                        color={'#f2f2f2'}
                        size={50}
                        loading={status.length}
                    />

                    <h1 className={styles.loader__title}>{status}</h1>
                </div>
            </div>
        );
    }

    /**
     * Get Progress
     * @param {number} percentage 
     */
    getProgress = (percentage) => {
        this.setState({percentage});
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

    /**
     * Handle Status
     * @param {string} status 
     */
    handleStatus = (status) => {
        this.setState({status});
    }
}
