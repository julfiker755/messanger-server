import { Server } from "http";
import app from "./main";
import config from "@/config";

(async () => {
	try {
		const server: Server = app.listen(config.port, () => {
			console.log(`Server is running ${config.port}`);
		});

		// uncaughtException
		process.on("uncaughtException", (error) => {
			if (server) {
				server.close(() => {
					console.info("Server Close");
				});
			}
			process.exit(1);
		});
		// unhandledRejection
		process.on("unhandledRejection", (error) => {
			if (server) {
				server.close(() => {
					console.info("Server Close");
				});
			}
			process.exit(1);
		});
	} catch (err: any) {
		console.log(err);
	}
})();
