import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './src/components/App';
import { AppProvider } from "@shopify/polaris";
// import { Provider } from "@shopify/app-bridge-react";
import '@shopify/polaris/styles.css';
import translations from '@shopify/polaris/locales/en.json';


const Root = () => {
    const config = {
            apiKey: '1d6afd88739e73d056f1ece9a9ee8915',
            // shopOrigin: context.shopOrigin,
            shopOrigin: 'stuart-react-store.myshopify',
            forceRedirect: true
    };
    // return (
    //     <Provider config={config}>
    //         <AppProvider i18n={translations}>
    //             <BrowserRouter>
    //                 <Switch>
    //                     <Route path="/" component={App}/>
    //                 </Switch>
    //             </BrowserRouter>
    //         </AppProvider>
    //     </Provider>
    // );

    return (
        <AppProvider i18n={translations}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={App}/>
                </Switch>
            </BrowserRouter>
        </AppProvider>
    );
};

ReactDOM.render(<Root/>, document.getElementById('app'));