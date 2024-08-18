import React, { useState } from 'react';
import './AddWidgetForm.css';

function AddWidgetForm({ categories, onAddWidget, onClose }) {
  const [newWidget, setNewWidget] = useState({ category: categories[0], name: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWidget({ ...newWidget, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddWidget(newWidget);
  };

  return (
    <div className='add-widget-form-container'>
      <form className='add-widget-form' onSubmit={handleSubmit}>
        <div className='form-header'>
          <h4>Add New Widget</h4>
          <i className="ri-close-line close-icon" onClick={onClose}></i>
        </div>
        <select
          name='category'
          value={newWidget.category}
          onChange={handleInputChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type='text'
          name='name'
          placeholder='Widget Name'
          value={newWidget.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name='content'
          placeholder='Widget Content'
          value={newWidget.content}
          onChange={handleInputChange}
          required
        />
        <div className='form-actions'>
          <button type='submit'>Add Widget</button>
        </div>
      </form>
    </div>
  );
}

export default AddWidgetForm;
