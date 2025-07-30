import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: "**/*.tsx",
  generates: {
    "graphql/types.d.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: { typesPrefix: "Type", printFieldsOnNewLines: true },
    },
    "graphql/hooks.ts": {
      plugins: [
        { add: { content: "import * as TypesHooks from './types'" } },
        "typescript-react-query",
      ],
      config: {
        fetcher: {
          func: "@mobilestockweb/graphql-axios-fetcher#fetcherReactQuery",
        },
        reactQueryVersion: 5,
        debupeFragments: true,
        preserveComments: true,
        typesPrefix: "Type",
        importOperationTypesFrom: "TypesHooks",
      },
    },
    "graphql/genericSdk.ts": {
      plugins: [
        { add: { content: "import * as TypesHooks from './types'" } },
        "typescript-generic-sdk",
      ],
      config: {
        noExport: true,
        documentMode: "string",
        typesPrefix: "Type",
        importOperationTypesFrom: "TypesHooks",
      },
    },
    "graphql/index.ts": {
      plugins: [
        {
          add: {
            content: [
              "import { baseFetcher } from '@mobilestockweb/graphql-axios-fetcher'\n",
              "import { getSdk, Requester } from './genericSdk'\n",
              "export * from './hooks'\n",
              "export const gqlClient = getSdk(baseFetcher as Requester)",
            ],
          },
        },
      ],
    },
  },
};

export default config;
