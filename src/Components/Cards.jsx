import React, { useState } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";

const Cards = (props) => {
    return (
        <div className="container px-5">

            <div className="row py-5 mx-2">

                <div className="col-12 col-md-4">
                    <Card className="border-0 text-center">
                        <div className="d-flex justify-content-center">
                            <CardImg
                                className="rounded-circle"
                                style={{ width: "180px", height: "180px" }}
                                alt="Card image cap"
                                src="https://img.adidas.com.hk/resources/2021/8/4/1628056883286615_2000X2000.JPG"
                                top
                            />
                        </div>
                        <CardBody>
                            <CardTitle tag="h3" >
                                Category 1
                            </CardTitle>
                            <CardText>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </CardText>
                            <div className="d-flex justify-content-center">
                                <Button>
                                    Detail
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12 col-md-4">
                    <Card className="border-0 text-center">
                        <div className="d-flex justify-content-center">
                            <CardImg
                                className="rounded-circle"
                                style={{ width: "180px", height: "180px" }}
                                alt="Card image cap"
                                src="https://img.adidas.com.hk/resources/2021/8/4/1628056883286615_2000X2000.JPG"
                                top
                            />
                        </div>
                        <CardBody>
                            <CardTitle tag="h3" >
                                Category 2
                            </CardTitle>
                            <CardText>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </CardText>
                            <div className="d-flex justify-content-center">
                                <Button>
                                    Detail
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12 col-md-4">
                    <Card className="border-0 text-center">
                        <div className="d-flex justify-content-center">
                            <CardImg
                                className="rounded-circle"
                                style={{ width: "180px", height: "180px" }}
                                alt="Card image cap"
                                src="https://img.adidas.com.hk/resources/2021/8/4/1628056883286615_2000X2000.JPG"
                                top
                            />
                        </div>
                        <CardBody>
                            <CardTitle tag="h3" >
                                Category 3
                            </CardTitle>
                            <CardText>
                                Some quick example text to build on the card title and make up the bulk of the card's content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto odit suscipit repellendus asperiores, sequi optio facere fugit totam placeat earum eligendi iste, porro excepturi a culpa. Debitis, molestias soluta? Facere?
                            </CardText>
                            <div className="d-flex justify-content-center">
                                <Button>
                                    Detail
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>

            </div>

        </div >
    )
}

export default Cards;