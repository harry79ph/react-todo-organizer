import React, { useRef, useState } from 'react';

const AddItem = ({ candos, todos, onUserSubmit }) => {

    const btnRef = useRef();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onFormSubmit = (e) => {
        e.preventDefault();
        onUserSubmit('cando', title, content, false);
        setTitle('');
        setContent('');
    }

    const addToLocale = types => {// adds cando and todo items to local strorage
        types.forEach(type => {
          function clearAll() {// clears local storage for cando and todo items
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key && key.startsWith(type)) localStorage.removeItem(key);
            }
          }
          clearAll();
          let type_of_state = null;
          type === 'cando' ? type_of_state = candos : type_of_state = todos;      
          if (type_of_state.length !== 0) {
            type_of_state.forEach((each, index) => {
              const key = type + index;
              const item = [each.title, each.content];
              localStorage[key] = JSON.stringify(item);
            });
            localStorage.setItem(type + '_length', type_of_state.length);
          } else {
            clearAll();
          }
        });
    }

    const handleSave = () => {
        addToLocale(['cando', 'todo']);
        btnRef.current.value = 'Updated..';
        setTimeout(() => {
            btnRef.current.value = 'Save';
        }, 2000);       
    }

    return (
        <div className="add">
            <h1>Todo Organizer</h1>
            <form onSubmit={onFormSubmit} className="adder">
                <div className="title">
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="28" placeholder="Add Title"/>
                </div>
                <div className="content">
                    <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} rows="6" cols="20" placeholder="Add Content" maxLength="1000"></textarea>
                </div>
                <div className="btn-wrapper">
                    <input className="btn" type="submit" value="Submit" disabled={title.length > 0 && content.length > 0 ? false : true}/>
                    <input className="btn" type="button" ref={btnRef} onClick={handleSave} value="Save" />
                </div>
            </form>
        </div>
    );
}

export default AddItem;