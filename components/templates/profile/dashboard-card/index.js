import './style.scss';
import React, { useEffect, useState } from 'react'
import { Link, withTranslation } from '../../../../translate/init';
import { Skeleton } from 'antd';

const DashboardCard = (props) => {
    const {cardTitle, t} = props;

    return (
        <div className='dashboard-card'>
            <div className='card-title'>{t(`profile.card.${cardTitle}`)}</div>

            <div className='dashboard-divider'/>

            <Skeleton/>
        </div>
    )
}

export default withTranslation('common')(DashboardCard)