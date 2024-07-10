import express, { Request, Response } from 'express';
import userRouter from './userRouter';
import productRouter from './productRoute';
import { supplierRouter } from './supplier.routes';
import { clientRouter } from './client.routes';
import { movementRouter } from './movement.routes';
import categoryRouter from './category.routes';
import { movementDetailRouter } from './movement.detail.routes';
import cors from "cors";


const rootRouter = express();


rootRouter.use(express.json());
rootRouter.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "https://drinkventry.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

const server = express.Router();

server.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Root page',
  });
});

rootRouter.use('/', server);
rootRouter.use('/users', userRouter);
rootRouter.use('/products', productRouter);
rootRouter.use('/category', categoryRouter);
rootRouter.use('/supplier', supplierRouter);
rootRouter.use('/clients', clientRouter)
rootRouter.use('/movements', movementRouter)
rootRouter.use('/movement-detail', movementDetailRouter)

export default rootRouter;
