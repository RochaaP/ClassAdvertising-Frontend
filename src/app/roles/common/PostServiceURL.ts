export class PostsServiceURL {
    private static servicePrefix = 'api/';

    private static postsExtension = PostsServiceURL.
    servicePrefix + 'posts/';
    public static CREATE_POST = PostsServiceURL.postsExtension;

    public static addPost() {
        return PostsServiceURL.postsExtension + 'add';
    }
}
