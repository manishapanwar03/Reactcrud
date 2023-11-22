import axios from 'axios'
import Swal from 'sweetalert2';
export const get_api_data1 = "get_api_data1"
export const apiResponse = (data) => {
    return {
        type: get_api_data1,
        apiData: data
    }
}



export const getEmpApi = (id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/companiesemp/${id}/`)
            .then((res) => {
                console.log(res);
                dispatch(apiResponse(res.data))


            })
            .catch((error) => {
                console.error(error);
            });

    }
}

export const Emppost = (data) => {
    return {
        type: "POSTEMP",
        value: data
    }
}

export const postapi = (dataObj, id) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/employees/`, dataObj)
            .then((response) => {
                console.log("Employee added:", response.data);
                dispatch(getEmpApi(id))
                Swal.fire({
                    title: "Added",
                    text: "Your file has been Added.",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                }
                )
                dispatch(Emppost(true))
            })
            .catch((error) => {
                console.error("Error adding Employee:", error);
            });

    }
}


export const putapi = (selectedEmployeeId, dataObj, id) => {
    return (dispatch) => {
        // axios.put(`http://127.0.0.1:8000/api/companies/${selectedCompanyId}/`,dataObj)
        // .then((res) => {
        //     dispatch(getapi())
        //     Swal.fire({
        //         title: "Updated",
        //         text: "Your file has been Updated.",
        //         icon: "success",
        //         timer: 1000,
        //         showConfirmButton: false,
        //     }
        //     )
        // })

        axios.put(`${process.env.REACT_APP_BASE_URL}/api/employees/${selectedEmployeeId}/`, dataObj)
            .then((response) => {
                console.log("Employee updated:", selectedEmployeeId);
                dispatch(getEmpApi(id))
                Swal.fire({
                    title: "Updated",
                    text: "Your file has been Updated.",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,

                })
            })
            .catch((error) => {
                console.error("Error updating Employee:", error);
            });
    }
}


export const deleteapi = (EmployeeId,id) => {
    return (dispatch) => {
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
                axios.delete(`${process.env.REACT_APP_BASE_URL}/api/employees/${EmployeeId}/`)
                    .then((response) => {
                        console.log("Employee deleted:", EmployeeId);
                        // fetchEmployeeData();
                        dispatch(getEmpApi(id));
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
}
