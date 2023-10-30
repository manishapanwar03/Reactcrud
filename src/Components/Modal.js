import React, { useState } from 'react'


const Modal = () => {
    const [companyHeadquaters, setCompanyHeadquaters] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyFoundedDate, setCompanyFoundedDate] = useState('');
    const expense_typeOptions = ["Indore", "Ujjain", "Bhopal", "Pune"];

    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                AddCompany
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Company Name</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter Name" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Description</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} placeholder="Enter Description" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">FoundedDate</label>
                                    <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={companyFoundedDate} onChange={(e) => setCompanyFoundedDate(e.target.value)} placeholder="Enter FoundedDate" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">companyHeadquaters</label>
                                    <select value={companyHeadquaters} onChange={(e) => setCompanyHeadquaters(e.target.value)} class="form-control" id="exampleInputPassword1">
                                        <option value="" disabled>Select Expense Type</option>
                                        {expense_typeOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal