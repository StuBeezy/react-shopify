import React, { useState, useCallback } from 'react';
import {
    Card, Layout, Button, Badge,
    Banner, Tag, Stack, Autocomplete,
    FormLayout
} from "@shopify/polaris";

const deselectedOptions = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
];

const titleCase = (string) => {
    return string
        .toLowerCase()
        .split(' ')
        .map((word) => word.replace(word[0], word[0].toUpperCase()))
        .join('');
};

const SelectCharities = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);

    const updateText = useCallback(
        (value) => {
            setInputValue(value);

            if (value === '') {
                setOptions(deselectedOptions);
                return;
            }

            const filterRegex = new RegExp(value, 'i');
            const resultOptions = deselectedOptions.filter((option) => {
                return option.label.match(filterRegex);
            });
            let endIndex = resultOptions.length - 1;
            if (resultOptions.length === 0) {
                endIndex = 0;
            }
            setOptions(resultOptions)
        }, [deselectedOptions]
    );

    const removeTag = useCallback(
        (tag) => () => {
            const options = [...selectedOptions];
            options.splice(options.indexOf(tag), 1);
            setSelectedOptions(options);
        }, [selectedOptions]
    );

    const tagsMarkup = selectedOptions.map((option) => {
        let tagLabel = '';
        tagLabel = option.replace('_', ' ');
        tagLabel = titleCase(tagLabel);
        return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
                <div className="tag-label">
                    <p className="tag-prefix">1</p>
                    {tagLabel}
                    <Badge status="new">
                        In Review Fam
                    </Badge>
                </div>
            </Tag>
        )
    });

    const textField = (
        <Autocomplete.TextField
            label="Type in your favorite charity"
            placeholder="Search"
            onChange={updateText}
            value={inputValue}
            helpText="You can add up to 5 charities"
        />
    );

    return (
        <Layout.AnnotatedSection
            title="Select benefiting charities"
            description="Donations are split equally across all your benefiting charities"
        >
            <Card sectioned>
                <FormLayout>
                    <div className="charity-container">
                        <Stack vertical>
                            <span className="autocomplete-wrapper">
                                <Autocomplete
                                    allowMultiple
                                    options={options}
                                    textField={textField}
                                    selected={selectedOptions}
                                    onSelect={setSelectedOptions}
                                    listTitle="Suggested Charities"
                                />
                                <Button primary>
                                    Save Charity
                                </Button>
                            </span>
                            <Stack vertical spacing="tight">
                                {tagsMarkup}
                            </Stack>
                            <br/>
                        </Stack>
                    </div>
                </FormLayout>
            </Card>
            <Banner
                title="Remember to click SAVE to begin the charity review process"
                action={{ content: 'Learn More'}}
                status="warning"
            >
                <p>
                    Your plugin will not connect and appear on your store until we review and approve
                    the charity you have selected, we will review and get back to you within
                    24 hours. Please note all charities must have a valid public 501(c)(3) status.
                </p>
            </Banner>
        </Layout.AnnotatedSection>
    );
};

export default SelectCharities;
