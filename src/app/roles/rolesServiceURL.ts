export class RolesServiceURL {
    private static servicePrefix = 'api/';

    private static rolesExtension = RolesServiceURL.servicePrefix + 'userDetails/';
    private static adminExtension = RolesServiceURL.servicePrefix + 'admin/';

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

    /// instructor - view profile ////
    public static getInstructor() {
        return RolesServiceURL.rolesExtension + 'instructor/get';
    }

    //// institute - view profile ////
    public static getInstitute() {
        return RolesServiceURL.rolesExtension + 'institute/get';
    }

    public static verifyUser() {
        return RolesServiceURL.adminExtension + 'verify';
    }

    
}
