import React from "react";
import { AuthProvider } from "./context";

import "./App.css";
import Routes from "./page";

const App = props => (
	<AuthProvider>
		<Routes />
	</AuthProvider>
);

export default App;