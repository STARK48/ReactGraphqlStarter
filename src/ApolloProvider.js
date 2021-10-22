import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {HttpLink} from 'apollo-link-http';
import { split} from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import {setContext} from 'apollo-link-context';
import { GRAPHQL_URL } from './config';



const wsLink = new WebSocketLink({
    uri: 'ws://localhost:5000/graphql',
    options: {
      reconnect: true,
    }
  });
  
const httpLink = new HttpLink ({
    uri:GRAPHQL_URL
});


const authLink = setContext(()=>{
  const token = localStorage.getItem('jwtToken');
  return {
    headers:{
      Authorization :token ? `Bearer ${token}`:''
    }
  }
})







const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

const client = new ApolloClient({    
    cache:new InMemoryCache(),
    //link:httpLink
    link:authLink.concat(link)
});

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);