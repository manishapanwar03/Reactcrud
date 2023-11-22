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
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useDispatch, useSelector } from 'react-redux';
import { complain_deleteapi, getapi } from '../Redux/Action/Complain_Action';
import { get_api_data } from '../Redux/Action/Complain_Action';


const AddComplain = () => {
    const { id } = useParams();
    const [apiData, setApiData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [getUsers, setGetUsers] = useState(false);
    const [show, setShow] = useState(1);
    const dispatch = useDispatch();
    const empApidata = useSelector((state) => state.listReducer2.list)
    console.log(empApidata);





    const performSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value === "") {
            fetchComplainData();
        } else {
            const filteredData = apiData.filter((employee) =>
                employee.title.toLowerCase().includes(value.toLowerCase()) ||
                employee.discriptions.toLowerCase().includes(value.toLowerCase()) ||
                employee.email.toLowerCase().includes(value.toLowerCase()) ||
                employee.company.toLowerCase().includes(value.toLowerCase()) ||
                employee.employee.toLowerCase().includes(value.toLowerCase())

            );
            setApiData(filteredData);
            setCurrentPage(1);
        }

    }





    const DeleteComplain = (ComplainId) => {
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: 'Yes, delete it!',
        //     cancelButtonText: 'No, cancel!',
        //     reverseButtons: true
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         axios.delete(`http://127.0.0.1:8000/api/complains/${ComplainId}`)
        //             .then((response) => {
        //                 console.log("Complain deleted:", ComplainId);
        //                 fetchComplainData();
        //                 Swal.fire({
        //                     title: "done",
        //                     text: "deleted!",
        //                     icon: "success",
        //                     timer: 1000,
        //                     showConfirmButton: false,
        //                 })
        //             })
        //             .catch((error) => {
        //                 console.error("Error:", error);
        //             });

        //     } else if (
        //         result.dismiss === Swal.DismissReason.cancel
        //     ) {
        //         Swal.fire({
        //             title: 'Cancelled',
        //             text: "Your imaginary file is safe :)",
        //             icon: 'error',
        //             timer: 1000,
        //             showConfirmButton: false,
        //         }
        //         )
        //     }
        // })
        dispatch(complain_deleteapi(ComplainId,id));

       

    }
    useEffect(()=>{
        if(empApidata!==null){
            setApiData(empApidata)
        }
        // if (empOptData !== null) {
        //     fetchEmployeeData(empOptData);
        // }
       
    },[empApidata])
    
    const fetchComplainData = () => {
        // axios.get(`http://127.0.0.1:8000/api/empcomplains/${id}/`)
        //     .then((response) => {
        //         console.log(response);
        //         setApiData(response.data);
        //         setGetUsers(true);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        dispatch(get_api_data(id));
    };

    useEffect(() => {
        dispatch(get_api_data(id));
    }, []);

    // useEffect(() => {
    //     dispatch(getapi(id));
    // }, []); 

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
            {apiData.length === 0 ? (
                <center>
                    <br />
                    <br />
                    <h1 style={{ color: "gray" }} >There is no complain</h1>
                </center>
            ) : (
                <>
                    <br />

                    <h2 style={{ color: "gray" }} className='h2'>Complain List</h2>
                    <br />
                    <br />
                    <ul className="container">
                        <li className="table-header">
                            <div className="col col-1">Title</div>
                            <div className="col col-2">Description</div>
                            <div className="col col-3">Email</div>
                            <div className="col col-6">Action</div>

                        </li>

                        {displayedItems.map((complain) => (
                            <li className="table-row" key={complain.id}>
                                <div className="col col-1" data-label="Job Id">
                                    {complain.title}
                                </div>
                                <div className='col col-2' data-label="discriptions">
                                    <ReactReadMoreReadLess
                                        charLimit={20}
                                        readMoreText={"Read more ▼"}
                                        readLessText={"Read less ▲"}
                                    >
                                        {complain.discriptions}
                                    </ReactReadMoreReadLess>

                                </div>

                                <div className="col col-3" data-label="Amount">{complain.email}</div>
                                <div className="col col-6" data-label="Payment Status">
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <IconButton aria-label="delete" size="large" onClick={() => DeleteComplain(complain.id)}>
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
            <center>
                <Link to="/"> <FontAwesomeIcon icon={faCircleArrowLeft} onClick={() => setGetUsers(true)} style={{ fontSize: "40px", color: "#6b7676" }} /></Link>
            </center>






        </div>
    )
}

export default AddComplain







