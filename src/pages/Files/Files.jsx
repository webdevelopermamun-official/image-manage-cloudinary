import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import "./Files.scss"
import { useState } from "react"
import FilesCloud from "../FilesCloud/FilesCloud"
import axios from "axios"
import {ScaleLoader } from "react-spinners"
import Swal from "sweetalert2"

const Files = () => {

  // show preview images array
  const [imagesPreview, setImagesPreview] = useState([]);

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

  // send data local api
  const handleImagesSubmit = async() => {
    if (!imagesPreview.length){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must need to add picture"
      });
    }else{

      let formData = new FormData();

      setLoder(true)

      imagesPreview.forEach((item) => {
        formData.append("api-images", item);
      });
      await axios.post("http://localhost:5050/api/images/upload", formData).then((res) => {
        console.log(res.data.status);
        setImagesPreview([]);
        setLoder(false)
      });
    }
  };


  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          {/* <Col md={6}>
            <h2>Image Preview System For Local API</h2>
            <hr />
            <Card>
              <Card.Header className="py-4 d-flex">
                <Form.Control multiple type="file" onChange={handleImageUpload} />
                {
                  loder ?
                  <ScaleLoader color="#36d7b7" /> :
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
          </Col> */}
          <Col md={6}>
            <FilesCloud />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Files