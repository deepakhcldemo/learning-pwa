import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Apollo Modules & Services
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';

// GraphQL uri const for creating graphql connection
const URI = environment.graphQlUrl;

// Export modules const for declare all modules here
const MODULES = [ HttpClientModule, ApolloModule, HttpLinkModule ];

@NgModule({
  exports: [ ...MODULES ]
})
export class GraphQLModule {
  constructor(public apollo: Apollo, public httpLink: HttpLink) {

    // create Apollo Instance and connect to end point
    apollo.create(
        {
            link: httpLink.create({ uri: URI }),
            cache: new InMemoryCache(),
        }
    );
  }
}
