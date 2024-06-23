"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const client_1 = __importDefault(require("react-dom/client"));
require("./styles/index.css");
const App_1 = __importDefault(require("./pages/App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const Panel_1 = __importDefault(require("./pages/Panel"));
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_1.default.StrictMode>
    
    <react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path='/' element={<App_1.default />}></react_router_dom_1.Route>
        <react_router_dom_1.Route path='/panel' element={<Panel_1.default />}></react_router_dom_1.Route>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>

  </react_1.default.StrictMode>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
//# sourceMappingURL=index.js.map