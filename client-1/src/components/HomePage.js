import React, { useState } from 'react';
import { EmptyState, Layout, Page, TextStyle } from "@shopify/polaris";
// import { TitleBar, ResourcePicker } from "@shopify/app-bridge-react";
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const HomePage = () => {
    const [open, changeOpen] = useState(false);

    const handleSelection = (resources) => {
        const ids = resources.selection.map(
            (product) => product.id
        );
        changeOpen(prevState => false);
        console.log(ids);
    }

    return (
        <Page>
            {/*<TitleBar*/}
            {/*    primaryAction={{*/}
            {/*        content: 'Select Products',*/}
            {/*        onAction: () => {changeOpen(prevState => true)}*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<ResourcePicker*/}
            {/*    open={open}*/}
            {/*    resourceType="Product"*/}
            {/*    showVariants={false}*/}
            {/*    onSelection={(resources) => handleSelection(resources)}*/}
            {/*    onCancel={() => changeOpen(prevState => false)}*/}
            {/*/>*/}
            <Layout>
                <EmptyState
                    heading="Discount your products temporarily"
                    action={{
                        content: 'Select Products',
                        onAction: () => changeOpen(prevState => true)
                    }}
                    image={img}
                >
                    <p>Select products to run it up fam</p>
                </EmptyState>
            </Layout>
        </Page>
    )
}

export default HomePage;
