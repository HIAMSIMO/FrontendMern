import{ useState} from 'react'
import{ UseBooksCtxt } from "../hooks/useBooksCtxt"


const BookForm = () =>{
    const {dispatch} = UseBooksCtxt()
    const [title, setTitle] = useState('')
    const [Author, setAuthor] = useState('')
    const [Edition, setEdition] = useState('')
    const [Language, setLanguage] = useState('English')//default is english ! can be changed
    const [error, setError] = useState(null)
    const [emptyFields, setemptyFields] = useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const book = {title,Author,Edition,Language}

        const response = await fetch('/api/books', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setemptyFields(json.emptyFields)
        }

        if(response.ok){
            setTitle('')
            setAuthor('')
            setEdition('')
            setLanguage('English')
            setError(null)
            setemptyFields([])
            console.log('new Book added', json)
            dispatch({type:'CREATE_BOOK', payload: json})

        }
    }

    return(
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Book</h3>

            <label>Book Title :</label>
            <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Book Author :</label>
            <input 
            type="text" 
            value={Author} 
            onChange={(e) => setAuthor(e.target.value)}
            className={emptyFields.includes('Author') ? 'error' : ''}
            />

            <label>Book Edition :</label>
            <input 
            type="text" 
            value={Edition} 
            onChange={(e) => setEdition(e.target.value)}
            className={emptyFields.includes('Edition') ? 'error' : ''}

            />

            <label>Book Language :</label>
            <input 
            type="text" 
            value={Language} 
            onChange={(e) => setLanguage(e.target.value)}
            />


            <button>Add Book</button>
            {error && <div className='error'>{error}</div>}
        </form>
    
        )
}

export default BookForm