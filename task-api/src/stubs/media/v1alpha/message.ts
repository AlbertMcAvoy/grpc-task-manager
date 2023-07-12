/* eslint-disable */

export const protobufPackage = "media.v1alpha";

export interface Media {
  id?: number | undefined;
  name?: string | undefined;
  url?: string | undefined;
}

export interface CreateMediaRequest {
  name?: string | undefined;
  url?: string | undefined;
}

export interface CreateMediaResponse {
  media?: Media | undefined;
}

export interface UpdateMediaRequest {
  id?: number | undefined;
  name?: string | undefined;
  url?: string | undefined;
}

export interface UpdateMediaResponse {
  media?: Media | undefined;
}

export interface DeleteMediaRequest {
  id?: number | undefined;
}

export interface DeleteMediaResponse {
  media?: Media | undefined;
}

export interface ListMediasRequest {
  /** The parent resource name, for example, "shelves/shelf1" */
  parent?:
    | string
    | undefined;
  /** The maximum number of items to return. */
  pageSize?:
    | number
    | undefined;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string | undefined;
}

export interface ListMediasResponse {
  /**
   * The field name should match the noun "Media" in the method name.
   * There will be a maximum number of items returned based on the page_size field in the request.
   */
  medias?:
    | Media[]
    | undefined;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string | undefined;
}

export interface GetMediaRequest {
  id?: number | undefined;
}

export interface GetMediaResponse {
  media?: Media | undefined;
}

export const MEDIA_V1ALPHA_PACKAGE_NAME = "media.v1alpha";
