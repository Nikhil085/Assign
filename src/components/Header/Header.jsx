import React from 'react';
import './Header.css';

function Header({onAddWidget}) {

const refreshPage = () => {
    window.location.reload();
}

    return (
        <div className='Header'>
            <h3>CNAPP Dashboard</h3>
            <div className='left'>
                <button onClick={onAddWidget} >Add Widget <i className="ri-add-fill"></i></button>
                <li className='refresh'><i onClick={refreshPage} className="ri-refresh-line"></i></li>
                <li className='menu'><i className="ri-more-2-line"></i></li>
                <div className='dropdown-container'>
                    <li className='time'><i className="ri-time-line"></i></li>
                    <select className='dropdown'>
                        <option>Last 2 Days</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Header;
