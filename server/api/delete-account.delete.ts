import { getServerSession } from "#auth";
import type { Session } from "next-auth";
import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = (await getServerSession(event)) as Session;
  if (!session.user || !session.user.email) {
    return {
      status: 403,
      body: { error: "Unauthorized" },
    };
  }

  await prisma.user.delete({
    where: {
      id: session.user.id,
    },
  });
  return {
    status: 200,
  };
});
