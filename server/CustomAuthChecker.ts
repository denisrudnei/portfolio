import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { AuthChecker } from 'type-graphql';

const customAuthChecker: AuthChecker<ExpressContext> = ({
  root, args, context, info,
}) => {
  const { req } = context;
  return !!req.session!.authUser;
};

export default customAuthChecker;
