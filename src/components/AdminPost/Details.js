import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {Avatar, Button, Checkbox} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function Details({ postId, handleStatus }) {
  const [show, setShow] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadedImageIds, setUploadedImageIds] = useState([]);

  const token = localStorage.getItem("token");

  const handleFileChange = (event, platform) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [platform]: event.target.files[0],
    }));
  };

  const handleUpload = (platform) => {
    const selectedFile = selectedFiles[platform];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("type", platform);
      formData.append("post_id", postId);

      fetch(`http://192.168.29.12:3000/api/admin/upload-image`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            toast.success(`Image uploaded successfully for ${platform}.`);
            console.log(`Image uploaded successfully for ${platform}.`);
            setUploadedImageIds((prevUploadedIds) => [
              ...prevUploadedIds,
              platform,
            ]);
            setSelectedFiles((prevSelectedFiles) => ({
              ...prevSelectedFiles,
              [platform]: undefined,
            }));
          } else {
            toast.error("Error uploading image");
            console.error(`Error uploading image for ${platform}.`);
          }
        })
        .catch((error) => {
          console.error(`Error uploading image for ${platform}.`);
        });
    } else {
      console.error(`No file selected for ${platform}.`);
    }
  };

  useEffect(() => {
    const showDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.29.12:3000/api/post/${postId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        setShow(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    showDetails();
  }, []);

  const handleClick = async () => {
    const statusCheck = {
      post_id: parseInt(postId),
      requestStatus: parseInt(5),
    };

    try {
      console.log("heregfhghgh");
      const response = await fetch(
        "http://192.168.29.12:3000/api/admin/completed",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(statusCheck),
        }
      );
      const data = await response.json();
      toast.success(data.message);
      //handleStatus()
    } catch (error) {
      toast.error(error);
    }
  };
  const allImagesUploaded = show.post_platform?.every((platform) =>
    uploadedImageIds.includes(platform)
  );

  return (
    <Box sx={{ flexGrow: 1 }} className="bg-dark mt-5">
      <Grid container spacing={2} sx={{ justifyContent: "end" }}>
        <Grid container xs={11} md={7} lg={10} spacing={4}>
          <Grid xs={10} sm={10} lg={5}>
            <Item>
              <Box
                id="category-a"
                sx={{ fontSize: "20px", textTransform: "uppercase" }}
              >
                User List :
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-a"
                sx={{
                  pl: 1,
                  mt: 3,
                  mr: 5,
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
              >
                {show.user && (
                  <>
                    <Typography variant="h5">
                      Full Name :{" "}
                      {show.user.first_name + " " + show.user.last_name}
                    </Typography>
                    <Typography variant="h5">
                      {" "}
                      Email : {show.user.email}
                    </Typography>
                    <Typography variant="h5">
                      Phone Number: {show.user.phoneNumber}
                    </Typography>
                    <Typography variant="h5">
                      Address: {show.user.address}
                    </Typography>
                    <Typography variant="h5">Note: {show.note}</Typography>
                    <Typography variant="h5">
                      Description: {show.description}
                    </Typography>
                  </>
                )}
              </Box>
            </Item>
          </Grid>
          <Grid xs={10} sm={10} lg={5}>
            <Item>
              <Box
                id="category-b"
                sx={{ fontSize: "20px", textTransform: "uppercase" }}
              >
                Require or not
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-b"
                sx={{ pl: 2, mt: 2 }}
              >
                <Typography variant="h5">
                  {" "}
                  Social Media :
                  <Checkbox checked={parseInt(show.social_media) === 1} />
                </Typography>
                <Typography variant="h5">
                  {" "}
                  Address :
                  <Checkbox checked={parseInt(show.address) === 1} />
                </Typography>
                <Typography variant="h5">
                  {" "}
                  Email :
                  <Checkbox checked={parseInt(show.email) === 1} />
                </Typography>
                <Typography variant="h5">
                  {" "}
                  Phone Number :
                  <Checkbox checked={parseInt(show.phoneNumber) === 1} />
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid xs={10} sm={10} lg={5}>
            <Item>
              <Box
                id="category-c"
                sx={{ fontSize: "20px", textTransform: "uppercase" }}
              >
                Category and Sub Category :
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-c"
                sx={{ pl: 2, mt: 3 }}
              >
                {show.category && (
                  <>
                    <Typography variant="h5">
                      Category: {show.category.name}
                    </Typography>
                  </>
                )}
                {show.sub_category && (
                  <>
                    <Typography variant="h5">
                      Sub category: {show.sub_category.name}
                    </Typography>
                  </>
                )}
              </Box>
            </Item>
          </Grid>
          <Grid xs={10} sm={10} lg={5}>
            <Item>
              <Box
                id="category-d"
                sx={{ fontSize: "20px", textTransform: "uppercase" }}
              >
                Post PlateForm :
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-d"
                sx={{ pl: 2, mt: 4 }}
              >
                <Typography variant="h5">
                  <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {show.post_platform &&
                      show.post_platform.map((platform) => (
                        <Avatar
                          label={platform}
                          variant="outlined"
                          key={platform}
                          sx={{ width: "35px", height: "35px" }}
                        >
                          {platform === "facebook" ? (
                            <Avatar>
                              <FacebookIcon />
                            </Avatar>
                          ) : platform === "twitter" ? (
                            <Avatar>
                              <TwitterIcon />
                            </Avatar>
                          ) : platform === "instagram" ? (
                            <Avatar>
                              <InstagramIcon />
                            </Avatar>
                          ) : platform === "linkedIn" ? (
                            <Avatar>
                              <LinkedInIcon />
                            </Avatar>
                          ) : platform === "whatsapp" ? (
                            <Avatar>
                              <WhatsAppIcon />
                            </Avatar>
                          ) : null}
                        </Avatar>
                      ))}
                  </Box>
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid xs={10} sm={10}>
            <Item>
              <Box sx={{ fontSize: "20px", textTransform: "uppercase" }}>
                Company :
              </Box>
              <Box
                component="ul"
                aria-labelledby="category-c"
                sx={{ pl: 2, mt: 2, flexDirection: "end" }}
              >
                {show.company && (
                  <>
                    <Typography variant="h5">
                      Company Name: {show.company.name}
                    </Typography>
                    <Typography variant="h5">
                      Company Email: {show.company.email}
                    </Typography>
                    <Typography variant="h5">
                      Company Number: {show.company.phoneNumber}
                    </Typography>
                    <Typography variant="h5">
                      Company Address: {show.company.address}
                    </Typography>
                    <Typography variant="h5">
                      City: {show.company.city}
                    </Typography>
                    <Typography variant="h5">
                      State: {show.company.state}
                    </Typography>
                  </>
                )}
              </Box>
            </Item>
          </Grid>
          <Grid container spacing={2}>
            {show.post_platform &&
              show.post_platform.map((platform) => (
                <Grid item xs={10} sm={10} lg={5.5} key={platform}>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      p: 2,
                      textAlign: "center",
                      background: "white",
                    }}
                  >
                    <Typography variant="h5"> {platform}</Typography>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleFileChange(event, platform)}
                    />
                    {selectedFiles[platform] && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpload(platform)}
                      >
                        Upload {platform} Image
                      </Button>
                    )}
                    {selectedFiles[platform] && (
                      <img
                        src={URL.createObjectURL(selectedFiles[platform])}
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      {show.post_status &&
      show.post_status.name === "Completed" ||
      !allImagesUploaded ? (
        <Typography>your Response have been submited</Typography>
      ) : (
        <Button variant="contained" onClick={handleClick}>
          Submit
        </Button>
      )}
    </Box>
  );
}
