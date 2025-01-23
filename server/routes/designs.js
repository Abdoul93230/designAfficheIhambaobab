import express from 'express';
import { Design } from '../models/Design.js';

const router = express.Router();

// Get all designs
router.get('/', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single design
router.get('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    res.json(design);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create design
router.post('/', async (req, res) => {
  const design = new Design({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    code: req.body.code
  });

  try {
    const newDesign = await design.save();
    res.status(201).json(newDesign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update design
router.put('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    design.title = req.body.title || design.title;
    design.description = req.body.description || design.description;
    design.category = req.body.category || design.category;
    design.code = req.body.code || design.code;

    const updatedDesign = await design.save();
    res.json(updatedDesign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete design
router.delete('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    await design.deleteOne();
    res.json({ message: 'Design deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const designRoutes = router;