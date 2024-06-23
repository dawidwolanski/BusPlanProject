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
const DeparturesTable = ({ connectionId }) => {
    const [departures, setDepartures] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchDepartures = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3001/api/departures/${connectionId}`); // mozna pogrupowac po godzinach
                if (!response.ok) {
                    throw new Error('Failed to fetch departures');
                }
                const data = await response.json();
                setDepartures(data);
            }
            catch (error) {
                setError(error.message);
            }
        };
        fetchDepartures();
    }, [connectionId]);
    const renderDepartures = (day) => {
        return departures
            .filter(departure => departure.days === day)
            .map(departure => (<tr>
          <td>{`${departure.departure_hour}:${departure.departure_minutes}`}</td>
        </tr>));
    };
    return (<div className="container mt-5">
      <h2>Departure Times</h2>
      {error && <p className="text-danger">{error}</p>}
      {!error && (<>
          <h3>Monday to Friday</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {renderDepartures('week')}
            </tbody>
          </table>

          <h3>Saturday</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {renderDepartures('saturday')}
            </tbody>
          </table>

          <h3>Sunday</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {renderDepartures('sunday')}
            </tbody>
          </table>
        </>)}
    </div>);
};
exports.default = DeparturesTable;
//# sourceMappingURL=DeparturesTable.js.map