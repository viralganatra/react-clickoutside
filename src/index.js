import React, { Component, PropTypes } from 'react';

export default function ClickOutsideHOC(WrappedComponent) {
    const EVENT = 'mousedown';

    function getDisplayName() {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    return class ClickOutside extends Component {
        static displayName = `withClickOutsideHOC(${getDisplayName()})`;

        static propTypes = {
            onClickOutside: PropTypes.func.isRequired,
        }

        componentDidMount() {
            global.addEventListener(EVENT, this.onClickOutside);
        }

        componentWillUnmount() {
            global.removeEventListener(EVENT, this.onClickOutside);
        }

        hasClickedOutside(containerNode, targetNode) {
            return !containerNode.contains(targetNode);
        }

        onClickOutside = ({ target }) => {
            const { containerNode, hasClickedOutside } = this;

            if (containerNode && hasClickedOutside(containerNode, target)) {
                this.props.onClickOutside();
            }
        }

        containerRef = (node) => {
            this.containerNode = node;
        }

        render() {
            const { onClickOutside, ...rest } = this.props;

            return (
                <div ref={this.containerRef}>
                    <WrappedComponent {...rest} />
                </div>
            );
        }
    };
}
