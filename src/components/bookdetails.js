import{ UseBooksCtxt } from "../hooks/useBooksCtxt"


//date forma import
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Bookdetails = ({book}) =>{

    const {dispatch} = UseBooksCtxt()

    const handleClick = async () =>{

        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_BOOK', payload: json}) 
        }
    }

    return(
        <div className="book-details">
            <h3>{book.title}</h3>
            <p><strong>Author : </strong>{book.Author}</p>
            <p><strong>Edition : </strong>{book.Edition}</p>
            <p><strong>Language : </strong>{book.Language}</p>
            <hr/>
            <p>{formatDistanceToNow(new Date(book.createdAt), {addSuffix:true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}

export default Bookdetails