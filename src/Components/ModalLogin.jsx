import React from 'react';
import { Modal, ModalBody, Button, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';


const ModalLogin = (props) => {

    const [inForm, setInForm] = React.useState({
        email: "",
        password: ""
    })

    const handleInput = (value, property) => { //ada argumen property karena state inForm ada 2 properti (email dan password)
        setInForm({ ...inForm, [property]: value })
    }

    const handleLogin = () => {
        alert(`${inForm.email} ${inForm.password}`)
    }

    const [visibleForm, setVisibleForm] = React.useState({
        type: "password",
        text: "Show"
    })

    const handleVisible = () => {
        if (visibleForm.type === "password") {
            setVisibleForm({
                type: "text",
                text: "Hide"
            })
        } else {
            setVisibleForm({
                type: "password",
                text: "Show"
            })
        }
    }

    return (
        <Modal isOpen={props.modalOpen} toggle={props.toggleOpen}>
            <ModalBody>
                <h5 className="mb-4 mt-3 fw-bold">Login with your account</h5>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="text"
                        value={inForm.email}
                        onChange={(event) => handleInput(event.target.value, "email")} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputGroup>
                        {/* InputGroup untuk tambah fitur show dan hide password jadi ga cuma buat form input saja */}
                        <Input type={visibleForm.type}
                            value={inForm.password}
                            onChange={(event) => handleInput(event.target.value, "password")} />
                        <InputGroupText className="btn btn-secondary" onClick={handleVisible}>
                            {visibleForm.text}
                        </InputGroupText>
                    </InputGroup>
                    <div className="d-flex justify-content-end">
                        <a className="btn p-0 text-muted">Forgot Password?</a>
                    </div>
                </FormGroup>
                <Button type="button" className="w-100 mt-4 mb-3" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </ModalBody>
        </Modal>
    )
}

export default ModalLogin;