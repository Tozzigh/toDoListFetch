import React from "react";
import PropTypes from "prop-types";

const List = ({ lista, onDeleteClicked, counter }) => {
	const listaa = lista.map((elemento, index) => {
		return (
			<li className="todos" key={index}>
				{console.log()}
				{elemento.label}
				<i className="delLi fa fa-times" onClick={() => onDeleteClicked(index)} />
			</li>
		);
	});
	return (
		<ul>
			{listaa}
			{counter}
		</ul>
	);
};

export default List;

List.propTypes = {
	lista: PropTypes.any,
	onDeleteClicked: PropTypes.any,
	counter: PropTypes.any
};
