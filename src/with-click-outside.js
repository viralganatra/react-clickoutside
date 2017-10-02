import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import EVENT from './events';

export default function withClickOutside({ ...containerProps }) {
    return function ClickOutsideHOC(WrappedComponent) {
        invariant(
            typeof WrappedComponent === 'function',
            `Expected "WrappedComponent" provided as the first argument to ClickOutsideHOC
            to be a function. Instead, received ${typeof WrappedComponent}.`,
        );

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

            onClickOutside = ({ target }) => {
                const { containerNode, hasClickedOutside } = this;

                if (containerNode && hasClickedOutside(containerNode, target)) {
                    this.props.onClickOutside();
                }
            }

            hasClickedOutside(containerNode, targetNode) {
                return !containerNode.contains(targetNode);
            }

            containerRef = (node) => {
                this.containerNode = node;
            }

            render() {
                const { onClickOutside, ...rest } = this.props;

                return (
                    <div ref={this.containerRef} {...containerProps}>
                        <WrappedComponent {...rest} />
                    </div>
                );
            }
        };
    };
}
