import React,{useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Label, Row, Col, FormGroup, Button } from "reactstrap";
import BuildingService from "./Buildingservice";
import UserService from "views/Login/Userservice";

export default function Edit_building() {

    const [getName, setName] = useState(false);
    const handleNameChange = () => {
      setName(!getName);
    }
  
    const buildingState = {
      buildingId:null,
      buildingName: "",
    };
  
    const currentbuildingState = {
      currentbuildingId:null,
      currentbuildingName: "",
    };
  
    const [buildingvalue,setBuilding]=useState(buildingState);
    const[submitted,setSubmitted]=useState(false);
    const [buildinglist,setBuildinglist]=useState([]);
    const [currentbuilding,setcurrentBuilding]=useState(currentbuildingState);
  
    useEffect(() => {
      retrieveBuilding();
    }, []);
  
    const handleInputChange=event => {
      const{name,value}=event.target;
      setBuilding({...buildingvalue,[name]:value});
    };
    const currenthandleInputChange=event => {
      const{name,value}=event.target;
      setcurrentBuilding({...currentbuilding,[name]:value});
    };
    const saveBuilding = (e) => {
      e.preventDefault();
      var data= {
          buildingId: buildingvalue.buildingId,
          buildingName: buildingvalue.buildingName,     
      };
      //alert(data);
        BuildingService.create(data).then(response => {
          alert("Success");
          setBuilding({
            buildingId: response.data.buildingId,
            buildingName: response.data.buildingName,
          });
          setSubmitted(true);
                  console.log(response.data);
                  retrieveBuilding();
                  newBuilding();
        })
        .catch(e=>{
          alert(e);
          console.log(e);
        });
    };
    const newBuilding = () => {
      setBuilding(buildingState);
      setSubmitted(false);
    };
    const retrieveBuilding =() => {
        BuildingService.getAll().then(response => {
        setBuildinglist(response.data);
        // console.log(response.data);
    })
        .catch(e => {
        console.log(e);
    });
    };
    const updateBuilding = (e) => {
        e.preventDefault();
        var data= {
            buildingName: currentbuilding.currentbuildingName,
        };
            //alert(data);
            BuildingService.update(currentbuilding.currentbuildingId,data).
            then(response => {
            console.log(response.data);
            alert("Success");
            retrieveBuilding();            
        })
            .catch(e => {
            console.log(e);
        });
    };
    const getBuilding = (id) => {
            BuildingService.get(id).then(response => {
            setcurrentBuilding({
            currentbuildingId:response.data.buildingId,
            currentbuildingName:response.data.buildingName,
        });
        console.log(response.data);
        })
        .catch(e => {
            console.log(e);
    });
  
    };
    const deleteBuilding = (id) => {
        BuildingService.remove(id). then (
        response => {
            alert('Deleted Successfully...');           
        retrieveBuilding();           
    })
    UserService.getAll().then((response)=>{
        response.data.filter(obj=>obj.buildingId === id).map((val)=>
        UserService.remove(val.userId) .then (
            response => {}
        )
        )
    })   
        .catch(e => {
        console.log(e);
    });
    };
  
    
    const handlebuttonChange = () => {
      setBuilding(!getBuilding);
    }

    // Modal open state
    const [modal, setModal] = React.useState(false);
  
    // Toggle for Modal
    const toggle = () => setModal(!modal);

    return (
        <>
            <div className="content">
                <title>Edit Building</title>
                <Form >
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Building Name</Label>
                            <Input
                                name="currentbuildingName"
                                onChange={currenthandleInputChange}
                                value={currentbuilding.currentbuildingName}
                                type="text" required
                            />
                            </FormGroup>
                            <Button color="primary" onClick={updateBuilding}>Update</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}