import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

// Product data interface to tell query return data will be this shape
import { ProgramHierarchies } from '../models/program-hierarchies.model';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService extends Query<ProgramHierarchies> {
  document = gql`
    query ScoutHierarchyForProduct($ids: [Int]!) {
      product(ids: $ids) {
        product {
          productId
          productDisplayName
          program {
            programId
            programName
            variant{
              variantName
            }
            navigation
          }
        }
      }
    }`;
}
