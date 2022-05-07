import React from 'react';
import { Button } from './Button';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onClickOnAddButton, isShowedAddTaskForm }) => {
  const location = useLocation();
  return (
    <header>
      <h1 style={ headingClass }>{ title }</h1>
      { location.pathname === '/' && (
        <Button backgroundColor="green" onClickOnAddButton={ onClickOnAddButton } isShowedAddTaskForm={ isShowedAddTaskForm } />
      ) }
    </header>
  )
}

Header.defaultProps = {
  title: 'Task tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

const headingClass = {
  color: 'blue',
}

export default Header