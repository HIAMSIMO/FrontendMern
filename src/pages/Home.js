import{ useEffect} from 'react'
import{ UseBooksCtxt } from "../hooks/useBooksCtxt"

//components
import Bookdetails from '../components/bookdetails'
import BookForm from '../components/bookForm'


const Home = () =>{

    const {books, dispatch} = UseBooksCtxt()

    useEffect(() =>{
        const fetchBook = async () =>{
            const response = await fetch('/api/books')
            const json = await response.json()
            
            if(response.ok){
                dispatch({type: 'SET_BOOKS', payload: json})
            }
        }
        fetchBook()
    },[dispatch])


    return (
        <div className="home">
            <div className ="books">
                {books && books.map((book) =>(
                    <Bookdetails key = {book._id} book={book}/>
                ))}
            </div>

            <BookForm/>
        </div>
    )

}

export default Home