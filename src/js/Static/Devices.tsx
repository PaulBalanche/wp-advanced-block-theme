export class Devices {
    static getDefaultDevice() {
        return GLOBAL_LOCALIZED.theme_spec?.media?.defaultMedia
            ? GLOBAL_LOCALIZED.theme_spec.media.defaultMedia
            : 'desktop';
    }

    static getMediaQueries() {
        return GLOBAL_LOCALIZED.theme_spec?.media?.queries &&
            typeof GLOBAL_LOCALIZED.theme_spec.media.queries == 'object'
            ? Devices.sortMediaQueries(
                  GLOBAL_LOCALIZED.theme_spec.media.queries,
              )
            : {
                  desktop: {
                      minWidth: null,
                      maxWidth: null,
                  },
              };
    }

    static sortMediaQueries(mediaQueriesToSort) {
        const mediaQueries = { ...mediaQueriesToSort };
        const mediaQueriesSorted = {};

        while (Object.keys(mediaQueries).length > 0) {
            let min = 0;
            let keyMin = null;
            Object.keys(mediaQueries).forEach((layout) => {
                if (keyMin == null || mediaQueries[layout].minWidth < min) {
                    keyMin = layout;
                    min = mediaQueries[layout].minWidth;
                }
            });

            mediaQueriesSorted[keyMin] = mediaQueries[keyMin];
            delete mediaQueries[keyMin];
        }

        return mediaQueriesSorted;
    }

    static setCurrentDevice(newDevice) {
        const mediaQueries = Devices.getMediaQueries();
        document.querySelector('.o-editor').setAttribute('o-device', newDevice);

        const editor_area = document.querySelector('#editor');
        const layout_flow_area = document.querySelector('.is-root-container');
        if (editor_area && layout_flow_area) {
            layout_flow_area.style.margin = 'auto';

            if (typeof mediaQueries[newDevice] != 'undefined') {
                if (
                    mediaQueries[newDevice]['maxWidth'] != null &&
                    mediaQueries[newDevice]['maxWidth'] <=
                        editor_area.offsetWidth
                ) {
                    layout_flow_area.style.width =
                        mediaQueries[newDevice]['maxWidth'] + 'px';
                } else {
                    layout_flow_area.style.removeProperty('width');
                }
            }
        }
    }
}
