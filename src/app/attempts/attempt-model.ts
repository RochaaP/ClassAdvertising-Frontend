export class AttemptModel {
    constructor(
        public average: number,
        public highest: number,
        public lowest: number,
        public no_of_attempts: number,
        public timestamp: firebase.firestore.Timestamp,
        public paper: string,
        public user: string
    ){}
}