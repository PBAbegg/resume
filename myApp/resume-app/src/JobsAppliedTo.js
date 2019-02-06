import React, { Component } from 'react'

const DisplayJob = (props) => {
    return (
        <div>
            <b>
                COMPANY NAME: {props.job.companyName}
            </b>
            <p>
                Date Applied: {props.job.dateApplied}
            </p>
            <p>
                Contact Info: {props.job.contactInfo}
            </p>
            <p>
                Additional Info: {props.job.additionalInfo}
            </p>
        </div>
    )
}


export default class extends Component {
    // state = {Event: ''}

    // class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.companyName = React.createRef()
        this.dateApplied = React.createRef()
        this.contactInfo = React.createRef()
        this.additionalInfo = React.createRef()
        //   this.state = {value: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const newJob = {
            //id: this.id.curent.value,
            companyName: this.companyName.current.value,
            //props.jobsAndContacts.state.companyName: this.companyName.current.value,
            dateApplied: this.dateApplied.current.value,
            contactInfo: this.contactInfo.current.value,
            additionalInfo: this.additionalInfo.current.value,
        }
        //this.is.current.value=''
        // this.companyName.current.value=''
        // this.dateApplied.current.value=''
        // this.contactInfo.current.value=''
        // this.additionalInfo.current.value=''
        this.props.jobSubmitted(newJob)
        //   this.setState({ Event: newJob });
        console.log(newJob)
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>

                    <label>Company</label>
                    <input type="text" ref={this.companyName} ></input>
                    <br></br>
                    <label>Date Applied</label>
                    <input type="text" ref={this.dateApplied} ></input>
                    <br></br>
                    <label>Contact Info</label>
                    <input type="text" ref={this.contactInfo} ></input>
                    <br></br>
                    <label>Additional Info</label>
                    <input type="text" ref={this.additionalInfo} ></input>
                    <br></br>
                    <input type="submit" value="Submit"></input>
                    {/* -------add delete button-------- */}
                </form>
                {this.props.jobs.map(job => {
                    return <DisplayJob job={job} key={job.ID} />
                })}
                {/* <DisplayJob job={ this.state.value } /> */}
            </div>
        )
    }
}