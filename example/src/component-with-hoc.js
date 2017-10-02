import React, { Component } from 'react';
import { withClickOutside } from 'react-clickoutside';
import DemoComponent from './demo-component';

const ComposedComponent = withClickOutside()(DemoComponent);

export default class ComponentWithHoc extends Component {
    state = {
        clickedOutsideCount: 0,
    }

    onClickOutside = () => {
        this.setState((prevState) => ({
            clickedOutsideCount: prevState.clickedOutsideCount + 1,
        }));
    }

    render() {
        return (
            <ComposedComponent
                onClickOutside={this.onClickOutside}
                {...this.state}
            />
        );
    }
}
