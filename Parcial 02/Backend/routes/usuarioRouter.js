import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router()

const controller = new UsuarioController();

router.get('/', authMiddleware, roleMiddleware, controller.getAll  );
router.get('/me', authMiddleware, controller.getMe );
router.get('/:id', authMiddleware, roleMiddleware, controller.getById );
router.post('/', authMiddleware, roleMiddleware, controller.create  );
router.put('/:id', authMiddleware, roleMiddleware, controller.update  );
router.delete('/:id', authMiddleware, roleMiddleware, controller.delete);
router.post('/profileimage', authMiddleware, upload.single('profileImage'), controller.uploadProfileImage  );

export default router;