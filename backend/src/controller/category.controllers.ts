import { Request, Response } from 'express';
import { deleteByIdCategory, findAllCategories, getByIdCategory, insertCategory, updateByIdCategory } from '../services/categories.services';


const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await findAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
  }
};

const postCategory = async (req: Request, res: Response) => {
  try {
    const bodyCategory = req.body;
    const category = await insertCategory(bodyCategory);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await getByIdCategory(parseInt(id));
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const category = await updateByIdCategory(parseInt(id), { nombre });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
  }
};

const deletecategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await deleteByIdCategory(parseInt(id));
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
  }
};

export { getCategories, postCategory, getCategoryById, updateCategory, deletecategory };