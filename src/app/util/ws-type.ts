export class WsType {
    // Paper Types
    public static GET_ALL_PAPERS = 1;
    public static GET_PAPER = 11;
    public static GET_PAPER_BY_SUBJECT_ID = 12;
    public static GET_PAPER_BY_INSTRUCTOR_ID = 13;
    public static CREATE_PAPER = 14;
    public static UPDATE_PAPER = 15;
    public static PUBLISH_PAPER = 16;

    // Question Types
    public static GET_ALL_QUESTIONS = 2;
    public static GET_QUESTION = 21;
    public static GET_QUESTIONS_BY_PAPER_ID = 22;
    public static CREATE_QUESTION = 23;
    public static UPDATE_QUESTION = 23;
    
    // Subject Types
    public static GET_SUBJECTS = 3;

    // Attempt Types
    public static GET_ATTEMPTS = 4;
    public static GET_ATTEMPTS_USER_PAPER = 41;
    public static SAVE_ATTEMPT = 42;
    // User Types
    public static GET_USER = 5;

    // Common Types
    public static GET_SUBJECTS_INSTRUCTORS = 6;
}
