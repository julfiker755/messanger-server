import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';


const router = Router();

const moduleRoues = [
  {
    path: '/auth',
    route:userRoutes,
  },
  // {
  //   path: '/product',
  //   route: productRoutes,
  // },{
  //   path: '/wish',
  //   route:wishRoutes,
  // },{
  //   path: '/cart',
  //   route:cartRoutes,
  // }
];

moduleRoues.forEach((route) => router.use(route.path, route.route));

export default router;
