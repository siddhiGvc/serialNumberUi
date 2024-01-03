import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import 'jquery'; // Ensure jquery is imported before bootstrap if using jQuery
import 'bootstrap-switch/dist/js/bootstrap-switch.min.js';
import 'select2/dist/js/select2.full.min.js';


import $ from "jquery"
import { useEffect,useState } from 'react';
import {useNavigate,Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import gvc from "../assets/GVC corp logo.png";

export default function MyDevices(){
   
    const navigate=useNavigate();
    useEffect(() => {
       
        $('[name="my-checkbox"]').bootstrapSwitch();
    
        // Cleanup when the component unmounts
        return () => {
          $('[name="my-checkbox"]').bootstrapSwitch('destroy');
        };

      },[]); // Empty dependency array ensures the effect runs only once
    

useEffect(()=>{
  

   
        $.get(`http://localhost:4001/lightingDevice/getJunction`, {
    
       })
           .then(r => {
              console.log(r);
              if ($.fn.DataTable.isDataTable('#tblUser')) {
                   $('#tblUser').DataTable().destroy();
                     }
                  var sr = 1;
                   // Initialize DataTable with retrieved data
                   $('#tblUser').DataTable({
                       data: r, // Use fetched data directly
                       columns: [
                               { render: _ => sr++ },
                               { data: 'User.name' },
                               { data: 'Device.deviceName' },
                               { data: 'Device.type' },
                               {
                                data: 'Device.status',
                                render: function (data, type, row) {
                                    // Check the value of Device.status and render accordingly
                                    if (type === 'display') {
                                        return data ? 'On' : 'Off';
                                    }
                                    return data;
                                }
                               
                               },
                               {
                                data: 'Device.status',
                                render: function (data, type, row) {
                                    // Check the value of Device.status and render accordingly
                                    if (type === 'display') {
                                        return data ? '<input type="checkbox" name="my-checkbox" checked>' : '<input type="checkbox" name="my-checkbox">';
                                    }
                                    return '<input type="checkbox" name="my-checkbox" checked>';
                                }
                            }
                           
                           
                            
                             
                       ],
                       // Other configurations as needed
                   });
           })
           .catch(ex => {console.log("Error") });
   

},[])

const Logout=()=>{
    sessionStorage.removeItem('token');
    navigate('/');
     
  }


    return <>
    <div style={{display:'flex',justifyContent:"space-between",padding:"15px",paddingLeft:'40px',paddingRight:'40px',alignItems:'center',position:'sticky',backgroundColor:"white",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
         <div>
          <img style={{width:'150px',height:'50px'}} src={gvc} />
         </div>
         <div>
          <p style={{cursor:'pointer',fontSize:'20px'}} onClick={Logout}>Logout    <FontAwesomeIcon icon={faPowerOff} /> </p>
         </div>
         </div>
    <div style={{width:'100%',backgroundColor:"rgba(88, 115, 254, 0.04)",paddingBottom:"70px"}}></div>

<div class="row" id="container">
    <div class="col-lg-12">
        <div class="card">
          
           
            <div class="card-body">
                <table class="table w-100" id="tblUser">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>User Name</th>
                            <th>Device Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Switch</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>



    
    
    
    </>
}