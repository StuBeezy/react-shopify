import React, { useState, useCallback } from 'react';
import { Layout, Card, Tooltip, Select } from "@shopify/polaris";
import {
    LineChart, CartesianGrid, XAxis, YAxis,
    Line, Legend, ResponsiveContainer, Tooltip as ChartTooltip
} from "recharts";
import classNames from 'classnames';
import _ from 'lodash';
import '../assets/reports.scss';

const options = [
    { label: 'All Campaigns', value: 'all' },
    { label: 'Donate for discount', value: 'discount' },
    { label: 'Round up', value: 'round' },
    { label: '% of Sales', value: 'percent' },
    { label: 'Donation Tiers', value: 'donation' }
];

const tableOptions = [
    { title: 'Total Customer Donations', value: 0, helpText: 'Reports generated in PST' },
    { title: 'Total Donations to Charity', value: '$0.00', helpText: 'Average donation $0.00'},
    { title: 'Average Order Value', value: '$0.00', helpText: 'Orders with donation'},
    { title: 'Engagement', value: '0%', helpText: 'Orders with donation'},
    { title: 'Total Order Value', value: '$0.00', helpText: 'Orders with donation'}
];

const data = [
    {
        name: 'April 1st', dd: 43, ru: 4, sales: 22, tiers: 14
    },
    {
        name: 'April 2nd', dd: 34, ru: 34, sales: 25, tiers: 24
    },
    {
        name: 'April 3rd', dd: 3, ru: 54, sales: 32, tiers: 34
    },
    {
        name: 'April 4th', dd: 12, ru: 44, sales: 12, tiers: 45
    },
    {
        name: 'April 5th', dd: 43, ru: 23, sales: 15, tiers: 11
    },
    {
        name: 'April 6th', dd: 25, ru: 54, sales: 23, tiers: 21
    },
    {
        name: 'April 7th', dd: 54, ru: 23, sales: 63, tiers: 86
    },
    {
        name: 'April 8th', dd: 65, ru: 12, sales: 43, tiers: 32
    },
    {
        name: 'April 9th', dd: 9, ru: 29, sales: 10, tiers: 28
    },
    {
        name: 'April 10th', dd: 10, ru: 17, sales: 20, tiers: 19
    },
    {
        name: 'April 11th', dd: 15, ru: 47, sales: 38, tiers: 15
    }
];

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const ReportsPage = () => {
    const [campaign, setCampaign] = useState('all');
    const updateCampaignChange = useCallback((value) => setCampaign(value), []);
    const [hideChartData, setChartData] = useState([]);
    const updateChartData = useCallback(
        (value) => {
            let newHideChart = [...hideChartData];
            if (_.includes(hideChartData, value)) {
                newHideChart = _.pull(newHideChart, value);
            } else {
                newHideChart.push(value);
            }
            setChartData(newHideChart);
        }, [hideChartData]
    );

    const filteredData = _.map(data, (n) => _.omit(n, hideChartData));

    const renderTableOptions = () => {
        return tableOptions.map((option) => (
            <Layout.Section secondary={true}>
                <div className="block-container">
                    <Card
                        sectioned
                        title={option.title}
                    >
                        <h1 className="main-title">
                            {option.value}
                        </h1>
                        <p className="sub-title">
                            {option.helpText}
                        </p>
                    </Card>
                </div>
            </Layout.Section>
        ));
    };

    const renderYAxis = (num) => {
        return formatter.format(num);
    };

    const renderTooltip = (props) => {
        const { active, label, payload } = props;
        if (active) {
            return (
                <div className="custom-tooltip">
                    <span className="label">{label}</span>
                    <div className="values">
                        {payload.map((data) => {
                            const dollarValue = formatter.format(data.value);
                            return (
                                <div className="values-block">
                                    <div className="rectangle" style={{ backgroundColor: data.color}}/>
                                    <span className="text">{dollarValue}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderContent = (props, updateChartData) => {
        const { payload } = props;
        return (
            <ul className="chart-legend">
                {payload.map((data) => {
                    let classes = classNames({ 'disclude': _.includes(hideChartData, data.dataKey)})
                    return (
                        <li className="chart-legend-item" onClick={() => updateChartData(data.dataKey)}>
                            <div className="point" style={{ backgroundColor: data.color}}/>
                            <span className={classes}>{data.value}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderChart = () => {
        return (
            <ResponsiveContainer>
                <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={renderYAxis}/>
                    <ChartTooltip content={renderTooltip}/>
                    <Legend content={(props) => renderContent(props, updateChartData)}/>
                    <Line type="monotone" dataKey="dd" name="Donate for discount" stroke="#9C6ADE" strokeWidth={3} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="ru" name="Round up" stroke="#47C1BF" strokeWidth={3} activeDot={{ r: 8}} />
                    <Line type="monotone" dataKey="sales" name="% of Sales" stroke="#E43266" strokeWidth={3} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="tiers" name="Donation Tiers" stroke="#17C1B0" strokeWidth={3} activeDot={{r: 8}} />
                </LineChart>
            </ResponsiveContainer>
        );
    };

    return (
        <Layout>
            <div className="reporting-container">
                <div className="select-campaign-wrapper">
                    <h3>General Overview</h3>
                    <div className="select-campaign">
                        <h4>Show</h4>
                        <Select
                            label=""
                            options={options}
                            value={campaign}
                            onChange={updateCampaignChange}
                        />
                    </div>
                </div>
                <div className="top-section-wrapper">
                    {renderTableOptions()}
                </div>
                <div className="chart-container">
                    <Card title="All donations over time">
                        <div className="chart-container-card">
                            <div style={{ width: '100%', height: '300px'}}>
                                {renderChart()}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default ReportsPage;
