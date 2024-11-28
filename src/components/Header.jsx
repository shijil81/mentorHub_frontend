import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice';
import { persistor } from '../redux/store';

function Header() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()

   // Define the pages where you want to show the full header without the logout button
   const showFullHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/uregister';

  // function for moving to mentor about section using react-scroll
  const handleScrollToAbout=()=>{
    if (location.pathname === '/') {
      // Scroll to MentorAbout section only if the user is on the landing page
      document.getElementById('mentorabout').scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to the landing page if not already on it
      window.location.href = '/#mentorabout';
    }
  }

  const handleLogout=()=>{
    // clear session storage
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')

    // dispatch logout action to clear user data from redux store
    dispatch(logoutUser());
    persistor.purge();

  
    navigate('/')

    // Add a popstate listener to prevent back navigation
  window.onpopstate = () => {
    window.location.href = '/login';  // Force redirect to login if back button is pressed
  };
  }
  

  return (
    <>
        <Navbar expand="lg"  className="shadow-lg fixed-top py-2" style={{width:'100%', zIndex:'2000', backgroundColor:'white'}}>
      <Container>
        <Link to={'/home'} style={{textDecoration:'none'}}><Navbar.Brand className='fw-bold fs-3' style={{fontFamily: "cursive"}}>MentorHub</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
       {showFullHeader ?( <>
          <Nav className="ms-auto" variant="underline">
            <Nav.Link href="#home" className='fw-bold fs-5' style={{color:"black"}}>About</Nav.Link>
            <NavDropdown title="Mentor" className='fw-bold fs-5' id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleScrollToAbout}>About</NavDropdown.Item>
              <NavDropdown.Item ><Link to={'/mregister'} style={{textDecoration:'none'}} className='text-black'>Register</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to={'/login'} >Login</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {location.pathname !== '/login' &&(<Link to={'/login'}><button className="custom p-2 px-3 rounded mx-3">Login</button></Link>)}
          {location.pathname!=='/uregister' && <Link to={'/uregister'}><button className="custom-bt p-2 px-3 rounded ">Register</button></Link>}
        </>):
           <div className="ms-auto">
                  <button className="custom-bt p-2 px-3 rounded" type='button' onClick={handleLogout}>Logout</button>
            </div>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header
