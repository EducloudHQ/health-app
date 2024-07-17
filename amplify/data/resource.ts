import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

export const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

export const generateHaikuFunction = defineFunction({
  entry: "./generateHaiku.ts",
  environment: {
    MODEL_ID,
  },
});

const schema = a.schema({
  generateHaiku: a
    .query()
    .arguments({ prompt: a.string().required() })
    .returns(a.string())
    .authorization((allow) => [
      allow.guest(),
      allow.authenticated(),
      allow.publicApiKey(),
    ])
    .handler(a.handler.function(generateHaikuFunction)),

  Type: a.enum(["PRIVATE", "PUBLIC"]),
  Location: a.customType({
    lat: a.float(),
    long: a.float(),
  }),

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
      pharmacies: a.hasMany("PharmacyDrug", "drugId"),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
    ]),

  Pharmacy: a
    .model({
      pharmacyId: a.id(),
      name: a.string(),
      description: a.string(),
      location: a.ref("Location"),
      imageUrl: a.string(),
      drugs: a.hasMany("PharmacyDrug", "pharmacyId"),
      healthCareProviderId: a.id(),
      healthCareProvider: a.belongsTo(
        "HealthCareProvider",
        "healthCareProviderId"
      ),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.owner(),
    ]),

  PharmacyDrug: a
    .model({
      pharmacyId: a.id().required(),
      drugId: a.id().required(),
      pharmacy: a.belongsTo("Pharmacy", "pharmacyId"),
      drug: a.belongsTo("Drug", "drugId"),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.owner(),
    ]),

  Disease: a
    .model({
      diseaseId: a.id(),
      name: a.string(),
      description: a.string(),
      symptoms: a.string().array(),
      imageUrl: a.string(),
      preventionTips: a.string().array(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.guest().to(["read"]),
      allow.owner(),
    ]),

  HealthCareProvider: a
    .model({
      healthCareProviderId: a.id(),
      name: a.string(),
      description: a.string(),
      imageUrl: a.string(),
      location: a.ref("Location"),
      type: a.ref("Type"),
      pharmacy: a.hasOne("Pharmacy", "healthCareProviderId"),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.owner(),
    ]),

  FirstAide: a
    .model({
      firstAideId: a.string(),
      title: a.string(),
      imageUrl: a.string(),
      description: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.owner(),
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