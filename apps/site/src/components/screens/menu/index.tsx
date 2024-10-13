import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { debounce } from "@solid-primitives/scheduled";
import {
  createEffect,
  createMemo,
  createSelector,
  For,
  Show,
  type Accessor,
  type ParentComponent,
} from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";
import client from "../../../../tina/__generated__/client";
import type {
  MenuQuery,
  MenuSection,
  MenuSectionItems,
  MenuSectionSubgroups,
  MenuSectionSubgroupsItems,
} from "../../../../tina/__generated__/types";
import { createTina, tinaField } from "../../../../tina/tina-helpers";
import { Dietary } from "../../../constants/dietary";
import { mapDietaryToSymbol } from "../../../helpers/dietary";
import { Footer } from "../../shared/footer/footer";

type Group = Pick<
  MenuSection,
  "title" | "__typename" | "desc" | "price" | "items" | "subgroups"
>;
type Subgroup = Pick<
  MenuSectionSubgroups,
  "title" | "__typename" | "desc" | "price" | "items"
>;

type CourseTracker = { [key: string]: boolean };

const makeId = (id: string | undefined): string | undefined =>
  id?.replaceAll("/", "-").replaceAll(" ", "-").toLocaleLowerCase() +
  "-section";

export default (props: {
  menu: Awaited<ReturnType<typeof client.queries.menu>>;
}) => {
  const initialData = createTina<MenuQuery>(props.menu).data;
  const data = createMemo(() => initialData().menu.section);
  const courses: Accessor<string[]> = createMemo(() =>
    (data()?.flatMap((x) => x?.title) || []).filter((x): x is string => !!x),
  );
  const courseStore = createMemo(() =>
    courses().reduce((acc, idv, idx) => {
      acc[idv] = idx === 0 ? true : false;
      return acc;
    }, {} as CourseTracker),
  );
  const [courseTracker, setCourseTracker] =
    createStore<CourseTracker>(courseStore());
  createEffect(() => setCourseTracker(courseStore()));
  const dietary = () => Object.values(Dietary);
  return (
    <>
      <PageContainer>
        <Nav courseTracker={courseTracker} courses={courses} />
        <ContentContainer>
          <h2>Menu</h2>
          <For each={data()}>
            {(group) => (
              <Section setCourseTracker={setCourseTracker} group={group} />
            )}
          </For>
          <DietaryLegend dietary={dietary} />
          <Footer />
        </ContentContainer>
      </PageContainer>
    </>
  );
};

const PageContainer: ParentComponent = (props) => {
  return (
    <div class="flex flex-col md:scroll-p-6 md:px-6 scroll-p-header md:flex-row w-full h-full overflow-y-auto scroll-smooth">
      {props.children}
    </div>
  );
};

const ContentContainer: ParentComponent = (props) => {
  return (
    <div class="flex justify-center grow scroll-smooth">
      <div class="relative max-w-screen-sm flex flex-col gap-4 p-6 md:p-0">
        {props.children}
      </div>
    </div>
  );
};

const DietaryLegend = (props: { dietary: Accessor<Dietary[]> }) => (
  <section>
    <ul class="flex gap-2 items-center justify-center flex-wrap">
      <For each={props.dietary()}>
        {(d, idx) => (
          <>
            <li class="flex gap-1">
              <span class="font-light">{d}</span>
              <span>{mapDietaryToSymbol(d)}</span>
            </li>
            <Show when={idx() !== props.dietary().length - 1}>
              <span class="font-light">•</span>
            </Show>
          </>
        )}
      </For>
    </ul>
  </section>
);

const Nav = (props: {
  courses: Accessor<string[]>;
  courseTracker: Store<CourseTracker>;
}) => {
  const activeLink = createMemo(() =>
    props.courses().find((x) => props.courseTracker[x]),
  );
  const isActiveLink = createSelector(activeLink);

  let nav: HTMLElement;
  const trigger = debounce((index: number) => {
    try {
      const el = nav.children.item(index) as HTMLDivElement;
      const asdf = el?.offsetLeft + el?.clientWidth / 2;
      const center = window.innerWidth / 2;
      nav.scrollTo({ left: asdf - center, behavior: "smooth" });
    } catch (e) {
      console.warn(e);
    }
  }, 500);
  return (
    <aside
      id="menu-course-nav"
      class="sticky flex md:justify-start justify-center left-0 h-secondary-header top-0 z-[15] w-full shrink-0 overflow-x-hidden bg-surface-default shadow-md md:h-view md:w-56 md:shadow-none"
      aria-label="menu course links container">
      <nav
        ref={(ref) => (nav = ref)}
        class="flex h-full items-center md:justify-start md:gap-1 gap-2 md:overflow-hidden overflow-x-scroll p-4 md:items-start md:flex-col"
        aria-label="menu courses links">
        <For each={props.courses()}>
          {(course: string, idx) => {
            createEffect(() => {
              if (isActiveLink(course)) {
                trigger(idx());
              }
            });
            return (
              <a
                id={`${course}-tag`}
                href={`#${makeId(course)}`}
                title={course}
                class="whitespace-nowrap border-b-2 md:text-left text-center md:border-l-2 md:border-b-0 px-2 py-0.5 md:py-1"
                classList={{
                  "text-content-default border-content-default font-medium":
                    isActiveLink(course),
                  "text-content-light-light border-content-light-light border-surface-elevate-xl":
                    !isActiveLink(course),
                }}>
                {course}
              </a>
            );
          }}
        </For>
      </nav>
    </aside>
  );
};

