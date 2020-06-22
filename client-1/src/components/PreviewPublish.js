import React, { useState, useCallback } from 'react';
import {
    Layout, Card, ChoiceList, Button,
    Tooltip, List
} from "@shopify/polaris";

import '../assets/preview-publish.scss'

const PreviewPublish = () => {
    const [previewMode, setPreviewMode] = useState(['auto']);
    const updatePreviewChoice = useCallback((value) => setPreviewMode(value), []);

    const renderChildren = useCallback(
        () => (
            <div className="btn-container">
                <div className="preview-button-container">
                    <Button>
                        Preview
                    </Button>
                </div>
                <Tooltip content="Enter credit card info below to connect to store">
                    <Button primary disabled>
                        Connect
                    </Button>
                </Tooltip>
            </div>
        ),
        [],
    );

    return (
        <div className="connection-block">
            <Layout.AnnotatedSection
                title="Preview & Publish"
                description={
                    <List type="bullet">
                        <List.Item>
                            Select the mode in which you want to preview and/or publish your plugin
                        </List.Item>
                        <List.Item>
                            Learn how to test your campaign
                        </List.Item>
                    </List>
                }
            >
                <Card sectioned>
                    <div className="selection-container">
                        <ChoiceList
                            title=""
                            choices={[
                                {
                                    label: 'Automatically',
                                    value: 'auto',
                                    helpText:'Once you save your changes and hit "Preview" or "Connect",' +
                                        ' the plugin will appear on the selected product detail pages.',
                                    renderChildren
                                },
                                { label: 'Manual Mode', value: 'manual', helpText: 'If your plugin isn\'t showing up automatically on preview mode or your live store, choose manual mode and follow the instructions below.'},
                            ]}
                            selected={previewMode}
                            onChange={updatePreviewChoice}
                        />
                    </div>
                </Card>
            </Layout.AnnotatedSection>
        </div>
    );
};

export default PreviewPublish;
