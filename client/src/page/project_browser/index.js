import React, { useState } from "react";
import "./style.css";
import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../components/layout";

const ProjectBrowser = (props) => {

  const compare = (p1, p2) => {
    if (p1.topped === p2.topped) {
      //if tie, sort by project id
      return p1.id > p2.id ? -1 : 1;
    } else {
      //if p1 is topped but p2 isn't
      if (p1.topped) {
        return -1;
      } else {
        return 1;
      }
    }
  };
  //the data that is actually displayed on the browsing page
  const [displayData, setDisplayData] = useState(props.projects.sort(compare));

  //the function used to respond to search request, used in SearchBar Component
  const filterData = (searchContent) => {
    if (searchContent === "") {
      setDisplayData(props.projects);
    } else {
      setDisplayData(
        props.projects.filter((project) => {
          return project.name.includes(searchContent);
        })
      );
    }
  };

  const sordData = () => {
    setDisplayData([...displayData].sort(compare));
  };

  const removeData = (project) => {
    setDisplayData(
      displayData.filter((item) => {
        return item.id !== project.id;
      })
    );
  };

  return (
    <div>
      <Layout>
        <div className="project-brw-container">
          <div className="project-brw-search-container">
            <SearchBar filterFunction={filterData} pageName={"project"} />
          </div>
          <SimpleList
            isAdmin={props.isAdmin}
            pathname={"/project"}
            data={displayData}
            isProject={true}
            sortFunction={sordData}
            removeFunction={removeData}
          />
        </div>
      </Layout>
    </div>
  );
};

export default ProjectBrowser;
