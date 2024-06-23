"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles/App.css");
const LoginForm_1 = __importDefault(require("../components/LoginForm"));
const DeparturesTable_1 = __importDefault(require("../components/DeparturesTable"));
const ConnectionsSearchBar_1 = __importDefault(require("../components/ConnectionsSearchBar"));
function App() {
    return (<div className="App">
      <LoginForm_1.default />
      <ConnectionsSearchBar_1.default />
      <DeparturesTable_1.default connectionId={1}/>

      
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map