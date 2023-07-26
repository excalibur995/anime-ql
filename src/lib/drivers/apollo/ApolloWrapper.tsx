import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";
import { client } from "./apollo-client";

export default function ApolloWrapper(props: PropsWithChildren) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
