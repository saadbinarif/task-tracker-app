const express = require('express')
const {getTags, deleteTag, createTag} = require('../controllers/tagController')

const router = express.Router();    


router.get('/', getTags)

router.post('/', createTag)

router.delete('/:id', deleteTag)

module.exports = router
