import manifest from '@neos-project/neos-ui-extensibility';
import {$get} from 'plow-js';

import FontAwesomeIcons from './FontAwesomeIcons';
import FontAwesomeIconsSelector from './components/FontAwesomeIconsSelector';

manifest('NeosRulez.CkFontAwesome:FontAwesomeIcons', {}, (globalRegistry, {frontendConfiguration}) => {

    const ckEditorRegistry = globalRegistry.get('ckEditor5');
    const richtextToolbar = ckEditorRegistry.get('richtextToolbar');
    const config = ckEditorRegistry.get('config');

    const fontAwesomeIconConfiguration = frontendConfiguration['NeosRulez.CkFontAwesome:FontAwesomeIcons'];

    if(fontAwesomeIconConfiguration) {

        Object.keys(fontAwesomeIconConfiguration.presets).forEach((presetIdentifier) => {

            const fontAwesomeIconPresetConfiguration = fontAwesomeIconConfiguration.presets[presetIdentifier];

            config.set(`NeosRulez.CkFontAwesome:FontAwesomeIcons_${presetIdentifier}`, (ckEditorConfiguration, {editorOptions}) => {
                ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
                ckEditorConfiguration.plugins.push(FontAwesomeIcons(presetIdentifier, fontAwesomeIconPresetConfiguration));
                return ckEditorConfiguration;
            });

            richtextToolbar.set(`fontAwesomeIcons_${presetIdentifier}`, {
                component: FontAwesomeIconSelector,
                // Display only if the preset is activated in NodeType.yaml for this node property
                isVisible: function(editorOptions, formattingUnderCursor) {
                    var isVisible = false;
                    if(editorOptions['fontAwesomeIcon'] !== undefined && editorOptions['fontAwesomeIcon'][presetIdentifier] !== undefined) {
                        isVisible = editorOptions['fontAwesomeIcon'][presetIdentifier];
                    }
                    return isVisible;
                },
                presetIdentifier: presetIdentifier,
                presetConfiguration: fontAwesomeIconPresetConfiguration
            });
        })
    }
});
