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
    const [itemsPerPage, setItemsPerPage] = useState(5);



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
                    Swal.fire(
                        'Updated',
                        'Your file has been Updated.',
                        'success'
                    )
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
                    Swal.fire(
                        'Added',
                        'Your file has been Added.',
                        'success'
                    )

                })
                .catch((error) => {
                    // console.error("Error adding company:", error);
                });
        }
    }
    const updateCompany = (companyId) => {
        // console.log("Update button clicked");
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
                // console.error("Error fetching company data for update:", error);
            });
    }
    const DeleteCompany = (companyId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
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
                        // console.log("Company deleted:", companyId);
                        fetchCompanyData();
                        swalWithBootstrapButtons.fire(
                            'successfull',
                            'Your file has been deleted :)',
                            'success'
                        )
                    })
                    .catch((error) => {
                        // console.error("Error:", error);
                    });


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
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
        if (value === "" ) {
            fetchCompanyData();
        }
        else {
            const filteredData = apiData.filter((company) =>
                company.name.toLowerCase().includes(value.toLowerCase()) ||
                company.description.toLowerCase().includes(value.toLowerCase()) ||
                company.headquarters_location.toLowerCase().includes(value.toLowerCase()) ||
                company.founded_date.toLowerCase().includes(value.toLowerCase())
            );
            setApiData(filteredData);
            setCurrentPage(1);
            if (setApiData !== filteredData) {
                <h1>Data is recoreded</h1>

            }
        }
    }


    const pageNumbers = Math.ceil(apiData.length / itemsPerPage);

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
    const HomeIcon = createSvgIcon(
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
        'Home',
    );

    const PlusIcon = createSvgIcon(
        // credit: plus icon from https://heroicons.com/
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>,
        'Plus',
    );
    return (
        <div>
            <nav className="navbar justify-content-between navbar-fixed" id='i1'>
                <a className="navbar-brand">
                    <button type="button" data-toggle="modal" data-target="#exampleModal" className='button-30'>
                        AddCompany
                    </button>


                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">

                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} className='containerr'>
                                        <center>
                                            <div>
                                                <button onClick={postCompany} className="btn btn-primary">
                                                    {selectedCompanyId ? "Update" : "Add Company"}
                                                </button>
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
                                            {/* {selectedCompanyId ?    <button type="button" className="btn btn-primary" data-dismiss="modal">Update</button> :    <button type="button" className="btn btn-primary" data-dismiss="modal">AddCompany</button>
} */}

                                        </div>
                                        {/* <button type="button" className="btn btn-primary" data-dismiss="modal">Update</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">AddCompany</button> */}

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={performSearch} />

                    {/* <button className="btn  my-2 my-sm-0" type="button" onClick={() => performSearch(searchQuery)}>
                        Search
                    </button> */}
                </form>
            </nav>
            {/* <div className="word">
                <span>C</span>
                <span>O</span>
                <span>M</span>
                <span>P</span>
                <span>A</span>
                <span>N</span>
                <span> Y</span>
            </div> */}
            <h2 style={{ color: "gray" }} className='h2'>Company List</h2>
            <br />
            <br />
            {/* <table className='container'>
            </table> */}
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
                            {/* <button onClick={() => updateCompany(company.id)} data-toggle="modal" data-target="#exampleModal">Update</button>  <button onClick={() => DeleteCompany(company.id)}>Delete</button> */}
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <IconButton aria-label="delete" size="large" onClick={() => DeleteCompany(company.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <EditIcon onClick={() => updateCompany(company.id)} data-toggle="modal" data-target="#exampleModal" style={{ color: "gray", marginTop: "5px" }} />
                            </Stack>
                        </div>
                    </li>
                ))}
                <center> <Stack spacing={2}>
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
                </center>
            </ul>



        </div>
    )
}

export default Navbar





