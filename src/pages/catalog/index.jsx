import React, { useState } from 'react';
// import axios from 'axios';
import Dropdown from 'react-dropdown'

import { withRouter } from 'react-router-dom';

import 'react-dropdown/style.css'
import './index.scss';

const departmentNames = [
	{ value: 'hospital', label: 'Больница' },
    { value: 'policlinic', label: 'Поликлиника' },
    { value: 'school', label: 'Школа' },
    { value: 'policeStation', label: 'Участковый пункт полиции' },
];

const cities = [
	{ value: 'moscow', label: 'Москва' },
    { value: 'syktyvcar', label: 'Сыктывкар' },
    { value: 'kazan', label: 'Казань' },
];

const Catalog = (props) => {
    const [departmentNum, setDepartmentNum] = useState(35);
    const [departmentName, setDepartmentName] = useState('hospital');
    const [city, setCity] = useState('Москва');

    const [organizations, setOrganizations] = useState([]);

    const find = async (event) => {
        event.preventDefault();
        
        setOrganizations([{
            name: 'Городская Клиническая Больница № 15 им. Ф.И. Иноземцева',
            ourEmail: '35-больница-москва.епочта.рф',
            originEmail: 'admin@inozemtcev.ru',
        }])
    };

    return (
        <div className="catalog-page">
            <div className="form-wrapper">
                <form>
                    <fieldset>
                        <label>Номер</label>
                        <input 
                            className="department-num" 
                            type="text" 
                            value={departmentNum} 
                            onChange={(e) => setDepartmentNum(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset>
                        <label>Тип организации</label>
                        <Dropdown
                            className="department-name" 
                            value={departmentName}
                            onChange={(department) => setDepartmentName(department.value)}
                            options={departmentNames}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Город</label>
                        <Dropdown
                            className="city" 
                            value={city}
                            onChange={(city) => setCity(city.value)}
                            options={cities}
                        />
                    </fieldset>
                    <button onClick={find}>Найти</button>
                </form>
            </div>
            <div className="emails">
                {
                    organizations.map(organization => (
                        <div className="item">
                            <div className="name">
                                { organization.name }
                            </div>
                            <div className="emails">
                                <div className="our">
                                    { organization.ourEmail }
                                </div>
                                <div className="origin">
                                    { organization.originEmail }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default withRouter(Catalog);
