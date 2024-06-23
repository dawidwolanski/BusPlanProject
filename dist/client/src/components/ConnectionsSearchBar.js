"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const Options = ({ connections }) => {
    console.log(connections);
    return (<div>
            {connections.map(connection => <button key={connection.id}>{connection.connection_name}</button>)}
        </div>);
};
const ConnectionsSearchBar = () => {
    const { register, setValue } = (0, react_hook_form_1.useForm)();
    const [connections, setConnections] = (0, react_1.useState)([]);
    const [timeoutId, setTimeoutId] = (0, react_1.useState)(null);
    const handleInputChange = async (value) => {
        setValue('searchTerm', value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3001/api/searchconnections?searchTerm=${encodeURIComponent(value)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setConnections(result);
            }
            catch (error) {
                console.error('Search error:', error);
            }
        }, 300); // 300ms delay
        setTimeoutId(newTimeoutId);
    };
    return (<div className="container mt-5">
      <form>
        <input type="text" className="form-control mb-3" placeholder="Search connections..." {...register('searchTerm')} onChange={(e) => handleInputChange(e.target.value)}/>
      </form>
      <Options connections={connections}/>
    </div>);
};
exports.default = ConnectionsSearchBar;
//# sourceMappingURL=ConnectionsSearchBar.js.map