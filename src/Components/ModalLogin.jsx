import React from 'react';
import { Modal, ModalBody, Button, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/actions/usersAction';

const ModalLogin = (props) => {

    const dispatch = useDispatch();

    // const [openLogin, setOpenLogin] = React.useState(false)

    const [inForm, setInForm] = React.useState({
        email: "",
        password: ""
    })

    const handleInput = (value, property) => { //ada argumen property karena state inForm ada 2 properti (email dan password)
        setInForm({ ...inForm, [property]: value })
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get(`${API_URL}/users`)
            .then((response) => {
                // console.log("data awal reducers",response.data)
                dispatch(loginAction(response.data))
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleLogin = async () => {
        // alert(`${inForm.email} ${inForm.password}`)

        try {
            let filterQuery = "?";
            if (inForm.email && inForm.password) {
                filterQuery += `email=${inForm.email}&password=${inForm.password}`;
                let response = await Axios.get(`${API_URL}/users${filterQuery}`)
                dispatch(loginAction(response.data))
                console.log(response.data)

                if (response.data.length == 0) {
                    alert("Informasi yang dimasukkan tidak tepat, mohon cek kembali")
                } else {
                    props.handleCallbackOpenLogin(false)
                }

            } else {
                alert("Isi form dengan lengkap")
            }

        } catch (error) {
            console.log(error)
        }
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