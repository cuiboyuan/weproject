import React, { Component, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
const SearchBar = ({filterFunction, pageName})=>{
	const[searchContent, setSearchContent] = useState("");

	const buttonClickHandle = (e)=>{
		e.preventDefault();
		filterFunction(searchContent);
	};
	return (
		<Form>
			<Form.Row>
				<Col md="10">
					<Form.Control 
					placeholder={`Enter ${pageName} name`}
					onChange={(e)=>{setSearchContent(e.target.value)}}
					value={searchContent}
					/>
				</Col>
				<Col>
					<Button
						variant="primary"
						type="submit"
						className="float-right"
						md="2"
						onClick={buttonClickHandle}
					>
						Search
					</Button>
				</Col>
			</Form.Row>
		</Form>
	);
}

export default SearchBar;