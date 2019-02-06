import React, { Component } from 'react'

const DisplayContct = (props) => {
    return (
        <div>
            <b>
                NAME: {props.contact.name}
            </b>
            <p>
                Number: {props.contact.number}
            </p>
            <p>
                Email: {props.contact.email}
            </p>
            <p>
                Info: {props.contact.info}
            </p>
        </div>
    )
}


export default class extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef()
        this.number = React.createRef()
        this.email = React.createRef()
        this.info = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const newContact = {
            name: this.name.current.value,
            number: this.number.current.value,
            email: this.email.current.value,
            info: this.info.current.value
        }
        this.name.current.value=''
        this.number.current.value=''
        this.email.current.value=''
        this.info.current.value=''
        this.props.contactSubmitted(newContact)
        console.log(newContact)
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>

                    <label>Name</label>
                    <input type="text" ref={this.name} ></input>
                    <br></br>
                    <label>Number</label>
                    <input type="text" ref={this.number} ></input>
                    <br></br>
                    <label>Email</label>
                    <input type="text" ref={this.email} ></input>
                    <br></br>
                    <label>Info</label>
                    <input type="text" ref={this.info} ></input>
                    <br></br>
                    <input type="submit" value="Submit"></input>
                </form>
                {this.props.contacts.map(contact => {
                    return <DisplayContct contact={contact} key={contact.name} />
                })}
            </div>
        )
    }
}