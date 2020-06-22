import React, { useState, useCallback } from 'react';
import {Card, Layout, RadioButton, Tooltip, Icon, Button } from "@shopify/polaris";
import { InfoMinor } from '@shopify/polaris-icons';

const ApplyDonation = () => {
    const [value, setValue] = useState('total_purchase');

    const handleChange = useCallback(
        (_checked, newValue) => setValue(newValue),
    []
    );

    const renderLabel = (label, helpText) => {
        return (
            <span className="select-product-radiobutton-label">
                <span>
                    {label}
                </span>
                <span>
                    <Tooltip content={helpText}>
                        <Icon source={InfoMinor}/>
                    </Tooltip>
                </span>
            </span>
        );
    }

    return (
        <Layout.AnnotatedSection
            title="Apply to total purchase or specific products"
        >
            <Card sectioned>
                <div className="product-selection-container">
                    <div className="selection-container">
                        <RadioButton
                            label={renderLabel('Total Purchase', 'ie. You are donating 10% of the customer\'s total purchase amount. Total purchase = $10. You are donating $1.')}
                            id="total_purchase"
                            checked={value === 'total_purchase'}
                            helpText="Donate a percentage of sales from every customer purchase"
                            onChange={handleChange}
                        />
                        <div className="selected-products-block">
                            <RadioButton
                                label={renderLabel('Specific Products', 'ie. Customer purchases a $10 hat (10% of sales go to charity) and $5 socks (no charitable component). Donation = $1.00')}
                                id="specific_product"
                                checked={value === 'specific_product'}
                                helpText="Donate a percentage of sales from specific products"
                                onChange={handleChange}
                            />
                            <Button primary>
                                Select
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout.AnnotatedSection>
    );
};

export default ApplyDonation;
