import React,{useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Label, Row, Col, FormGroup } from "reactstrap";
import BuildingService from "./Buildingservice";
import UserService from "views/Login/Userservice";

export default function Add() {

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
          buildingName: buildingvalue.buildingName,     
      };
      alert(data);
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
        console.log(response.data);
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
            alert(data);
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


    return (
        <>
            <div className="content">
                <title>Add Building</title>
                <Form onSubmit={saveBuilding}>
                    <Row>
                        <Col>
                            <FormGroup>
                            <Label>Building Name</Label>
                            <Input
                                name="buildingName"
                                onChange={handleInputChange}
                                value={buildingvalue.buildingName}
                                placeholder="Building Name"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <FormGroup>
                            <Label>No of Rooms</Label>
                            <Input
                                name="no_rooms"
                                placeholder="No of Rooms"
                                type="text" required
                            />
                            </FormGroup>
                        </Col>
                    </Row> */}
                </Form>
            </div>
        </>
    );
}