import manifest from '@neos-project/neos-ui-extensibility';
import {$get} from 'plow-js';

import FontAwesomeIcons from './FontAwesomeIcons';
import FontAwesomeIconsSelector from './components/FontAwesomeIconsSelector';

manifest('NeosRulez.CkFontAwesome:FontAwesomeIcons', {}, (globalRegistry, {frontendConfiguration}) => {

    const ckEditorRegistry = globalRegistry.get('ckEditor5');
    const richtextToolbar = ckEditorRegistry.get('richtextToolbar');
    const config = ckEditorRegistry.get('config');

    const fontAwesomeIconConfiguration = frontendConfiguration['NeosRulez.CkFontAwesome:Icons'];

    if(fontAwesomeIconConfiguration) {

        Object.keys(fontAwesomeIconConfiguration.presets).forEach((presetIdentifier) => {

            const fontAwesomeIconPresetConfiguration = fontAwesomeIconConfiguration.presets[presetIdentifier];

            config.set(`NeosRulez.CkFontAwesome:FontAwesomeIcons_${presetIdentifier}`, (ckEditorConfiguration, {editorOptions}) => {
                const editing = FontAwesomeIcons(presetIdentifier, fontAwesomeIconPresetConfiguration);
                ckEditorConfiguration.plugins = FontAwesomeIcons.plugins || [];
                ckEditorConfiguration.plugins.push(editing);
                return ckEditorConfiguration;
            });

            richtextToolbar.set(`fontAwesomeIcons_${presetIdentifier}`, {
                component: FontAwesomeIconsSelector,
                // Display only if the preset is activated in NodeType.yaml for this node property
                isVisible: function(editorOptions, formattingUnderCursor) {
                    var isVisible = false;
                    if(editorOptions['Icons'] !== undefined && editorOptions['Icons'][presetIdentifier] !== undefined) {
                        isVisible = editorOptions['Icons'][presetIdentifier];
                    }
                    return isVisible;
                },
                presetIdentifier: presetIdentifier,
                presetConfiguration: fontAwesomeIconPresetConfiguration
            });
        })
    }
});
