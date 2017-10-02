import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EVENT from './events';

export default class ClickOutside extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }

    state = {
        hasClickedOutside: false,
    }

    componentDidMount() {
        global.addEventListener(EVENT, this.onClickOutside);
    }

    componentWillUnmount() {
        global.removeEventListener(EVENT, this.onClickOutside);
    }

    onClickOutside = ({ target }) => {
        const { containerNode, hasClickedOutside } = this;

        this.updateState({
            hasClickedOutside: hasClickedOutside(containerNode, target),
        });
    }

    updateState(state = {}) {
        this.setState((prevState) => ({
            ...prevState,
            ...state,
        }));
    }

    hasClickedOutside(containerNode, targetNode) {
        return containerNode && !containerNode.contains(targetNode);
    }

    containerRef = (node) => {
        this.containerNode = node;
    }

    render() {
        const { children, ...rest } = this.props;
        const { hasClickedOutside } = this.state;

        return (
            <div ref={this.containerRef} {...rest}>
                {children({ hasClickedOutside })}
            </div>
        );
    }
}
