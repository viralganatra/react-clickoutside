import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { shallowToJson, mountToJson } from 'enzyme-to-json';
import ClickOutsideHOC from '../index';

class MockClass extends Component {
    render() {
        return <div ref={this.props.nodeRef}>Mock</div>;
    }
}

const MockStateless = () => <div>Mock</div>;

const mountNode = document.createElement('div');

function noop() {}

describe('ClickOutsideHOC', () => {
    let ComposedClass;
    let ComposedStateless;
    let wrapperComposedClass;
    let wrapperComposedStateless;

    beforeEach(() => {
        ComposedClass = ClickOutsideHOC(MockClass);
        ComposedStateless = ClickOutsideHOC(MockStateless);
        wrapperComposedClass = shallow(<ComposedClass onClickOutside={noop} />);
        wrapperComposedStateless = shallow(<ComposedStateless onClickOutside={noop} />);

        document.body.appendChild(mountNode);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        document.body.removeChild(mountNode);
    });

    it('should render correctly, only accepting a stateless functional component or standard ES6 class component to enhance', () => {
        expect(shallowToJson(wrapperComposedClass)).toMatchSnapshot();
        expect(shallowToJson(wrapperComposedStateless)).toMatchSnapshot();
    });

    it('should add a className to the div container if the prop clickOutsideClassName is present', () => {

    });

    it('should pass all props except clickOutsideClassName and onClickOutside to the WrappedComponent', () => {
        const wrapper = mount(<ComposedClass onClickOutside={noop} testProp={1} />);

        expect(mountToJson(wrapper.find(MockClass))).toMatchSnapshot();
    });

    it('should only call the onClickOutside function if the mousedown event is outside the component', () => {
        const onClickFn = jest.fn();
        const event = new Event('mousedown', { bubbles: true });

        const Wrapper = class TestWrapper extends Component {
            render() {
                return (
                    <div>
                        <div ref={(node) => { this.clickOutside = node; }} />
                        <ComposedClass
                            onClickOutside={onClickFn}
                            nodeRef={(node) => { this.clickInside = node; }}
                        />
                    </div>
                );
            }
        };

        let wrapperInstance;

        ReactDOM.render(<Wrapper ref={(node) => { wrapperInstance = node; }} />, mountNode);

        wrapperInstance.clickInside.dispatchEvent(event);

        expect(onClickFn).not.toHaveBeenCalled();

        wrapperInstance.clickOutside.dispatchEvent(event);

        expect(onClickFn).toHaveBeenCalled();
    });

    it('should unlisten to the mousedown event when the component has unmounted', () => {
        const listener = global.removeEventListener;
        const spy = global.removeEventListener = jest.fn(global.removeEventListener);

        ReactDOM.render(<ComposedClass onClickOutside={noop} />, mountNode);
        ReactDOM.unmountComponentAtNode(mountNode);

        expect(spy).toHaveBeenCalled();

        global.removeEventListener = listener;
    });
});
