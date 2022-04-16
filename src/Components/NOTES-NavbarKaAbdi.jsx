import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText, ButtonGroup, Button } from 'reactstrap';

const NavbarComponent = (props) => {

    const [openCollapse, setOpenCollapse] = React.useState(false)

    return (
        <div className='bg-light'>
            <Navbar color='light' className='container' light expand="md">
                <NavbarBrand>
                    <span className='fw-bold'>
                        Commerce
                    </span>
                </NavbarBrand>
                <NavbarToggler onClick={() => setOpenCollapse(!openCollapse)} />
                <Collapse navbar isOpen={openCollapse}>
                    <Nav
                        className='me-auto'
                        navbar
                    >
                        <NavItem>
                            <span className='nav-link'>
                                Products
                            </span>
                        </NavItem>
                        <NavItem>
                            <span className='nav-link'>
                                Promo
                            </span>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <ButtonGroup>
                            <Button color='primary'>Login</Button>
                            <Button color='secondary' outline>Register</Button>
                        </ButtonGroup>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;