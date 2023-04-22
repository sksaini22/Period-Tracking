import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Router } from "./src/routes/Router";

const App = () => {
  return (
      <PaperProvider>
        <Router />
      </PaperProvider>
  );
};

export default App;
