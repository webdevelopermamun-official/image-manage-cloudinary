import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import GetImagesContext from "../../context/GetImagesContext";
import "./AllImages.scss"
import axios from "axios";


const AllImages = () => {
    const {userImage, getDataApi} = useContext(GetImagesContext);

    // images deleted
    const handleApiImagesDelete = (imagesId) => {
        axios.delete(`http://localhost:7000/apiImages/${imagesId}`);
        getDataApi();
        console.log(getDataApi());
    }

    return (
        <>
          <Container className="pb-5">
            <Row className="justify-content-center">
              <Col>
                
                <hr />
                <Card>
                  <Card.Header className="py-4 d-flex">
                    <h2>Get all Images</h2>
                  </Card.Header>
                  {
                    userImage.length > 0 &&

                    <Card.Body>
                        <Row>
                            {
                                userImage?.reverse().map((item, index) => {
                                return (
                                    <Col className="p-2" md={4} key={index}>
                                    <div className="viewImages">
                                        <img src={item.imagesUrl} alt="" />
                                        <button onClick={() => handleApiImagesDelete(item.id)} title="Deleted This Item" className="btn-close"></button>
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

export default AllImages