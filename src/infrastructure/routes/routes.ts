import express from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import fileupload from 'express-fileupload';



const router = express();
router.use(fileupload({
    useTempFiles : true
}))

router.use('/user',userRoutes);
router.use('/auth',authRoutes);


export default router;