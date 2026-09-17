import express from 'express';
import MascotaController from '../controllers/mascotaController.js';

const router = express.Router()

const controller = new MascotaController();

router.get('/',     controller.getAll  );
router.get('/:id',  controller.getById );
router.post('/',    controller.create  );
router.put('/:id',  controller.update  );
router.delete('/:id', controller.delete);

export default router;