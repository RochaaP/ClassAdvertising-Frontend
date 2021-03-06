export class RolesServiceURL {
    private static servicePrefix = 'api/';

    private static rolesExtension = RolesServiceURL.servicePrefix + 'userDetails/';
    private static adminExtension = RolesServiceURL.servicePrefix + 'admin/';
    private static attemptExtension = RolesServiceURL.servicePrefix + 'attempts/';
    private static supportExtension = RolesServiceURL.servicePrefix + 'support/';

    public static CREAT_NOTE = RolesServiceURL.rolesExtension;


    /// Register ///
    public static registersUsers() {
        return RolesServiceURL.rolesExtension + 'common/register';
    }


    /// ADMIN ////
    public static viewUsers() {
        return RolesServiceURL.rolesExtension + 'common/getAll';
    }

    public static getUsersCount() {
        return RolesServiceURL.adminExtension + 'panel/usersCount';
    }

    public static getSubjects() {
        return RolesServiceURL.adminExtension + 'panel/subjects';
    }

    public static addSubject() {
        return RolesServiceURL.adminExtension + 'panel/setSubject';
    }

    public static updateSubjects() {
        return RolesServiceURL.adminExtension + 'panel/updateSubject';
    }

    public static deleteSubjects(id: string) {
        return RolesServiceURL.adminExtension + 'panel/deleteSubject/' + id;
    }

    public static getFAQs() {
        return RolesServiceURL.adminExtension + 'panel/faq';
    }

    public static addFAQs() {
        return RolesServiceURL.adminExtension + 'panel/setFaq';
    }

    public static updateFAQs() {
        return RolesServiceURL.adminExtension + 'panel/updateFaq';
    }

    public static deleteFAQs(id: string) {
        return RolesServiceURL.adminExtension + 'panel/deleteFaq/' + id;
    }

    public static getContact() {
        return RolesServiceURL.supportExtension + 'contactUs';
    }
    /// instructor - view profile ////
    public static getInstructor() {
        return RolesServiceURL.rolesExtension + 'instructor/get';
    }

    //// institute - view profile ////
    public static getInstitute() {
        return RolesServiceURL.rolesExtension + 'institute/get';
    }

    //// student - view profile ////
    public static getStudent() {
        return RolesServiceURL.rolesExtension + 'student/get';
    }

    public static verifyUser() {
        return RolesServiceURL.adminExtension + 'verify';
    }

    public static makeAdmin() {
        return RolesServiceURL.adminExtension + 'panel/makeAdmin';
    }

    public static removeAdmin() {
        return RolesServiceURL.adminExtension + 'panel/removeAdmin';
    }

}
