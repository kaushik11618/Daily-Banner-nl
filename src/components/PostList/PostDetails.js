import { Checkbox, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const token = localStorage.getItem("token");
export const PostDetails = ({ postUserId, handleAddPost }) => {
  const [postData, setPostData] = useState([]);
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    const PostDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.29.12:3000/api/post/${postUserId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPostData(data);
      } catch (e) {}
    };
    PostDetails();
  }, [postUserId, token]);
  const handleImageDownload = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = `image.jpg`;
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => console.error(`Error fetching  image:`, error));
  };
  const handleVarified = async () => {
    const varifiedData = {
      post_id: postUserId,
      requestStatus: 6,
    };
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to reverse this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d55",
        confirmButtonText: "Verified",
      });
      
      if (result.isConfirmed) {
        // API call logic goes here
        const response = await fetch(
          "http://192.168.29.12:3000/api/admin/completed",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(varifiedData),
          }
        );
        
        if (response.status === 201) {
          // Handle success
          handleAddPost();
        } else {
          // Handle API call failure
          // You can display an error message or take appropriate action here
        }
      } else {
        // Handle user cancellation if needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Typography variant="h3">Post Details</Typography>
        <Typography variant="h5">Note: {postData.note}</Typography>
        <Typography variant="h5">
          Description: {postData.description}
        </Typography>
        <Typography variant="h5">
          Posting Date: {postData.posting_date}
        </Typography>
        <Typography variant="h5">
          Ending Date: {postData.ending_date}
        </Typography>

        <Typography variant="h5" className="ms-3">
          SocialMedia
          <Checkbox checked={parseInt(postData.social_media) === 1} />
        </Typography>
        <Typography variant="h5" className="ms-3">
          Email
          <Checkbox checked={parseInt(postData.email) === 1} />
        </Typography>
        <Typography variant="h5" className="ms-3">
          Address
          <Checkbox checked={parseInt(postData.address) === 1} />
        </Typography>
        <Typography variant="h5" className="ms-3">
          PhoneNumber
          <Checkbox checked={parseInt(postData.phoneNumber) === 1} />
        </Typography>
        <Typography variant="h4">Post Platforms</Typography>
        {postData.post_platform && postData.post_platform.length > 0 ? (
          <ul>
            {postData.post_platform.map((platform, index) => (
              <li key={index}>
                <Typography variant="h5">{platform}</Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="h5">No post platforms selected</Typography>
        )}
        <Typography variant="h4">Category and Subcategory</Typography>
        {postData.category && (
          <>
            <Typography variant="h5">
              Category Name: {postData.category.name}
            </Typography>
          </>
        )}
        {postData.sub_category && (
          <>
            <Typography variant="h5">
              Subcategory Name: {postData.sub_category.name}
            </Typography>
          </>
        )}
        {postData.company && (
          <>
            <Typography variant="h4">Company Details</Typography>
            <Typography variant="h5">
              Company Name: {postData.company.name}
            </Typography>
            <Typography variant="h5">
              Company Email: {postData.company.email}
            </Typography>
            <Typography variant="h5">
              Company Phone Number: {postData.company.phoneNumber}
            </Typography>
            <Typography variant="h5">
              Company Address: {postData.company.address}
            </Typography>
            <Typography variant="h5">
              Company City: {postData.company.city}
            </Typography>
            <Typography variant="h5">
              Company State: {postData.company.state}
            </Typography>
            <Typography variant="h5">
              Company PinCode: {postData.company.pinCode}
            </Typography>
            {postData.company.instagram ||
            postData.company.facebook ||
            postData.company.twitter ||
            postData.company.linkedin ? (
              <>
                <Typography variant="h4">Social Media Links</Typography>
                {postData.company.instagram && (
                  <Typography variant="h5">
                    Instagram: {postData.company.instagram}
                  </Typography>
                )}
                {postData.company.facebook !== null ? (
                  <Typography variant="h5">
                    Facebook: {postData.company.facebook}
                  </Typography>
                ) : (
                  <></>
                )}
                {postData.company.twitter !== null ? (
                  <></>
                ) : (
                  <Typography variant="h5">
                    Twitter:
                    {postData.company.twitter}
                  </Typography>
                )}
                {postData.company.linkedin && (
                  <Typography variant="h5">
                    LinkedIn: {postData.company.linkedin}
                  </Typography>
                )}
              </>
            ) : null}
          </>
        )}
        {postData.post_status && postData.post_status.id === parseInt("5") ? (
          <button onClick={handleVarified}>varified</button>
        ) : (
          <></>
        )}
        {console.log(postData.post_status)}
        {postData.uploaded_image &&
          postData.uploaded_image.map((image) => (
            <div key={image.id} className="mt-5 d-flex flex-column">
              <Typography variant="h4">Download {image.type} image</Typography>
              <img src={image.image} alt="image "></img>
              <button onClick={() => handleImageDownload(image.image)}>
                Download {image.type} Image
              </button>
            </div>
          ))}
      </div>
    </>
  );
};
