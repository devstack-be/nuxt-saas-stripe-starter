import { getServerSession } from "#auth";
import type { Session } from "next-auth";
import { resend } from "~/lib/resend";
import { prisma } from "~/lib/prisma";
import { userNameSchema } from "~/lib/validations/user";
import { render } from "@vue-email/render";
import Test from "~/emails/test.vue";
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
  try {
    const html = await render(Test, {
      title: "some title",
    });

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      html,
    });

    return data;
  } catch (error) {
    return { error };
  }

  return {
    status: 200,
    body: user,
  };
});
