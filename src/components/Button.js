import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ backgroundColor, onClickOnAddButton, isShowedAddTaskForm }) => {

  return (
    <div 
        style={{ backgroundColor: backgroundColor }} 
        className="btn" 
        onClick={ onClickOnAddButton }
    >{isShowedAddTaskForm ? 'Close' : 'Add'}</div>
  )
}

Button.propTypes = {
    backgroundColor: PropTypes.string
}
