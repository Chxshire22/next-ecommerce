// I keep forgetting it's called route handlers now
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { db } from "../db/db";

export const GET = async () => {
  const users = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });
  return Response.json({ users });
};
