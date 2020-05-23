import React from "react";
import List from "./list.js";

export class InputToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			lista: [],
			todoinput: ""
		};
	}
	render() {
		return (
			<div className="main">
				<h1>todos</h1>
				<input
					type="text"
					placeholder="What need to be done?"
					onChange={e => this.setState({ todoinput: e.target.value })}
					onKeyPress={this.addToList}
				/>
				{this.state.lista ? (
					<List
						lista={this.state.lista}
						counter={this.taskCounter(this.state.lista.length)}
						onDeleteClicked={index =>
							this.setState({
								lista: this.state.lista.filter((item, pos) => pos !== index)
							})
						}
					/>
				) : (
					"loading..."
				)}
			</div>
		);
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/tozzi")
			.then(response => response.json())
			.then(data => {
				this.setState([...this.state.lista, data]);
			});
	}

	addToList = e => {
		if (e.key === "Enter") {
			if (e.target.value.split(" ").join("").length > 0) {
				this.setState({ lista: e.target.value });
			}
			e.target.value = "";
		}
	};
	taskCounter = leng => {
		if (leng === 0) {
			return <li className="taskCounter text-muted">No tasks, add a task</li>;
		} else if (leng === 1) {
			return <li className="taskCounter text-muted">{leng} item left</li>;
		} else if (leng > 1) {
			return <li className="taskCounter text-muted">{leng} items left</li>;
		}
	};
}
