import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Modal,
  Nav,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  ButtonGroup
  
} from "react-bootstrap";
import Select from 'react-select'




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
          <td>{props.list.library_name}</td>
            {
              props.list.status == 0 ?
              <td>IN</td>
              :
              <td>
                Return on {return_date.toDateString()}
              </td>
            }
          
          <td>
            <ButtonGroup size="sm" className="mb-2">
             
              {
              props.list.status == 0 ?
              <Button variant="success" onClick={() => {props.open_rent_form(props.list)}}>
                Rent 
              </Button>
              :
                null
              }
            </ButtonGroup>
          </td>
      </tr>
    </>
  );
}

function AddForm(props) {
  const [show, setShow] = useState(false);
  const [library_selected, setLibrary] = useState(false);
  const [library_selected_name, setLibraryName] = useState(false);
  
  const [book_title, setTitle] = useState();
  const [book_author_firstname, setFname] = useState();
  const [book_author_lastname, setLname] = useState();
  const [book_description, setDescription] = useState();
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleChangeLibrary = (event) => {setLibrary(event.value); setLibraryName(event.label);};
  const handleChangeBookTitle = (event) => setTitle(event.target.value);
  const handleChangeBookAuthorFirstName = (event) => setFname(event.target.value);
  const handleChangeBookAuthorLastName = (event) => setLname(event.target.value);
  const handleChangeBookDescription = (event) => setDescription(event.target.value);


 
  return (
    <>
      
      <ButtonGroup size="sm" className="mb-2 create-new-books">
    
      <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={handleShow}
                  >
       Create New Books
      </Button>
      </ButtonGroup>

      <Modal  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book </Modal.Title>
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
                        <label>Book Title</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Title of the Book"
                          type="text"
                          value={book_title}
                          onChange={handleChangeBookTitle}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Author Name</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="First name"
                          type="text"
                          value={book_author_firstname}
                          onChange={handleChangeBookAuthorFirstName}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Author Last Name</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Last name"
                          type="select"
                          value={book_author_lastname}
                          onChange={handleChangeBookAuthorLastName}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          cols="80"
                          defaultValue=""
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                          value={book_description}
                          onChange={handleChangeBookDescription}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                     
                        <label>Assign to Library</label>
                        <Select 
                          options={props.libraries} 
                          onChange={handleChangeLibrary}
                        />
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
          <Button variant="primary" onClick={() => {setShow(false); props.create_book(book_title,book_author_firstname,book_author_lastname,book_description,library_selected,library_selected_name);}} >
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
      
      <Modal  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Rent Book </Modal.Title>
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
                        <label>Book Title</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Title of the Book"
                          readOnly
                          type="text"
                          value={props.selectedBook.books}
                       
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Author Name</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="First name"
                          readOnly
                          type="text"
                          value={props.selectedBook.author_fname}
                         
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Author Last Name</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Last name"
                          readOnly
                          type="select"
                          value={props.selectedBook.author_lname}
                         
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          cols="80"
                          defaultValue=""
                          placeholder="Here can be your description"
                          readOnly
                          rows="4"
                          as="textarea"
                          value={props.selectedBook.description}
                         
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                     
                        <label>Renter</label>
                        <Select 
                          options={props.customers} 
                          onChange={handleChangeLibrary}
                        />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Date to return</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Date to return"
                          onChange={handleChangeReturnDate}
                          type="date"
                        
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
          <Button variant="secondary" onClick={() => {setShow(false); props.open_rent_form; } }>
            Close
          </Button>
          <Button variant="primary" onClick={() => {setShow(false); props.rent_books(props.selectedBook.id,customer_selected,return_date);}} >
            Save 
          </Button>
        </Modal.Footer> 
      </Modal>
    </>
  );
}


