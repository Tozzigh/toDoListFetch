import React, { Component } from "react";
import List from "./list.js";

export class InputToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			lista: []
		};
	}
	render() {
		return (
			<div className="main">
				<h1>todos</h1>
				<input type="text" placeholder="What need to be done?" onKeyPress={this.addToList} />
				<List
					lista={this.state.lista}
					counter={this.taskCounter(this.state.lista.length)}
					onDeleteClicked={this.deleteFromList}
				/>
			</div>
		);
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/tozzigh")
			.then(response => response.json(), console.log("succes"))
			.then(data => {
				for (let z in data) {
					this.setState({ lista: [...this.state.lista, data[z]] });
				}
			});
	}
	componentDidUpdate() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/tozzigh", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(this.state.lista)
		});
	}

	addToList = e => {
		if (e.key === "Enter") {
			if (e.target.value.split(" ").join("").length > 0) {
				this.setState({ lista: [...this.state.lista, { label: e.target.value, done: true }] });
			}
			e.target.value = "";
		}
	};

	deleteFromList = index => {
		this.setState({
			lista: this.state.lista.filter((item, pos) => pos !== index)
		});
	};

	taskCounter = len => {
		const leng = len - 1;
		if (leng === 0) {
			return <li className="taskCounter text-muted">No tasks, add a task</li>;
		} else if (leng === 1) {
			return <li className="taskCounter text-muted">{leng} item left</li>;
		} else if (leng > 1) {
			return <li className="taskCounter text-muted">{leng} items left</li>;
		}
	};
}
