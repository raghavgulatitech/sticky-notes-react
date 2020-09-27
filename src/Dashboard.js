// export default Dashboard;
import React, { Component } from 'react'
import axios from 'axios';
import Note from './Note'
import AddNoteButton from './AddNoteButton'
import { getUser, removeUserSession } from './Utils/Common';
const user = getUser();

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.create_note = this.create_note.bind(this)
        this.update_note = this.update_note.bind(this)
        this.remove_note = this.remove_note.bind(this)
        this.render_each_note = this.render_each_note.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout = function () {
        removeUserSession();
        this.props.history.push('/login');
    }
    // handle click event of logout button


    update_note = function (id, new_title, new_text) {
        this.setState(
            (prevState) => ({
                notes: prevState.notes.map(
                    (note) => (id !== note.id) ? note : {
                        ...note,
                        title: new_title,
                        text: new_text
                    }
                )
            })
        )
    }

    remove_note = function (id) {
        axios.delete(`https://localhost:44399/user/deletenote?id=${id}`)
        .then((response) => {
            var result = response["data"]
            if (result.success == true) {
                return
            }
        })
        .catch(function (error) {
        })
        this.setState(
            (prevState) => ({
                notes: prevState.notes.filter(note => (id !== note.id))
            })
        )
    }

    create_note = function (new_title, new_text) {
        const new_id = Date.now()
        this.setState(
            (prevState) => ({
                notes: [...prevState.notes, {
                    id: new_id,
                    title: new_title,
                    text: new_text
                }]
            })
        )
    }

    componentDidMount() {
        let loaded_notes = JSON.parse(localStorage.getItem("notes"))
        this.getNoteForUsers();
    }

    getNoteForUsers() {
        var user = getUser();
        axios.get(`https://localhost:44399/user/getnotes?id=${user.id}`)
            .then((response) => {
                var result = response["data"]
                if (result.success == true) {
                    var note = result["data"]
                    this.setState({ notes: note })
                    return
                }
            })
            .catch(function (error) {
                alert('Error while saving. Please try again later.')
            })
    }

    componentDidUpdate() {
        localStorage.setItem("notes", JSON.stringify(this.state.notes))
    }

    componentWillReceiveProps() {
        this.setState({ notes: [] })
    }

    render_each_note = function (note) {
        return (
            <Note
                text={note.noteHeading == undefined ? note.text : note.noteHeading}
                title={note.noteText == undefined ? note.title : note.noteText}
                id={note.id}
                key={note.id}
                onRemove={this.remove_note}
                onUpdate={this.update_note} />
        )
    }

    render() {
        return (
            <div id="board"> Welcome !<br /><br />
                {/* <input type="button" onClick={this.handleLogout} value="Logout" /> */}
                <div className="row m-0 p-0">{this.state.notes.map(this.render_each_note)}
                </div>
                <div>
                    <AddNoteButton onAdd={this.create_note} />
                </div>
            </div>
        )
    }
}

export default Dashboard
