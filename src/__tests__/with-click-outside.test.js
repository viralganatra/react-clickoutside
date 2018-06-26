import React from 'react';
import withClickOutside from '../with-click-outside';
import EventName from '../events';

jest.mock('../events', () => 'mousedown');

const MockComponent = () => <div className="container" />;

describe('Click Outside Higher Order Component', () => {
    const globalAddEvent = global.addEventListener;
    const globalRemoveEvent = global.removeEventListener;

    let eventMap;
    let ComposedComponent;

    beforeEach(() => {
        eventMap = {};

        global.addEventListener = jest.fn((event, cb) => {
            event && (eventMap[event] = cb);
        });

        global.removeEventListener = jest.fn((event) => {
            event && (delete eventMap[event]);
        });

        ComposedComponent = withClickOutside()(MockComponent);
    });

    afterEach(() => {
        global.addEventListener = globalAddEvent;
        global.removeEventListener = globalRemoveEvent;
    });

    it('should detect the click event outside of the component', () => {
        const spy = jest.fn();

        const wrapper = mount(
            <div>
                <p className="title">Title</p>
                <ComposedComponent onClickOutside={spy} />
            </div>,
        );

        eventMap.mousedown({ target: wrapper.find('.container').instance() });

        expect(spy).not.toHaveBeenCalled();

        eventMap.mousedown({ target: wrapper.find('.title').instance() });

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should unregister the event listener when the component unmounts', () => {
        const wrapper = mount(<ComposedComponent onClickOutside={jest.fn()} />);

        wrapper.unmount();

        expect(global.removeEventListener.mock.calls[4][0]).toEqual(EventName);
    });

    it('should add any custom properties to the container div', () => {
        const ComponentWithProps = withClickOutside({ className: 'foo' })(MockComponent);

        const wrapper = shallow(<ComponentWithProps onClickOutside={jest.fn()} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should throw an error if called incorrectly', () => {
        expect(() => withClickOutside()()).toThrowErrorMatchingSnapshot();
    });
});
