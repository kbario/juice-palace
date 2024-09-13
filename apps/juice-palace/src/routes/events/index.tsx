import type {
  HTMLInputAutocompleteAttribute,
  HTMLInputTypeAttribute,
} from "@builder.io/qwik";
import { component$, useTask$ } from "@builder.io/qwik";
import {
  EventHireInitialToJP,
  type EventHireInitialToJp,
} from "@juice-palace/transactional/emails/event-hire-admin";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import {
  useForm,
  formAction$,
  valiForm$,
  required,
  toTrimmed,
} from "@modular-forms/qwik";
import { Resend } from "resend";
import {
  email,
  type Input as vInput,
  type StringSchema,
  object,
  string,
  regex,
} from "valibot";
import { Button } from "~/components/ui/button/button";
import Input from "~/components/ui/inputs/input";
import { Textarea } from "~/components/ui/inputs/textarea";

const EventHireFormValidationObj = object({
  enquirerEmail: string([email()]),
  enquirerFullName: string(),
  enquirerMessage: string(),
  // https://codepal.ai/regex-generator/query/NoYcDV0N/validating-australian-phone-numbers
  enquirerPhoneNumber: string([
    regex(
      /^(?:\+?61|0)[2-478](?:\d{8}|\d{9})$/,
      "Invalid Phone Number: Expected an Australian mobile or phone number",
    ),
  ]),
} as const satisfies {
  [k in keyof EventHireInitialToJp]: StringSchema;
});
type EventHireForm = vInput<typeof EventHireFormValidationObj>;

export const useSubmitEventEnquiry = formAction$(
  async (formValues, requestEvent) => {
    const data = formValues as EventHireInitialToJp;
    const key = requestEvent.env.get("JUICE_PALACE_EVENT_HIRE_EMAIL_API_KEY");

    let html: string;
    let message: string;
    let success: boolean;
    // 1. render the email
    try {
      html = EventHireInitialToJP(data);
    } catch (error) {
      html = `Hey Boss,\n${data.enquirerFullName} just filled out the event hire form and said:\n\n${data.enquirerMessage}.\n\nTheir email is <a href="mailto:${data.enquirerEmail}">${data.enquirerEmail}</a> if you want to get in contact with them.`;
    }
    // 2. send the email
    try {
      const resend = new Resend(key);
      if (!import.meta.env.DEV) {
        await resend.emails.send({
          from: "kyle@kbar.io",
          to: import.meta.env.PROD
            ? ["insert juice palace email here"]
            : ["kylebario1@gmail.com"],
          bcc: import.meta.env.PROD ? ["kylebario1@gmail.com"] : undefined,
          subject: "Event Hire Request",
          html,
        });
      }
      message = `Thanks for submitting your event enquiry, ${data.enquirerFullName.split(" ")[0] || data.enquirerFullName}. We will be in touch soon.`;
      success = true;
    } catch (error) {
      message = `Something went wrong on our end.`;
      success = false;
    }

    return {
      data: { success, message },
    };
  },
  valiForm$(EventHireFormValidationObj),
);

export default component$(() => {
  const action = useSubmitEventEnquiry();
  const [, { Form, Field }] = useForm<EventHireForm>({
    loader: {
      value: {
        enquirerEmail: "",
        enquirerFullName: "",
        enquirerMessage: "",
        enquirerPhoneNumber: "",
      },
    },
    //@ts-expect-error
    action,
    validate: valiForm$(EventHireFormValidationObj),
  });

  useTask$(({ track }) => {
    track(() => action.value?.values);
    // const asdf = setTimeout(() => {
    //   if (action.value?.message) action.value.success = false;
    // }, 3000);
    // cleanup(() => clearTimeout(asdf));
  });

  return (
    <div class="flex w-full max-w-sm flex-col gap-4">
      <Form class="flex w-full flex-col gap-3">
        <Field
          name="enquirerFullName"
          transform={[toTrimmed<string>({ on: "input" })]}
          validate={[required<string>("Please enter your name")]}
        >
          {(field, props) => (
            <FormEl
              autocomplete="name"
              field={field}
              label="Full name:"
              props={props}
              type="text"
            />
          )}
        </Field>
        <Field
          name="enquirerEmail"
          validate={[required<string>("Please enter your email")]}
        >
          {(field, props) => (
            <FormEl field={field} label="Email:" props={props} type="email" />
          )}
        </Field>
        <Field
          name="enquirerPhoneNumber"
          validate={[required<string>("Please enter your phone number")]}
        >
          {(field, props) => (
            <FormEl
              field={field}
              label="Phone number:"
              props={props}
              type="tel"
            />
          )}
        </Field>
        <Field
          name="enquirerMessage"
          validate={[
            required<string>("Please enter a description for the event"),
          ]}
        >
          {(field, props) => (
            <FormEl
              field={field}
              label="What's the event?"
              props={props}
              isTextarea
            />
          )}
        </Field>
        <Button type="submit">Send Enquiry</Button>
      </Form>
      <div>{action.isRunning && <p>is running</p>}</div>
      <div>
        {action.value?.response.data?.success && (
          <p>{action.value.response.data.message}</p>
        )}
      </div>
    </div>
  );
});

const FormEl = component$<{
  autocomplete?: HTMLInputAutocompleteAttribute;
  field: FieldStore<Readonly<EventHireInitialToJp>, keyof EventHireInitialToJp>;
  hidden?: boolean;
  isTextarea?: boolean;
  label: string;
  props: FieldElementProps<
    Readonly<EventHireInitialToJp>,
    keyof EventHireInitialToJp
  >;
  type?: HTMLInputTypeAttribute;
}>((props) => {
  return props.isTextarea ? (
    <Textarea
      {...props.props}
      label={props.label}
      error={props.field.error}
      value={props.field.value}
    />
  ) : (
    <Input
      {...props.props}
      autoComplete={props.autocomplete}
      error={props.field.error}
      label={props.label}
      type={props.type}
      value={props.field.value}
    />
  );
});
