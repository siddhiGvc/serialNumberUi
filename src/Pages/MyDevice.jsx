import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import 'jquery'; // Ensure jquery is imported before bootstrap if using jQuery

import 'select2/dist/js/select2.full.min.js';
import { Modal, Button } from 'react-bootstrap';

import $ from "jquery";
import React from 'react';
import { Form } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import {useNavigate,Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { TESTING } from '../API/secrect';
import gvc from "../assets/GVC corp logo.png";
import bulb from "../assets/bulb.png";
import fan from "../assets/fan.png"
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



export default function MyDevices(){
   const [data,setData]=useState([]);
   const [showModal, setShowModal] = useState(false);
   const [open,setOpen]=useState(false);
   const [message,setMessage]=useState("");
   const [type,setType]=React.useState("");
  
   const navigate=useNavigate();
  
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

 

  const showAlertMessage = () => {
    setOpen(true);

    // You can optionally set a timeout to hide the alert after a few seconds
    setTimeout(() => {
    setOpen(false);
    }, 2000); // Hide the alert after 5 seconds (5000 milliseconds)
};

   
     var i=0;

     const buttons = b => `
      
        <button class="btn btn-sm btn-outline-danger mx-2" onclick="DeleteNumber(this)">Delete</button>
    `;
      const LoadData=()=>{
        $.get(`${TESTING}/getAll`)
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
                                 {render:function(data,type,row){
                                    return `  <button class="btn btn-sm btn-outline-danger mx-2" onclick="DeleteNumber(${row.serial})">Delete</button>`
                                 }}
                                //  { render: (a, b, c) => buttons(b), className: 'd-flex' },
                                //  { render: (a, b, c) => btoa(escape(JSON.stringify(c))) },
                             
                             
                              
                               
                         ],
                         // Other configurations as needed
                     });
             })
             .catch(ex =>{});

      }

useEffect(()=>{
   LoadData();
   setInterval(()=>{
   LoadData();
   },3000)
  

   

},[])


const AddNumber=()=>{

    const value= $('[name=machineId]').val();
    console.log(value);
    fetch(`${TESTING}/add`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "x-token":sessionStorage.getItem("token")
        },
        body:JSON.stringify({machineNumber:value})

    })
    .then((res)=>{
        console.log(res.json());
        showAlertMessage();
        setMessage("Added Succesfully !");
        setType("success");

    })
    .catch((err)=>{
        console.log(err);
        showAlertMessage();
        setMessage(err.message);
        setType("error");
    })
}
const EditNumber=()=>{

    const value= $('[name=machineId]').val();
    console.log(value);
    fetch(`${TESTING}/edit`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "x-token":sessionStorage.getItem("token")
        },
        body:JSON.stringify({machineNumber:value})

    })
    .then((res)=>{
        console.log(res.json());

    })
    .catch((err)=>{
        console.log(err);
    })
}

window.DeleteNumber=(sr)=>{
//     var rd = getRowContent(ctrl);
   console.log(sr);

    fetch(`${TESTING}/delete`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "x-token":sessionStorage.getItem("token")
        },
        body:JSON.stringify({machineNumber:sr})

    })
    .then((res)=>{
        console.log(res.json());
        
        showAlertMessage();
        setMessage("Deleted Succesfully !");
        setType("success");

    })
    .catch((err)=>{
        console.log(err);
        showAlertMessage();
        setMessage(err.message);
        setType("error");
    })
}


 

const Logout=()=>{
    sessionStorage.removeItem('token');
    navigate('/');
     
  }


    return <>
     <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'top', horizontal:'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

  </Stack>
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