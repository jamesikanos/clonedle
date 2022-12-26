import { VirtualKeyboardComponent } from "./virtual-keyboard.component";
import { Meta, moduleMetadata, Story } from '@storybook/angular';

export default {
    title: 'VirtualKeyboard',
    component: VirtualKeyboardComponent,
    decorators: [
        moduleMetadata({})
    ],
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        guessText: { control: 'text', defaultValue: '' },
        answer: { control: 'text', defaultValue: '' },
        keyPressed: { action: 'key' }
    }
} as Meta<VirtualKeyboardComponent & ExtraArgs>;

const Template: Story<VirtualKeyboardComponent & ExtraArgs> = (args: VirtualKeyboardComponent & ExtraArgs) => {

    if (args.guessText?.length) {
        args.guesses = args.guessText.toLocaleUpperCase().split(',');
    }

    return {
        props: args
    };
}

export const Empty = Template.bind({});

interface ExtraArgs {
    guessText: string;
}
