import { fail, type Actions } from '@sveltejs/kit';
import { mediaClients } from '$src/lib/server/rpcClients';
import {DeleteMediaRequest, ListMediasRequest, UpdateMediaRequest} from '$src/lib/stubs/media/v1alpha/message';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const listMediaRequest = ListMediasRequest.create();
	const request = await mediaClients.listMedias(listMediaRequest);
	const listTasksResponse = request.response;

	const medias = listTasksResponse.medias.map((m: { id: any; name: any; url: any; }) => {
		return {
			id: m.id,
			name: m.name,
			url: m.url
		}
	});

	return { medias };
};

export const actions: Actions = {
	newMedia: async ({ request, locals }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const url = data.get('url') as string;

		try {
			await mediaClients.createMedia(
				{
					name,
					url
				},
				{
					meta: {
						Authorization: `Bearer ${locals.jwt}`
					}
				}
			);

			return { success: 200 };
		} catch (error: any) {
			console.error(error);
			if (error?.code === 'PERMISSION_DENIED') {
				throw new Error('Task name already exists');
			}
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},

	removeMedia: async ({ request }) => {
		const data = await request.formData();
		const mediaId = data.get('mediaId');

		try {
			await mediaClients.deleteMedia({
				id: mediaId
			});

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},

	updateMedia: async ({ request, }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const url = data.get('url') as string;

		try {
			const updateMediaRequest = UpdateMediaRequest.create({
				name,
				url
			});
			await mediaClients.updateMedia(updateMediaRequest);

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},

	deleteTask: async ({ request }) => {
		const data = await request.formData();
		const mediaId = data.get('name') as number;

		try {
			const deleteTaskRequest = DeleteMediaRequest.create({
				id: mediaId
			});
			await mediaClients.deleteMedia(deleteTaskRequest);

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	}
};