const Section = (props: {
  group:
    | Partial<MenuSection>
    | Partial<MenuSectionSubgroups>
    | undefined
    | null;
  setCourseTracker?: SetStoreFunction<CourseTracker>;
}) => {
  let sectionRef: HTMLElement;
  const isVisible = createVisibilityObserver({
    rootMargin: "-154px 0px 0px 0px",
  })(() => sectionRef);
  createEffect(() => {
    if (props.group?.title && props.setCourseTracker) {
      props.setCourseTracker(props.group.title, isVisible());
    }
  });
  return (
    <section
      ref={(ref) => (sectionRef = ref)}
      class="flex flex-col text-content-default"
      classList={{
        "p-4 rounded shadow-md  gap-2 ":
          props.group?.__typename === "MenuSection",
        "gap-1 ": props.group?.__typename === "MenuSectionSubgroups",
      }}>
      <Show when={props.group}>{<MenuHeading data={props.group!} />}</Show>
      <Show when={!!props.group?.items?.length}>
        <ul class="flex flex-wrap gap-1">
          <For each={props.group!.items}>
            {(item, idx) => (
              <Show
                when={
                  item?.desc ||
                  !!item?.dietary?.length ||
                  item?.price ||
                  !!item?.sizing?.length
                }
                fallback={
                  <li class="flex pr-1">
                    <ItemTitle
                      item={{
                        title:
                          idx() !== props.group!.items!.length - 1
                            ? `${item?.title}, `
                            : item?.title,
                      }}
                    />
                  </li>
                }>
                <li class="w-full">
                  <Item data={item!} />
                </li>
              </Show>
            )}
          </For>
        </ul>
      </Show>
      <Show
        when={
          props.group?.__typename === "MenuSection" &&
          !!props.group?.subgroups?.length
        }>
        <ul class="flex flex-col gap-2">
          <For each={(props.group as Group)?.subgroups}>
            {(subgroup) => (
              <li>
                <Section group={subgroup} />
              </li>
            )}
          </For>
        </ul>
      </Show>
    </section>
  );
};

const MenuHeading = (group: { data: Partial<Group | Subgroup> }) => {
  return (
    <div class="flex flex-col gap-1">
      <div id={makeId(group.data.title)} class="flex justify-between">
        <Show
          when={group.data.__typename === "MenuSection"}
          fallback={
            <h4 data-tina-field={tinaField(group.data, "title")}>
              {group.data.title}
            </h4>
          }>
          <h3 data-tina-field={tinaField(group.data, "title")}>
            {group.data.title}
          </h3>
        </Show>
        <Show when={group.data.price}>
          <span
            classList={{
              h3: group.data.__typename === "MenuSection",
              h4: group.data.__typename === "MenuSectionSubgroups",
            }}
            data-tina-field={tinaField(group.data, "price")}>
            ${group.data.price}
          </span>
        </Show>
      </div>
      <Show when={group.data.desc}>
        <span
          class="text-content-light-light"
          data-tina-field={tinaField(group.data, "desc")}>
          {group.data.desc}
        </span>
      </Show>
    </div>
  );
};

const Item = (item: {
  data: Partial<MenuSectionItems | MenuSectionSubgroupsItems>;
}) => {
  return (
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <ItemTitle item={item.data} />
          <Show when={!!item.data.dietary?.length}>
            <ul
              class="flex items-center gap-1"
              data-tina-field={tinaField(item.data, "dietary")}>
              <For each={item.data.dietary}>
                {(d) => d && <li>{mapDietaryToSymbol(d as Dietary)}</li>}
              </For>
            </ul>
          </Show>
        </div>
        <Show when={item.data.desc}>
          <span
            class="text-content-light-light"
            data-tina-field={tinaField(item.data, "desc")}>
            {item.data.desc}
          </span>
        </Show>
      </div>
      <Show when={item.data.price}>
        <span data-tina-field={tinaField(item.data, "price")}>
          ${parseFloat(item.data.price || "").toFixed(1)}
        </span>
      </Show>
      <Show when={!!item.data.sizing?.length}>
        <ul class="flex gap-2">
          <For each={item.data.sizing}>
            {(size) => (
              <li>
                <Show when={size?.price}>
                  <span data-tina-field={tinaField(size, "price")}>
                    ${size!.price.toFixed(1)}
                  </span>
                </Show>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

const ItemTitle = (props: {
  item: Partial<MenuSectionItems | MenuSectionSubgroupsItems>;
}) => (
  <h4 class="text-lg" data-tina-field={tinaField(props.item, "title")}>
    {props.item.title}
  </h4>
);
