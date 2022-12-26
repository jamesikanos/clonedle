import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { GameGridComponent } from "../game-grid/game-grid.component";
import { GridCellComponent } from "../grid-cell/grid-cell.component";
import { VirtualKeyboardComponent } from "../virtual-keyboard/virtual-keyboard.component";
import { FullGameComponent } from "./full-game.component";

export default {
    title: 'FullGame',
    component: FullGameComponent,
    decorators: [
        moduleMetadata({
            declarations: [
                GameGridComponent,
                VirtualKeyboardComponent,
                GridCellComponent
            ]
        })
    ],
    argTypes: {
        guessText: { control: 'text', defaultValue: '' },
        answer: { control: 'text', defaultValue: '' }
    }
} as Meta<FullGameComponent & ExtraArgs>;

const Template: Story<FullGameComponent & ExtraArgs> = (args: FullGameComponent & ExtraArgs) => {

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
