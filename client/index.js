import React from 'react';
import ReactDom from 'react-dom';

const TestApp = () => {
    return <div>Behold this is my new app</div>
};

ReactDom.render(<TestApp/>, document.getElementById('root'));