import React, { useState } from 'react';
import {
    Card,
    Layout,
    Page,
    Button,
    Form,
    FormLayout,
    Stack,
    TextField,
    SettingToggle,
    TextStyle
} from "@shopify/polaris";

const AnnotatedLayout = () => {
    const [discount, setDiscount] = useState('10%')
    const [enabled, setEnabled] = useState(false);

    const contentStatus = enabled ? 'Disable': 'Enable';
    const textStatus = enabled ? 'enabled': 'disabled';

    const handleSubmit = () => {
        console.log('submission', { discount, enabled });
    };

    const handleToggle = () => {
        setEnabled(prevState => !prevState);
    };

    const handleChange = (e) => {
        setDiscount(prevState => e);
    };

    return (
        <Page>
            <Layout>
                <Layout.AnnotatedSection
                    title="Default Discount"
                    description="Add a product to Sample App, it will automatically be discounted."
                >
                    <Card sectioned>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField
                                    value={discount}
                                    onChange={(e) => handleChange(e)}
                                    label="Discount percentage"
                                    type="discount"
                                />
                                <Stack distribution="trailing">
                                    <Button primary submit>
                                        Save
                                    </Button>
                                </Stack>
                            </FormLayout>
                        </Form>
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection>
                    <SettingToggle
                        action={{
                            content: contentStatus,
                            onAction: handleToggle
                        }}
                        enabled={enabled}
                    >
                        This setting is {` `}
                        <TextStyle variation="strong">
                            {textStatus}
                        </TextStyle>
                    </SettingToggle>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}

export default AnnotatedLayout;
