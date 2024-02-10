import React, { useState } from 'react';

const CountText = () => {
    const [inputText, setInputText] = useState('');
    const [comments, setComments] = useState([]);

    const typeText = (e) => {
        setInputText(e.target.value);
    };

    const addComment = () => {
        if (inputText.trim() !== '') {
            setComments([...comments, inputText]);
            setInputText('');
        }
    };

    return (
        <div>
            
          
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5">
                Your message
            </label>
            <input
                onChange={typeText}
                value={inputText}
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
            ></input>

            <button
                className="bg-gray-700 text-white p-2 mt-5 rounded ml-5"
                onClick={addComment}
            >
                Add Your Comments
            </button>
           
            <div className="mt-3">
                {comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                ))}
            </div>
        </div>
    );
};

export default CountText;
