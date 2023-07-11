import {
	UpdateTaskRequest,
	DeleteTaskRequest
} from '$lib/stubs/task/v1beta/request';
import { toPb } from '$lib/helper/taskDto';
import { fail, type Actions } from '@sveltejs/kit';
import { mediaClients } from '$src/lib/server/rpcClients';

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

	removeTask: async ({ request, locals }) => {
		const data = await request.formData();
		const taskName = data.get('taskName') as string;
		const fieldName = data.get('fieldName') as string;

		try {
			await taskClients.fieldClient.removeField({
				fieldName,
				taskName
			});

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},

	updateTask: async ({ request, locals }) => {
		const data = await request.formData();
		const stringTask = data.get('task') as string;

		try {
			const updateTaskRequest = UpdateTaskRequest.create({
				task: toPb(JSON.parse(stringTask))
			});
			await taskClients.crudClient.updateTask(updateTaskRequest);

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},

	deleteTask: async ({ request, locals }) => {
		const data = await request.formData();
		const name = data.get('name') as any;

		try {
			const deleteTaskRequest = DeleteTaskRequest.create({
				name
			});
			await taskClients.crudClient.deleteTask(deleteTaskRequest);

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	}
};
