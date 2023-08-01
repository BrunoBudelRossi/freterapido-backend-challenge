import { Router } from 'express';
import quoteController from 'interface/controllers/quoteController';
import { quoteValidator } from 'infrastructure/validator/quoteValidator';
import validate from 'infrastructure/validator/validator';

const router = Router();

router
	.post('/api/quote', quoteValidator(), validate, quoteController.create);

router
	.get('/api/metrics', quoteController.get);

// Request made to non-existent resource
router.use((req, res) => {
	res.status(404).end();
});

export default router;
