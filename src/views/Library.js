import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Modal,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  ButtonGroup,
 
  
} from "react-bootstrap";


function BookList(props) {
  var return_date = new Date(props.list.return_date);
 
  return (
    <>
      <tr>
       
          <td>
           
            {props.list.books}
           
          </td>
          <td>{props.list.description}</td>
          <td>{props.list.author_fname+" "+props.list.author_lname}</td>
         
            {
              props.list.status == 0 ?
              <td>IN</td>
              :
              <td>
                Return on {return_date.toDateString()}
              </td>
            }
          
          <td>
            
          </td>
      </tr>
    </>
  );
}

function LibraryList(props) {
  
 
  return (
    <>
      <tr>
       
          <td>
           
            {props.list.library_name}
          
          </td>
          <td>{props.list.location}</td>
          <td>{props.list.owner}</td>
        
          <td>
         
            <ButtonGroup size="sm" className="mb-2">
             
              <Button variant="success" onClick={() => {props.open_library_form(props.list)}}>
                View Books 
              </Button>
             
            </ButtonGroup>
          </td>
      </tr>
    </>
  );
}

function AddLibraryForm(props) {
  const [show, setShow] = useState(false);

  
  const [library_name, setTitle] = useState();
  const [location, setLocation] = useState();
  const [owner, setOwner] = useState();
  
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleChangeLibraryName = (event) => setTitle(event.target.value);
  const handleChangeLocation = (event) => setLocation(event.target.value);
  const handleChangeOwner = (event) => setOwner(event.target.value);
  return (
    <>
      
      <ButtonGroup size="sm" className="mb-2 create-new-books">
      
      <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={handleShow}
                  >
       Create New Library
      </Button>
      </ButtonGroup>

      <Modal  size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Library </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              
              <Card.Body>
                <Form>
                  <Row>
                    
                    <Col md="12">
                      <Form.Group>
                        <label>Library Name</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Library Name"
                          type="text"
                          value={library_name}
                          onChange={handleChangeLibraryName}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Location</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Location"
                          type="text"
                          value={location}
                          onChange={handleChangeLocation}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Owner</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Owner"
                          type="select"
                          value={owner}
                          onChange={handleChangeOwner}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                 
                  
                  
                 
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {setShow(false); props.create_library(library_name,location,owner);}} >
            Save 
          </Button>
        </Modal.Footer> 
      </Modal>
    </>
  );
}


