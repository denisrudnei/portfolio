import { AuthChecker } from 'type-graphql';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

const customAuthChecker: AuthChecker<ExpressContext> = ({
  root, args, context, info,
}) => {
  const { req } = context;
  return !!req.session!.authUser;
};

export default customAuthChecker;
