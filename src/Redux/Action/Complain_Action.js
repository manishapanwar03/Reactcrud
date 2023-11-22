

import axios from 'axios';
import Swal from 'sweetalert2';
export const get_api_data2 = "get_api_data2"
export const apiResponse = (data) => {
    return {
        type: get_api_data2,
        apiData: data
    }
}


export const get_api_data = (id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/empcomplains/${id}/`)
            .then((response) => {
                console.log(response);
                dispatch(apiResponse(response.data))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export const postRes = (data) => {
    return {
        type: "POSTRES",
        value: data
    }
}
export const complain_postapi = (dataObj1) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/complains/`, dataObj1)
            .then((response) => {
                dispatch(postRes(true))
                console.log(response);

            })
            .catch((error) => {
                console.error(error);
            });
    }

}


export const complain_deleteapi = (ComplainId, id) => {
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
                axios.delete(`${process.env.REACT_APP_BASE_URL}/api/complains/${ComplainId}`)
                    .then((response) => {
                        console.log("Complain deleted:", ComplainId);
                        // fetchComplainData();
                        dispatch(get_api_data(id))
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

