import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { chatRoutes } from '../modules/chat/chat.route';

const router = Router();

const moduleRoues = [
  {
    path: '/auth',
    route: userRoutes,
  },
  { 
    path: '/chat',
    route: chatRoutes
  },
];

moduleRoues.forEach((route) => router.use(route.path, route.route));

export default router;
