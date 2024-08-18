import React, { useState } from 'react';
import './Dashboard.css';
import dashboardData from '../Dashdata/Dashdata';
import AddWidgetForm from '../AddWidgetForm/AddWidgetForm';
import Header from '../Header/Header';
import CWidget from '../CWidget/CWidget';

function Dashboard() {
  const [dashData, setDashData] = useState(dashboardData);
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false);
  const [showCWidget, setShowCWidget] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState({});

  const removeWidget = (categoryIndex, widgetId) => {
    const updateDashData = dashData.map((categoryData, index) => {
      if (categoryIndex === index) {
        return {
          ...categoryData,
          widgets: categoryData.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return categoryData;
    });
    setDashData(updateDashData);
  };

  const handleAddWidget = (newWidget) => {
    const categoryIndex = dashData.findIndex(
      (categoryData) => categoryData.category === newWidget.category
    );

    if (categoryIndex !== -1) {
      const updatedDashData = dashData.map((categoryData, index) => {
        if (index === categoryIndex) {
          const newWidgetId = Math.max(...categoryData.widgets.map((w) => w.id)) + 1;
          return {
            ...categoryData,
            widgets: [
              ...categoryData.widgets,
              { id: newWidgetId, name: newWidget.name, content: newWidget.content },
            ],
          };
        }
        return categoryData;
      });

      setDashData(updatedDashData);
      setShowAddWidgetForm(false);
    }
  };

  const handleShowCWidget = () => {
    setShowCWidget(true);
  };

  const handleCloseCWidget = () => {
    setShowCWidget(false);
  };

  const handleConfirmWidgets = (selectedWidgets) => {
    setSelectedWidgets(selectedWidgets);
    setShowCWidget(false);
  };

  return (
    <>
      {showCWidget && (
        <CWidget
          onClose={handleCloseCWidget}
          dashboardData={dashData}
          onConfirm={handleConfirmWidgets}
        />
      )}
      <div className={`dash-container ${showAddWidgetForm ? 'blur-background' : ''}`}>
        <Header onAddWidget={handleShowCWidget} />
        {dashData.map((categoryData, categoryIndex) => (
          <div key={categoryIndex}>
            <div className='dash-header'>
              <h4>{categoryData.category}</h4>
            </div>
            <div className='card-container'>
              {categoryData.widgets.map((widget) => (
                <div key={widget.id} className='card'>
                  <strong className='widget-name'>
                    {widget.name}
                    <i
                      className='ri-close-circle-fill'
                      onClick={() => removeWidget(categoryIndex, widget.id)}
                    ></i>
                  </strong>
                  <p>{widget.content}</p>
                </div>
              ))}
              <div
                className='card add-widget-card'
                onClick={() => setShowAddWidgetForm(true)}
              >
                <strong className='add-widget-text'>+ Add Widget</strong>
              </div>
            </div>
          </div>
        ))}
        {showAddWidgetForm && (
          <AddWidgetForm
            categories={dashData.map((category) => category.category)}
            onAddWidget={handleAddWidget}
            onClose={() => setShowAddWidgetForm(false)}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;