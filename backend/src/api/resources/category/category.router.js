import express from 'express';
import categoryController from './category.controller';
import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';

export const categoryRouter = express.Router();
categoryRouter.route('/getAllCategory').get(sanitize(), jwtStrategy, categoryController.getCategoryList);
categoryRouter.route('/getAllSubCategory').get(sanitize(), jwtStrategy, categoryController.getSubCategoryList);
categoryRouter.route('/getAllSubChildCategory').get(sanitize(), jwtStrategy, categoryController.getSubChildCategoryList);
categoryRouter.route('/create').post(sanitize(),validateBody(schemas.category), jwtStrategy, categoryController.addCategory);
categoryRouter.route('/list').get(sanitize(),jwtStrategy, categoryController.getList);
categoryRouter.route('/getCategoryById').get(sanitize(), jwtStrategy, categoryController.getCategoryById);
categoryRouter.route('/create-sub').post(sanitize(),jwtStrategy, categoryController.addSubCategory);
categoryRouter.route('/create-sub-child').post(sanitize(), jwtStrategy,categoryController.addSubChildCategory);
categoryRouter.route('/update').post(sanitize(),jwtStrategy,categoryController.updateCategory);

//category list 
categoryRouter.route('/main-list').get(sanitize(), jwtStrategy, categoryController.getMainList);
categoryRouter.route('/main-list/update').post(sanitize(),jwtStrategy, categoryController.getMainListUpdate);
//sub category list 
categoryRouter.route('/sub-list').get(sanitize(), jwtStrategy, categoryController.getSubCategory);
categoryRouter.route('/sub-list/update').post(sanitize(), jwtStrategy,categoryController.getSubCatListUpdate);
categoryRouter.route('/sub-list/delete').delete(sanitize(),jwtStrategy, categoryController.getDeletedSubCatList);
//child category
categoryRouter.route('/child/deleteById').delete(sanitize(),jwtStrategy, categoryController.deleteCategory);

//get all category by slug
categoryRouter.route('/cn/list').get(sanitize(),jwtStrategy,categoryController.getAllCategoryBySlug);
categoryRouter.route('/c/:slug/:id').get(sanitize(),jwtStrategy,categoryController.filterByCategoryList);

//Searching filter category
categoryRouter.route('/catlogsearch/child-category').post(sanitize(),jwtStrategy,categoryController.getFilterbyCategory);
categoryRouter.route('/catlogsearch/product').post(sanitize(),jwtStrategy, categoryController.getProductBySubcategory);

//mobile view
categoryRouter.route('/mobile/getAllCategory').get(sanitize(),categoryController.getAllMobileCategory);
categoryRouter.route('/mobile/getAllSubCategoryById').post(sanitize(),categoryController.getAllSubCategoryById);















