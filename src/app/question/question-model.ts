export class QuestionModel {
    constructor(
        public subject: string,
        public instructor: string,

        public question: string,

        public a: string,
        public b: string,
        public c: string,
        public d: string,
        public e: string,

        public answer: string,

        public paper: string,
        public number: string,

        public image: boolean,
        public image_url: string,
        public metadata: string
    ) {}
}
