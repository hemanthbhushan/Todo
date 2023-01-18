import React from 'react'
import SimpleForm from './SimpleForm'
import WalletCard from './WalletCard'
import NavBar from './redux/NavBar'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";



const App = () => {
  return (
    <>
    <NavBar/>
    <SimpleForm/>
    <WalletCard/>
    </>
    // <Router>
    //   <div>
    //     <NavBar/>
    //     <Routes>
    //       <Route exact path='/' element={<SimpleForm/>} />
    //       <Route exact path='walletCard' element={<WalletCard/>} />
    //     </Routes>   
    //   </div>
    // </Router>
  )
}

export default App