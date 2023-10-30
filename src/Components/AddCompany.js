// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import '../CSS/Addcompany.css'
// const AddCompany = () => {
//     const [companyName, setCompanyName] = useState('');
//     const [companyDescription, setCompanyDescription] = useState('');
//     const [companyFoundedDate, setCompanyFoundedDate] = useState('');
//     const [companyHeadquaters, setCompanyHeadquaters] = useState('');
//     // const [getUsers, setGetUsers] = useState(false);
//     const [apiData, setApiData] = useState([]);
//     const [selectedCompanyId, setSelectedCompanyId] = useState(null);
//     const expense_typeOptions = ["Indore", "Ujjain", "Bhopal", "Pune"];

//     const postCompany = () => {
//         let dataObj = {
//             name: companyName,
//             description: companyDescription,
//             founded_date: companyFoundedDate,
//             headquarters_location: companyHeadquaters,
//         };
//         if (selectedCompanyId) {
//             axios.put(`http://127.0.0.1:8000/api/companies/${selectedCompanyId}/`, dataObj)
//                 .then((response) => {
//                     console.log("Company updated:", selectedCompanyId);
//                     setCompanyName('');
//                     setCompanyDescription('');
//                     setCompanyFoundedDate('');
//                     setCompanyHeadquaters('');
//                     setSelectedCompanyId(null);
//                     fetchCompanyData();
//                 })
//                 .catch((error) => {
//                     console.error("Error updating company:", error);
//                 });
//         } else {

//             axios.post('http://127.0.0.1:8000/api/companies/', dataObj)
//                 .then((response) => {
//                     console.log("Company added:", response.data);
//                     setCompanyName('');
//                     setCompanyDescription('');
//                     setCompanyFoundedDate('');
//                     setCompanyHeadquaters('');
//                     fetchCompanyData();
//                 })
//                 .catch((error) => {
//                     console.error("Error adding company:", error);
//                 });
//         }
//     }
//     const updateCompany = (companyId) => {
//         console.log("Update button clicked");
//         axios.get(`http://127.0.0.1:8000/api/companies/${companyId}/`)
//             .then((response) => {
//                 const companyData = response.data;
//                 setCompanyName(companyData.name);
//                 setCompanyDescription(companyData.description);
//                 setCompanyFoundedDate(companyData.founded_date);
//                 setCompanyHeadquaters(companyData.headquarters_location);
//                 setSelectedCompanyId(companyId);
//             })
//             .catch((error) => {
//                 console.error("Error fetching company data for update:", error);
//             });
//     }

//     // const selectCompanyForUpdate = (companyId) => {
//     //     const selectedCompany = apiData.find((company) => company.id === companyId);
//     //     if (selectedCompany) {
//     //         setCompanyName(selectedCompany.name);
//     //         setCompanyDescription(selectedCompany.description);
//     //         setCompanyFoundedDate(selectedCompany.founded_date);
//     //         setCompanyHeadquaters(selectedCompany.headquarters_location);
//     //         setSelectedCompanyId(companyId);
//     //     }
//     // }



//     const DeleteCompany = (companyId) => {
//         axios.delete(`http://127.0.0.1:8000/api/companies/${companyId}`)
//             .then((response) => {
//                 console.log("Company deleted:", companyId);
//                 fetchCompanyData();
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     }

//     const fetchCompanyData = () => {
//         axios.get('http://127.0.0.1:8000/api/companies/')
//             .then((response) => {
//                 console.log(response);
//                 setApiData(response.data);

//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     // const getUsersData = () => {
//     //     axios.get('http://127.0.0.1:8000/api/companies/')
//     //         .then((response) => {
//     //             console.log(response);
//     //             setApiData(response.data);
//     //             setGetUsers(true);
//     //         })
//     //         .catch((error) => {
//     //             console.error(error);
//     //         });
//     // };

//     useEffect(() => {
//         fetchCompanyData();

//     }, []);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // setSelectedCompanyId(null);
//     };



//     return (
//         <div>
//             <form onSubmit={handleSubmit} className='containerr'>
//                 <h4>{selectedCompanyId ? 'Update Company' : 'Add Company'}</h4>
//                 <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter Name" /><br />
//                 <input type="text" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} placeholder="Enter Description" /><br />
//                 <input type="date" value={companyFoundedDate} onChange={(e) => setCompanyFoundedDate(e.target.value)} placeholder="Enter FoundedDate" /><br />
//                 <select value={companyHeadquaters} onChange={(e) => setCompanyHeadquaters(e.target.value)} className='select'>
//                     <option value="" disabled>Select Expense Type</option>
//                     {expense_typeOptions.map((option) => (
//                         <option key={option} value={option}>{option}</option>
//                     ))}
//                 </select>
//                 <button onClick={postCompany}>
//                     {selectedCompanyId ? 'Update Company' : 'Add Company'}
//                 </button>

//                 <br />
//                 <br />
//             </form>
//             <h2>Company List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Description</th>
//                         <th>FoundedDate</th>
//                         <th>HeadQuaters</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {apiData.map((company) => (
//                         <tr key={company.id}>
//                             <td>{company.name}</td>
//                             <td>{company.description}</td>
//                             <td>{company.founded_date}</td>
//                             <td>{company.headquarters_location}</td>
//                             <button onClick={() => updateCompany(company.id)}>Update</button>
//                             <button onClick={() => DeleteCompany(company.id)}>Delete</button>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default AddCompany
