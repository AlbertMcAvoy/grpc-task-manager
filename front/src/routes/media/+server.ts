import { toPb } from '$src/lib/helper/taskDto';
import type { RequestHandler } from './$types';
import { mediaClients } from '$src/lib/server/rpcClients';
import {UpdateMediaRequest} from "$src/lib/stubs/media/v1alpha/message";

export const POST: RequestHandler = async ({request }) => {
	const data = await request.json();

	try {
		const updateMediaRequest = UpdateMediaRequest.create({
			task: toPb(data)
		});
		await mediaClients.updateMedia(updateMediaRequest);

		return new Response();
	} catch (error: any) {
		console.error(error);
		return new Response(null, {
			status: 400
		});
	}
};
