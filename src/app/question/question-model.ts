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
        public metadata: string,
        public image_A: boolean,
        public imageA: string,
        public a_metadata: string,
        public image_B: boolean,
        public imageB: string,
        public b_metadata: string,
        public image_C: boolean,
        public imageC: string,
        public c_metadata: string,
        public image_D: boolean,
        public imageD: string,
        public d_metadata: string,
        public image_E: boolean,
        public imageE: string,
        public e_metadata: string
    ) {}
}
