import {
  type ClientSchema,
  a,
  defineData,
} from "@aws-amplify/backend";

const schema = a.schema({

  User: a
    .model({
      userId: a.id(),
      cognitoId: a.string(),
      username: a.string(),
      phoneNumber: a.phone(),
      email: a.email(),
      firstName: a.string(),
      lastName: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.owner(),
    ]),

  Drug: a
    .model({
      drugId: a.id(),
      name: a.string(),
      description: a.string(),
      imageUrl: a.string(),
      pharmacyId: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
    ]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});