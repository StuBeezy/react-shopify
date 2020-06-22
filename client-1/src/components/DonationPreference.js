import React, { useState, useCallback } from 'react';
import {Card, Layout, RadioButton, Stack} from "@shopify/polaris";


const DonationPreference = () => {
    const [value, setValue] = useState('percentage');

    const handleChange = useCallback(
        (_checked, newValue) => setValue(newValue),
    []
    );

    return (
        <Layout.AnnotatedSection
            title="Select your donation preferences"
            description="Do you want to donate a percentage or fixed dollar amount per sale to charity?"
        >
            <Card sectioned>
                <Stack vertical>
                    <RadioButton
                        label="Percentage of product sales"
                        id="percentage"
                        name="donations"
                        checked={value === 'percentage'}
                        onChange={handleChange}
                    />

                    <RadioButton
                        label="Fixed dollar amount"
                        id="fixed"
                        name="donations"
                        checked={value === 'fixed'}
                        onChange={handleChange}
                    />
                </Stack>
            </Card>
        </Layout.AnnotatedSection>
    );
}

export default DonationPreference;
