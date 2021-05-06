import './style.scss';

import React, { useEffect, useState } from 'react';
import { withTranslation } from '../../../translate/init';
import { Row, Col, Tabs } from 'antd';
import {
    InstagramOutlined,
    TwitterOutlined,
    MailOutlined,
    SettingOutlined,
    UserOutlined,
    FormatPainterOutlined,
    DashboardOutlined,
} from '@ant-design/icons';

import DashboardCard from './dashboard-card';
import ProfileUpdate from './profile-update';

const ProfileTemplate = (props) => {
    const { t } = props;

    const [activeTab, setActiveTab] = useState('dashboard');

    const { TabPane } = Tabs;

    const user = {
        fullName: 'Bui Lan Huong',
        jobTitle: 'Singer',
        contact: {
            instagram: '@builanhuong',
            email: 'builanhuong@gmail.com',
            twitter: '@builanhuong16',
        },
        static: {
            read: 12,
            purchase: 20,
            balance: 120,
        },
    };
    console.log(activeTab);

    return (
        <React.Fragment>
            <div className='profile-page'>
                <div className='page-title'>{ t('title.profile') }</div>

                <div className='intro-box'>
                    <Row>
                        <Col lg={ 8 } sm={ 24 }>
                            <div className='intro'>
                                <div className='profile-picture'>
                                    <img
                                        className='rounded'
                                        src='https://image.thanhnien.vn/900x600/uploaded/nguyenvan/2019_04_23/bui-lan-huong_owhc.jpg'
                                    />
                                </div>

                                <div className='name'>
                                    <div className='full-name'>
                                        { user.fullName }
                                    </div>

                                    <div className='title'>{ user.jobTitle }</div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={ 8 } sm={ 24 }>
                            <div className='divider' />

                            <div className='contact'>
                                <div className='title'>
                                    { t('profile.contact') }
                                </div>

                                <div>
                                    <div className='contact-item'>
                                        <InstagramOutlined className='contact-icon' />
                                        { user.contact.instagram }
                                    </div>

                                    <div className='contact-item'>
                                        <TwitterOutlined className='contact-icon' />
                                        { user.contact.twitter }
                                    </div>

                                    <div className='contact-item'>
                                        <MailOutlined className='contact-icon' />
                                        { user.contact.email }
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={ 8 } sm={ 24 }>
                            <div className='static'>
                                <div className='divider' />

                                <div className='static-item'>
                                    <div className='number'>
                                        { user.static.read }
                                    </div>

                                    <div className='static-name'>
                                        { t('profile.static.read') }
                                    </div>
                                </div>
                                <div className='static-item'>
                                    <div className='number'>
                                        { user.static.purchase }
                                    </div>

                                    <div className='static-name'>
                                        { t('profile.static.purchase') }
                                    </div>
                                </div>
                                <div className='static-item'>
                                    <div className='number'>
                                        { user.static.balance }
                                    </div>

                                    <div className='static-name'>
                                        { t('profile.static.balance') }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className='horizontal-divider' />

                    <div className='nav-bar'>
                        <Tabs
                            defaultActiveKey='dashboard'
                            onChange={ (key) => setActiveTab(key) }>
                            <TabPane
                                tab={
                                    <span>
                                        <DashboardOutlined />{ ' ' }
                                        { t('profile.dashboard') }
                                    </span>
                                }
                                key='dashboard'></TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <UserOutlined />
                                        { t('profile.title') }
                                    </span>
                                }
                                key='profile'></TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <FormatPainterOutlined />
                                        { t('profile.upgrade') }
                                    </span>
                                }
                                key='upgrade'></TabPane>
                        </Tabs>
                    </div>
                </div>

                <div
                    className='dashboard'
                    style={{
                        display: activeTab === 'dashboard' ? 'inherit' : 'none',
                    }}>
                    <Row>
                        <Col lg={ 12 } xs={ 24 }>
                            <DashboardCard cardTitle='process' />
                        </Col>

                        <Col lg={ 12 } xs={ 24 }>
                            <DashboardCard cardTitle='reading' />
                        </Col>

                        <Col lg={ 12 } xs={ 24 }>
                            <DashboardCard cardTitle='library' />
                        </Col>

                        <Col lg={ 12 } xs={ 24 }>
                            <DashboardCard cardTitle='purchase' />
                        </Col>
                    </Row>
                </div>

                <div
                    className='profile'
                    style={{
                        display: activeTab === 'profile' ? 'inherit' : 'none',
                    }}>
                    <ProfileUpdate userProfile={ user } />
                </div>

                <div
                    className='upgrade'
                    style={{
                        display: activeTab === 'upgrade' ? 'inherit' : 'none',
                    }}>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withTranslation('common')(ProfileTemplate);
