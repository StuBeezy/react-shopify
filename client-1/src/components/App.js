import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import AnnotatedLayout from './AnnotatedLayout';
import DonationHomePage from "./DonationHomePage";
import AccountInfoPage from './AccountInfoPage';
import ReportsPage from "./ReportsPage";


const App = () => {
    return (
        <div>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/annotated-layout" component={AnnotatedLayout}/>
            <Route exact path="/test-donation" component={DonationHomePage}/>
            <Route exact path="/account-info" component={AccountInfoPage}/>
            <Route exact path="/reports" component={ReportsPage}/>
        </div>
    );
};

export default App;
