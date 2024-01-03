import {Routes,Route} from "react-router-dom";
import SignIn from "../Pages/login";
import MyDevices from "../Pages/MyDevice";


export default function AllRoutes(){
    return<>
    <Routes>
          <Route path="/" element={<SignIn/>}></Route>
          <Route path="/myDevices"  element={<MyDevices/>}></Route>

    </Routes>
    
    
    
    </>
}