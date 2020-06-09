export class MessagesServiceURL {

    private static servicePrefix = 'api/';

    private static messagesExtension = MessagesServiceURL.servicePrefix + 'temp/appointments/';

    public static getMessages() {
        return MessagesServiceURL.messagesExtension + 'getAppointments/instructor';
    }



}