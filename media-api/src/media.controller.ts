import { Controller } from '@nestjs/common';
import { MediaService } from './media.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  CreateMediaRequest, CreateMediaResponse, DeleteMediaRequest, DeleteMediaResponse,
  GetMediaRequest,
  GetMediaResponse,
  ListMediasRequest,
  ListMediasResponse, UpdateMediaRequest, UpdateMediaResponse,
} from './stubs/media/v1alpha/message';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @GrpcMethod('MediaService')
  async GetMedia(request: GetMediaRequest): Promise<GetMediaResponse> {
    try {
      const media = await this.mediaService.find({
        id: request.id
      });

      return { media };
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('MediaService')
  async ListMedias(request: ListMediasRequest): Promise<ListMediasResponse> {
    try {
      const medias = await this.mediaService.findAll();

      return { medias, nextPageToken: '' };
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('MediaService')
  async CreateMedia(request: CreateMediaRequest): Promise<CreateMediaResponse> {
    try {
      const media = await this.mediaService.createMedia({
        name: request.name,
        url: request.url
      });

      return { media };
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('MediaService')
  async UpdateMedia(request: UpdateMediaRequest): Promise<UpdateMediaResponse> {
    const id = +request.id;
    delete request.id; // Do not update the Id
    const media = await this.mediaService.updateMedia({
      where: {
        id: id,
      },
      data: request,
    });

    return { media };
  }

  @GrpcMethod('MediaService')
  async DeleteMedia(req: DeleteMediaRequest): Promise<DeleteMediaResponse> {
    const media = await this.mediaService.deleteMedia({
      id: +req.id,
    });

    return { media };
  }
}
