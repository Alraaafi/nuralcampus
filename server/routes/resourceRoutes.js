// const express = require('express');
// const router = express.Router();
// const resourceController = require('../controllers/resourceController');
// const authMiddleware = require('../middleware/auth');

// router.post('/upload', authMiddleware, resourceController.uploadResource);
// router.get('/', resourceController.getResources);
// router.get('/top-contributors', resourceController.getTopContributors);
// router.get('/:id', resourceController.getResourceById);
// router.put('/:id/reaction', authMiddleware, resourceController.addReaction);

// module.exports = router;













//v4
const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/auth');

router.post('/upload', authMiddleware, resourceController.uploadResource);
router.get('/', resourceController.getResources);
router.get('/top-contributors', resourceController.getTopContributors);
router.get('/:id', resourceController.getResourceById);
router.put('/:id/reaction', authMiddleware, resourceController.addReaction);
router.get('/:id/check-reaction', authMiddleware, resourceController.checkUserReaction);

module.exports = router;