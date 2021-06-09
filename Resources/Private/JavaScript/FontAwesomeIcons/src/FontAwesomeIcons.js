import { Plugin } from 'ckeditor5-exports';
import FontAwesomeIconsCommand from './FontAwesomeIconsCommand';

export default (presetIdentifier, presetConfiguration) =>
    class FontAwesomeIcons extends Plugin {
        init() {
            this.editor.model.schema.extend(
                '$text',
                { allowAttributes: `fontAwesomeIcons-${presetIdentifier}` }
            );

            // Model configuration
            const config = {
                model: {
                    key: `fontAwesomeIcons-${presetIdentifier}`,
                    values: Object.keys(presetConfiguration.options),
                },
                view: {}
            };

            // View configuration
            Object.keys(presetConfiguration.options).forEach(optionIdentifier => {

                const classes = presetConfiguration.options[optionIdentifier].cssClass.split(' ');

                config.view[optionIdentifier] = {
                    name: 'i',
                    classes: classes
                }
            });

            // Convert the model to view correctly
            this.editor.conversion.attributeToElement(config);

            this.editor.commands.add(`fontAwesomeIcons:${presetIdentifier}`, new FontAwesomeIconsCommand(this.editor, `fontAwesomeIcons-${presetIdentifier}`));
        }
    }
