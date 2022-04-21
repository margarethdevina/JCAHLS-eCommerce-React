import React from 'react';
// functional component tidak wajib import React namun kalau functional component butuh sistem react hooks pada class component, maka perlu import React
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, ButtonGroup, NavbarText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalLogin from './ModalLogin19Apr';

// hooks fitur untuk membuat functional component sama dengan class component
// adanya hooks, functional component bisa menggunakan state
// react hooks ada banyak di library manapun

const NavbarComponent = (props) => {

    // saat ingin styling
    // attribut berisi tipe data string, bisa langsung diselimutin double quotes
    // misal id="navbar"
    // isi data bukan string, harus diselimutin kurawal
    // misal id={[]} id={12} style={{camelCase}}
    // class di react pakai className

    // di functional kita ga pakai properti2 seperti di class tapi deconstruct free variabel untuk set state awal
    // React.useState untuk mengeset state awal
    // openCollapse = properti di class component
    // setOpenCollapse memiliki fungsi yg sama dgn this.setState karena untuk memberikan nilai perubahan ke openCollapse
    const [openCollapse, setOpenCollapse] = React.useState(false)

    const [openLogin, setOpenLogin] = React.useState(false)

    const [emailLogin, setEmailLogin] = React.useState("")
    
    const [passwordLogin, setPasswordLogin] = React.useState("")

    const handleEmail = (event) => {
        // console.log(event.target.value)
        setEmailLogin(event.target.value)
    }

    const handlePassword = (event) => {
        // console.log(event.target.value)
        setPasswordLogin(event.target.value)
    }
    
    const handleLogin = () => {
        console.log("email:",emailLogin)
        console.log("password:",passwordLogin)
        setOpenLogin(!openLogin)
    }

    return (
        <div >
            {/* navbar responsive di breakpoint medium berarti semua isi navbar muncul, color light = background putih, light untuk membuat tulisan jd gelap krn background putih dan light bertipe data boolean (true/false) valuenya*/}
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                    <span className="fw-bold">
                        Commerce
                    </span>
                </NavbarBrand>
                <NavbarToggler onClick={() => setOpenCollapse(!openCollapse)} />
                <Collapse navbar isOpen={openCollapse}>
                    {/* atribut isOpen defaultnya false / tertutup */}
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            {/* atribut active untuk menandakan page dibuka */}
                            <span className="nav-link">
                                Products
                            </span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-link">
                                Promo
                            </span>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <ButtonGroup>
                            <Button color="primary" onClick={() => setOpenLogin(!openLogin)}>Login</Button>
                            <Button color="secondary" outline>Register</Button>
                        </ButtonGroup>
                    </NavbarText>
                </Collapse>
            </Navbar>

            <div>
                <Modal
                    isOpen={openLogin}
                >
                    <ModalHeader
                        toggle={() => setOpenLogin(!openLogin)}
                    >
                        Login Form
                    </ModalHeader>
                    <ModalBody>
                        <p className="form-label">Email</p>
                        <input type="text" className="form-control" onChange={handleEmail}></input>
                        <br />
                        <p className="form-label">Password</p>
                        <input type="password" className="form-control" onChange={handlePassword}></input>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

        </div>
    )
}

export default NavbarComponent;