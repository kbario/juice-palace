import { getImage } from "astro:assets";
import {
  createMemo,
  createResource,
  For,
  Match,
  Show,
  Suspense,
  Switch,
  type ParentComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import client from "../../../../tina/__generated__/client";
import type { Home, HomeQuery } from "../../../../tina/__generated__/types";
import { createTina, tinaField } from "../../../../tina/tina-helpers";
import { Link } from "../../shared/link/link";

const Hero: ParentComponent<{
  data: Awaited<ReturnType<typeof client.queries.home>>;
}> = (props) => {
  const initialData = createTina<HomeQuery>(props.data).data;
  const data = createMemo(() => initialData()?.home);
  return (
    <section class="transition-transform h-viewi lg:flex-row-reverse lg:gap-8 flex gap-4 flex-col items-center justify-center">
      <div class="flex flex-col gap-4 items-center grow">
        <div class="flex justify-center rounded items-center overflow-hidden grow w-full lg:grow-0 max-w-md lg:h-4/5">
          {props.children}
        </div>
        {/* <Image data={data()} /> */}
        <div
          class="text-center flex flex-col gap-2 items-center"
          data-tina-field={tinaField(data(), "text")}>
          <Markdown qwer={data()?.text} />
        </div>
        <ul class="flex gap-2" data-tina-field={tinaField(data(), "buttons")}>
          <For each={data()?.buttons?.slice(0, 2)}>
            {(btn, i) => (
              <Show when={btn?.link}>
                <li>
                  <Link
                    href={btn!.link!}
                    appearance={!i() ? "primary" : "default"}>
                    {btn?.label}
                  </Link>
                </li>
              </Show>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
};

const Markdown = (props: { qwer: Home["text"] }) => {
  const MarkChild = createMemo(() => (
    <For each={props.qwer.children}>{(child) => <Markdown qwer={child} />}</For>
  ));
  return (
    <Switch
      fallback={
        <Dynamic component={props.qwer?.type}>
          <MarkChild />
        </Dynamic>
      }>
      <Match when={props.qwer?.type === "root"}>
        <MarkChild />
      </Match>
      <Match when={props.qwer?.type === "text"}>
        <span classList={{ em: props.qwer?.bold }}>{props.qwer.text}</span>
      </Match>
    </Switch>
  );
};

type ImageProps = {
  data: HomeQuery["home"];
};

const Image = (props: ImageProps) => {
  const [image] = createResource(async () =>
    props.data.image
      ? await getImage({
          src: props.data.image!,
          format: "webp",
          width: 300,
          height: 500,
        })
      : undefined,
  );
  return (
    <Suspense>
      <Show when={image()?.src}>
        <div
          data-tina-field={tinaField(props.data, "image")}
          class="flex justify-center rounded items-center overflow-hidden grow w-full lg:grow-0 max-w-md lg:h-4/5">
          <img
            class="shrink-0 min-h-full min-w-full"
            src={image()!.src}
            alt=""
          />
        </div>
      </Show>
    </Suspense>
  );
};

export default Hero;
