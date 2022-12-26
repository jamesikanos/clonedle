import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { GridCellComponent } from "./grid-cell.component";

export default {
    title: 'GridCell',
    component: GridCellComponent,
    decorators: [
        moduleMetadata({})
    ],
    argTypes: {
        letter: { control: 'text', defaultValue: '' },
        match: { control: 'select', options: [ null, 'exact', 'partial', 'miss' ], defaultValue: null }
    },
    parameters: {
        layout: 'centered'
    }
} as Meta<GridCellComponent>;

const Template: Story<GridCellComponent> = (args: GridCellComponent) => {
    return {
        props: args
    };
}

export const Empty = Template.bind({});
