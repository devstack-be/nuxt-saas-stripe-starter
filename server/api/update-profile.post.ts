import { getServerSession } from "#auth";
import type { Session } from "next-auth";
import { prisma } from "~/lib/prisma";
import { userNameSchema } from "~/lib/validations/user";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = (await getServerSession(event)) as Session;
  if (!session.user || !session.user.email) {
    return {
      status: 403,
      body: { error: "Unauthorized" },
    };
  }
  const { name } = userNameSchema.parse(body);

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });

  return {
    status: 200,
    body: user,
  };
});
