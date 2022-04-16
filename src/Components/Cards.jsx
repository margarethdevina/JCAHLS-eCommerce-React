import React, { useState } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";

const Cards = (props) => {

    const printProducts = (idx,textClass,imgClass) => {
        return props.dbProducts.map((value, index) => {
            if (index == idx) {
                return <div key={value.id}>
                    <hr />
                    <Card className="border-0">
                        <div className="row">
                            {/* "col-12 col-md-8 order-sm-2" */}
                            <CardBody className={textClass}>
                                <h5 className="card-title">{value.nama}</h5>
                                <p className="card-text">{value.deskripsi}</p>

                            </CardBody>
                            {/* "col-12 col-md-4 order-sm-1" */}
                            <div className={imgClass}>
                                <img
                                    src={value.images[0]}
                                    width="500px"
                                    height="500px"
                                    className="img-fluid"
                                    alt="image" />
                            </div>
                        </div>
                    </Card>
                </div>
            }
        })
    }

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

                {printProducts(0,"col-12 col-md-8 order-sm-1","col-12 col-md-4 order-sm-2")}
                {printProducts(1,"col-12 col-md-8 order-sm-2","col-12 col-md-4 order-sm-1")}
                {printProducts(3,"col-12 col-md-8 order-sm-1","col-12 col-md-4 order-sm-2")}

            </div>

        </div >
    )
}

export default Cards;