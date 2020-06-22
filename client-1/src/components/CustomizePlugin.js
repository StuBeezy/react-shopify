import React, { useState, useCallback } from 'react';
import {
    Layout, Button, Stack, Card,
    TextContainer, ChoiceList, ChoiceListProps,
    RadioButton, Icon, Tooltip, TextField
} from "@shopify/polaris";
import {InfoMinor} from "@shopify/polaris-icons";
import '../assets/customize-plugin.scss';


const CustomizePlugin = () => {
    const [displayValue, setValue] = useState(['on']);
    const [previewTitleText, setPreviewText] = useState('$5 of your purchase is eligible for a donation to charity. No cost to you.');
    const [blockValue, setBlockValue] = useState(['left']);
    const [verticalText, setVerticalText] = useState('20')
    const [displayModeValue, setDisplayMode] = useState(['light']);

    const handleDisplayChange = useCallback(
        (value) => setValue(value), []
    );

    const handlePreviewText = useCallback(
        (value) => setPreviewText(value),
        []
    );

    const handleBlockChange = useCallback(
        (value) => setBlockValue(value), []
    );

    const updateVerticalText = useCallback(
        (value) => setVerticalText(value), []
    );

    const updateDisplayModeValue = useCallback(
        (value) => setDisplayMode(value), []
    );

    return (
        <Layout.AnnotatedSection
            title="Customize Plugin"
            description="Customize your plugin to match the theme of your store."
        >
            <Card sectioned>
                <div className="display-store-plugin">
                    <TextContainer>
                        <ChoiceList
                            title={
                                <p className="select-product-radiobutton-label">
                                    Display on your store
                                    <span className="tooltip">
                                        <Tooltip
                                            content="If donating based on total purchase, plugin will show
                                            on every product detail page. If donating based
                                            on specific product sales, plugin will show up on the
                                            specific product page you selected"
                                        >
                                            <Icon source={InfoMinor}/>
                                        </Tooltip>
                                    </span>
                                </p>
                            }
                            choices={[
                                { label: 'On', value: 'on'},
                                { label: 'Off', value: 'off'}
                            ]}
                            selected={displayValue}
                            onChange={handleDisplayChange}
                        />
                    </TextContainer>
                </div>
                <div className="preview-title">
                    <TextField
                        label="Describe your campaign"
                        helpText="Max 100 characters"
                        value={previewTitleText}
                        onChange={handlePreviewText}
                    />
                </div>
                <div className="block-alignment">
                    <TextContainer>
                        <ChoiceList
                            title="Horizontal alignment"
                            choices={[
                                { label: 'Left', value: 'left'},
                                { label: 'Center', value: 'center'},
                                { label: 'Right', value: 'right'}
                            ]}
                            selected={blockValue}
                            onChange={handleBlockChange}
                        />
                    </TextContainer>
                </div>
                <div className="vertical-indent">
                    <div>
                        <div className="customize">
                            <TextField
                                label="Vertical spacing"
                                onChange={updateVerticalText}
                                value={verticalText}
                                suffix="px"
                            />
                        </div>
                        <Button>
                            Reset
                        </Button>
                    </div>
                </div>
                <div className="display-mode">
                    <ChoiceList
                        title="Select display mode"
                        choices={[
                            { label: 'Light Mode', value: 'light'},
                            { label: 'Dark Mode', value: 'dark' }
                        ]}
                        selected={displayModeValue}
                        onChange={updateDisplayModeValue}
                    />

                </div>
            </Card>
        </Layout.AnnotatedSection>
    );
};

export default CustomizePlugin;