function RentForm(props) {
  const [show, setShow] = useState(true);
  const [customer_selected, setLibrary] = useState(false);
  const [return_date, setReturnDate] = useState();
 
  const handleClose = () => {
    setShow(false);

  };

  const handleChangeLibrary = (event) => {setLibrary(event.value); };
  const handleChangeReturnDate = (event) => { 
     setReturnDate(event.target.value);
   };

 
  return (
    <>
      
      <Modal  size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {props.selectedLibrary.library_name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              
              <Card.Body>
                <Form>
                 
                      <Table className="table-hover table-striped">
                        <thead>
                          <tr>
                            <th className="border-0">Name</th>
                            <th className="border-0">Description</th>
                            <th className="border-0">Author</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                         
                        {  
                              
                              props.selectedLibraryBooks.map((books) =>
                                        
                                  <BookList list={books}  />
                          
                        
                              )
                  
                        }
                        </tbody>
                      </Table>
                    
                </Form>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
     
        </Modal.Body>
        <Modal.Footer>
        
        </Modal.Footer> 
      </Modal>
    </>
  );
}


class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        customers: [],
        libraries: [],
        books: [],
        filteredBooks:[],
        selectedLibrary:[],
        selectedLibraryBooks:[],
        searchQuery:"",
        showLibraryForm: false,
    }

  }

 

  componentDidMount()
  {
    this.load_library();
  
  }

  create_library = (library_name,location,owner) =>{
    var newLibrary = [];
    newLibrary.push({
      library_name:library_name,
      location: location,
      owner: owner,
    });
    fetch('https://codingchallenge.jabezonline.net/laravel/public/api/libraries/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        "library" : newLibrary
      })
      })
          .then((response) => response.json())
          .then((result) => {
            this.load_library();
           
          })
          .catch((error) => {
              console.error(error);
    });
    
    
  }

  seachEvents = (event) =>{
    const q = event.target.value.toLowerCase();
    this.setState({ searchQuery : q}, () => this.filterList());
  }

  filterList() {
    let listLibrary = this.state.libraries;
    let q = this.state.searchQuery; 

   

    listLibrary = listLibrary.filter(function(list) {
      return list.library_name.toLowerCase().indexOf(q) != -1; 
    });

    
    this.setState({ filteredBooks: listLibrary });

  
  }

  rent_books = (book_id,customer,return_date) =>{

    var newRents = [];
    newRents.push({
    
      book_id: book_id,
      customer_id: customer,
      return_date: return_date,
     
    });

  
    fetch('https://codingchallenge.jabezonline.net/laravel/public/api/rental/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        "rents" : newRents
      })
      })
          .then((response) => response.json())
          .then((result) => {
            var index = this.state.books.findIndex(obj => obj.id === book_id);
            this.state.books[index].status = 1;   
            this.filterList();
           
          })
          .catch((error) => {
              console.error(error);
      });
      
   
   
  }

  open_library_form = (lib) =>{
    this.setState({selectedLibraryBooks:[]});
    fetch("https://codingchallenge.jabezonline.net/laravel/public/api/books/getbooks/"+lib.id)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({selectedLibraryBooks:[]});
        for (let data of result) {
            
          this.state.selectedLibraryBooks.push(data);
         
        }
        this.setState({selectedLibraryBooks:this.state.selectedLibraryBooks,showLibraryForm: !this.state.showLibraryForm,selectedLibrary:lib});
        
      },
     
      (error) => {
       
      }
    )

  }

  list_sort(sortBy = "")
    {
        switch (sortBy) { 
            case "library_name":
                this.setState({ filteredBooks: this.state.filteredBooks.sort(
                  function(a, b) {
                      if(a.library_name.toLowerCase() < b.library_name.toLowerCase()) return -1;
                      if(a.library_name.toLowerCase() > b.library_name.toLowerCase()) return 1;
                      return 0;
                    }  
              ) });
            break;
            case "location":
              this.setState({ filteredBooks: this.state.filteredBooks.sort(
                function(a, b) {
                    if(a.location.toLowerCase() < b.location.toLowerCase()) return -1;
                    if(a.location.toLowerCase() > b.location.toLowerCase()) return 1;
                    return 0;
                   }
            ) });
            break;
            case "owner":
              this.setState({ filteredBooks: this.state.filteredBooks.sort(
                function(a, b) {
                    if(a.owner.toLowerCase() < b.owner.toLowerCase()) return -1;
                    if(a.owner.toLowerCase() > b.owner.toLowerCase()) return 1;
                    return 0;
                   }
            ) });
           
            break;
           
          }
    }

  load_customers = () =>{
     
    fetch("https://codingchallenge.jabezonline.net/laravel/public/api/customers")
    .then(res => res.json())
    .then(
      (result) => {
        
        for (let customer of result) {
            
          this.state.customers.push({
            value:customer.id,
            label:customer.first_name + " " + customer.last_name
          });
         
        }
        this.setState({customers:this.state.customers});
        
      },
     
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  load_library = () =>{
    this.setState({libraries:[]});
    fetch("https://codingchallenge.jabezonline.net/laravel/public/api/libraries")
    .then(res => res.json())
    .then(
      (result) => {
        
        for (let library of result) {
            
          this.state.libraries.push(library);
         
        }
        this.setState({libraries:this.state.libraries},this.filterList);
      },
     
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render()
  {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search by Library Name"
                  aria-label=""
                  aria-describedby="basic-addon2"
                  onChange={this.seachEvents.bind(this)} 
                />
                <Button 
                  variant="outline-secondary" 
                  id="button-addon2"
                  onClick={ () => { this.filterList() }}
                >
                  Search
                </Button>
              </InputGroup>
             
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  
                  <Col>
                     {
                      this.state.showLibraryForm == true ?
                      <RentForm customers={this.state.customers} open_library_form={this.open_library_form}  selectedLibrary={this.state.selectedLibrary} selectedLibraryBooks={this.state.selectedLibraryBooks} />
                      :
                      null
                     }
                    <AddLibraryForm libraries={this.state.libraries} create_library={this.create_library}  />
                  </Col>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0" onClick={ () => { this.list_sort("library_name") }}>Name</th>
                        <th className="border-0" onClick={ () => { this.list_sort("location") }}>Location</th>
                        <th className="border-0" onClick={ () => { this.list_sort("owner") }}>Owner</th>
                       
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {  
                      
                              this.state.filteredBooks.map((library) =>
                                        
                                  <LibraryList list={library} open_library_form={this.open_library_form}  />
                          
                        
                              )
                  
                       }
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </>
    );
  }
    
  }

export default Library;
