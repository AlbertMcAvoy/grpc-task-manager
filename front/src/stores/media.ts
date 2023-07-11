import type { Media } from '$src/lib/stubs/media/v1alpha/message';
import { writable } from 'svelte/store';

const xor = (cond: boolean, asc: boolean) => {
    if ((cond && !asc) || (!cond && asc)) {
        return true;
    } else {
        return false;
    }
};

const createMediaStore = () => {
    const mediaStore = writable<[]>([]);

    return {
        ...mediaStore,
        sortByDate: (asc = true) =>
            mediaStore.update((ts) => ts.sort((a, b) => (xor(a.dueDate < b.dueDate, asc) ? 1 : -1))),
        sortByName: (asc = true) =>
            mediaStore.update((ts) =>
                ts.sort((a, b) =>
                    xor(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase(), asc) ? 1 : -1
                )
            ),
        remove: (mediaName: string) => {
            mediaStore.update((ts) => ts.filter(({ name }) => name !== mediaName));
        },
        add: (media: Media) => {
            mediaStore.update((ts) => [toJson(media), ...ts]);
        },
        updateOne: (media: Media) => {
            mediaStore.update((ts) => {
                const mediaIndex = ts.findIndex(({ name }) => name === media.name);

                if (mediaIndex === -1) return ts;

                ts.splice(mediaIndex, 1, toJson(media));

                return ts;
            });
        }
    };
};

export const mediaStore = createMediaStore();
export const relativeDate = writable(true);
export const searchTerm = writable('');
