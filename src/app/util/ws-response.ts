export class WsResponse {
    constructor(
        public payload?: any,
        public statusDescription?: string,
        public statusCode?: string,
        public statusName?: string) {}
}
