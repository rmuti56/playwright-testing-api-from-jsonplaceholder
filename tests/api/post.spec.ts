import test, { expect } from "@playwright/test";
import { newPostPayload, updatePostPayload } from "../fixtures/postData";

test.describe("Post Management", () => {
  test("Should be able to get post by existing id", async ({ request }) => {
    const postId = 1;
    const res = await request.get(`/posts/${postId}`);
    const postResponse = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toEqual(200);
    expect(postResponse.id).toEqual(postId);
  });

  test("Should not be able to get post by not existing id", async ({
    request,
  }) => {
    const postId = 9999;
    const res = await request.get(`/posts/${postId}`);

    expect(res.ok()).toBeFalsy();
    expect(res.status()).toEqual(404);
  });

  test("Should be able to get post list", async ({ request }) => {
    const res = await request.get(`/posts`);
    const postsResponse = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toEqual(200);
    expect(postsResponse).toHaveLength(100);
  });

  test("Should be able to filter post list by user id", async ({ request }) => {
    const userId = 1;
    const res = await request.get(`/posts`, {
      params: {
        userId,
      },
    });
    const postsResponse = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toEqual(200);
    expect(postsResponse[0].userId).toEqual(userId);
  });

  test("Should be able to create a new post", async ({ request }) => {
    const res = await request.post(`/posts`, {
      data: newPostPayload,
    });
    const newPostResponse = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toEqual(201);
    expect(newPostResponse).toEqual(expect.objectContaining(newPostPayload));
  });

  test("Should be able to update post title and post body by existing id", async ({
    request,
  }) => {
    const res = await request.put(`/posts/${updatePostPayload.id}`, {
      data: updatePostPayload,
    });
    const updatedPostResponse = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toEqual(200);
    expect(updatedPostResponse).toEqual(expect.objectContaining(updatePostPayload));
  });

  test("Should be able to update post title by existing id", async ({
    request,
  }) => {
    const res = await request.patch(`/posts/${updatePostPayload.id}`, {
      data: {
        title: updatePostPayload.title,
      },
    });
    const updatedPostResponse = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toEqual(200);
    expect(updatedPostResponse.title).toEqual(updatedPostResponse.title);
  });

  test("Should be able to delete post", async ({ request }) => {
    const res = await request.delete(`/posts/1`);

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toEqual(200);
  });
});
