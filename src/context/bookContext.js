//to refetch to show the books added or deleted, without refreshing each action Add/Update/Delete
import { createContext,useReducer } from "react";

export const BookContext = createContext()

export const BooksReducer = (state, action) =>{
    switch(action.type){
        case 'SET_BOOKS':
            return {
                books:action.payload
            }
        case 'CREATE_BOOK':
            return{
                books: [action.payload, ...state.books]
            }
        case 'DELETE_BOOK':
            return{
                books: state.books.filter((book)=>book._id !== action.payload._id)
            }
        case 'UPDATE_BOOK':
            return {
                books: state.books.map((book) => {
                  if (book._id === action.payload._id) {
                    return {
                      ...book,
                      title: action.payload.title,
                      Author: action.payload.Author,
                      Edition: action.payload.Edition,
                      Language: action.payload.Language
                    }
                  }
                  return book
                })
              }
        default:
            return state
    }
}

export const BookCtxtProvider = ({ children }) =>{
    
    const [state,dispatch] = useReducer(BooksReducer,{
        books:null
    })

    return(
        <BookContext.Provider value={{...state, dispatch}}>
            {children}
        </BookContext.Provider>
    
    )
}
