import React from 'react';

import { loadModules } from '@esri/react-arcgis';

export default class BermudaTriangle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {graphic: null};
    }

    componentDidMount() {
        loadModules(['esri/Graphic']).then(([ Graphic ]) => {
            const fillSymbol = {
                color: [227, 139, 79, 0.8],
                outline: {
                    color: [255, 255, 255],
                    width: 1
                },
                type: "simple-fill"
            };

            const polygon = {
                rings: [
                    [-64.78, 32.3],
                    [-66.07, 18.45],
                    [-80.21, 25.78],
                    [-64.78, 32.3]
                ],
                type: "polygon"
            };

            const graphic = new Graphic({
                geometry: polygon,
                symbol: fillSymbol
            });
 
            this.setState({ graphic });

            this.props.view.graphics.add(graphic);
        }).catch(
            (error) => console.error(error)
        );
    }
 
    componentWillUnmount() {
        this.props.view.graphics.remove(this.state.graphic);
    }
 
    render() {
        return null;
    }

}