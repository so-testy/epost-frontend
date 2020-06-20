import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
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
    const [isLoading, setIsLoading] = useState(false);
    const [departmentNum, setDepartmentNum] = useState(35);
    const [departmentName, setDepartmentName] = useState('hospital');
    const [city, setCity] = useState('Москва');

    const [organizations, setOrganizations] = useState([]);

    const find = async (event) => {
        event.preventDefault();
        
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setOrganizations([{
                name: 'Городская Клиническая Больница № 15 им. Ф.И. Иноземцева',
                address: "ул. Фортунатовкая, д.1, Москва",
                ourEmail: '35-больница-москва.епочта.рф',
                originEmail: 'admin@inozemtcev.ru',
            }])
        }, 1000);
    };

    return (
        <div className="catalog-page">
            <div className="form-wrapper">
                <div className="main">
                    <div className="title">
                        <span className="logo">
                            <span>Е</span>
                            <span>ПОЧТА</span>
                            <span>.РФ</span>
                        </span>
                        поиск государственных организаций
                    </div>
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
                        <button disabled={isLoading} onClick={find}>Найти</button>
                    </form>
                </div>
            </div>
            <div className="emails">
                {
                    organizations.map(organization => (
                        <div className="item">
                            <div className="name">
                                { organization.name }
                            </div>
                            <div className="address">
                                <span>
                                    <FontAwesomeIcon icon={faMapMarker} />
                                </span>
                                { organization.address }
                            </div>
                            <div className="emails">
                                <div className="title">
                                    Для связи
                                </div>
                                <div className="origin">
                                    { organization.originEmail }
                                </div>
                                <br />
                                <div className="our">
                                    { organization.ourEmail }
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
