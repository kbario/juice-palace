import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import EventHireInitialToJP from "@juice-palace/transactional/emails/event-hire-admin";
import { renderAsync } from "@react-email/render";

export const useAddUser = routeAction$(async (data, requestEvent) => {
  const key = requestEvent.env.get("JUICE_PALACE_EVENT_HIRE_EMAIL_API_KEY");
  let html: string;
  let message: string;
  try {
    html = await renderAsync(
      EventHireInitialToJP({
        enquirerFullName: "John Mathers",
        enquirerPreferredName: "John",
        enquirerEmail: "jm@gmail.com",
        enquirerMessage: "I want coffee at my kids birthday party",
      }),
    );
    message = "good email";
  } catch (error) {
    console.log(error);
    html = JSON.stringify({
      enquirerFullName: "John Mathers",
      enquirerPreferredName: "John",
      enquirerEmail: "jm@gmail.com",
      enquirerMessage: "I want coffee at my kids birthday party",
    });
    message = "bad email";
  }
  if (import.meta.env.PROD) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from: "kyle@kbar.io",
        to: ["kylebario1@gmail.com"],
        subject: "Event Hire Request",
        html,
      }),
    });
    message = res.ok ? "good" : "bad";
  } else {
    // const res = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${key}`,
    //   },
    //   body: JSON.stringify({
    //     from: "kyle@kbar.io",
    //     to: ["kylebario1@gmail.com"],
    //     subject: "Event Hire Request",
    //     html,
    //   }),
    // });
    // message = res.ok ? "good" : "bad";
  }

  return {
    success: true,
    message,
  };
});

export default component$(() => {
  const action = useAddUser();

  useVisibleTask$(({ track, cleanup }) => {
    track(() => action.value?.success);
    const asdf = setTimeout(() => {
      if (action.value?.message) action.value.success = false;
    }, 3000);
    cleanup(() => clearTimeout(asdf));
  });

  return (
    <div>
      Event Hire
      <Form action={action}>
        <input name="name" />
        <button type="submit">Add user</button>
        {action.value?.success && <p>{action.value.message}</p>}
      </Form>
    </div>
  );
});
