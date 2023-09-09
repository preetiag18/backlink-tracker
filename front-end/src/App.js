import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddnewUrl from "./components/AddnewUrl/AddnewUrl";
import EnhancedTable from "./components/UrlTableV2/UrlTableV2";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EnhancedTable />} />
          <Route path="addnew" element={<AddnewUrl />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
