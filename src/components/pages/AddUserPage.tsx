import React, {useState} from "react";

type addUserType = {
    setActiveAdd: (i: boolean) => void
    addUser: (data: any) => void
}

const AddUserPage: React.FC<addUserType> = ({setActiveAdd, addUser}) => {

    const [newUser, setNewUser] = useState<any | null>(null)

    const [addFirstName, setFirstName] = useState<any>('')
    const [addLastName, setLastName] = useState<any>('');
    const [addEmail, setAddEmail] = useState<any>('');
    const [addPhone, setAddPhone] = useState<any>('')

    const cancleAdd = () => {
        setActiveAdd(false)
    }

    const onSubmitUser = (e: any) => {
        e.preventDefault()
        addUser({
            id: Date.now(),
            firstName:addFirstName,
            lastName:addLastName,
            email:addEmail,
            phone:addPhone,
            address: {
                streetAddress: "21 Placerat St",
                city: "Hillsboro",
                state: "NE",
                zip: "20508"
                },
            description: "des"
        })
        
    }
    

    return (
        <div style={{width: '350px'}} className='pt-3'>
            <form onSubmit={onSubmitUser}>
                <div className="form-group">
                    <label>first name</label>
                    <input type="text" 
                        className="form-control" 
                        placeholder="Enter firstName" 
                        value={addFirstName}
                        onChange={(e: any) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group pt-3">
                    <label>last name</label>
                    <input type="text" 
                        className="form-control" 
                        placeholder="Enter lastName"
                        value={addLastName} 
                        onChange={(e: any) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group pt-3">
                    <label>Email</label>
                    <input type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        value={addEmail}
                        onChange={(e: any)=> setAddEmail(e.target.value)}

                    />
                </div>
                <div className="form-group pt-3">
                    <label>Phone</label>
                    <input type="text" 
                        className="form-control" 
                        placeholder="Enter Phone" 
                        value={addPhone}
                        onChange={(e: any) => setAddPhone(e.target.value)}
                    />
                </div>
                <div className="pt-3" style={{width: '50%', display: 'flex', justifyContent: 'space-evenly'}}>
                <button type="submit" className="btn btn-success">Add +</button>
                <button type="button" className="btn btn-secondary" onClick={cancleAdd}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default AddUserPage;