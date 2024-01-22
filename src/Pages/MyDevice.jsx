import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import 'jquery'; // Ensure jquery is imported before bootstrap if using jQuery

import 'select2/dist/js/select2.full.min.js';
import { Modal, Button } from 'react-bootstrap';

import $ from "jquery"
import { Form } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import {useNavigate,Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { TESTING } from '../API/secrect';
import gvc from "../assets/GVC corp logo.png";
import bulb from "../assets/bulb.png";
import fan from "../assets/fan.png"



export default function MyDevices(){
   const [data,setData]=useState([]);
   const [showModal, setShowModal] = useState(false);
   const navigate=useNavigate();
  
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  

   
     var i=0;

     const buttons = c => `
        <button class="btn btn-sm btn-outline-warning mx-2" onclick="EditNumber()">Edit</button>
        <button class="btn btn-sm btn-outline-danger mx-2" onClick="DeleteNumber()">Delete</button>
    `;
      const LoadData=()=>{
        $.get(`${TESTING}/machineNumber/getAll`)
             .then(r => {
                console.log(r);
                 setData(r);
                if ($.fn.DataTable.isDataTable('#tblUser')) {
                     $('#tblUser').DataTable().destroy();
                       }
                 
                    var sr = 1;
                     // Initialize DataTable with retrieved data
                     $('#tblUser').DataTable({
                         data: r, // Use fetched data directly
                         columns: [
                                 { render: _ => sr++ },
                                 {data:'serial'},
                                 { render: (a, b, c) => buttons(c), className: 'd-flex' },
                                 { render: (a, b, c) => btoa(escape(JSON.stringify(c))), className: 'd-none' },
                             
                             
                              
                               
                         ],
                         // Other configurations as needed
                     });
             })
             .catch(ex => {console.log(ex) });

      }

useEffect(()=>{
   LoadData();
  

   

},[])


const AddNumber=()=>{

    const value= $('[name=machineId]').val();
    console.log(value);
    fetch(`${TESTING}/machineNumber/add`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "x-token":sessionStorage.getItem("token")
        },
        body:JSON.stringify(value)

    })
    .then((res)=>{
        console.log(res.json());

    })
    .catch((err)=>{
        console.log(err);
    })
}
const EditNumber=()=>{

    const value= $('[name=machineId]').val();
    console.log(value);
    fetch(`${TESTING}/machineNumber/edit`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "x-token":sessionStorage.getItem("token")
        },
        body:JSON.stringify(value)

    })
    .then((res)=>{
        console.log(res.json());

    })
    .catch((err)=>{
        console.log(err);
    })
}

const DeleteNumber=()=>{

    const value= $('[name=machineId]').val();
    console.log(value);
    fetch(`${TESTING}/machineNumber/delete`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "x-token":sessionStorage.getItem("token")
        },
        body:JSON.stringify(value)

    })
    .then((res)=>{
        console.log(res.json());

    })
    .catch((err)=>{
        console.log(err);
    })
}


 

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
    {/* <div style={{width:'100%',backgroundColor:"rgba(88, 115, 254, 0.04)",paddingBottom:"70px"}}></div> */}

<div class="row w-70 align-ceneter" id="container" style={{display:'flex',justifyContent:"center"}}>
    <div class="col-lg-12">
        <div class="card " style={{paddingLeft:"100px",paddingRight:"100px",paddingTop:"20px"}}>
        <div class="card-header">
                <h4 class="card-title " style={{display:'flex', justifyContent:'space-between'}}>
                    Serial Numbers
                    <button class="btn btn-sm btn-success mx-2 text-white float-right" onClick={handleShow}>Add</button>
                  
                </h4>
            </div>
          
           
            <div class="card-body">
                <table class="table w-100" id="tblUser">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Serial Number</th>
                         
                            <th>Edit</th>
                            <th>Delete</th>
                          
                          
                        </tr>
                    </thead>
                    <tbody>

                      
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Machine Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="row">
                   
                    <div class="col-md-6">
                        <div class="form-group my-2">
                            <label>Machine Number</label>
                            <input type="text" class="form-control" name="machineId" />
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={AddNumber}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* Additional buttons or actions */}
        </Modal.Footer>
      </Modal>
<script>
   {/* $('[name="my-checkbox"]').bootstrapSwitch(); */}

   console.log(1);
</script>



    
    
    
    </>
}