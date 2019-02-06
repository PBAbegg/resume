import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'

import JobsAppliedTo from './JobsAppliedTo'
import Contacts from './Contacts'




class Home extends Component {
    constructor() {
        super()
        this.state = {
            jobs: [],
            contacts: [],
        }
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.jobAdded = this.jobAdded.bind(this)
        this.contactAdded = this.contactAdded.bind(this)
        this.getJobs = this.getJobs.bind(this)
    }
    componentDidMount(){
        this.getJobs()

    }
    getJobs () {
        fetch('http://localhost:9000/jobs',{
        method: "GET"
    })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    jobs:json
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    }
    insert(job) {
        console.log("insert")
        const jobInfo={
            companyname: job.companyName,
            dateapplied: job.dateApplied, 
            contactinfo: job.contactInfo,   
            additionalinfo: job.additionalInfo
        }
        fetch('http://localhost:9000/jobs',{
            method: "POST",
            headers: {
                "Conent-Type" : "application/json"
            },
            body: JSON.stringify(jobInfo)
        })
        .then(response => response.json())
        .then(response => {
            //fetch doesnt return any data, nothing to call ecouse it is in componant JobsAppliedTo
        })
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
    }

    update(job) {
        console.log("update")
        const jobInfo={
            companyname: job.companyName,
            dateapplied: job.dateApplied, 
            contactinfo: job.contactInfo,   
            additionalinfo: job.additionalInfo
        }
        fetch('http://localhost:9000/jobs/${ID}',{ //dont have ID set
            method: "PUT",
            headers: {
                "Conent-Type" : "application/json"
            },
            body: JSON.stringify(jobInfo)
        })
        .then(response => response.json())
        .then(response => {
            //fetch doesnt return any data, nothing to call ecouse it is in componant JobsAppliedTo
        })
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
    }


//------DELETE FUNCTION NEEDED-------


// delete() {
//     console.log("delete")
//     fetch('http://localhost:9000/jobs/${ID}',{ //dont have ID set
//         method: "DELETE"})
//     .then(response => response.json())
//     .then(response => {
//         //fetch doesnt return any data, nothing to call ecouse it is in componant JobsAppliedTo
//     })
//     .catch(err => {
//         this.setState({
//             error: err.message
//         })
//     })
// }



    jobAdded(job) {
        // this.setState({
        //     jobs: [...this.state.jobs, job]
        // })
        job.ID ? this.update(job) : this.insert(job)
    }

    contactAdded(contact) {
        this.setState({
            contacts: [...this.state.contacts, contact]
        })
    }
    render() {
        return (
            <Tabs>
                <Tab label="Jobs Applied To" value="/">
                    <JobsAppliedTo jobs={this.state.jobs}
                        jobSubmitted={this.jobAdded} />
                </Tab>
                <Tab label="Contacts" value="/Contacts">
                    <Contacts contacts={this.state.contacts} 
                        contactSubmitted={this.contactAdded} />
                </Tab>
            </Tabs>
        )
    }
}

export default Home