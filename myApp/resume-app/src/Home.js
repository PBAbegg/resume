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
        this.delete = this.delete.bind(this)
    }
    componentDidMount() {
        this.getJobs()

    }
    getJobs() {
        fetch('http://localhost:9000/jobs', {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    jobs: json
                })
            })
            // .catch(err => {
            //     this.setState({
            //         error: err.message
            //     })
            // })
    }

    insert(job) {
        console.log("insert")
        const jobInfo = {
            companyName: job.companyName,
            dateApplied: job.dateApplied,
            contactInfo: job.contactInfo,
            additionalInfo: job.additionalInfo
        }
        fetch('http://localhost:9000/jobs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobInfo)
        })
            .then(response => response.json())
            .then(response => {
                this.getJobs()
            })
            // .catch(err => {
            //     this.setState({
            //         error: err.message
            //     })
            // })
    }

    update(job) {
        console.log("update", job)
        const jobInfo = {
            companyname: job.companyName,
            dateapplied: job.dateApplied,
            contactinfo: job.contactInfo,
            additionalinfo: job.additionalInfo
        }
        fetch(`http://localhost:9000/jobs/${job.ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobInfo)
        })
            .then(response => response.json())
            .then(response => {
                this.getJobs()
            })
            // .catch(err => {
            //     this.setState({
            //         error: err.message
            //     })
            // })
    }

    delete(ID) {
       console.log("delete", ID)
        fetch(`http://localhost:9000/jobs/${ID}`,{
             method: "DELETE",
        })
        .then(() => {
            this.getJobs()
        })
        // .catch(err => {
        //     this.setState({
        //         error: err.message
        //     })
        // })
    }



    jobAdded(job) {
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
                        jobSubmitted={this.jobAdded}
                        deleteJob={this.delete} />
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