import React, {useState} from 'react';

type paginateType = {
  //  paginate: (pageNumber: number) => void,
    countriesPerPage: number,
    totalCountries: number,
    setCurrentPage: (i: any) => void,
    currentPage: number
}

const Pagination: React.FC<paginateType> = ({currentPage,countriesPerPage, totalCountries, setCurrentPage}) => {

    const [active, setActive] = useState<any>(1)

    const pageNumbers: any = []

    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    const paginate = (pageNumber: number) => {
        setActive(pageNumber)
        setCurrentPage(pageNumber)

    }

    return (
        <div>
            <ul className={'pagination'}>
                <a className="page-link" href="#" aria-label="Previous"
                   onClick={() => paginate(currentPage - 1)}>
                    <span aria-hidden="true">&laquo;</span>

                </a>
                {
                    pageNumbers.map((number: any) => (
                        <li className={`page-item ${active == number && 'active'}`} key={number}>
                            <a href="#" className={'page-link'} onClick={() => paginate(number)} >
                                {number}
                            </a>
                        </li>
                    ))
                }
                <a className="page-link" href="#" aria-label="Next"
                   onClick={() => paginate(currentPage + 1)}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </ul>
        </div>
    );
};

export default Pagination;