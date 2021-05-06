import './style.scss';
import React, { useState, useEffect } from 'react';
import { Link, withTranslation } from '../../../../translate/init';
import { Button, Form, Input } from 'antd';
import CustomInput from '../../../../components/elements/input';
import CustomButton from '../../../../components/elements/button';

const ProfileUpdate = (props) => {
    const { t, userProfile } = props;

    return (
        <React.Fragment>
            <div className='profile-update'>
                <div className='info-card'>
                    <div className='info-card-title'>
                        <div className='text'>
                            { t('profile.displayInformation') }
                        </div>
                    </div>

                    <div className='card-divider' />

                    <div className='info'>
                        <div className='profile-picture'>
                            <img
                                className='rounded'
                                src='https://image.thanhnien.vn/900x600/uploaded/nguyenvan/2019_04_23/bui-lan-huong_owhc.jpg'
                            />
                            
                            <CustomButton
                                classNames={ ['profile-picture-button'] }
                                size='middle-custom'
                                outline>
                                { t('change') }
                            </CustomButton>
                        </div>

                        <Form className='info-form' initialValues={ userProfile }>
                            <Form.Item
                                className='mbc-16px'
                                name='fullName'
                                label={ t('profile.fullName') }>
                                <Input placeholder={ t('profile.fullName') } />
                            </Form.Item>

                            <Form.Item
                                className='mbc-16px'
                                name='jobTitle'
                                label={ t('profile.jobTitle') }>
                                <Input placeholder={ t('profile.jobTitle') } />
                            </Form.Item>

                            <Form.Item
                                className='mbc-16px'
                                name='email'
                                label='Email'>
                                <Input placeholder='Email' />
                            </Form.Item>

                            <Form.Item
                                className='mbc-16px'
                                name='instagram'
                                label='Instagram'>
                                <Input
                                    value={ userProfile.contact.instagram }
                                    placeholder='Instagram'
                                />
                            </Form.Item>

                            <Form.Item
                                className='mbc-16px'
                                name='twitter'
                                label='Twitter'>
                                <Input
                                    value={ userProfile.contact.twitter }
                                    placeholder='twitter'
                                />
                            </Form.Item>

                            <CustomButton
                                classNames={ ['info-form-button'] }
                                size='middle-custom'
                                outline
                                htmlType='submit'>
                                { t('save') }
                            </CustomButton>
                        </Form>
                    </div>
                </div>

                <div className='info-card'>
                    <div className='info-card-title'>
                        <div className='text'>
                            { t('profile.personalInformation') }
                        </div>
                    </div>

                    <div className='card-divider' />
                </div>
            </div>
        </React.Fragment>
    );
};

export default withTranslation('common')(ProfileUpdate);
