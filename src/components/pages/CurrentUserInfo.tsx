import React from 'react'
import { IGetUsers } from '../../model'

type Props = {
    currentUser: IGetUsers
}

const CurrentUserInfo:React.FC<Props> = ({currentUser}) => {
    return (
        <div>
                <p><b>id:</b> {currentUser.id}</p>
                <p><b>First Name:</b> {currentUser.firstName}</p>
                <p><b>Last Name: </b>{currentUser.lastName}</p>
                <p><b>Email: </b>{currentUser.email}</p>
                <p><b>Phone: </b>{currentUser.phone}</p>
        </div>
    )
}

export default CurrentUserInfo