import React, {useState} from 'react'
import { IGetUsers } from '../../model'

type headTableType = {
    setData: (i: any) => void,
    data: any,
    setFilterName:(i: any) => void,
    setLastName: (i: any) => void,
    setFilterId: (i: any) => void,
    setFilterEmail: (i: any) => void,
    setFilterPhone: (i: any) => void,
}

const HeadTable:React.FC<headTableType> = ({
    setData, 
    data,
    setFilterName,
    setLastName,
    setFilterId,
    setFilterEmail,
    setFilterPhone,
}) => {


    const [sortIdArrow, setArrow] = useState<boolean>(true)

    const filterIdHundler = () => {
        setArrow(prev => !prev)
        if (sortIdArrow) {
            let upsort = [...data].sort(sortIndDown)
            setData(upsort)
        } else {
             let downsort = [...data].sort(sortInId)
             setData(downsort)
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


    return (
        <thead className="thead-dark">
                <tr>
                    <th style={{cursor: 'pointer'}} scope="col">
                        { sortIdArrow
                            ? <i onClick={filterIdHundler} className="bi bi-caret-down-fill">#</i>
                            : <i onClick={filterIdHundler} className="bi bi-caret-up-fill">#</i>
                        }
                        <input type='string' className="input-group" 
                               onChange={(e: any) => setFilterId(e.target.value)}
                        />
                    </th>
                    <th scope="col">
                        firstName
                        <input type='text'  className="input-group" onChange={(e: any) => setFilterName(e.target.value)} />
                    </th>

                    <th scope="col">
                        lastName
                        <input  type='text' className="input-group"
                               onChange={(e: any) => setLastName(e.target.value)}
                        />
                    </th>

                    <th scope="col">
                        email
                        <input type='text' className="input-group"
                               
                               onChange={(e: any) => setFilterEmail(e.target.value)}
                        />
                    </th>

                    <th scope="col">
                        phone
                        <input type='text' className="input-group"
                               
                               onChange={(e: any) => setFilterPhone(e.target.value)}
                        />
                    </th>

                </tr>
                </thead>
    )
}


export default HeadTable