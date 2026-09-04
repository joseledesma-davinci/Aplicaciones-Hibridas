import express from 'express';
import SubjectController from '../controllers/SubjectController.js';

const router = express.Router()

const controller = new SubjectController();

router.get('/',     controller.getAll  );
router.get('/:id',  controller.getById );
router.post('/',    controller.create  );
router.put('/:id',  controller.update  );
router.delete('/:id', controller.delete);

export default router;