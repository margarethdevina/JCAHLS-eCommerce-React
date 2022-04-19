import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText, ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ModalLogin from './ModalLogin';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const NavbarComponent = (props) => {

    const navigate = useNavigate();

    const [dropOpen, setDropOpen] = React.useState(false)

    const { username } = useSelector((state) => {
        return {
            username: state.usersReducer.username
        }
    });

    const [openCollapse, setOpenCollapse] = React.useState(false)
    const [openLogin, setOpenLogin] = React.useState(false)

    return (
        <div className='bg-light'>
            <ModalLogin
                modalOpen={openLogin}
                toggleOpen={() => setOpenLogin(!openLogin)}
            />
            <Navbar color='light' className='container' light expand="md">
                <NavbarBrand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    <img src={require("../Assets/logo.png")} width="100px" alt='logo-commerce' />
                </NavbarBrand>
                <NavbarToggler onClick={() => setOpenCollapse(!openCollapse)} />
                <Collapse navbar isOpen={openCollapse}>
                    <Nav
                        className='me-auto'
                        navbar
                    >
                        <NavItem>
                            <Link to="/products" className='nav-link'>
                                <span >
                                    Products
                                </span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <span className='nav-link'>
                                Promo
                            </span>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        {
                            username ?
                                <Dropdown isOpen={dropOpen} toggle={()=>setDropOpen(!dropOpen)}>
                                    <DropdownToggle onClick={()=>setDropOpen(!dropOpen)}>
                                        {username}
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <DropdownItem>
                                            Profile
                                        </DropdownItem>
                                        <DropdownItem>
                                            Cart
                                        </DropdownItem>
                                        <DropdownItem>
                                            Transactions
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                :
                                <ButtonGroup>
                                    <Button type='button'
                                        color='secondary'
                                        onClick={() => setOpenLogin(!openLogin)}>
                                        Login
                                    </Button>
                                    <Button type='button'
                                        color='secondary'
                                        outline
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </Button>
                                </ButtonGroup>
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;