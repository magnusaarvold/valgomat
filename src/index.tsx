import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Valgomat from "./pages/valgomat";
import Info from "./pages/info";
import { Provider } from "react-redux";
import { store } from "./redux";
import InvalidNotFoundPage from "./components/atoms/invalidNotFoundPage";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}>
                    </Route>
                    <Route path="valgomat" element={<Valgomat />} />
                    <Route path="info" element={<Info />} />
                    <Route path="*" element={<InvalidNotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

