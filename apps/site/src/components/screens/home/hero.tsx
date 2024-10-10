import { createMemo, For, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import client from "../../../../tina/__generated__/client";
import type {
  HomeConnectionQuery,
  HomeHeroSection,
} from "../../../../tina/__generated__/types";
import { createTina, tinaField } from "../../../../tina/tina-helpers";
import { Link } from "../../shared/link/link";

export default (props: {
  data: Awaited<ReturnType<typeof client.queries.homeConnection>>;
}) => {
  const initialData = createTina<HomeConnectionQuery>(props.data).data;
  const data = createMemo(
    () =>
      initialData()?.homeConnection?.edges?.flatMap(
        (x) => x?.node?.heroSection,
      )[0],
  );
  return (
    <section class="h-viewi lg:flex-row-reverse lg:gap-8 flex gap-4 flex-col items-center justify-center">
      {/* <Image
        src={mainImage}
        width={300}
        alt=''
      /> */}
      <div data-tina-field={tinaField(data(), "text")}>
        <T qwer={data()?.text} />
      </div>
      <div class="flex gap-4 flex-col items-center justify-center lg:max-w-[500px]">
        <h1 class="text-center">
          The <span class="em">Perfect</span> Cup of Coffee.
        </h1>
        <p class="text-center">
          A coffee van based on Freo’s South Beach dog beach
        </p>
        <div class="flex gap-2">
          <Link class="" appearance="primary" href="/menu">
            See our menu
          </Link>
          <Link class="" href="/contact">
            Find Us
          </Link>
        </div>
      </div>
    </section>
  );
};

const T = (props: { qwer: HomeHeroSection["text"] }) => {
  const A = createMemo(() => (
    <For each={props.qwer.children}>{(child) => <T qwer={child} />}</For>
  ));
  return (
    <Switch
      fallback={
        <Dynamic component={props.qwer?.type}>
          <A />
        </Dynamic>
      }>
      <Match when={props.qwer?.type === "root"}>
        <A />
      </Match>
      <Match when={props.qwer?.type === "text"}>{props.qwer.text}</Match>
    </Switch>
  );
};
