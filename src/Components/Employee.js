import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import '../CSS/Navbar.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import SearchIcon from '@mui/icons-material/Search';

const Employee = () => {
    const { id } = useParams();
    const [EmployeeName, setEmployeeName] = useState('');
    const [EmployeeLastname, setEmployeeLastname] = useState('');
    const [EmployeeEmail, setEmployeeEmail] = useState('');
    const [EmployeePhone, setEmployeePhone] = useState('');
    const [EmployeeHiredate, setEmployeeHiredate] = useState('');
    const [apiData, setApiData] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [getUsers, setGetUsers] = useState(false);
    const [show, setShow] = useState(1);



    const postEmployee = () => {
        let dataObj = {
            first_name: EmployeeName,
            last_name: EmployeeLastname,
            email: EmployeeEmail,
            phone: EmployeePhone,
            hire_date: EmployeeHiredate,
            company: id

        };
        if (selectedEmployeeId) {
            axios.put(`http://127.0.0.1:8000/api/employees/${selectedEmployeeId}/`, dataObj)
                .then((response) => {
                    console.log("Employee updated:", selectedEmployeeId);
                    setEmployeeName('');
                    setEmployeeLastname('');
                    setEmployeeEmail('');
                    setEmployeePhone('');
                    setEmployeeHiredate('');
                    setSelectedEmployeeId(null);
                    fetchEmployeeData();
                    Swal.fire({
                        title: "Updated",
                        text: "Your file has been Updated.",
                        icon: "success",
                        timer:1000,
                        showConfirmButton: false,

                    })
                })
                .catch((error) => {
                    console.error("Error updating Employee:", error);
                });
        } else {

            axios.post('http://127.0.0.1:8000/api/employees/', dataObj)
                .then((response) => {
                    console.log("Employee added:", response.data);
                    setEmployeeName('');
                    setEmployeeLastname('');
                    setEmployeeEmail('');
                    setEmployeePhone('');
                    setEmployeeHiredate('');
                    fetchEmployeeData();
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
                    console.error("Error adding Employee:", error);
                });
        }
    }
    const updateEmployee = (EmployeeId) => {
        console.log("Update button clicked");
        axios.get(`http://127.0.0.1:8000/api/employees/${EmployeeId}/`)
            .then((response) => {
                const EmployeeData = response.data;
                setEmployeeName(EmployeeData.first_name);
                setEmployeeLastname(EmployeeData.last_name);
                setEmployeeEmail(EmployeeData.email);
                setEmployeePhone(EmployeeData.phone);
                setEmployeeHiredate(EmployeeData.hire_date);
                setSelectedEmployeeId(EmployeeId);

            })
            .catch((error) => {
                console.error("Error fetching Employee data for update:", error);
            });
    }




    // const performSearch = (e) => {
    //     const value = e.target.value;
    //     setSearchQuery(value);
    //     const filteredData = apiData.filter((company) =>
    //         company.first_name.toLowerCase().includes(value.toLowerCase()) ||
    //         company.last_name.toLowerCase().includes(value.toLowerCase()) ||
    //         company.email.toLowerCase().includes(value.toLowerCase()) ||
    //         company.phone.toLowerCase().includes(value.toLowerCase()) ||
    //         company.Hiredate.toLowerCase().includes(value.toLowerCase())
    //     );
    //     setApiData(filteredData);
    //     setCurrentPage(1);
    // }
    const performSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value === "") {
            fetchEmployeeData();
        } else {
            const filteredData = apiData.filter((employee) =>
                employee.first_name.toLowerCase().includes(value.toLowerCase()) ||
                employee.last_name.toLowerCase().includes(value.toLowerCase()) ||
                employee.email.toLowerCase().includes(value.toLowerCase()) ||
                employee.phone.toLowerCase().includes(value.toLowerCase()) ||
                employee.hire_date.toLowerCase().includes(value.toLowerCase())

            );
            setApiData(filteredData);
            setCurrentPage(1);
        }

    }





    const DeleteEmployee = (EmployeeId) => {



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
                axios.delete(`http://127.0.0.1:8000/api/employees/${EmployeeId}`)
                    .then((response) => {
                        console.log("Employee deleted:", EmployeeId);
                        fetchEmployeeData();
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

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
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
    // const handleShow = () => {
    //     if (show === 1) {
    //         document.getElementsByClassName("main_day4")[0].setAttribute("class", "main_day4 active");
    //         setShow(0);
    //     } else {
    //         document.getElementsByClassName("main_day4")[0].setAttribute("class", "main_day4");
    //         setShow(1);
    //     }
    // }


    const fetchEmployeeData = () => {
        axios.get(`http://127.0.0.1:8000/api/companiesemp/${id}/`)
            .then((response) => {
                console.log(response);
                setApiData(response.data);
                setGetUsers(true);

            })
            .catch((error) => {
                console.error(error);
            });

    };

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

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


    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <nav className="navbar  justify-content-between" id='i1'>
                <a className="navbar-brand">
                    {/* <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} className='containerr'>
                                        <center>
                                            <h4 >{selectedEmployeeId ? 'Update Employee' : 'Add Employee'}</h4></center>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={EmployeeName} onChange={(e) => setEmployeeName(e.target.value)} placeholder="Enter Name" />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Lastname</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" value={EmployeeLastname} onChange={(e) => setEmployeeLastname(e.target.value)} placeholder="Enter  last name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={EmployeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)} placeholder="Enter Email" />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                                            <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={EmployeePhone} onChange={(e) => setEmployeePhone(e.target.value)} placeholder="Enter Phone" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Hiredate</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={EmployeeHiredate} onChange={(e) => setEmployeeHiredate(e.target.value)} placeholder="Enter Hiredate" />

                                        </div>
                                        <button onClick={() => postEmployee()} className="btn btn-primary" >
                                            {selectedEmployeeId ? "Update" : "Add Employee"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>  */}
                    <button type="button" className="button-30" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        AddEmployee
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} className='containerr'>
                                        <center>
                                            <h4 style={{ color: "gray" }}>{selectedEmployeeId ? 'Update Employee' : 'Add Employee'}</h4></center>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={EmployeeName} onChange={(e) => setEmployeeName(e.target.value)} placeholder="Enter Name" required />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Lastname</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" value={EmployeeLastname} onChange={(e) => setEmployeeLastname(e.target.value)} placeholder="Enter  last name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={EmployeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)} placeholder="Enter Email" />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                                            <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={EmployeePhone} onChange={(e) => setEmployeePhone(e.target.value)} placeholder="Enter Phone" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Hiredate</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={EmployeeHiredate} onChange={(e) => setEmployeeHiredate(e.target.value)} placeholder="Enter Hiredate" />

                                        </div>
                                        {/* <button onClick={() => postEmployee()} className="btn btn-primary" >
                                            {selectedEmployeeId ? "Update" : "Add Employee"}
                                        </button> */}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={() => postEmployee()} className="btn btn-secondary" data-bs-dismiss="modal" >    {selectedEmployeeId ? "Update" : "AddCompany"}</button>
                                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </a>
                <form className="form-inline">
                    {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={performSearch} /> */}
                    {/* <div className='main_day4'>
                        {show ? (
                            <>
                                <SearchIcon onClick={handleShow} id='btn' style={{ color: "white" ,margin:"20px"}} />
                            </>

                        ) : (
                            <>
                                <div style={{ display: "flex" }}>
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={performSearch} id="inputt" />
                                    <button id='btn' onClick={handleShow}><i className='fas fa-search'></i></button>
                                    <SearchIcon onClick={handleShow} id='btn' style={{ color: "white" ,margin: "20px"}} />
                                </div>

                            </>

                        )}

                    </div> */}
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={performSearch} id='inputt' />
                </form>
            </nav>
            {apiData.length === 0 ? (
                <center>
                    <br/>
                    <br/>
                    <h1 style={{ color: "gray" }} >There is no Employee</h1>
                </center>
            ) : (
                <>
                <br/>
                
                    <h2 style={{ color: "gray" }} className='h2'>Employee List</h2>
                    <br />
                    <br />
                    <ul className="container">
                        <li className="table-header">
                            <div className="col col-1">Name</div>
                            <div className="col col-2">Lastname</div>
                            <div className="col col-3">Email</div>
                            <div className="col col-4">Phone</div>
                            <div className="col col-5">Hiredate</div>
                            <div className="col col-6">Action</div>

                        </li>

                        {displayedItems.map((Employee) => (
                            <li className="table-row" key={Employee.id}>
                                <div className="col col-1" data-label="Job Id">
                                    {Employee.first_name}
                                </div>
                                <div className="col col-2" data-label="Customer Name">{Employee.last_name}</div>
                                <div className="col col-3" data-label="Amount">{Employee.email}</div>
                                <div className="col col-4" data-label="Payment Status">{Employee.phone}</div>
                                <div className="col col-5" data-label="Payment Status">{Employee.hire_date}</div>
                                <div className="col col-6" data-label="Payment Status">
                                    {/* <button onClick={() => updateEmployee(Employee.id)} data-toggle="modal" data-target="#exampleModal" >Update</button>  <button onClick={() => DeleteEmployee(Employee.id)}>Delete</button> */}
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <EditIcon onClick={() => updateEmployee(Employee.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: "green", cursor: "pointer" }} />
                                        <IconButton aria-label="delete" size="large" onClick={() => DeleteEmployee(Employee.id)}>
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
                </>

            )}


            {/* <center> <button onClick={() => setGetUsers(true)}>Back</button></center>   */}

            <center>


                <Link to="/"> <FontAwesomeIcon icon={faCircleArrowLeft} onClick={() => setGetUsers(true)} style={{ fontSize: "40px", color: "#6b7676" }} /></Link>
            </center>






        </div>
    )
}

export default Employee







