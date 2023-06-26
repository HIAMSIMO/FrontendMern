import{ UseBooksCtxt } from "../hooks/useBooksCtxt"
import { useState } from 'react'

//date forma import
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Bookdetails = ({book}) =>{

    const {dispatch} = UseBooksCtxt()
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedBook, setUpdatedBook] = useState({
        title: book.title,
        Author: book.Author,
        Edition: book.Edition,
        Language: book.Language
    })



    const handleDelete = async () =>{

        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_BOOK', payload: json}) 
        }
    }


    const handleEdit = () => {
        setIsEditMode(true);
      }

    const handleUpdate = async () => {
        const response = await fetch('/api/books/' + book._id, {
          method: 'PATCH',
          body: JSON.stringify(updatedBook),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          const updatedBookData = { ...updatedBook, _id: book._id };
          dispatch({ type: 'UPDATE_BOOK', payload: updatedBookData });
          setIsEditMode(false);
        }
      };
    
      const handleChange = (e) => {
        setUpdatedBook({
          ...updatedBook,
          [e.target.name]: e.target.value
        });
      };

      
      return (
        <div className="book-details">
          {isEditMode ? (
            <>
              <input
                type="text"
                name="title"
                value={updatedBook.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="Author"
                value={updatedBook.Author}
                onChange={handleChange}
              />
              <input
                type="text"
                name="Edition"
                value={updatedBook.Edition}
                onChange={handleChange}
              />
              <input
                type="text"
                name="Language"
                value={updatedBook.Language}
                onChange={handleChange}
              />
              <span onClick={handleUpdate}>Save</span>
            </>
          ) : (
            <>
              <h3>{book.title}</h3>
              <p><strong>Author: </strong>{book.Author}</p>
              <p><strong>Edition: </strong>{book.Edition}</p>
              <p><strong>Language: </strong>{book.Language}</p>
              <hr />
              <p>{formatDistanceToNow(new Date(book.createdAt), {addSuffix : true})}</p>
              <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
              <span className="material-symbols-outlined" onClick={handleEdit}>Edit</span>
            </>
          )}
        </div>
      );
}

export default Bookdetails