import express, { Router, Request, Response } from 'express';
import * as DeparturesController from '../controllers/DeparturesController';
import * as ConnectionPricesController from '../controllers/ConnectionPricesController';
import * as ConnectionsController from '../controllers/ConnectionsController';
import * as BusStopsController from '../controllers/BusStopController';
import * as SearchConnectionsController from '../controllers/SearchConnectionsController'
import { checkPrivileges } from '../middleware';

const apiRoutes: Router = express.Router();

apiRoutes.get('/departures/:connectionId', DeparturesController.getDepartures);
apiRoutes.post('/departures', checkPrivileges('bus_connections', 'owner_id'), DeparturesController.insertDeparture);
apiRoutes.put('/departures/:id', checkPrivileges('bus_connections', 'owner_id'), DeparturesController.updateDeparture);
apiRoutes.delete('/departures/:id', checkPrivileges('bus_connections', 'owner_id'), DeparturesController.deleteDeparture);

apiRoutes.get('/connection-prices/:connectionId', ConnectionPricesController.getConnectionPrice);
apiRoutes.post('/connection-prices', checkPrivileges('bus_connections', 'owner_id'), ConnectionPricesController.insertConnectionPrice);
apiRoutes.put('/connection-prices/:connectionId', checkPrivileges('bus_connections', 'owner_id'), ConnectionPricesController.updateConnectionPrice);
apiRoutes.delete('/connection-prices/:connectionId', checkPrivileges('bus_connections', 'owner_id'), ConnectionPricesController.deleteConnectionPrice);

apiRoutes.get('/user-connections/:userId', ConnectionsController.getUserConnections);
apiRoutes.get('/connections', ConnectionsController.getConnections);
apiRoutes.post('/connections', checkPrivileges('bus_connections', 'owner_id'), ConnectionsController.insertConnection);
apiRoutes.put('/connections/:id', checkPrivileges('bus_connections', 'owner_id'), ConnectionsController.updateConnection);
apiRoutes.delete('/connections/:id', checkPrivileges('bus_connections', 'owner_id'), ConnectionsController.deleteConnection);

apiRoutes.get('/bus-stops/:connectionId', BusStopsController.getBusStops);
apiRoutes.post('/bus-stops', checkPrivileges('bus_connections', 'owner_id'), BusStopsController.insertBusStop);
apiRoutes.put('/bus-stops/:id', checkPrivileges('bus_connections', 'owner_id'), BusStopsController.updateBusStop);
apiRoutes.delete('/bus-stops/:id', checkPrivileges('bus_connections', 'owner_id'), BusStopsController.deleteBusStop);

apiRoutes.get('/searchconnections', SearchConnectionsController.searchConnections);




export default apiRoutes;
