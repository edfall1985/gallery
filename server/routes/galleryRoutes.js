import express from 'express';
import {
  getGallery,
  addGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';

const router = express.Router();

router.get('/dataGallery', getGallery);
router.post('/api/add', addGalleryItem);
router.delete('/api/delete/:index', deleteGalleryItem);

export default router;
