import {
  ApiError,
  logger,
  task,
  wait,
  configure,
  runs,
} from "@trigger.dev/sdk/v3";
import dotenv from "dotenv";

dotenv.config();

// Using secretKey authentication
configure({
  secretKey: process.env.TRIGGER_SECRET_KEY, // starts with tr_dev_ or tr_prod_
});

export const helloWorldTask = task({
  id: "hello-world",
  run: async (payload: any, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    await wait.for({ seconds: 1 });

    return {
      message: "Hello, world!",
    };
  },
});

export const getHelloWorldRunTask = task({
  id: "get-hello-world-run",
  run: async (payload: any, { ctx }) => {
    logger.log("Get hello world run!", { payload, ctx });

    await wait.for({ seconds: 1 });
    let run = null;
    try {
      run = await runs.retrieve("run_mvyd4o8v1o9321k4r3mxr");
      logger.log(`Run: ${run}`);
    } catch (error: any) {
      if (error instanceof ApiError) {
        logger.error(
          `API error: ${error.status}, ${error.headers}, ${error.message}`,
        );
      } else {
        logger.error(`Unknown error: ${error.message}`);
      }
    }

    return run;
  },
});
