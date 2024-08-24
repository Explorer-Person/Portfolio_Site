import { CustomButton } from '@src/components';
import { StyleProps } from '@src/shared';
import { authorizeApi } from '@src/store';
import { useAppDispatch, useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarLayout = () => {
    const status = useAppSelector((state:RootState)=> state.auth.response.status)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(authorizeApi({endpoint: '/api/admin/authorize'}))
    },[])
    const styleButton:StyleProps = {
        width: `100%`,
        height: `100%`,
        backgroundColor: `white`,
        padding: `5px 20px`,
        fontSize: `100%`,
        color: `black`
     }
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto mx-5">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#info">Info</Nav.Link>
                        <Nav.Link href="#skills">Skills</Nav.Link>
                    </Nav>
                 {status === true ? <CustomButton type='action' style={styleButton} process='updateOne' inheritor='admin' id={null}/> : null } 
                    
                </Container>
            </Navbar>
        </div>
    )
}
export default NavbarLayout;