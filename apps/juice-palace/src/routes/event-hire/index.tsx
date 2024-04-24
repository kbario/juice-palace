import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";

export const useAddUser = routeAction$(async (data, requestEvent) => {
  console.log(data, requestEvent);
  console.log(requestEvent.env.get("JUICE_PALACE_EVENT_HIRE_EMAIL_API_KEY"));
  // const sendEmail = async (
  //     details: { [k: string]: string },
  //     key: string,
  //   ): Promise<boolean> => {
  //     let email;
  //     try {
  //       email = makeEmail(details);
  //     } catch (err) {
  //       //@ts-ignore
  //       details["error"] = err;
  //       email = JSON.stringify(details);
  //     }
  //     const res = await fetch("https://api.resend.com/emails", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${key}`,
  //       },
  //       body: JSON.stringify({
  //         from: "kyle@kbar.io",
  //         to: ["kylebario1@gmail.com", "info@highwycombetavern.com.au"],
  //         subject: "Gold Card Member Request",
  //         html: email,
  //       }),
  //     });

  //     return res.ok;
  //   };
  return {
    success: true,
  };
});

export default component$(() => {
  const action = useAddUser();
  return (
    <div>
      Event Hire
      <Form action={action}>
        <input name="name" />
        <button type="submit">Add user</button>
        {action.value?.success && <p>User added successfully</p>}
      </Form>
    </div>
  );
});
