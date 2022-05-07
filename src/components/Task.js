import React from 'react';
import { FaTimes } from 'react-icons/fa';

export const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div 
        className={ `task ${ task.reminder ? 'reminder' : '' }` } 
        key={ task.id }
        onDoubleClick={ () => onToggle(task.id) }
    >
        <h3>
            { task.title } 
            <FaTimes style={{ color: 'red' }} onClick={ () => onDelete(task.id) } />
        </h3>
        <p>{ task.date }</p>
    </div>
  )
}
