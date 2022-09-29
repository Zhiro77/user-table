import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {IGetUsers} from '../model'
import AddUserPage from "./pages/AddUserPage";
import CurrentUserInfo from "./pages/CurrentUserInfo";
import HeadTable from "./pages/HeadTable";
import Pagination from "./Pagination";

const UserTable = () => {

    const [data, setData] = useState<IGetUsers[]>([])

    const [loading, setLoading] = useState<boolean>(false)


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

    const filterAll = (item:any, a: any, b: any) => {
        if (a.trim() === '') {
            return item
        } else if (item.b.toLowerCase().includes(a.toLowerCase())){
            return item
        }
    }

    return (



        <div className="container pt-5">
            {loading && <div className="text-center ">Loading ...</div>}
            
            <button type="button" className="btn btn-outline-primary" 
                    onClick={() => setActiveAdd(prev => !prev)}>Add user +
            </button>

            { activeAdd && <AddUserPage setActiveAdd={setActiveAdd}
                                        addUser={addUser} 
                                        
            /> }

            <table className="table ">
            <HeadTable  setData={setData}
                        data={data}
                        setFilterName={setFilterName}
                        setLastName={setLastName}
                        setFilterId={setFilterId}
                        setFilterEmail={setFilterEmail}
                        setFilterPhone={setFilterPhone}
             />

                {
                    currentCountry.filter((item: any) => {
                        if ((filterName.trim() === '')     ||
                           (filterLastName.trim() === '')  ||
                           (filterId.trim() === '')        ||
                           (filterEmail.trim() === '')     ||
                           (filterPhone.trim() === '')
                        ) {
                            return item
                        } else if ((item.firstName.toLowerCase().includes(filterName.toLowerCase()))   ||
                                  (item.lastName.toLowerCase().includes(filterLastName.toLowerCase())) ||
                                  (item.id.toString().toLowerCase().includes(filterId.toLowerCase()))  ||
                                  (item.email.toLowerCase().includes(filterEmail.toLowerCase()))       ||
                                  (item.phone.toLowerCase().includes(filterPhone.toLowerCase()))
                        ) {        
                            return item
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
            {currentUser && <CurrentUserInfo currentUser={currentUser} />}
        </div>
    )
}

export default UserTable