import React from 'react';
// functional component tidak wajib import React namun kalau functional component butuh sistem react hooks pada class component, maka perlu import React
import { Dropdown, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, ButtonGroup, NavbarText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalLogin from './ModalLogin';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// hooks fitur untuk membuat functional component sama dengan class component
// adanya hooks, functional component bisa menggunakan state
// react hooks ada banyak di library manapun

const NavbarComponent = (props) => {

    const navigate = useNavigate();
    // useNavigate sebuah fungsi yg mereturn sebuah fungsi jadi supaya ga bingung (daripada useNavigate()()) sebaiknya ditampung ke variabel
    // di javascript fungsi yg mereturn fungsi dinamakan curying? (search google)

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

    const [openProfile, setOpenProfile] = React.useState(false)

    const [displayButton, setDisplayButton] = React.useState("d-inline")

    const { username } = useSelector((state) => {
        return {
            username: state.usersReducer.username // state.reducerYangMauDiambil.propertiYgMauDiambil
        }
    })

    // console.log("ambil data users reducers", username)

    // const [emailLogin, setEmailLogin] = React.useState("")

    // const [passwordLogin, setPasswordLogin] = React.useState("")

    // const handleEmail = (event) => {
    //     // console.log(event.target.value)
    //     setEmailLogin(event.target.value)
    // }

    // const handlePassword = (event) => {
    //     // console.log(event.target.value)
    //     setPasswordLogin(event.target.value)
    // }

    // const handleLogin = () => {
    //     console.log("email:",emailLogin)
    //     console.log("password:",passwordLogin)
    //     setOpenLogin(!openLogin)
    // }

    return (
        <div >
            <ModalLogin
                modalOpen={openLogin}
                toggleOpen={() => setOpenLogin(!openLogin)}
            />

            {/* navbar responsive di breakpoint medium berarti semua isi navbar muncul, color light = background putih, light untuk membuat tulisan jd gelap krn background putih dan light bertipe data boolean (true/false) valuenya*/}
            <Navbar color="light" light expand="md">
                {/* cursor pointer untuk munculin tangan saat dihover */}
                <NavbarBrand
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}>
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
                            {/* pakai metode tag link butuh to dan alamat route nya */}
                            <Link to="/products" className="nav-link">
                                {/* atribut active untuk menandakan page dibuka */}
                                <span >
                                    Products
                                </span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <span className="nav-link">
                                Promo
                            </span>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <ButtonGroup>
                            {
                                username != "" ?
                                    <>
                                        <div
                                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={() => setOpenProfile(!openProfile)} >
                                            {username}
                                        </div>
                                        <Collapse isOpen={openProfile}>
                                            <p>Edit Profile</p>
                                            <p>Edit Profile</p>
                                        </Collapse>
                                    </>
                                    :
                                    <>
                                        <Button
                                            type="button"
                                            color="primary"
                                            className={displayButton}
                                            onClick={() => setOpenLogin(!openLogin)}>
                                            Login
                                        </Button>
                                        <Button
                                            type="button"
                                            color="secondary"
                                            outline
                                            className={displayButton}
                                            onClick={() => navigate("/register")}
                                        >
                                            Register
                                        </Button>
                                    </>
                            }
                        </ButtonGroup>
                    </NavbarText>
                </Collapse>
            </Navbar>

        </div>
    )
}

export default NavbarComponent;