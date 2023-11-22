import axios from 'axios'
import Swal from 'sweetalert2';

export const get_api_data = "get_api_data"

export const apiResponse=(data)=>{
    return {
       type:get_api_data,
       apiData:data
    }
}

export const getapi = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/companies/`)
        .then((res) => {
            dispatch(apiResponse(res.data))
        })

    }
}

export const Cmppost =(data)=>{
    return{
        type:"POSTCMP",
        value:data   }
}
export const postapi = (dataObj) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/companies/`,dataObj)
        .then((res) => {
            dispatch(getapi())
            
            Swal.fire({
                title: "Added",
                text: "Your file has been Added.",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
            }
            )
            dispatch(Cmppost(true))
        })

    }
}




export const putapi = (selectedCompanyId,dataObj) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/companies/${selectedCompanyId}/`,dataObj)
        .then((res) => {
            dispatch(getapi())
            Swal.fire({
                title: "Updated",
                text: "Your file has been Updated.",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
            }
            )
        })

    }
}

export const deleteapi = (companyId) => {
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
                axios.delete(`${process.env.REACT_APP_BASE_URL}/api/companies/${companyId}/`)
                    .then((response) => {
                        dispatch(getapi())
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
}