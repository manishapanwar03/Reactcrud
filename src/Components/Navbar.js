import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../CSS/Navbar.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Fab } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { createSvgIcon } from '@mui/material/utils';
import SearchIcon from '@mui/icons-material/Search';



const Navbar = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyFoundedDate, setCompanyFoundedDate] = useState('');
    const [companyHeadquaters, setCompanyHeadquaters] = useState('');
    const [apiData, setApiData] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const expense_typeOptions = ["Indore", "Ujjain", "Bhopal", "Pune", "udiapur"];
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // const [itemsPerPage, setItemsPerPage] = useState(5);

    const [filteredData, setFilteredData] = useState([]);
    const [showSrchRst, setShowSrchRst] = useState(false);
    const [empty, setEmpty] = useState("")

    const [pagination, setPagination] = useState("")
    const number_of_rows = [3, 5, 7];
    const [selectedRows, setSelectedRows] = useState(4);
    const [pages, setPages] = useState("")
    const [show, setShow] = useState(1);

    const postCompany = () => {
        let dataObj = {
            name: companyName,
            description: companyDescription,
            founded_date: companyFoundedDate,
            headquarters_location: companyHeadquaters,
        };
        if (selectedCompanyId) {
            axios.put(`http://127.0.0.1:8000/api/companies/${selectedCompanyId}/`, dataObj)
                .then((response) => {
                    // console.log("Company updated:", selectedCompanyId);
                    setCompanyName('');
                    setCompanyDescription('');
                    setCompanyFoundedDate('');
                    setCompanyHeadquaters('');
                    setSelectedCompanyId(null);
                    fetchCompanyData();
                    Swal.fire({
                        title: "Updated",
                        text: "Your file has been Updated.",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,

                    })
                })
                .catch((error) => {
                    // console.error("Error updating company:", error);
                });
        } else {

            axios.post('http://127.0.0.1:8000/api/companies/', dataObj)
                .then((response) => {
                    // console.log("Company added:", response.data);
                    setCompanyName('');
                    setCompanyDescription('');
                    setCompanyFoundedDate('');
                    setCompanyHeadquaters('');
                    fetchCompanyData();
                    Swal.fire({
                        title: "Added",
                        text: "Your file has been Added.",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                    }
                    )

                })
                .catch((error) => {
                    console.error("Error adding company:", error);
                });
        }
    }
    const updateCompany = (companyId) => {
        axios.get(`http://127.0.0.1:8000/api/companies/${companyId}/`)
            .then((response) => {
                const companyData = response.data;
                setCompanyName(companyData.name);
                setCompanyDescription(companyData.description);
                setCompanyFoundedDate(companyData.founded_date);
                setCompanyHeadquaters(companyData.headquarters_location);
                setSelectedCompanyId(companyId);
            })
            .catch((error) => {
                console.error("Error fetching company data for update:", error);
            });
    }
    const DeleteCompany = (companyId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/companies/${companyId}`)
                    .then((response) => {
                        fetchCompanyData();
                        Swal.fire({
                            title: "done",
                            text: "deleted!",
                            icon: "success",
                            timer: 1000,
                            showConfirmButton: false,
                        })
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });


            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: "Your imaginary file is safe :)",
                    icon: 'error',
                    timer: 1000,
                    showConfirmButton: false,
                }
                )
            }
        })
    }
    const fetchCompanyData = () => {
        axios.get('http://127.0.0.1:8000/api/companies/')
            .then((response) => {
                // console.log(response);
                setApiData(response.data);
            })
            .catch((error) => {
                // console.error(error);
            });
    };

    useEffect(() => {
        fetchCompanyData();

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const performSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value === "") {
            fetchCompanyData();
            setShowSrchRst(false);
            setEmpty(false)
        } else {
            const filteredData = apiData.filter((company) =>
                company.name.toLowerCase().includes(value.toLowerCase()) ||
                company.description.toLowerCase().includes(value.toLowerCase()) ||
                company.headquarters_location.toLowerCase().includes(value.toLowerCase()) ||
                company.founded_date.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredData(filteredData);
            setCurrentPage(1);
            setShowSrchRst(filteredData.length > 0);
            setEmpty(filteredData !== apiData)
        }
    }
    const handleShow = () => {
        if (show === 1) {
            document.getElementsByClassName("main_day4")[0].setAttribute("class", "main_day4 active");
            setShow(0);
        } else {
            document.getElementsByClassName("main_day4")[0].setAttribute("class", "main_day4");
            setShow(1);
        }
    }


    const pageNumbers = Math.ceil(apiData.length / selectedRows);

    const renderPageNumbers = [];
    for (let number = 1; number <= pageNumbers; number++) {
        const pageClass = (number === currentPage) ? "page-item" : "page-item";
        renderPageNumbers.push(
            <li key={number} className={pageClass}>
                <button className="page-link" onClick={() => setCurrentPage(number)}>
                    {number}
                </button>
            </li>
        );
    }

    const indexOfLastItem = currentPage * selectedRows;
    const indexOfFirstItem = indexOfLastItem - selectedRows;
    const displayedItems = apiData.slice(indexOfFirstItem, indexOfLastItem);


    const spans = document.querySelectorAll('.word span');

    spans.forEach((span, idx) => {
        span.addEventListener('click', (e) => {
            e.target.classList.add('active');
        });
        span.addEventListener('animationend', (e) => {
            e.target.classList.remove('active');
        });

        setTimeout(() => {
            span.classList.add('active');
        }, 750 * (idx + 1))
    });


    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <nav className="navbar justify-content-between navbar-fixed" id='i1'>
                <a className="navbar-brand">
                    {/* <button type="button" data-toggle="modal" data-target="#exampleModal" className='button-30'>
                        AddCompany
                    </button>   */}
                    {/* <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div classNameName="modal-dialog" role="document">
                            <div classNameName="modal-content">

                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} className='containerr'>
                                        <center>
                                            <div>
                                                
                                            </div>
                                        </center>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Company Name</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter Name" />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} placeholder="Enter Description" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">FoundedDate</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={companyFoundedDate} onChange={(e) => setCompanyFoundedDate(e.target.value)} placeholder="Enter FoundedDate" />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">companyHeadquaters</label>
                                            <select value={companyHeadquaters} onChange={(e) => setCompanyHeadquaters(e.target.value)} className="form-control" id="exampleInputPassword1">
                                                <option value="" disabled>Select Expense Type</option>
                                                {expense_typeOptions.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <button onClick={postCompany} className="btn btn-primary">
                                                {selectedCompanyId ? "Update" : "AddCompany"}
                                            </button>

                                        </div>

                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>

                            </div>
                        </div>
                    </div> */}

                    <button type="button" className="button-30" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        AddCompany
                    </button>


                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} className='containerr'>
                                        <center>
                                            <div>

                                            </div>
                                        </center>
                                        <div className="mb-3">

                                            <label htmlFor="exampleInputEmail1" className="form-label " >Company Name</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter Name" />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} placeholder="Enter Description" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">FoundedDate</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={companyFoundedDate} onChange={(e) => setCompanyFoundedDate(e.target.value)} placeholder="Enter FoundedDate" />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">companyHeadquaters</label>
                                            <select value={companyHeadquaters} onChange={(e) => setCompanyHeadquaters(e.target.value)} className="form-control" id="exampleInputPassword1">
                                                <option value="" disabled>Select Expense Type</option>
                                                {expense_typeOptions.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </form>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={postCompany} className="btn btn-secondary" data-bs-dismiss="modal" >    {selectedCompanyId ? "Update" : "AddCompany"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <form className="form-inline">
                    {/* <div className='main_day4'>
                        {show ? (
                            <>
                                <SearchIcon onClick={handleShow} id='btn' style={{ color: "white", margin: "20px" }} />
                            </>

                        ) : (
                            <>
                                <div style={{ display: "flex" }}>
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={performSearch} id="inputt" />
                                    <button id='btn' onClick={handleShow}><i className='fas fa-search'></i></button>
                                    <SearchIcon onClick={handleShow} id='btn' style={{ color: "white" }} />
                                </div>

                            </>

                        )}

                    </div> */}
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={performSearch} id="inputt" />

                </form>
            </nav>
            <br />
            <h2 style={{ color: "gray" }} className='h2'>Company List</h2>
           <center>
            
            <select value={selectedRows} onChange={(e) => setSelectedRows(parseInt(e.target.value))} style={{color:"black",borderRadius:"5px"}}>
                <option value="" >Select Number of Rows</option>
                {number_of_rows.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            </center> 
            <br />
            <br />
            {
                showSrchRst
                    ? (<ul className="container">
                        <li className="table-header">
                            <div className="col col-1">Name</div>
                            <div className="col col-2">Description</div>
                            <div className="col col-3">FoundedDate</div>
                            <div className="col col-4">HeadQuaters</div>
                            <div className="col col-5">Action</div>

                        </li>
                        {filteredData.map((company, index) => (
                            <li className={`table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`} key={company.id}>
                                <div className="col col-1" data-label="Job Id">
                                    <Link to={`/company/${company.id}`} className='linkk'>{company.name}</Link>
                                </div>
                                <div className="col col-2" data-label="Customer Name">{company.description}</div>
                                <div className="col col-3" data-label="Amount">{company.founded_date}</div>
                                <div className="col col-4" data-label="Payment Status">{company.headquarters_location}</div>
                                <div className="col col-5" data-label="Payment Status" style={{ display: "flex" }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        {/* <EditIcon onClick={() => updateCompany(company.id)} data-bs-dismiss="modal" data-bs-target="#exampleModal" style={{ color: "green", marginTop: "5px", cursor: "pointer" }} /> */}
                                        <IconButton aria-label="edit" size="large" onClick={() => updateCompany(company.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                            <EditIcon style={{ color: "green", marginTop: "5px", cursor: "pointer" }} />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={() => DeleteCompany(company.id)}>
                                            <DeleteIcon style={{ color: "red" }} />
                                        </IconButton>

                                    </Stack>
                                </div>

                            </li>

                        ))}


                        {pageNumbers > 1 && (
                            <Stack spacing={2}>
                                <Pagination
                                    count={pageNumbers}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    renderItem={(item) => (
                                        <PaginationItem
                                            component={Link}
                                            to={`/page/${item.page}`}
                                            {...item}
                                        />
                                    )}
                                />
                            </Stack>
                        )}
                    </ul>

                    ) : empty ? (
                        <>
                            <div className='container'>
                                <li className="table-header">
                                    <div className="col col-1">Name</div>
                                    <div className="col col-2">Description</div>
                                    <div className="col col-3">FoundedDate</div>
                                    <div className="col col-4">HeadQuaters</div>
                                    <div className="col col-5">Action</div>

                                </li>
                                <center>
                                    <h1 style={{ color: "gray" }}>No results found</h1></center>
                            </div>
                        </>
                    ) :
                        <ul className="container">
                            <li className="table-header">
                                <div className="col col-1">Name</div>
                                <div className="col col-2">Description</div>
                                <div className="col col-3">FoundedDate</div>
                                <div className="col col-4">HeadQuaters</div>
                                <div className="col col-5">Action</div>

                            </li>
                            {displayedItems.map((company, index) => (
                                <li className={`table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`} key={company.id}>
                                    <div className="col col-1" data-label="Job Id">
                                        <Link to={`/company/${company.id}`} className='linkk'>{company.name}</Link>
                                    </div>
                                    <div className="col col-2" data-label="Customer Name">{company.description}</div>
                                    <div className="col col-3" data-label="Amount">{company.founded_date}</div>
                                    <div className="col col-4" data-label="Payment Status">{company.headquarters_location}</div>
                                    <div className="col col-5" data-label="Payment Status" style={{ display: "flex" }}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            {/* <EditIcon onClick={() => updateCompany(company.id)} data-bs-dismiss="modal" data-bs-target="#exampleModal" style={{ color: "green", marginTop: "5px", cursor: "pointer" }} /> */}
                                            <IconButton aria-label="edit" size="large" onClick={() => updateCompany(company.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                                <EditIcon style={{ color: "green", marginTop: "5px", cursor: "pointer" }} />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" onClick={() => DeleteCompany(company.id)}>
                                                <DeleteIcon style={{ color: "red" }} />
                                            </IconButton>

                                        </Stack>
                                    </div>
                                </li>
                            ))}



                            {pageNumbers > 1 && (
                                <Stack spacing={2}>
                                    <Pagination
                                        count={pageNumbers}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                component={Link}
                                                to={`/page/${item.page}`}
                                                {...item}
                                            />
                                        )}
                                    />
                                </Stack>
                            )}


                        </ul>



            }




        </div>
    )
}

export default Navbar





