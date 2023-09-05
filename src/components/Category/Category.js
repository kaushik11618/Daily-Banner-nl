import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {IoAddCircleSharp} from "react-icons/io5";
import {MdDeleteForever, MdEdit} from "react-icons/md";
import {CategoryPopup} from "../Modal/CategoryPopup.js";
import {SubCategoryList} from "../SubCategory/SubCategory.js";
import "./Category.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Toggle from "../Toggle";

export const Category = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [expandedCategory, setExpandedCategory] = useState(null);
    const token = localStorage.getItem("token");

    const toggleCategoryExpansion = (categoryId) => {
        if (expandedCategory === categoryId) {
            setExpandedCategory(null); // Collapse the clicked category if it's already expanded
        } else {
            setExpandedCategory(categoryId); // Expand the clicked category
        }
    };

    const deleteCategory = async (category_id) => {
        try {
            await fetch(`http://192.168.29.12:3000/api/category/${category_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category.id !== category_id)
            );
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const fetchCategories = () => {
        fetch("http://192.168.29.12:3000/api/category/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error fetching data:", error));
    };

    const editCategory = (category_id, category_name) => {
        setModalOpen(true);
        setSelectedCategory({id: category_id, name: category_name});
    };

    useEffect(() => {
        fetchCategories();
    }, [modalOpen]);

    return (
        <>
            <div className='category-container'>
                <h1 className="title">Category</h1>
                <div className="actions"></div>
                <CategoryPopup
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <div className="tableContainer">
                    <table className="table" aria-label="simple table">

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <h1 className="headerCell">Categories</h1>
                            <button
                                className="addButton"
                                onClick={() => setModalOpen(true)}
                            >
                                <IoAddCircleSharp className="addButtonIcon"/>
                                <p>Add Categories</p>
                            </button>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                flexDirection: "column",
                            }}
                        >
                            {categories.map((category) => (
                                <div style={{display: 'flex', padding: '5px'}}>
                                    <Accordion

                                        key={category.id}
                                        sx={{width: '100%', border: '1px solid black'}}
                                    >
                                        <AccordionSummary
                                            style={{display: "flex", justifyContent: "space-between"}}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon sx={{fontSize: '40px'}}/>}
                                                />
                                                <h4 className='fw-bold' style={{marginTop: '20px'}}
                                                    onClick={() => toggleCategoryExpansion(category.id)}>
                                                    {category.name}
                                                </h4>

                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails in={expandedCategory === category.id}>
                                            <SubCategoryList categoryId={category.id}
                                                             subcategory={category.subCategories}/>
                                        </AccordionDetails>
                                    </Accordion>
                                    <div style={{display: 'flex'}}>
                                        <Toggle
                                            categoryStatus={category.status}
                                            categoryId={category.id}
                                            ontoggle={fetchCategories}
                                        />
                                        <MdEdit
                                            onClick={() => {
                                                editCategory(category.id, category.name)
                                            }}
                                            size={25}
                                            className='mt-3'
                                        />

                                        <MdDeleteForever
                                            size={25}
                                            className='mt-3 ms-3'
                                            onClick={() => deleteCategory(category.id)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </table>
                </div>
            </div>
        </>
    );
};
