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
}
