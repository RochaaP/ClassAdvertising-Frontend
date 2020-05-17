// tslint:disable-next-line: class-name
export class notesServiceURL {
    private static servicePrefix = 'api/';

    private static notesExtension = notesServiceURL.
    servicePrefix + 'notes/';
    // public static GET_PAPERS = ServiceUrls.paperExtension;
    public static CREAT_NOTE = notesServiceURL.notesExtension;

    public static addNote() {
        return notesServiceURL.notesExtension + 'uploadfiles';
    }

    public static viewNote() {
        return notesServiceURL.notesExtension + 'viewNotes';
    }
}
