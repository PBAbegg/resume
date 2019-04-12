import React, { Component } from 'react'

const DisplayJob = (props) => {
    console.log(props.job)
    return (
        <div onClick={props.onJobSelected}>
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

    constructor(props) {
        super(props);
        this.companyName = React.createRef()
        this.dateApplied = React.createRef()
        this.contactInfo = React.createRef()
        this.additionalInfo = React.createRef()
        this.state = {jobID:null};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.resetForm = this.resetForm.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();

        const newJob = {
            companyName: this.companyName.current.value,
            dateApplied: this.dateApplied.current.value,
            contactInfo: this.contactInfo.current.value,
            additionalInfo: this.additionalInfo.current.value,
        }
        this.state.jobID && (newJob.ID = this.state.jobID)
        
        console.log(newJob)
        this.props.jobSubmitted(newJob)
        this.resetForm()
    }

    resetForm(){

        this.companyName.current.value = ""
        this.dateApplied.current.value = ""
        this.contactInfo.current.value = ""
        this.additionalInfo.current.value = ""
        this.setState({
            jobID:null
        })
    }

    handleDelete(event) {
        event.preventDefault();

        this.state.jobID && this.props.deleteJob(this.state.jobID)
        this.resetForm()
    }

    editJob(job) {
        this.setState({
            jobID:job.ID
        })
        this.companyName.current.value = job.companyName || ''
        this.dateApplied.current.value = job.dateApplied || ''
        this.contactInfo.current.value = job. contactInfo || ''
        this.additionalInfo.current.value = job.additionalInfo || ''
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
                </form>
                <form onSubmit={(e) => this.handleDelete(e)}>
                <input type="submit" value="Delete"></input>
                </form>
                {this.props.jobs.map(job => {
                    return <DisplayJob job={job} key={job.ID} onJobSelected={()=>this.editJob(job)}/>
                })}
            </div>
        )
    }
}