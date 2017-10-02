import React from 'react';
import ClickOutside from '../click-outside';
import EventName from '../events';

jest.mock('../events', () => 'mousedown');

describe('Click Outside Render', () => {
    const globalAddEvent = global.addEventListener;
    const globalRemoveEvent = global.removeEventListener;

    let eventMap;
    let wrapper;

    beforeEach(() => {
        eventMap = {};

        global.addEventListener = jest.fn((event, cb) => {
            event && (eventMap[event] = cb);
        });

        global.removeEventListener = jest.fn((event) => {
            event && (delete eventMap[event]);
        });

        wrapper = mount(
            <div>
                <p className="title">Title</p>
                <ClickOutside>
                    {({ hasClickedOutside }) => {
                        const text = hasClickedOutside ?
                            'Clicked outside' :
                            'Has not clicked outside';

                        return <div className="container">{text}</div>;
                    }}
                </ClickOutside>
            </div>,
        );
    });

    afterEach(() => {
        global.addEventListener = globalAddEvent;
        global.removeEventListener = globalRemoveEvent;
    });

    it('should detect the click event outside of the component', () => {
        eventMap.mousedown({ target: wrapper.find('.title').instance() });

        wrapper.update();

        expect(wrapper).toMatchSnapshot();
    });

    it('should detect the click event inside of the component', () => {
        eventMap.mousedown({ target: wrapper.find('.container').instance() });

        wrapper.update();

        expect(wrapper).toMatchSnapshot();
    });

    it('should unregister the event listener when the component unmounts', () => {
        wrapper.unmount();

        expect(global.removeEventListener.mock.calls[3][0]).toBe(EventName);
    });

    it('should add any custom properties to the container div', () => {
        const wrapperProps = mount(
            <ClickOutside className="foo">
                {() => {}}
            </ClickOutside>,
        );

        expect(wrapperProps).toMatchSnapshot();
    });
});
