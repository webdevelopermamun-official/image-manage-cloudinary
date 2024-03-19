import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import "./FilesCloud.scss"
import { useContext, useState } from "react"
import { RiseLoader } from "react-spinners"
import Swal from "sweetalert2"
import axios from "axios"
import GetImagesContext from "../../context/GetImagesContext"
const FilesCloud = () => {

  // show preview images array
  const [imagesPreview, setImagesPreview] = useState([]);

  // get api images user
  const {getDataApi} = useContext(GetImagesContext);

  // show loder
  const [loder, setLoder] = useState(null)
  //images file changes handler
  const handleImageUpload = (e) => {
    setImagesPreview((prevState) => [...prevState, ...Array.from(e.target.files)]);
  };

  // prev images deleted
  const handlePrevImagesRemove = (files) => {
    setImagesPreview(imagesPreview.filter(data => data !== files))
  }


  
  // send data cloud api
  const handleImagesSubmit = async() => {
    if (!imagesPreview.length){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must need to add picture"
      });
    }else{

      let formData = new FormData();
      setLoder(true);
      let i = 1;

      imagesPreview.forEach((item) => {
        formData.append("file", item);
        formData.append("cloud_name", "djavwc4ai");
        formData.append("upload_preset", "react_images_upload_test");

        axios.post("https://api.cloudinary.com/v1_1/djavwc4ai/image/upload", formData).then((res) => {
          axios.post("http://localhost:7000/apiImages", {imagesUrl: res.data.secure_url, imagesId: res.data.public_id})
          if(i === imagesPreview.length){
            setImagesPreview([]); 
            setLoder(false);
            getDataApi();
          }
          i++
        });
      });
    }
  };


  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col>
            <h2>Image Preview For Cloud API</h2>
            <hr />
            <Card>
              <Card.Header className="py-4 d-flex">
                <Form.Control multiple type="file" onChange={handleImageUpload} />
                {
                  loder ?
                  <RiseLoader color="#333" /> :
                  <Button onClick={handleImagesSubmit}>Upload</Button>
                }
              </Card.Header>
              {
                imagesPreview.length > 0 &&
                <Card.Body>
                  <Row>
                    {
                      imagesPreview?.reverse().map((item, index) => {
                        let previewLink  = URL.createObjectURL(item);

                        return (
                          <Col className="p-1" md={4} key={index}>
                            <div className="prevImages">
                              <img src={previewLink} alt={item.name} />
                              <button onClick={() => handlePrevImagesRemove(item)} title="Deleted This Item" className="btn-close"></button>
                            </div>
                          </Col>
                        ) 
                      })
                    }
                  </Row>
                </Card.Body>
              }
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FilesCloud