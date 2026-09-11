import express from 'express';
import RefugioController from '../controllers/refugioController.js';

const router = express.Router()

const controller = new RefugioController();

router.get('/',     controller.getAll  );
router.get('/:id',  controller.getById );
router.post('/',    controller.create  );
router.put('/:id',  controller.update  );
router.delete('/:id', controller.delete);

export default router;