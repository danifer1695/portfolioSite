**This project's structure is still a work in progress**

## HEADER AND FOOTER

Header is always present, meaning it does not scroll with the rest of the page and remains on top.
They are located directly inside RootLayour in layout.tsx
The header will contain An icon positioned at the top left, and navigation links to its right.
The footer will contain a link to the contact page, a copyright label and links to socials.

**Header**:
Usually the header will contain the following elements:

- Logo with my initials encircled in it.
- Page navigation links
- Language selection

But when in '/' the header behaves differently:

- Logo cirlcle expands, and inside a photo of myself blends in on top of the initials.
- Page navigation and language selection elements stay in place, but below it, a container expands, containing my profile details (name, headline, about, description, skills...). This container has an id='expandable-container' in the code.
- This should transitioin smoothly when switching pages.

## HOME PAGE

The hope page will be designed to visually resemble a Metro map. Laid out as a column it will include:

- A legend with clickable elements representing each of the subway lines (A - Academics, T - Technical, P - Professional) that will link to their respective pages. Hovering over each one of them will highlight its line on the map by muting the rest.
- A graphic respresentation of my past experience laid out to resemble a subway map. Like with the elements in the legend section, hovering over one of the lines will highlight it by muting the rest. The stops will be interactable too.

The map will work in the follwing way:
Each line is made up of connected nodes, each node representing a subway stop, an element inside each of the categories.
Hovering over a specific stop will Highlight its text, make its node grow in size, and clicking on it will take the user to its own #section within tha appropriate page (ex: /projects/#portfolio-site).

Here is how I envision the map working technically, but I'm open to a different approach should there be a better way:

- A Node Component / Class: Pass it its position (coordinates?), an href to link to, a label, a 'focused' boolean...
- A Line Component / Class: Pass it a color, and a collection of Node objects that will be connected in order. Positions of the nodes should be able to be adjusted dynamically.
  These two structures should give us the ability to build lines of any shape.

## P LINE - PROFESSIONAL PAGE

This page will be dedicated to my past professional experience. Visually, it will be represented as a vertically stretched-out subway line, with each of my past job positions as stops.

By default, all the stops in the line will show collapsed, showing just the basic info (non-collapsible data in the code). These elements can be expanded by clicking on them.

When someone arrives to one of the stops through /page#stop that stop will expand and the all other stops collapse.

Details are pulled from "src/content/professional.ts" and an image gallery.

## A LINE - ACADEMICS PAGE

This page will work similarly to the 'P Line' page, but will instead include information about my academic background and will pull data from "src/content/academic.ts".

## T LINE - TECHNICAL PAGE

Functionally, this page will be similar to the other two. It will include information regarding my past projects, pulled from "src/content/projects.ts"

## CONTACT PAGE

This page will contain my contact information, along with a contact form whose back-end will be written by myself. The form will ask for the following information:

- Name
- Company (optional)
- Message
  Once sent, the back-end will be set up to send me the query through email.

## RESUME PAGE

This page will format all of the above information into one single page, laid out into a printable professional resume (printable meaning with dimensions appropriate for printing through ctrl-p. This page is still in HTML-format)
Visually, this page should be coherent with the language of the rest of the site.
