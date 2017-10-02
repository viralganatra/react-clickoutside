import React from 'react';
import { ClickOutside } from 'react-clickoutside';
import ComponentWithHoc from './component-with-hoc';

const Demo = () => (
    <main className="main">
        <section className="section">
            <h2 className="heading">With Render as Child Component</h2>

            <ClickOutside>
                {({ hasClickedOutside }) => {
                    const text = (hasClickedOutside) ? 'Clicked Outside' : 'Not Clicked Outside';
                    const className = (hasClickedOutside) ? 'success' : 'error';

                    return <p className={className}>{text}</p>;
                }}
            </ClickOutside>
        </section>
        <section className="section">
            <h2 className="heading">With Higher Order Component</h2>

            <ComponentWithHoc />
        </section>
    </main>
);

export default Demo;
