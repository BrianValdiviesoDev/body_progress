import { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';

export default function expressConfig(app: Express) {
	const auth0_identifier = process.env.AUTH0_AUDIENCE || 'http://localhost:3000';
	const auth0_app_domain = process.env.AUTH0_DOMAIN || 'https://dev-0ehkzz5khsay0kir.us.auth0.com/';

	const corsOptions = {
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	};
	app.use(cors(corsOptions));

	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(
		bodyParser.urlencoded({
			limit: '50mb',
			extended: true,
			parameterLimit: 50000,
		})
	);
	
	const checkJwt = auth({
		audience: auth0_identifier,
		issuerBaseURL: auth0_app_domain,
	});
	app.use(checkJwt);

	app.use((req, res, next) => {
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, OPTIONS, PUT, PATCH, DELETE'
		);
		// Request headers you wish to allow
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
		);
		next();
	});
	app.use(morgan('dev'));
}