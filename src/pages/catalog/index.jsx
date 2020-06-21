import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';

import { withRouter } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import 'react-dropdown/style.css'
import './index.scss';

const departmentNames = [
	{ value: 'hospital', label: 'Больница' },
    { value: 'policlinic', label: 'Поликлиника' },
    { value: 'school', label: 'Школа' },
    { value: 'policeStation', label: 'Участковый пункт полиции' },
    { value: 'culture', label: 'Учреждение культуры' },
];

const cities = [
	{ value: 'moscow', label: 'Москва' },
    { value: 'syktyvkar', label: 'Сыктывкар' },
    { value: 'kazan', label: 'Казань' },
];

const organizationsStub = [
    {
        name: 'Городская Клиническая Больница №35 им. Ф.И. Иноземцева',
        address: "ул. Фортунатовкая, д.1, Москва",
        ourEmail: '35-больница-москва@епочта.рф',
        originEmail: 'admin@inozemtcev.ru',
        city: 'moscow',
        type: 'hospital',
    },
    {
        name: 'Муниципальное общеобразовательное учреждение «Начальная общеобразовательная школа №6»',
        address: "Республика Коми, г. Сыктывкар, ул. Школьная, д. 16",
        ourEmail: '6-школа-сыктывкар@епочта.рф',
        originEmail: 'noch_6_skt@mail.ru',
        city: 'syktyvkar',
        type: 'school',
    },
    {
        name: 'Муниципальное общеобразовательное учреждение «Основная общеобразовательная школа №8»',
        address: "Республика Коми, г. Сыктывкар, Верхний Чов, д. 60",
        ourEmail: '8-школа-сыктывкар@епочта.рф',
        originEmail: 'sch_8_skt@mail.ru',
        city: 'syktyvkar',
        type: 'school',
    },
    {
        name: 'Муниципальное общеобразовательное учреждение «Средняя общеобразовательная школа №3 им. В.И. Лыткина»',
        address: "Республика Коми, г. Сыктывкар, ул. Тентюковская, д. 353",
        ourEmail: '3-школа-сыктывкар@епочта.рф',
        originEmail: 'mail@sykt-3.ru',
        city: 'syktyvkar',
        type: 'school',
    },
    {
        name: 'МАУК «Центр досуга и кино „Октябрь“ г. Сыктывкар»',
        address: "Республика Коми, г. Сыктывкар, ул. Советская, д. 53",
        ourEmail: 'октябрь-центркультуры-сыктывкар@епочта.рф',
        originEmail: 'dosug_center@mail.ru',
        city: 'syktyvkar',
        type: 'culture',
    },
];

const Catalog = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [departmentNum, setDepartmentNum] = useState('');
    const [departmentName, setDepartmentName] = useState('hospital');
    const [city, setCity] = useState('moscow');

    const [organizations, setOrganizations] = useState(organizationsStub);

    const find = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setOrganizations(organizationsStub.filter(org => org.city === city && org.type === departmentName));
        }, 300);
    };

    return (
        <div className="catalog-page">
            <div className="form-wrapper">
                <div className="main">
                    <div className="title">
                        <span className="logo">
                            <img src={logo} alt="" className="logo" />
                        </span>
                        поиск государственных организаций
                    </div>
                    <form>
                        <fieldset>
                            <label>Идентификатор</label>
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
                    organizations.length ? organizations.map(organization => (
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
                                    Связаться
                                </div>
                                <div className="our">
                                    <a href={`/почта/входящие?адрес=${organization.ourEmail}`} target="_blank">{organization.ourEmail}</a>
                                </div>
                                <br />
                                <div className="origin">
                                    <a href={`/почта/входящие?адрес=${organization.originEmail}`} target="_blank">{organization.originEmail}</a>
                                </div>
                            </div>
                        </div>
                    )) : <div className="not-found">Ничего не найдено</div>
                }
            </div>
        </div>
    );
};

export default withRouter(Catalog);
