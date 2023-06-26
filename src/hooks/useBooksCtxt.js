import {BookContext} from '../context/bookContext'
import { useContext } from 'react'

export const UseBooksCtxt =() =>{
    const context = useContext(BookContext)

    if(!context){
        throw Error('UseBooksCtxt must be used inside an BookCtxtProvider ')
    }

    return context
}