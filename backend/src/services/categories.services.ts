import { CreateCategoryDto } from '../dto/createCategory.dto';
import { UpdateCategoryDto } from '../dto/updateCategory.dto';
import Categoria, { ICategory } from '../models/categoria.model';


const findAllCategories = async (): Promise<ICategory[]> => {
  const categories = await Categoria.findAll();
  return categories as ICategory[];
};

const insertCategory = async (bodyCategory: CreateCategoryDto): Promise<ICategory | string> => {

      const { nombre } = bodyCategory;
      const category = await Categoria.create({
        nombre,
      });
  
      return category as ICategory;
  };
  
const getByIdCategory = async (id: number): Promise<ICategory | string> => {
  const category = await Categoria.findOne({ where: { categoria_id: id } });
  if (!category) {
    return 'No se encuentra Id';
  }
  return category  as ICategory;
};

const updateByIdCategory = async (id: number, bodyCategory: UpdateCategoryDto): Promise<ICategory | string> => {
  const { nombre } = bodyCategory;
  const findCategory = await Categoria.findOne({ where: { categoria_id: id } });
  if (!findCategory) {
    return 'No se encuentra Id';
  }
  const category = await Categoria.update(
    {
      nombre
    },
    { where: { categoria_id: id } },
  );

  if (!category) {
    return 'No se pudo actualizar';
  }

  const updateCategory = await Categoria.findOne({ where: { categoria_id: id } });

  if (!updateCategory) {
    return 'No se pudo actualizar';
  }

  return updateCategory  as ICategory;
};

const deleteByIdCategory = async (id: number): Promise<string> => {
  const findCategory = await Categoria.findOne({ where: { categoria_id: id } });
  if (!findCategory) {
    return 'No se encuentra Id';
  }
  const removeCategory = await Categoria.destroy({ where: { categoria_id: id } });
  if (!removeCategory) {
    return 'No se pudo eliminar';
  }
  return 'Eliminado';
};

export { findAllCategories, insertCategory, getByIdCategory, updateByIdCategory, deleteByIdCategory };