import "reflect-metadata";
import { describe, expect, it } from "@jest/globals";
import { graphql } from "graphql";
import { buildSchema } from "type-graphql";
import { ComposerResolver } from "../ComposerResolver";

describe('ComposerResolver', () => {
  it('successfully resolves query', async () => {
    const query = `
      query {
        composers {
          name        
        }      
      }
    `;
    const schema = await buildSchema({
      resolvers: [ComposerResolver],
    });
    const result = await graphql(schema, query);
    expect(result.errors).toBeUndefined();
    expect((result.data as any).composers[0].name).toEqual("Richard Wagner");
  });
});