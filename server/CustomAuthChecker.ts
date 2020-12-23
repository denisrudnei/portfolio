import { AuthChecker } from 'type-graphql';

import { CustomExpressContext } from './types/CustomSession';

const customAuthChecker: AuthChecker<CustomExpressContext> = ({
  root, args, context, info,
}) => {
  const { req } = context;
  return !!req.session!.authUser;
};

export default customAuthChecker;
