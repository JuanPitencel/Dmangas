## Work description

I need a complete community reading platform for manga, manhwa, manhua, novels,
doujinshi and one shots. I want the full product from you: the interface design
for desktop and mobile, and the coded front end that implements it.

I am attaching my component library. It has the typography scale, the colour
palette, the logo, the icon set, a few card variants, form controls and alerts.
That is the visual foundation I want you to build on. It does not include any
screen designs or any user flow, so everything above that layer is what I need
you to produce: the information architecture, the navigation model, every screen
in the product, both breakpoints, and the code in React js for the frontend.

The platform is community driven. Readers browse and read titles. Translation
teams organise into groups, take on defined roles, and publish chapters. Most
screens have two states, anonymous and signed in, and I want the anonymous state
designed as a reduced version that pushes visitors toward registering rather
than just hiding content.

### Requirements

**Design**

- Produce the full screen flow in Figma, in a desktop version and a mobile
  version. I want both designed properly, not one scaled from the other.
- Build on my component library. Extend it where the product needs components
  that do not exist yet, such as carousels, tabs, chapter lists, comment
  threads, upload widgets and filter panels. Keep those extensions consistent
  with the typography, palette and spacing I already defined.
- Design both the anonymous and the signed in state of every screen where they
  differ, including the prompts that lead a visitor to register.
- Cover empty states, loading states and error states, not only the populated
  case.
- Organise the file so the flow reads as a flow. Name and order screens by
  section, and keep the component library on its own page.

**Product scope**

Design and implement all of this:

- Home with a promotional slider, latest updates, daily picks, recommendations
  and a genre browser.
- Catalogue browsing with filters by genre, type, demographic and publication
  status, and sorting by latest, most popular and highest rated.
- Text search with recent searches and a results view.
- Book detail with tabbed information, a chapter list grouped by volume,
  ratings, view counts and comments.
- Chapter reader with page navigation and reading history.
- Group creation, member search, membership requests and role assignment across
  nine roles: leader, editor, translator, typer, writer, cartoonist,
  re drawnist, reviser and intern.
- Chapter upload with drag and drop, image ordering, and edit and delete flows.
- Nested comment threads on books and on chapters, with replies, likes, edit and
  delete.
- Personal library with reading status, history and favourites.
- User profile with editable details, avatar selection and social links.
- Sign up and sign in by email, plus Google authentication.
- Wallet with payment history and statistics.
- Notifications, cookie consent, and the legal pages for terms, privacy and
  cookies.

**Comments**

- I am providing custom emoji to add to the standard emoji set, reachable from
  the same picker in the comment box.
- I am also providing stickers, which attach to a comment at a larger size than
  an emoji.
- Design the picker and both cases in the desktop and the mobile layout.

**Technical**

- React with client side routing.
- Session state shared across the application, with every profile and group
  screen behind a route guard that redirects anonymous users.
- Integration with three separate backend services: a core content API, an
  authentication API, and a groups and chapters API.
- Implement my component library as reusable components. Do not duplicate them
  per screen.
- Responsive implementation matching both designed breakpoints.

**Constraints**

- The interface copy in the code must match the strings in the designs exactly.
- The visual identity in my component library is fixed. Do not redesign the
  typography, the palette or the logo.
- The custom emoji and sticker artwork is fixed too. Use it as supplied.

## Provided material

- Figma component library (`inputs/component-library.fig`): typography scale,
  colour palette, logo, icon set, card variants, form controls and alerts.
- Custom emoji set to add to the standard emoji in the comment system
  (`inputs/emojis/`)
- Custom sticker set for the comment system (`inputs/stickers/`)

## Deliverables

1. Figma design file, mobile version, complete screen flow across all sections
   (`.fig`)
2. Figma design file, desktop version, complete screen flow across all sections
   (`.fig`)
3. React application source code implementing the designed screens
   (`.js`, `.jsx`, `.css`)
4. Mock data layer so the application runs and can be reviewed without the
   backend services (`src/mocks/`)
5. Project documentation covering setup, environment configuration and the
   available scripts (`README.md`)
