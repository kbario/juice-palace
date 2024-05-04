/** @jsxImportSource react */
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export type EventHireInitialToJp = {
  enquirerFullName: string;
  enquirerPreferredName: string;
  enquirerEmail: string;
  enquirerMessage: string;
};

export function EventHireInitialToJP({
  enquirerFullName,
  enquirerPreferredName,
  enquirerEmail,
  enquirerMessage,
}: EventHireInitialToJp) {
  return (
    <Html
      lang="en"
      dir="ltr"
    >
      <Head />
      <Preview>
        {enquirerPreferredName} has filled out the event hire form saying:{" "}
        {enquirerMessage}
      </Preview>
      <Tailwind>
        <Body>
          <Container className="border border-solid border-slate-200 rounded">
            <Section className="bg-slate-200 h-20 flex items-center justify-center">
              <Img
                src={`https://juice-palace.deno.dev/juice-palace-logo.png`}
                alt="Juice Palace Logo"
                width="117"
                height="58"
              />
              ;
            </Section>
            <Section className="p-2">
              <Row>
                <Text className="text-slate-800 text-2xl">
                  Someone wants you!
                </Text>
              </Row>
              <Row>
                <Text className="text-slate-700">Hey Boss,</Text>
                <Text className="text-slate-800">
                  {enquirerFullName} filled out the event form and their message
                  says:
                </Text>
                <Text className="text-slate-800">{enquirerMessage}</Text>
                <Hr></Hr>
                <Text className="text-slate-800">
                  If you're interested, their email is{" "}
                  <Link href={`mailto:${enquirerEmail}`}>{enquirerEmail}</Link>
                </Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

EventHireInitialToJP.PreviewProps = {
  enquirerFullName: "John Mathers",
  enquirerPreferredName: "John",
  enquirerEmail: "jm@gmail.com",
  enquirerMessage: "I want coffee at my kids birthday party",
} satisfies EventHireInitialToJp;

export default EventHireInitialToJP;
