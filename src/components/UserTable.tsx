import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {IGetUsers} from '../model'
import AddUserPage from "./pages/AddUserPage";
import Pagination from "./Pagination";

const UserTable = () => {

    const [data, setData] = useState<IGetUsers[]>([])

    const [loading, setLoading] = useState<boolean>(false)
    const [sortIdArrow, setArrow] = useState<boolean>(true)

    const [currentPage, setCurrentPage] = useState<any>(1)
    const [countriesPerPage] = useState<any>(7)

    const [filterName, setFilterName] = useState<string>('')
    const [filterLastName, setLastName] = useState<string>('')
    const [filterId, setFilterId] = useState<any>('')
    const [filterEmail, setFilterEmail] = useState<any>('')
    const [filterPhone, setFilterPhone] = useState<any>('')

    const [currentUser, setCurrentUser] = useState<IGetUsers | null>(null)

    const [activeAdd, setActiveAdd] = useState<boolean>(false)


    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get('http://www.filltext.com/?rows=32&id={number%7C1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone%7C(xxx)xxx-xx-xx}&address={addressObject}&description={lorem%7C32}')
            setData(response.data.sort((a: any, b: any) => a.id - b.id))
            setLoading(false)

        } catch (err) {
            const error = err as AxiosError
            console.log(error.message, 'Req Error')
        }
    }

    useEffect(() => {
        getUsers()

    }, [])

    const filterIdHundler = () => {
        setArrow(prev => !prev)
        if (sortIdArrow) {
            return  data.sort(sortIndDown)
        } else {
            return  data.sort(sortInId)
        }

    }

    const sortIndDown = (a: any, b: any) => {
        if (a.id > b.id) {
            return -1
        } else {
            return 1
        }
    }

    const sortInId = (a: any, b: any) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }


    const lastCountryIndex = currentPage * countriesPerPage;
    const firstCountryIndex = lastCountryIndex - countriesPerPage
    const currentCountry = data.slice(firstCountryIndex, lastCountryIndex)

    const selectedUser = (user: any) => {
        setCurrentUser(user)
    }

    const addUser = (userData: any) => {
        setData([
            ...data,
            userData
        ])
        setActiveAdd(false)
    }


    return (



        <div className="container pt-5">

            {loading && <div className="text-center ">Loading ...</div>}
            

            <button type="button" className="btn btn-outline-primary" 
            onClick={() => setActiveAdd(prev => !prev)}>Add user +
            </button>

            { activeAdd && <AddUserPage setActiveAdd={setActiveAdd} addUser={addUser} /> }

            <table className="table ">
                <thead className="thead-dark">
                <tr>
                    <th style={{cursor: 'pointer'}} scope="col">
                        { sortIdArrow
                            ? <i onClick={filterIdHundler} className="bi bi-caret-down-fill">#</i>
                            : <i onClick={filterIdHundler} className="bi bi-caret-up-fill">#</i>
                        }
                        <input type='string' className="input-group" value={filterId}
                               onChange={(e: any) => setFilterId(e.target.value)}
                        />
                    </th>
                    <th scope="col">
                        firstName
                        <input type='text' value={filterName} className="input-group" onChange={(e: any) => setFilterName(e.target.value)} />
                    </th>

                    <th scope="col">
                        lastName
                        <input value={filterLastName} type='text' className="input-group"
                               onChange={(e: any) => setLastName(e.target.value)}
                        />
                    </th>

                    <th scope="col">
                        email
                        <input type='text' className="input-group"
                               value={filterEmail}
                               onChange={(e: any) => setFilterEmail(e.target.value)}
                        />
                    </th>

                    <th scope="col">
                        phone
                        <input type='text' className="input-group"
                               value={filterPhone}
                               onChange={(e: any) => setFilterPhone(e.target.value)}
                        />
                    </th>

                </tr>
                </thead>

                {
                    currentCountry.filter((name: any) => {
                        if (filterName.trim() === '') {
                            return name
                        } else if (name.firstName.toLowerCase().includes(filterName.toLowerCase())) {
                            return name
                        }
                    }).filter((lName: any) => {
                        if (filterLastName.trim() === ''){
                            return lName
                        } else if (lName.lastName.toLowerCase().includes(filterLastName.toLowerCase())) {
                            return lName
                        }
                    }).filter((id: any) => {
                        if (filterId.trim() === '') {
                            return id
                        } else if (id.id.toString().toLowerCase().includes(filterId.toLowerCase())) {
                            return Number(id.id)
                        }
                    }).filter((email: any) => {
                        if (filterEmail.trim() === '') {
                            return email
                        } else if (email.email.toLowerCase().includes(filterEmail.toLowerCase())) {
                            return email.email
                        }
                    }).filter((phone: any) => {
                        if (filterPhone.trim() === '') {
                            return phone
                        } else if (phone.phone.toLowerCase().includes(filterPhone.toLowerCase())) {
                            return phone.phone
                        }
                    }).map((item) => {
                        return (
                            <tbody key={item.id}>
                            <tr style={{cursor: 'pointer'}} onClick={() => selectedUser(item)}>
                                <th scope="row">{item.id}</th>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                            </tbody>
                        )
                    })
                }
            </table>

            <Pagination countriesPerPage={countriesPerPage}
                        totalCountries={data.length}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
            />
            {currentUser && <div>
                <p><b>id:</b> {currentUser.id}</p>
                <p><b>First Name:</b> {currentUser.firstName}</p>
                <p><b>Last Name: </b>{currentUser.lastName}</p>
                <p><b>Email: </b>{currentUser.email}</p>
                <p><b>Phone: </b>{currentUser.phone}</p>
            </div>}
        </div>
    )
}

export default UserTable