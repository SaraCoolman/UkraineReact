import React, { Component } from "react";
import PersonDataService from "../services/people.service";
import { Link } from "react-router-dom";
//import Lodge from "./lodge.component";

export default class PersonList extends Component {
  constructor(props) {
    super(props);
    this.retrievePerson = this.retrievePerson.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePerson = this.setActivePerson.bind(this);
    this.removeAllPerson = this.removeAllPerson.bind(this);

    this.state = {
      person: [],
      currentPerson: null,
      currentIndex: -1,
      searchName: ""
    };
  }
  componentDidMount() {
    this.retrievePerson();
  }

  onChangeSearchRegion(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrievePerson() {
    PersonDataService.getAll()
      .then(response => {
        this.setState({
          person: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePerson();
    this.setState({
      currentPerson: null,
      currentIndex: -1
    });
  }

  setActivePerson(person, index) {
    this.setState({
      currentPerson: person,
      currentIndex: index
    });
  }

  removeAllPerson() {
    PersonDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });


    PersonDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          person: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
      const { searchName, person, currentPerson, currentIndex } = this.state;


    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            
          </div>
        </div>
        <div className="col-md-6">
          <h4>Personen</h4>

          <ul className="list-group">
            {person &&
              person.map((person, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePerson(person, index)}
                  key={index}
                >
                  {person.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPerson}
          >
            Alle loeschen
          </button>
        </div>
        <div className="col-md-6">
          {currentPerson ? (
            <div>
              <h4>Person</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                   {currentPerson.name}
              </div>
              <div>
                <label>
                  <strong>Alter:</strong>
                </label>{" "}
                {currentPerson.age}
               </div>
               <div>
               <label>
                <strong>Zugeordnete Unterkunft:</strong>
                   </label>{" "}
                  {currentPerson.assignedLodge}
                 </div>
                
                
              
              <Link
                to={"/person/" + currentPerson.id}
                className="badge badge-warning"
              >
                Bearbeiten
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Klicken Sie auf eine Person...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
