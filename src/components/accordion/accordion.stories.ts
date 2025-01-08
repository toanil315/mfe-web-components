import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";
import { ifDefined } from "lit/directives/if-defined.js";
import "./accordion-group/mfe-accordion-group";
import "./accordion-item/mfe-accordion-item";

interface AccordionArgs {
  multiple?: boolean;
  accordions: {
    caption: string;
    content: string;
    disabled?: boolean;
  }[];
  ["mfe-toggle"]?: string;
}

// Define component metadata
const meta: Meta<AccordionArgs> = {
  title: "Components/Accordion",
  component: "mfe-accordion-group", // Ensure the component name matches your custom element
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      table: {
        category: "Attributes",
      },
    },
    ["mfe-toggle"]: {
      control: "check",
      description: "This event will be dispatched when toggle accordion items",
      table: {
        category: "Events",
      },
    },
    accordions: {
      description: "This is valid children of mfe-accordion group",
      table: {
        category: "Children",
      },
    },
  },
};
export default meta;

// Create a template for the accordion
const Template = (args: AccordionArgs) => html`
  <mfe-accordion-group ?multiple="${ifDefined(args.multiple)}">
    ${args.accordions.map(
      ({ caption, content, disabled }) => html`
        <mfe-accordion caption="${caption}" ?disabled="${ifDefined(disabled)}"
          >${content}</mfe-accordion
        >
      `
    )}
  </mfe-accordion-group>
`;

// Mock data
const ACCORDIONS = [
  {
    caption: "Toggle Me",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur deserunt dolores eaque facere quisquam reprehenderit saepe sequi temporibus veniam!",
  },
  {
    caption: "Disabled",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur deserunt dolores eaque facere quisquam reprehenderit saepe sequi temporibus veniam!",
    disabled: true,
  },
  {
    caption: "Toggle Me 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur deserunt dolores eaque facere quisquam reprehenderit saepe sequi temporibus veniam!",
  },
  {
    caption: "Toggle Me 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur deserunt dolores eaque facere quisquam reprehenderit saepe sequi temporibus veniam!",
  },
];

// Stories
export const Primary: StoryObj<AccordionArgs> = {
  render: Template, // Use render to bind the Template function
  args: {
    multiple: false,
    accordions: ACCORDIONS,
  },
};

export const Multiple: StoryObj<AccordionArgs> = {
  render: Template, // Use render to bind the Template function
  args: {
    multiple: true,
    accordions: ACCORDIONS,
  },
};
