import React, { Component } from "react";
// import BrowserHistory from 'react-router/lib/BrowserHistory'
import { withRouter } from "react-router-dom";
import { GoArrowSmallLeft } from "react-icons/go";

import "./style.css";
import Card from "../../components/card";
import Office from "../../assets/office.svg";
// CREDIT: https://www.iconfont.cn/illustrations/detail?spm=a313x.7781069.1998910419.d9df05512&cid=24182

class Loggin extends Component {
	render() {
		return (
			<div className="loggin-view">
				<div className="loggin-view-half loggin-grad-bg">
					<img src={Office} className="loggin-img" alt="loggin" />
				</div>
				<div className="loggin-view-half">
					<div className="loggin-back-button-container">
						<div
							className="loggin-back-button shadow-strong"
							onClick={() => this.props.history.goBack()}
						>
							<GoArrowSmallLeft className="loggin-back-button-icon"/>
						</div>
					</div>
					<div className="loggin-form-container">
						<span>Create an account</span>
						<div className="loggin-input-container rounded"></div>
						<div className="loggin-input-container rounded"></div>
						<div className="loggin-input-container rounded"></div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Loggin);
