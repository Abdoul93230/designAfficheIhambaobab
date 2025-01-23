import express from 'express';
import { Schedule } from '../models/Schedule.js';
import { Design } from '../models/Design.js';

const router = express.Router();

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('designId')
      .sort({ startDate: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get schedules by date range
router.get('/range', async (req, res) => {
  try {
    const { start, end } = req.query;
    const schedules = await Schedule.find({
      startDate: { $gte: new Date(start) },
      endDate: { $lte: new Date(end) }
    }).populate('designId');
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get schedules statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Schedule.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalViews: { $sum: '$metrics.views' },
          totalLikes: { $sum: '$metrics.likes' },
          totalShares: { $sum: '$metrics.shares' },
          totalClicks: { $sum: '$metrics.clicks' }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create schedule
router.post('/', async (req, res) => {
  try {
    const design = await Design.findById(req.body.designId);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    const schedule = new Schedule({
      title: req.body.title,
      designId: req.body.designId,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      status: req.body.status || 'scheduled',
      platform: req.body.platform,
      audience: req.body.audience || 'all'
    });

    const newSchedule = await schedule.save();
    const populatedSchedule = await Schedule.findById(newSchedule._id).populate('designId');
    res.status(201).json(populatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update schedule
router.put('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    if (req.body.designId) {
      const design = await Design.findById(req.body.designId);
      if (!design) {
        return res.status(404).json({ message: 'Design not found' });
      }
      schedule.designId = req.body.designId;
    }

    // Mise à jour des champs de base
    schedule.title = req.body.title || schedule.title;
    schedule.startDate = req.body.startDate ? new Date(req.body.startDate) : schedule.startDate;
    schedule.endDate = req.body.endDate ? new Date(req.body.endDate) : schedule.endDate;
    schedule.status = req.body.status || schedule.status;
    schedule.platform = req.body.platform || schedule.platform;
    schedule.audience = req.body.audience || schedule.audience;

    // Mise à jour des métriques si fournies
    if (req.body.metrics) {
      schedule.metrics = {
        ...schedule.metrics,
        ...req.body.metrics
      };
    }

    const updatedSchedule = await schedule.save();
    const populatedSchedule = await Schedule.findById(updatedSchedule._id).populate('designId');
    res.json(populatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete schedule
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    await schedule.deleteOne();
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const scheduleRoutes = router;