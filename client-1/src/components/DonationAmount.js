import React, { useState, useCallback } from 'react';
import { Layout, Card, TextField } from "@shopify/polaris";


const DonationAmount = () => {
    const [textFieldValue, setTextFieldValue] = useState('5');

    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    return (
        <Layout.AnnotatedSection
            title="Your Donation"
            description="Determine the donation amount that you are going to give."
        >
            <Card sectioned>
                <TextField
                    label="Specify the donation amount"
                    value={textFieldValue}
                    onChange={handleTextFieldChange}
                    suffix="%"
                />
            </Card>
        </Layout.AnnotatedSection>
    );
}

export default DonationAmount;
