import React from "react";
import { AuthProvider, ProjectProvider, UsersProvider } from "./context";

// $theme-colors: (
//   "primary": #0074d9,
//   "danger": #ff4136
// );
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./page";

const App = props => (
	<AuthProvider>
		<ProjectProvider>
			<UsersProvider>
				<Routes />
			</UsersProvider>
		</ProjectProvider>
	</AuthProvider>
);

export default App;
