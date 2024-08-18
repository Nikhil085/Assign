import React, { useState } from 'react';
import './CWidget.css';
import dashboardData from '../Dashdata/Dashdata';

const shortCategoryNames = dashboardData.map((category) => {
  switch (category.category) {
    case 'CSPM Executive Dashboard':
      return 'CSPM';
    case 'CWPP Dashboard':
      return 'CWPP';
    case 'Registry Scan':
      return 'Registry';
    default:
      return category.category;
  }
});

function CWidget({ onClose, onConfirm }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedWidgets, setSelectedWidgets] = useState({});

  const filteredWidgets = dashboardData.reduce((acc, category) => {
    if (filterCategory === 'all') {
      return [...acc, ...category.widgets];
    } else if (shortCategoryNames[dashboardData.indexOf(category)] === filterCategory) {
      return [...acc, ...category.widgets];
    }
    return acc;
  }, []);

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  const handleSelectWidget = (widget) => {
    const category = shortCategoryNames[dashboardData.indexOf(widget.category)];
    setSelectedWidgets((prevSelectedWidgets) => ({
      ...prevSelectedWidgets,
      [category]: [...(prevSelectedWidgets[category] || []), widget],
    }));
  };

  const handleConfirm = () => {
    onConfirm(selectedWidgets);
  };

  return (
    <div className='c-container'>
      <div className='Left'>
        <div className='head'>
          Add Widget
          <i className="ri-close-line close-icon" onClick={onClose}></i>
        </div>
        <h3>Personalize Your Dashboard Adding the Following Widget</h3>
        <div className='filter'>
          <div className='categories'>
            <ul>
              <li
                onClick={() => handleFilterChange('all')}
                className={filterCategory === 'all' ? 'active' : ''}
              >
                All
              </li>
              {shortCategoryNames.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterChange(category)}
                  className={filterCategory === category ? 'active' : ''}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className='c-list'>
            {filteredWidgets.map((widget) => (
              <li key={widget.id}>
                <div className='list-item'>
                  <input
                    type="checkbox"
                    onChange={() => handleSelectWidget(widget)}
                    checked={selectedWidgets[shortCategoryNames[dashboardData.indexOf(widget.category)]]?.includes(widget)}
                  />
                  <span>{widget.name}</span>
                </div>
              </li>
            ))}
          </div>
        </div>
        <div className='button'>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CWidget;