class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        customers: [],
        libraries: [],
        books: [],
        filteredBooks:[],
        selectedBook:[],
        searchQuery:"",
        showRentForm: false,
       
       
    }

  }

 

  componentDidMount()
  {
    this.load_library();
    this.load_books();
    this.load_customers();
  }

  create_book = (book_title,author_fname,author_lname,description,assign_library,library_name) =>{
    var newBook = [];
    newBook.push({
      books:book_title,
      description: description,
      author_fname: author_fname,
      author_lname: author_lname,
      library_id: assign_library,
      library_name:library_name,
      status:0
    });

  
    return fetch('https://codingchallenge.jabezonline.net/laravel/public/api/books/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        "books" : newBook
      })
      })
          .then((response) => response.json())
          .then((result) => {
            this.load_books();
           
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
    let listBooks = this.state.books;
    let q = this.state.searchQuery; 

   

    listBooks = listBooks.filter(function(list) {
      return list.books.toLowerCase().indexOf(q) != -1; 
    });

    
    this.setState({ filteredBooks: listBooks });

  
  }

  rent_books = (book_id,customer,return_date) =>{

    var newRents = [];
    newRents.push({
    
      book_id: book_id,
      customer_id: customer,
      return_date: return_date,
     
    });

  
    return fetch('https://codingchallenge.jabezonline.net/laravel/public/api/rental/store', {
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
            this.state.books[index].return_date = return_date;   
            this.filterList();
           
          })
          .catch((error) => {
              console.error(error);
      });
      
   
   
  }

  open_rent_form = (book) =>{

    console.log(book);
    this.setState({ showRentForm: !this.state.showRentForm,selectedBook:book });
  }

  list_sort(sortBy = "books")
    {
        switch (sortBy) { 
            case "author_fname":
                this.setState({ filteredBooks: this.state.filteredBooks.sort(
                  function(a, b) {
                      if(a.author_fname.toLowerCase() < b.author_fname.toLowerCase()) return -1;
                      if(a.author_fname.toLowerCase() > b.author_fname.toLowerCase()) return 1;
                      return 0;
                    }
              ) });
            break;
            case "description":
              this.setState({ filteredBooks: this.state.filteredBooks.sort(
                function(a, b) {
                    if(a.description.toLowerCase() < b.description.toLowerCase()) return -1;
                    if(a.description.toLowerCase() > b.description.toLowerCase()) return 1;
                    return 0;
                   }
            ) });
            break;
            case "library_name":
              this.setState({ filteredBooks: this.state.filteredBooks.sort(
                function(a, b) {
                    if(a.library_name.toLowerCase() < b.library_name.toLowerCase()) return -1;
                    if(a.library_name.toLowerCase() > b.library_name.toLowerCase()) return 1;
                    return 0;
                   }
            ) });
            case "status":
                  this.setState({ filteredBooks: this.state.filteredBooks.sort(
                    function(a, b) {
                        if(a.status < b.status) return -1;
                        return 0;
                      }
                ) });
            break;
            case "books":
                this.setState({ filteredBooks: this.state.filteredBooks.sort(
                    function(a, b) {
                        if(a.books.toLowerCase() < b.books.toLowerCase()) return -1;
                        if(a.books.toLowerCase() > b.books.toLowerCase()) return 1;
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

  load_books = () =>{
    this.setState({books:[]});
    fetch("https://codingchallenge.jabezonline.net/laravel/public/api/books")
    .then(res => res.json())
    .then(
      (result) => {
        
        for (let data of result) {
            
          this.state.books.push(data);
         
        }
        this.setState({books:this.state.books},this.filterList());
        
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
     
    fetch("https://codingchallenge.jabezonline.net/laravel/public/api/libraries")
    .then(res => res.json())
    .then(
      (result) => {
        
        for (let library of result) {
            
          this.state.libraries.push({
            value:library.id,
            label:library.library_name
          });
         
        }
        this.setState({libraries:this.state.libraries});
        
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
                  placeholder="Seach book by title"
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
                      this.state.showRentForm == true ?
                      <RentForm customers={this.state.customers} open_rent_form={this.open_rent_form} rent_books={this.rent_books} selectedBook={this.state.selectedBook} />
                      :
                      null
                    }
                   
                    <AddForm libraries={this.state.libraries} create_book={this.create_book}  />
                  </Col>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0" onClick={ () => { this.list_sort("books") }}>Name</th>
                        <th className="border-0" onClick={ () => { this.list_sort("description") }}>Description</th>
                        <th className="border-0" onClick={ () => { this.list_sort("author_fname") }}>Author</th>
                        <th className="border-0" onClick={ () => { this.list_sort("library_name") }}>Library</th>
                        <th className="border-0" onClick={ () => { this.list_sort("status") }}>Status</th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {  
                              
                              this.state.filteredBooks.map((books) =>
                                        
                                  <BookList list={books} open_rent_form={this.open_rent_form} />
                          
                        
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

export default Books;
