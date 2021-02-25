import React from "react";
import { AuthProvider } from "./context";

// $theme-colors: (
//   "primary": #0074d9,
//   "danger": #ff4136
// );
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from "./page";

const App = props => (
	<AuthProvider>
		<Routes />
	</AuthProvider>
);

export default App;
