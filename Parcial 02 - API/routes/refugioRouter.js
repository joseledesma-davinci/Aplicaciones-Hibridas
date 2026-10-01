import express from 'express';
import RefugioController from '../controllers/refugioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router()

const controller = new RefugioController();

router.get('/', authMiddleware, controller.getAll  );
router.get('/:id', authMiddleware, controller.getById );
router.post('/', authMiddleware, roleMiddleware, controller.create  );
router.put('/:id', authMiddleware, roleMiddleware, controller.update  );
router.delete('/:id', authMiddleware, roleMiddleware, controller.delete);

export default router;