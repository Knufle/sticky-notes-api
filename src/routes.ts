import { Router } from 'express';
import StickyNotesController from './controllers/StickyNotesController';

const routes = Router();

routes.get('/sticky-notes', StickyNotesController.index);
routes.get('/sticky-notes/:id', StickyNotesController.show);
routes.post('/sticky-notes', StickyNotesController.create);
routes.delete('/sticky-notes/:id', StickyNotesController.delete);
routes.put('/sticky-notes', StickyNotesController.update);

export default routes;