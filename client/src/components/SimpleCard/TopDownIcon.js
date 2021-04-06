
import React, { Component } from "react";
import {
	AiOutlineToTop,
} from "react-icons/ai";
import {
    BiArrowToBottom
} from "react-icons/bi";

const TopDownIcon = ({ifTopped}) =>{


    if (!ifTopped){
        return <AiOutlineToTop></AiOutlineToTop>
    }else{
        return <BiArrowToBottom></BiArrowToBottom>
    }

}

export default TopDownIcon;