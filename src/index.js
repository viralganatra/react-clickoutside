import React, { Component, PropTypes } from 'react';
import invariant from 'invariant';

export default function ClickOutsideHOC(WrappedComponent) {
    invariant(
        typeof WrappedComponent === 'function',
        `Expected "WrappedComponent" provided as the first argument to ClickOutsideHOC
        to be a function. Instead, received ${typeof WrappedComponent}.`
    );

    const EVENT = 'mousedown';

    function getDisplayName() {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    return class ClickOutside extends Component {
        static displayName = `withClickOutsideHOC(${getDisplayName()})`;

        static propTypes = {
            onClickOutside: PropTypes.func.isRequired,
            clickOutsideClassName: PropTypes.string,
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

        getContainerProps(className) {
            if (className) {
                return { className };
            }

            return {
                style: {
                    display: 'inline-block',
                },
            };
        }

        render() {
            const { clickOutsideClassName, onClickOutside, ...rest } = this.props;
            const containerProps = this.getContainerProps(clickOutsideClassName);

            return (
                <div ref={this.containerRef} {...containerProps}>
                    <WrappedComponent {...rest} />
                </div>
            );
        }
    };
}
