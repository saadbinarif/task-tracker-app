const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const tryCatch = require('../middlewares/tryCatch');
const {getTags, deleteTag, createTag} = require('../controllers/tagController')

const router = express.Router();    


router.use(requireAuth)
router.get('/', tryCatch(getTags))

router.post('/', tryCatch(createTag))

router.delete('/:id', tryCatch(deleteTag))

module.exports = router
