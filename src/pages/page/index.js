import React from 'react';
import Component from './components/Component';

import './Page.css'

class Page extends React.Component {
    render() {
        return (
            <div>
                <h1>Page</h1>
                <Component />
            </div>
        )
    }
}

export default Page;