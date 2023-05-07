import { DataFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { sendMail } from "~/nodemailer.server";

export const action = async ({ request, params }: DataFunctionArgs) => {
  const formData = await request.formData();
  const { name, email, service, message } = Object.fromEntries(formData);
  invariant(typeof name === "string", "Expected name to be a string");
  invariant(typeof email === "string", "Expected email to be a string");
  invariant(typeof service === "string", "Expected service to be a string");
  invariant(typeof message === "string", "Expected message to be a string");
  invariant(name.length >= 0, "Expected name to be a non-empty string");
  invariant(email.length >= 0, "Expected email to be a non-empty string");
  invariant(service.length >= 0, "Expected service to be a non-empty string");
  invariant(email.includes("@"), "Expected email to be a valid email address");
  invariant(email.includes("."), "Expected email to be a valid email address");
  invariant(!service.includes("Choose a Service"), `Expected service to be a valid service ${service}`);
  const to = process.env.user_email;
  invariant(to, "Expected user_email to be set");
  const from = process.env.user_fromEmail;
  invariant(from, "Expected user_fromEmail to be set");
  const text = `
    Name: ${name}
    Email: ${email}
    Service: ${service}
    Message: ${message}
  `
  //send email to myself
  await sendMail({
    to,
    subject: `New Lead from site. Name: ${name}, Service: ${service}`,
    from,
    text
  });
  return { message: "success" }
}