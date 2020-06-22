import React from 'react';
import {
    Layout, Page, Link,
} from "@shopify/polaris";

import SelectCharities from "./SelectCharities";
import DonationPreference from "./DonationPreference";
import DonationAmount from "./DonationAmount";
import ApplyDonation from "./ApplyDonation";
import CustomizePlugin from "./CustomizePlugin";


import '../assets/style.scss';
import PreviewPublish from "./PreviewPublish";

const DonationHomePage = () => {
    return (
        <Page>
            <Layout>
                <div className="campaign-block-title">
                    <h1>% of Sales</h1>
                    <Link monochrome url="https://www.youtube.com">
                        a Button
                    </Link>
                </div>
                <SelectCharities/>
                <DonationPreference/>
                <DonationAmount/>
                <ApplyDonation/>
                <CustomizePlugin/>
                <PreviewPublish/>
            </Layout>
        </Page>
    )
};

export default DonationHomePage;
