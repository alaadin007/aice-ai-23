import { Router } from 'express';
import { calculateProficiency } from '../utils/proficiencyCalculator';

const router = Router();

// Get proficiency level for a subject
router.get('/:studentId/:subjectId', async (req, res) => {
  try {
    const { studentId, subjectId } = req.params;
    
    const proficiency = await calculateProficiency(studentId, subjectId);
    res.json(proficiency);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch proficiency data' });
  }
});

// Update proficiency after assessment
router.post('/:studentId/:subjectId', async (req, res) => {
  try {
    const { studentId, subjectId } = req.params;
    const { assessmentResults } = req.body;

    // TODO: Update proficiency level
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update proficiency' });
  }
});

export const proficiencyRouter = router;