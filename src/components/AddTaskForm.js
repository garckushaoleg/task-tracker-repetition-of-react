import React, { useState } from 'react'

export const AddTaskForm = ({ onAddTask }) => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!title || !date) {
            alert('Please fill the form');
            return;
        }
        
        onAddTask({ title, date, reminder });

        setTitle('');
        setDate('');
        setReminder(false);
    }

    return (
        <form className='add-form' onSubmit={ onSubmit }>
            <div className='form-control'>
                <label>Title</label>
                <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={ title } />
            </div>
            <div className='form-control'>
                <label>Date</label>
                <input type="text" placeholder='Date' onChange={(e) => setDate(e.target.value)} value={ date } />
            </div>
            <div className='form-control form-control-check'>
                <label>Set reminder</label>
                <input type="checkbox" onChange={(e) => setReminder(e.target.checked)} checked={ reminder } />
            </div>

            <input type="submit" value="Save task" className='btn btn-block' />
        </form>
    )
}
