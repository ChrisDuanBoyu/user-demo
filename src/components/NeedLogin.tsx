import React  from 'react'
import { Redirect } from 'react-router-dom'
import { USER_TOKEN_KEY } from '../const'

const NeedLogin: React.FC = ({ children}) => {
    
    if (localStorage.getItem(USER_TOKEN_KEY)) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return <Redirect to='/login'></Redirect>
        
    }
  
}


export default NeedLogin