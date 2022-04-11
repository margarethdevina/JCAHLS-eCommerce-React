import React from 'react';
// functional component tidak wajib import React namun kalau functional component butuh sistem react hooks pada class component, maka perlu import React
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, ButtonGroup, NavbarText, Button } from 'reactstrap';

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

    return (
        <div >
            {/* navbar responsive di breakpoint medium berarti semua isi navbar muncul, color light = background putih, light untuk membuat tulisan jd gelap krn background putih dan light bertipe data boolean (true/false) valuenya*/}
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                    <span className="fw-bold">
                        Commerce
                    </span>
                </NavbarBrand>
                <NavbarToggler onClick={()=>setOpenCollapse(!openCollapse)}/>
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
                            <Button color="primary">Login</Button>
                            <Button color="secondary" outline>Register</Button>
                        </ButtonGroup>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;