const express = require('express');
const { body } = require('express-validator');
const Report = require('../models/Report');
const {
  createReport,
  getMyReports,
  getReportById,
  getMyStats,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.use(protect); 
router.post(
  '/',
  upload.array('evidence', 3),
  [
    body('incidentType').isIn(Report.INCIDENT_TYPES).withMessage('Invalid incident type'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('incidentDate').isISO8601().withMessage('A valid incident date is required'),
    body('amountLost').optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage('Amount lost must be a positive number'),
  ],
  createReport
);

router.get('/my', getMyReports);
router.get('/stats/summary', getMyStats);
router.get('/:id', getReportById);

module.exports = router;
