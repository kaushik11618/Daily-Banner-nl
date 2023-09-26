import {Autocomplete, Container, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import "./Post.css";
import File from "../File";

export const AddPost = ({handleAddPost}) => {
    const [companyData, setCompanyData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [previousSubcategory, setPreviousSubcategory] = useState(null);
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [selectedDueDate, setSelectedDueDate] = useState("");
    const [selectedPostDate, setSelectedPostDate] = useState("");
    const [linkedIn, setLinkedIn] = useState()
    const [instagram, setInstagram] = useState()
    const [twitter, setTwitter] = useState()
    const [facebook, setFacebook] = useState()
    const [whatsapp, setWhatsapp] = useState()
    const [socialMedia, setSocialMedia] = useState(0)
    const [address, setAddress] = useState(0)
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState(0)

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(
                    "http://192.168.29.12:3000/api/category/all",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setCategoryData(data);
            } catch (error) {
            }
        };
        const fetchCompany = async () => {
            try {
                const response = await fetch("http://192.168.29.12:3000/api/company", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setCompanyData(data);
            } catch (error) {
            }
        };
        fetchCategory();
        fetchCompany();
    }, [token]);
    const handleCategoryChange = (_, newValue) => {
        setSelectedCategory(newValue);
        if (!newValue) {
            setSelectedSubcategory(null);
            setPreviousSubcategory(null);
        } else {
            if (selectedSubcategory !== previousSubcategory) {
                setPreviousSubcategory(selectedSubcategory);
            }
            setSelectedSubcategory(null);
        }
    };

    const handleAutocompleteChange = (event, newValue) => {
        // When a new option is selected, find the corresponding ID
        const selectedOption = companyData.find((option) => option.id === newValue.id);

        if (selectedOption) {
            setSelectedId(selectedOption.id);
        } else {
            setSelectedId(null); // No matching option, reset the selectedId
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const selectedCategoryObj = categoryData.find(
            (category) => category.name === selectedCategory
        );


        const selectedSubcategoryObj =
            selectedCategoryObj &&
            selectedCategoryObj.subCategories.find(
                (subcategory) => subcategory.name === selectedSubcategory
            );

        if (selectedCategoryObj && selectedSubcategoryObj) {
            const postData = {
                category_id: selectedCategoryObj.id,
                subCategory_id: selectedSubcategoryObj.id,
                company_id: selectedId,
                description: description,
                note: note,
                posting_date: selectedDueDate,
                ending_date: selectedPostDate,
                socialMedia: socialMedia,
                email: email,
                phoneNumber: phone,
                address: address,
            };

            try {
                const response = await fetch("http://192.168.29.12:3000/api/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(postData),
                });

                if (response.ok) {
                    console.log("Post request successful!");
                } else {
                    console.error("Post request failed.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error("Please select a category and subcategory.");
        }
    };

    const handleCheckboxChange = (event) => {
        const checkboxName = event.target.name;
        const checkboxValue = event.target.checked ? 1 : 0;

        switch (checkboxName) {
            case 'socialMedia':
                setSocialMedia(checkboxValue);
                break;
            case 'email':
                setEmail(checkboxValue)
                break;
            case 'phone':
                setPhone(checkboxValue)
                break;
            case 'address':
                setAddress(checkboxValue);
                break;
            default:
                break;
        }
    };


    return (
        <>
            <File/>
            <Container
                maxWidth="md"
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <form className="post-form" onSubmit={handleSubmit} style={{fontSize: '20px'}}>
                    <div className="dropdown mt-3 d-flex flex-column gap-4">
                        <Autocomplete
                            disablePortal
                            options={categoryData.map((category) => category.name)}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            renderInput={(params) => <TextField {...params} label="Category"/>}
                        />
                        <Autocomplete
                            disablePortal
                            options={
                                selectedCategory
                                    ? categoryData
                                    .find((category) => category.name === selectedCategory)
                                    .subCategories.map((subcategory) => subcategory.name) || []
                                    : []
                            }
                            value={selectedSubcategory}
                            onChange={(_, newValue) => setSelectedSubcategory(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Subcategory"/>
                            )}
                        />
                        <Autocomplete
                            disablePortal
                            options={companyData.map((op) => ({
                                label: op.name,
                                id: op.id,
                            }))}
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => <TextField {...params} label="Company"/>}
                        />
                        <div className="d-flex flex-column">
                            <p>Description</p>
                            <textarea onChange={(event) => setDescription(event.target.value)}></textarea>
                        </div>
                        <div className="d-flex flex-column">
                            <p>Note</p>
                            <textarea onChange={(event) => setNote(event.target.value)}></textarea>
                        </div>
                        <div>
                            <h3>Select Options as your requirements</h3>
                            <div className='d-flex flex-wrap'>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="socialmedia"
                                        value={socialMedia}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className='mt-1'>Social Media</label>
                                </h4>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="email"
                                        value={email}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className='mt-1'>Email</label>
                                </h4>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="phone"
                                        value={phone}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className='mt-1'>Phone No.</label>
                                </h4>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="address"
                                        value={address}
                                        id="addressCheckbox"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className='mt-1'>Address</label>
                                </h4>
                            </div>
                        </div>
                        <div>
                            <h2>Post In</h2>
                            <div className='d-flex flex-wrap'>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="facebook"
                                        value={whatsapp}
                                    />
                                    <label className='mt-1'>WhatsApp</label>
                                </h4>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="facebook"
                                        value={facebook}
                                    />
                                    <label className='mt-1'>Facebook</label>
                                </h4>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="instagram"
                                        value={instagram}
                                    />
                                    <label className='mt-1'>Instagram</label>
                                </h4>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="linkedIn"
                                        value={linkedIn}
                                    />
                                    <label className='mt-1'>LinkedIn</label>
                                </h4>
                                <h4 className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="twitter"
                                        value={twitter}
                                    />
                                    <label className='mt-1'>Twitter</label>
                                </h4>
                            </div>
                        </div>
                        <div>
                            <p>Due Date</p>
                            <input
                                type="date"
                                onChange={(event) => setSelectedDueDate(event.target.value)}
                            ></input>
                        </div>
                        <div>
                            <p>post Date</p>
                            <input
                                value={selectedPostDate}
                                type="date"
                                onChange={(event) => setSelectedPostDate(event.target.value)}
                            ></input>
                        </div>
                        <button>Submit</button>
                    </div>
                </form>
            </Container>
        </>
    );
};