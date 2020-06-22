import React, { useState, useCallback } from 'react';
import { Layout, Card, Stack, TextField, Button } from "@shopify/polaris";

import '../assets/account-info.scss';
import Footer from "./layout/Footer";


const AccountInfoPage = () => {
    const [firstName, setFirstName] = useState('Stuart');
    const [lastName, setLastName] = useState('Barron');
    const [jobTitle, setJobTitle] = useState('Engineer');
    const [email, setEmail] = useState('stuartduanebarron@gmail.com');
    const [phoneNum, setPhoneNum] = useState('');

    const updateFirstName = useCallback(
        (value) => setFirstName(value), []
    );

    const updateLastName = useCallback(
        (value) => setLastName(value), []
    );

    const updateJobTitle = useCallback(
        (value) => setJobTitle(value), []
    );

    const updateEmail = useCallback(
        (value) => setEmail(value), []
    );

    const updatePhoneNum = useCallback(
        (value) => setPhoneNum(value), []
    )

    return (
        <div className="account-info-wrapper">
            <div className="account-info-content">
                <Layout>
                    <Layout.AnnotatedSection
                        title="Your Account Info"
                        description="Please confirm or update the contact details below in order to make
                        sure we’re connecting with the right person
                        regarding your Shop For Good account & campaigns."
                    >
                        <div>
                            <Card sectioned>
                                <Stack vertical>
                                    <Stack wrap={false} distribution="fill">
                                        <TextField
                                            label="First Name"
                                            value={firstName}
                                            onChange={updateFirstName}
                                        />
                                        <TextField
                                            label="Last Name"
                                            value={lastName}
                                            onChange={updateLastName}
                                        />
                                    </Stack>
                                    <Stack>
                                        <div style={{ maxWidth: '151px'}}>
                                            <TextField
                                                label="Job Title"
                                                value={jobTitle}
                                                onChange={updateJobTitle}
                                            />
                                        </div>
                                    </Stack>
                                    <Stack distribution="fill">
                                        <TextField
                                            label="Email Address"
                                            value={email}
                                            onChange={updateEmail}
                                        />
                                    </Stack>
                                    <Stack distribution="fill">
                                        <TextField
                                            label="Phone Number (optional)"
                                            value={phoneNum}
                                            onChange={updatePhoneNum}
                                        />
                                    </Stack>
                                </Stack>
                            </Card>
                        </div>
                    </Layout.AnnotatedSection>
                    <Layout.AnnotatedSection
                        title="Your Current Plan"
                        description="Boost your donations with the plan that works best for you."
                    >
                        <div>
                            <Card sectioned>
                                <div className="account-info-billing-wrapper">
                                    <div className="billing-status">
                                        <span className="current-plan">
                                            <strong>Basic Plan</strong>
                                            - $0 / month
                                        </span>
                                        <div className="current-plan-upgrade">
                                            <Button>
                                                Upgrade
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Layout.AnnotatedSection>
                </Layout>
            </div>
            <Footer/>
        </div>
    );
};

export default AccountInfoPage;
