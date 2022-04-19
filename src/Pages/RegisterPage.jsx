import React from "react";
import { FormGroup, Input, Label, Button } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/actions/usersAction';
import { useNavigate } from 'react-router-dom';

const RegisterPage = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confPassword, setConfPassword] = React.useState("");

    const handleRegister = async () => {
        try {

            if (username == "" || email == "" || password == "" || confPassword == "") {
                alert("Fill in all form")
            } else {
                if (password != confPassword) {
                    alert("Password not match")
                } else if (email.includes("@")) {
                    let res = await Axios.post(`${API_URL}/users`, {
                        username, // properti ga di declare lagi karena isinya sama dengan vairabel statenya jadi cukup panggil aja si variabel statenya itu tanpa perlu buat 
                        email,
                        password,
                        role: "user",
                        cart: []
                    })

                    // properti id akan otomatis ada di json-server

                    // auto login ketika register berhasil
                    console.log("data yg teregister", res.data)
                    dispatch(loginAction(res.data))
                    navigate("/")

                } else {
                    alert("Email wrong")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-12 col-md-6 p-5">
                    <h4>Register Your Account</h4>
                    <div>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input type="text" onChange={(e) => setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirmation Password</Label>
                            <Input type="password" onChange={(e) => setConfPassword(e.target.value)} />
                        </FormGroup>
                    </div>
                    <Button className="w-100" type="button" onClick={handleRegister}>Regis now</Button>
                </div>
                {/* d-none = display saat mobile view none (berarti gambar hilang), d-md-block = display saat desktop view block */}
                <div className="col-12 d-none d-md-block col-md-6">
                    <img alt="portal" width="70%" src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZnVybml0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;