import React from "react";

import "./style.css";

const Card = props => <div className="card-container shadow rounded">{props.children}</div>;

export default Card;
