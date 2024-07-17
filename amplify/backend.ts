import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data, MODEL_ID, generateHaikuFunction } from "./data/resource.js";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { sayHello } from "./functions/bedrock-lambda-fn/resource";
import { storage } from "./storage/resource.js"

export const backend = defineBackend({
  auth,
  data,
  storage,
  generateHaikuFunction,
  sayHello,
});

backend.generateHaikuFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:*"],
    resources: [`arn:aws:bedrock:*::foundation-model/${MODEL_ID}`],
  })
);
