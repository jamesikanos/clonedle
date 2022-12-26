import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { GridCellComponent } from "../grid-cell/grid-cell.component";
import { GameGridComponent } from "./game-grid.component";

export default {
    title: 'GameGrid',
    component: GameGridComponent,
    decorators: [
        moduleMetadata({
            declarations: [
                GridCellComponent
            ]
        })
    ],
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        currentGuess: { control: 'text', defaultValue: '' },
        guessText: { control: 'text', defaultValue: '' },
        answer: { control: 'text', defaultValue: '' }
    }
} as Meta<GameGridComponent & ExtraArgs>;

const Template: Story<GameGridComponent & ExtraArgs> = (args: GameGridComponent & ExtraArgs) => {

    if (args.guessText?.length) {
        args.guesses = args.guessText?.toLocaleUpperCase()?.split(',');
    }

    return {
        props: args
    };
}

export const Empty = Template.bind({});

interface ExtraArgs {
    guessText: string;
}