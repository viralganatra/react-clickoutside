import React, { Component } from 'react';

export default function ClickOutsideHOC(WrappedComponent) {
    function getDisplayName() {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    return class ClickOutside extends Component {
        static displayName = `withClickOutsideHOC(${getDisplayName()})`;

        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    };
}
