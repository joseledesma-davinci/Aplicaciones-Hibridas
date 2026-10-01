import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router()

const controller = new UsuarioController();

router.get('/', authMiddleware, controller.getAll  );
router.get('/:id', authMiddleware, controller.getById );
router.post('/', authMiddleware, controller.create  );
router.put('/:id', authMiddleware, controller.update  );
router.delete('/:id', authMiddleware, controller.delete);

export default router;