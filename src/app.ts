
import express, { Application} from 'express';
import globalErrorHandler from './app/errors/globalErrorhandler';
import NotFound from './app/shared/not-found';
import router from './app/routes';
import cookieParser from 'cookie-parser'
const app: Application = express();
import cors from 'cors';

// Configure middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS with specific origin
app.use(cors({
origin:[ 'http://localhost:5173','https://cycle-rush.vercel.app'],
  credentials: true
}));

// Parse cookies in requests
app.use(cookieParser());
app.use('/api/v1',router);


app.get('/', (req, res) => {
  res.send('Cycle Rust server running');
});

app.use(NotFound)
app.use(globalErrorHandler)

// app.use((err:any, req:any, res:any, next:any) => {
//   console.log(err)
//     res.status(500).json({
//       success: false,
//       message: err.toString() || "Something went wrong",
//       error: err
//     });
//   });



export default app;
